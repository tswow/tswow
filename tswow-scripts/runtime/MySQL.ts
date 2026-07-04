/*
 * This file is part of tswow (https://github.com/tswow)
 *
 * Copyright (C) 2020 tswow <https://github.com/tswow/>
 * This program is free software: you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */
import * as mysql_lib from 'mysql2';
import * as child_process from 'child_process';
import path from 'path';
import { start } from 'repl';
import { commands } from '../util/Commands';
import { EmulatorCore } from '../util/EmulatorCore';
import { wfs } from '../util/FileSystem';
import { WDirectory } from '../util/FileTree';
import { DatabaseSettings, DatabaseType } from '../util/NodeConfig';
import { ipaths } from '../util/Paths';
import { isWindows } from '../util/Platform';
import { Process } from '../util/Process';
import { wsys } from '../util/System';
import { term } from '../util/Terminal';
import { NodeConfig } from './NodeConfig';

/**
 * Represents a single connection to a mysql server.
 */
export class Connection {
    con?: mysql_lib.Pool;
    cfg: DatabaseSettings;
    status?: Promise<void>;
    isConnected = false;
    type: DatabaseType;

    /**
     * Creates a new connection for a specific database type.
     * @param type
     */
    constructor(cfg: DatabaseSettings, type: DatabaseType) {
        this.cfg = cfg;
        this.type = type;
    }

    private configWithoutDb() {
        let c = this.config() as any;
        delete c.database;
        return c;
    }

    private config() {
        return Object.assign({}, this.cfg, {multipleStatements: true, enableKeepAlive: true});
    }

    /**
     * Return the database name configured for this connection.
     */
    name() {
        return this.cfg.database;
    }

    /**
     * Send a query over this connection.
     *
     * Since connections are database-specific, you specify the database by choosing a connection and not in the query itself.
     * @param query The query to execute.
     * @returns Promise with the return value of the query.
     */
    async query(query: string) {
        await this.connect();
        return new Promise<any>((res,rej)=>{
            (this.con as mysql_lib.Pool).query(query,(err,value)=>{
                if(err) {
                    rej(`${err.code}: ${err.message} (for query ${query})`);
                } else {
                    res(value);
                }
            });
        });
    }

    async queryPrepared(query: string, args: any[]) {
        await this.connect();
        return new Promise<any>((res,rej)=>{
            (this.con as mysql_lib.Pool).execute(query,args,(err,value)=>{
                if(err) {
                    rej(err);
                } else {
                    res(value);
                }
            });
        });
    }

    /**
     * Check if the database of this connection contains a specific table.
     * @param tableName Name of the table to check for
     */
    async hasTable(tableName: string) {
        return (await this.query(
              ` SELECT * FROM information_schema.tables WHERE`
            + ` table_schema='${this.cfg.database}'`
            + ` AND TABLE_NAME = '${tableName}';`)).length > 0;
    }

    /**
     * Initiates this connection to the database server. Creates the database if it does not yet exist.
     *
     * @returns Promise that resolves when the connection has been established.
     */
    connect() {
        if(this.con !== undefined) {
            return undefined;
        }
        if (this.status !== undefined) {
            return this.status;
        }

        term.debug('mysql', `Connecting to mysql server ${this.cfg.host}:${this.cfg.database}:${this.cfg.database}`)
        const creator = mysql_lib.createConnection(this.configWithoutDb());

        return this.status = new Promise<void>(async (res,rej)=>{
            term.debug('mysql', `Creating database ${this.cfg.database}`)
            creator.query(
                  `CREATE DATABASE IF NOT EXISTS \`${this.cfg.database}\`;`
                , (createErr)=>{
                    if(createErr) {
                        return rej(createErr);
                    }
                    creator.end((endErr)=>{
                        term.debug('mysql', `Closed initial connection, proceeding with connection pool`)
                        if(endErr) {
                            return rej(endErr);
                        }
                        // workaround: the version of mysql2 we use lists enableKeepAlive as a 'true' type instead of 'boolean'
                        this.con = mysql_lib.createPool(this.config() as any);
                        this.status = undefined;
                        res();
                    });
            });
        });
    }

    async disconnect() {
        if (!this.con)
        {
            term.error('mysql', 'Tried to disconnect from an undefined connection');
            return
        }
        term.debug('mysql', `Disconnecting from mysql server ${this.cfg.host}:${this.cfg.database}:${this.cfg.database}`)
        return new Promise<void>((res,rej)=>{
            this.con?.end((err)=>{
                this.con = undefined;
                if(err) {
                    rej(err);
                } else {
                    res();
                }
            });
        });
    }

    async clean() {
        await this.disconnect();

        term.debug('mysql', `Dropping database ${this.cfg.database}`)
        await new Promise<void>((res,rej)=>{
            let con = mysql_lib.createConnection(this.configWithoutDb());
            con.query(`DROP DATABASE IF EXISTS \`${this.config().database}\`;`,(err)=>{
                if(err) {
                    rej(err);
                } else {
                    res();
                }
            });
        });
        await this.connect();
    }
}

/**
 * Contains functions and fields for managing the mysql server that tswow handles.
 */
export namespace mysql {
    const mysqlprocess: Process = new Process('mysql');

    function id(name: string) {
        return `\`${name.split('`').join('``')}\``;
    }

    export async function ensureUpdatesTable(con: Connection) {
        await con.query(
              `CREATE TABLE IF NOT EXISTS ${id('updates')} (`
            + `${id('name')} VARCHAR(200) NOT NULL,`
            + `${id('hash')} VARCHAR(40) NOT NULL DEFAULT '',`
            + `${id('state')} VARCHAR(20) NOT NULL DEFAULT 'RELEASED',`
            + `${id('installedOn')} TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,`
            + `${id('speed')} INT NOT NULL DEFAULT 0,`
            + `PRIMARY KEY (${id('name')})`
            + `);`
        )
    }

    export async function selfHealWorldDest(source: Connection, dest: Connection) {
        const missingTables = await source.query(
              `SELECT s.table_name FROM information_schema.tables s `
            + `LEFT JOIN information_schema.tables d `
            + `ON d.table_schema='${dest.name()}' AND d.table_name=s.table_name `
            + `WHERE s.table_schema='${source.name()}' `
            + `AND s.table_type='BASE TABLE' `
            + `AND d.table_name IS NULL;`
        )

        for (const row of missingTables as { table_name: string }[]) {
            const table = row.table_name;
            await dest.query(
                  `CREATE TABLE IF NOT EXISTS ${id(dest.name())}.${id(table)} `
                + `LIKE ${id(source.name())}.${id(table)};`
            )
        }

        const hasTrinityString = await dest.query(
              `SELECT COUNT(*) AS c FROM information_schema.tables `
            + `WHERE table_schema='${dest.name()}' AND table_name='trinity_string';`
        ) as { c: number }[];

        if ((hasTrinityString[0]?.c || 0) === 0) {
            return;
        }

        const destCount = await dest.query(`SELECT COUNT(*) AS c FROM ${id('trinity_string')};`) as { c: number }[];
        if ((destCount[0]?.c || 0) > 0) {
            return;
        }

        const sourceCount = await source.query(`SELECT COUNT(*) AS c FROM ${id('trinity_string')};`) as { c: number }[];
        if ((sourceCount[0]?.c || 0) === 0) {
            return;
        }

        await dest.query(
              `TRUNCATE TABLE ${id('trinity_string')};`
            + `INSERT INTO ${id('trinity_string')} SELECT * FROM ${id(source.name())}.${id('trinity_string')};`
        )
    }

    let cachedIsMariaDB: boolean | undefined = undefined;

    /**
     * Whether the local database server binary is MariaDB (as opposed to MySQL).
     * MariaDB requires different initialization and startup flags than MySQL.
     */
    function isMariaDB(): boolean {
        if (cachedIsMariaDB === undefined) {
            try {
                const version = wsys.exec(`"${mysqldExe()}" --version`, 'pipe');
                cachedIsMariaDB = /mariadb/i.test(version);
            } catch (error) {
                cachedIsMariaDB = false;
            }
        }
        return cachedIsMariaDB;
    }

    // Database binaries: bundled .exe on Windows, resolved system binary elsewhere.
    function mysqldExe(): string {
        return isWindows() ? ipaths.bin.mysql.mysqld_exe.get() : wsys.resolveExe(['mariadbd', 'mysqld']);
    }
    function mysqlClientExe(): string {
        return isWindows() ? ipaths.bin.mysql.mysql_exe.get() : wsys.resolveExe(['mariadb', 'mysql']);
    }
    function mysqldumpExe(): string {
        return isWindows() ? ipaths.bin.mysql.mysqldump_exe.get() : wsys.resolveExe(['mariadb-dump', 'mysqldump']);
    }

    // Socket + pid file for the tswow-managed database process (Linux/macOS).
    function socketPath(): string {
        return wfs.absPath(ipaths.coredata.join('tswow-db.sock').get());
    }
    function pidPath(): string {
        return wfs.absPath(ipaths.coredata.join('tswow-db.pid').get());
    }

    export function dump(connection: Connection, outputFile: string) {
        wsys.exec(
            `"${mysqldumpExe()}"`
            + ` --port ${connection.cfg.port}`
            + ` --host ${connection.cfg.host}`
            + ` -u root ${connection.cfg.database}`
            + ` > ${wfs.absPath(outputFile)}`)
    }

    export async function startProcess() {
        term.log('mysql','Starting mysql...');
        ipaths.coredata.mkdir()
        if(!ipaths.coredata.database.exists()) {
            term.log('mysql',"No mysql database found, creating it...");
            try {
                if (isWindows()) {
                    wsys.exec(
                        `${mysqldExe()}`
                        + ` --initialize`
                        + ` --log_syslog=0`
                        + ` --datadir=${ipaths.coredata.database.abs()}`);
                } else if (isMariaDB()) {
                    // MariaDB uses mariadb-install-db instead of `--initialize`.
                    const installDb = wsys.resolveExe(['mariadb-install-db', 'mysql_install_db']);
                    wsys.exec(
                        `"${installDb}"`
                        + ` --datadir="${wfs.absPath(ipaths.coredata.database.get())}"`
                        + ` --auth-root-authentication-method=normal`
                        + ` --skip-test-db`);
                } else {
                    // System MySQL on Linux
                    wsys.exec(
                        `"${mysqldExe()}"`
                        + ` --initialize-insecure`
                        + ` --datadir="${wfs.absPath(ipaths.coredata.database.get())}"`);
                }
            } catch(error) {
                term.error('mysql',`Failed to initialize database: ${error.message}`)
                if (isWindows()) {
                    term.error('mysql',`Make sure you installed all vcredist versions needed`)
                } else {
                    term.error('mysql',`Make sure mariadb/mysql server is installed (e.g. 'pacman -S mariadb' or 'apt install mariadb-server')`)
                }
                term.error('mysql',`See wiki for installation instructions: https://tswow.github.io/tswow-wiki/`)
                process.exit(-1);
            }
            term.success('mysql','Created mysql database');
        }

        const settings : DatabaseSettings[] = [
            NodeConfig.DatabaseSettings('auth'),
            NodeConfig.DatabaseSettings('characters'),
            NodeConfig.DatabaseSettings('world'),
            NodeConfig.DatabaseSettings('world_source'),
        ].filter(x=>
            x.port === NodeConfig.DatabaseHostedPort
                && (x.host === 'localhost' || x.host === '127.0.0.1')
        )

        if(settings.length === 0) {
            throw new Error(
                  `Node.conf missing local database on port ${NodeConfig.DatabaseHostedPort}.`
                + ` If you changed Database.HostedPort In node.conf,`
                + `check that you have also changed any or all Database.* fields as well`);
        }

        const users: {[key: string]: /*password:*/ string} = {}
        settings.forEach(x=>{
            if(users[x.user] !== undefined && users[x.user] !== x.password) {
                throw new Error(`Multiple passwords defined for MySQL user ${x.user}`)
            }
            users[x.user] = x.password
        })

        if(Object.entries(users).length === 0) {
            throw new Error(`No database users found, check your Node.conf`)
        }

        const [user,pass] = Object.entries(users).find(()=>true);

        // Grant the user on both localhost (unix socket) and 127.0.0.1 (TCP), since
        // the emulator connects via TCP while the init-file runs over the socket.
        wfs.write(ipaths.bin.mysql_startup.get(),
              `CREATE USER IF NOT EXISTS`
            + ` '${user}'@'localhost'`
            + ` IDENTIFIED BY '${pass}';`
            + `\nGRANT ALL ON *.* TO '${user}'@'localhost';`
            + `\nALTER USER '${user}'@'localhost' IDENTIFIED BY '${pass}';`
            + `\nCREATE USER IF NOT EXISTS`
            + ` '${user}'@'127.0.0.1'`
            + ` IDENTIFIED BY '${pass}';`
            + `\nGRANT ALL ON *.* TO '${user}'@'127.0.0.1';`
            + `\nALTER USER '${user}'@'127.0.0.1' IDENTIFIED BY '${pass}';`
            + `\nFLUSH PRIVILEGES;`);
        await disconnect();

        const startArgs = isWindows()
            ? [
                `--port=${NodeConfig.DatabaseHostedPort}`,
                '--log_syslog=0',
                '--console',
                '--wait-timeout=2147483',
                '--wait_timeout=2147483',
                `--init-file=${wfs.absPath(ipaths.bin.mysql_startup.get())}`,
                `--datadir=${wfs.absPath(ipaths.coredata.database.get())}`
            ]
            : [
                `--port=${NodeConfig.DatabaseHostedPort}`,
                `--socket=${socketPath()}`,
                `--pid-file=${pidPath()}`,
                '--wait-timeout=2147483',
                `--init-file=${wfs.absPath(ipaths.bin.mysql_startup.get())}`,
                `--datadir=${wfs.absPath(ipaths.coredata.database.get())}`
            ];

        mysqlprocess.start(mysqldExe(), startArgs);
        mysqlprocess.showOutput(process.argv.includes('logmysql'));
        // MariaDB/MySQL on Linux log 'ready for connections' once the init-file has
        // been executed, while Windows MySQL logs 'Execution of init_file ended.'.
        const readyMessage = isWindows()
            ? 'Execution of init_file*ended.'
            : 'ready for connections'
        let val = await Promise.race([
            mysqlprocess.waitForMessage(readyMessage, true),
            mysqlprocess.waitForMessage('Can\'t start server', true),
        ]);
        if(val.includes('Can\'t start server')) {
            if(val.includes('Bind on TCP/IP')) {
                term.error('mysql',
                      `Failed to start MySQL: You already have an instance of MySQL running on this port.\n`
                    + `Try changing your port setting under database_all in node.yaml\n`
                    + `or shut down your existing MySQL instance.\n`
                    )
            } else {
                term.error('mysql',`Failed to start MySQL with the following error (see log ): ${val}`)
            }
            // easier for newbies to not get the spam output
            process.exit(0);
        }
        ipaths.bin.mysql_startup.remove();
        term.success('mysql','Mysql process started');
    }

    /**
     * Returns whether this instance of TSWoW should manage its own MySQL process.
     *
     * On Windows, TSWoW bundles its own MySQL. On Linux/macOS it uses the system
     * mariadbd/mysqld binary but still manages the process/data directory itself
     * so that `npm start` works out of the box without a preconfigured server.
     */
    export function hasOwnProcess() {
        return NodeConfig.DatabaseHostedPort !== 0;
    }

    /**
     * Absolute path to the MySQL/MariaDB client executable used by the emulator
     * (worldserver) for e.g. running SQL updates. Resolves the bundled binary on
     * Windows and the system mariadb/mysql client on Linux/macOS.
     */
    export function clientExecutable() {
        if (isWindows()) {
            return ipaths.bin.mysql.mysql_exe.abs().get();
        }
        return mysqlClientExe();
    }

    /**
     * Sets whether the MySQL process should display output in the console
     * (very messy, only use when you need to debug)
     * @param show
     */
    export function showProcessOutput(show: boolean) {
        mysqlprocess.showOutput(show);
    }

    /**
     * Checks if world databases are installed on multiple connections
     * @param worldConnections
     */
    export async function isWorldInstalled(worldConnections: Connection[]) {
        for(const con of worldConnections) {
            // todo: proper check
            if(!await con.hasTable('item_template')) {
                return false;
            }
        }
        return true;
    }

    /**
     * Extracts the TDB file in bin and returns the filepath
     */
    export async function extractTdb() {
        const search = ()=> wfs.readDir(ipaths.bin.get(),false,'files')
            .filter(x=>x.endsWith('.sql'));
        const search1 = search();
        if(search1.length==1) {
            return search1[0];
        }

        if(search1.length>1) {
            throw new Error(
                  `Multiple SQL files in the bin directory,`
                + ` please remove them manually`);
        }

        if(search1.length==0) {
            throw new Error(`No tdb.sql in the bin directory, please reinstall TSWoW`);
        }

        return search1[0];
    }

    /**
     * Rebuilds a database from an sql file
     * @param con
     * @param sqlFilePath
     */
    export async function rebuildDatabase(
          con: Connection
        , sqlFilePath: string)
        {
        term.log('mysql',`Rebuilding database ${con.name()}`);
        await con.clean();

        const mysqlCommand = mysql.hasOwnProcess() ?
            `"${mysqlClientExe()}"` :
                NodeConfig.MySQLExecutable != '' ?
            `"${NodeConfig.MySQLExecutable}"`:
                `mysql`;

        await new Promise<void>((res, rej) => {
            child_process.exec(
                  `${mysqlCommand}`
                + ` -u ${con.cfg.user}`
                + ` --default-character-set=utf8`
                + (con.cfg.password.length > 0
                    ? ` -p${con.cfg.password}`
                    : '')
                + ` --port ${con.cfg.port}`
                + ` --host ${con.cfg.host}`
                + ` ${con.name()} < ${sqlFilePath}`
                , { maxBuffer: 512 * 1024 * 1024 }
                , (err) => err ? rej(err) : res());
        });
        term.success('mysql',`Rebuilt database ${con.name()}`);
    }

    async function makeUpdate(cons: Connection, node: WDirectory) {
        let files: string[] = []
        let total = 0
        node.iterate('FLAT','FILES','FULL',node=>{
            if(!node.endsWith('.sql')) return;
            files.push(node.get())
        })

        for(const file of files.sort()) {
            const bn = path.basename(file);
            const applied = await cons.query(
                `SELECT * from \`updates\` WHERE \`name\` = "${bn}";`
            )
            if(applied.length === 0) {
                term.log('mysql',`Applying SQL update ${bn}`)
                ++total;
                await cons.query(
                        `START TRANSACTION;`
                    + `${wfs.read(file)}`
                    + `INSERT INTO updates (name,hash,speed) VALUES ("${bn}","tswow",0);`
                    + `COMMIT;`
                )
            }
        }
        return total;
    }

    export async function applySQLFiles(
          cons: Connection
        , type: 'world'|'auth'|'characters'
    ) {
        await ensureUpdatesTable(cons)
        let total = await makeUpdate(cons, ipaths.bin.sql.updates.type.pick(type)._335.toDirectory())
        total += await makeUpdate(cons, ipaths.bin.sql.custom.type.pick(type).toDirectory())
        if(total > 0) {
            term.success('mysql',`Applied ${total} updates for ${cons.name()}`)
        }
    }

    export async function disconnect() {
        if(mysqlprocess.isRunning()) {
            mysqlprocess.stop();
        }
    }

    export async function installCharacters(connection: Connection, core: EmulatorCore) {
        // Special hack to get the characters tables in, because some scripts depend on it
        let charRowCount =
            await connection.query('SHOW TABLES; SELECT FOUND_ROWS()');
        if(charRowCount[1][0]['FOUND_ROWS()']===0) {
            term.log('mysql',
                 `No character tables found for ${connection.cfg.database},`
               + ` creating them...`);
            switch(core) {
                case 'trinitycore':
                    await connection.query(ipaths.bin.sql.characters_create_sql.readString());
                    break;
            }
        }

        switch(core) {
            case 'trinitycore':
                await applySQLFiles(connection,'characters');
                break;
        }
    }

    export async function installAuth(connection: Connection) {
        let authRowCount =
            await connection.query('SHOW TABLES; SELECT FOUND_ROWS()');
        if(authRowCount[1][0]['FOUND_ROWS()']===0) {
            term.log('mysql',
              `No auth tables found for ${connection.cfg.database},`
            + ` creating them...`);

            await connection.query(wfs.read(ipaths.bin.sql.auth_create_sql.get()));
        }
        await applySQLFiles(connection,'auth');
    }

    export async function initialize() {
        term.debug('mysql', `Initializing MySQL`)
        if(hasOwnProcess()) {
            await startProcess();

            const mysqlC = commands.addCommand('mysql');

            mysqlC.addCommand(
                  'stop'
                , ''
                , 'Stops the MySQL process and disconnects all connections'
                , async() => {

                await disconnect();
            });

            mysqlC.addCommand(
                  'start'
                , ''
                , 'Starts/Restarts the MySQL process and all connections'
                , async() => {

                await start();
            });

            mysqlC.addCommand(
                  'log'
                , 'true|false?'
                , 'Shows or hides the MySQL log'
                , async(args) => {

                showProcessOutput(args[0]==='true');
            });
        }
    }
}
