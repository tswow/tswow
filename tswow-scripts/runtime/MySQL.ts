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
        return Object.assign({}, this.cfg, {multipleStatements: true});
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

        const creator = mysql_lib.createConnection(this.configWithoutDb());

        return this.status = new Promise<void>(async (res,rej)=>{
            creator.query(
                  `CREATE DATABASE IF NOT EXISTS \`${this.cfg.database}\`;`
                , (createErr)=>{
                    if(createErr) {
                        return rej(createErr);
                    }
                    creator.end((endErr)=>{
                        if(endErr) {
                            return rej(endErr);
                        }
                        this.con = mysql_lib.createPool(this.config());
                        this.status = undefined;
                        res();
                    });
            });
        });
    }

    async disconnect() {
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

    export function dump(connection: Connection, outputFile: string) {
        wsys.exec(
            `"${ipaths.bin.mysql.mysqldump_exe.get()}"`
            + ` --port ${connection.cfg.port}`
            + ` -u root ${connection.cfg.database}`
            + ` > ${wfs.absPath(outputFile)}`)
    }

    export async function startProcess() {
        term.log('mysql','Starting mysql...');
        ipaths.coredata.mkdir()
        if(!ipaths.coredata.database.exists()) {
            term.log('mysql',"No mysql database found, creating it...");
            try {
                wsys.exec(
                    `${ipaths.bin.mysql.mysqld_exe.get()}`
                    + ` --initialize`
                    + ` --log_syslog=0`
                    + ` --datadir=${ipaths.coredata.database.abs()}`);
            } catch(error) {
                term.error('mysql',`Failed to start MySQL: ${error.message}`)
                term.error('mysql',`Make sure you installed all vcredist versions needed`)
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

        wfs.write(ipaths.bin.mysql_startup.get(),
              `CREATE USER IF NOT EXISTS`
            + ` '${user}'@'localhost'`
            + ` IDENTIFIED BY '${pass}';`
            + `\nGRANT ALL ON *.* TO '${user}'@'localhost';`
            + `\nALTER USER '${user}'@'localhost' IDENTIFIED BY '${pass}';`);
        await disconnect();
        mysqlprocess.start(ipaths.bin.mysql.mysqld_exe.get(),
            [
                `--port=${NodeConfig.DatabaseHostedPort}`,
                '--log_syslog=0',
                '--console',
                '--wait-timeout=2147483',
                `--init-file=${wfs.absPath(ipaths.bin.mysql_startup.get())}`,
                `--datadir=${wfs.absPath(ipaths.coredata.database.get())}`
            ]);
        mysqlprocess.showOutput(process.argv.includes('logmysql'));
        let val = await Promise.race([
            mysqlprocess.waitForMessage('Execution of init_file*ended.', true),
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
     */
    export function hasOwnProcess() {
        return isWindows()
            && NodeConfig.DatabaseHostedPort !== 0;
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
            `"${ipaths.bin.mysql.mysql_exe.get()}"` :
                NodeConfig.MySQLExecutable != '' ?
            `"${NodeConfig.MySQLExecutable}"`:
                `mysql`;

        await wsys.execAsync(
              `${mysqlCommand}`
            + ` -u ${con.cfg.user}`
            + ` --default-character-set=utf8`
            + (con.cfg.password.length > 0
                ? ` -p${con.cfg.password}`
                : '')
            + ` --port ${con.cfg.port}`
            + ` ${con.name()} < ${sqlFilePath}`);
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
                case 'azerothcore':
                    await connection.query(ipaths.bin.sql_ac.db_characters.readString());
                    break;
                case 'trinitycore':
                    await connection.query(ipaths.bin.sql.characters_create_sql.readString());
                    break;
            }
        }

        switch(core) {
            case 'trinitycore':
                await applySQLFiles(connection,'characters');
                break;
            case 'azerothcore':
                // TODO: currently does not apply updates, this is wrong of course.
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
