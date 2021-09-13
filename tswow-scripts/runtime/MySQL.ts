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
import { wsys } from '../util/System';
import { term } from '../util/Terminal';
import { commands } from './Commands';
import { isWindows } from '../util/Platform';
import { Process } from '../util/Process';
import { wfs, wfsa } from '../util/FileSystem';
import { ipaths } from '../util/Paths';
import { databaseSettings, DatabaseSettings, DatabaseType } from '../util/Yaml';
import { NodeConfig } from './NodeConfig';
import { start } from 'repl';

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
        this.connect();
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
        return (await new Promise<any>((res,rej)=>{
            (this.con as mysql_lib.Pool).query(query,(err,value)=>{
                if(err) {
                    rej(err);
                } else {
                    res(value);
                }
            });
        }));
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
            con.query(`DROP DATABASE IF EXISTS ${this.config().database};`,(err)=>{
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
    const mysqlprocess: Process = new Process();

    export function dump(connection: Connection, outputFile: string) {
        wsys.exec(
            `"${ipaths.mysqlDumpExe}"`
            + ` --port ${connection.cfg.port}`
            + ` -u root ${connection.cfg.database}`
            + ` > ${wfs.absPath(outputFile)}`)
    }

    export async function startProcess() {
        term.log('Starting mysql...');
        if (!wfs.exists(ipaths.databaseDir)) {
            term.log("No mysql database found, creating it...");
            wsys.exec(
                  `${ipaths.mysqldExe}`
                + ` --initialize`
                + ` --log_syslog=0`
                + ` --datadir=${wfs.absPath(ipaths.databaseDir)}`);
            term.success('Created mysql database');
        }

        const user = databaseSettings('world').user;
        const pass = databaseSettings('world').password;

        wfs.write(ipaths.mysqlStartup,
              `CREATE USER IF NOT EXISTS`
            + ` '${user}'@'localhost'`
            + ` IDENTIFIED BY '${pass}';`
            + `\nGRANT ALL ON *.* TO '${user}'@'localhost';`
            + `\nALTER USER '${user}'@'localhost' IDENTIFIED BY '${pass}';`);
        await disconnect();
        mysqlprocess.start(ipaths.mysqldExe,
            [
                // assume that if we start mysql, database_all is being used.
                `--port=${databaseSettings('world').port}`,
                '--log_syslog=0',
                '--console',
                '--wait-timeout=2147483',
                `--init-file=${wfs.absPath(ipaths.mysqlStartup)}`,
                `--datadir=${wfs.absPath(ipaths.databaseDir)}`
            ]);
        mysqlprocess.showOutput(process.argv.includes('logmysql'));
        let val = await Promise.race([
            mysqlprocess.waitFor('Execution of init_file*ended.', true),
            mysqlprocess.waitFor('Can\'t start server', true),
        ]);
        if(val.includes('Can\'t start server')) {
            if(val.includes('Bind on TCP/IP')) {
                term.error(
                      `Failed to start MySQL: You already have an instance of MySQL running on this port.\n`
                    + `Try changing your port setting under database_all in node.yaml\n`
                    + `or shut down your existing MySQL instance.\n`
                    )
            } else {
                term.error(`Failed to start MySQL with the following error (see log ): ${val}`)
            }
            // easier for newbies to not get the spam output
            process.exit(0);
        }
        wfs.remove(ipaths.mysqlStartup);
        term.success('Mysql process started');
    }

    /**
     * Returns whether this instance of TSWoW should manage its own MySQL process.
     */
    export function hasOwnProcess() {
        return isWindows()
            && (process.argv.includes('own-mysql')
            || NodeConfig.mysql_executable === undefined);
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
            if(!await con.hasTable('access_requirement')) {
                return false;
            }
        }
        return true;
    }

    /**
     * Extracts the TDB file in bin and returns the filepath
     */
    export async function extractTdb() {
        const search = ()=> wfs.readDir(ipaths.bin,false,'files')
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

        term.log(`Beginning to rebuild ${con.name()}`);
        await con.clean();

        const mysqlCommand = mysql.hasOwnProcess() ?
            `"${ipaths.mysqlExe}"` :
                NodeConfig.mysql_executable != undefined ?
            `"${NodeConfig.mysql_executable}"`:
                `sudo mysql`;

        await wsys.execAsync(
              `${mysqlCommand}`
            + ` -u ${con.cfg.user}`
            + ` --default-character-set=utf8`
            + (con.cfg.password.length > 0
                ? ` -p${con.cfg.password}`
                : '')
            + ` --port ${con.cfg.port}`
            + ` ${con.name()} < ${sqlFilePath}`);
        term.success(`Rebuilt database ${con.name()}`);
    }

    export async function applySQLFiles(
          cons: Connection
        , type: 'world'|'auth'|'characters') {

        // Apply 'startup' files (TODO: these should be made into updates)
        await wfsa.iterate(ipaths.startupSqlDir(type), async (file) => {
            if (file.endsWith('.sql')) {
                const contents = wfs.read(file);
                try {
                    await cons.query(contents);
                } catch(err) {
                    term.error(`SQL error from file ${file}`);
                    term.error(err.message);
                    // TODO: what do here?
                }
            }
        });

        let files : string[] = [];
        wfs.iterate(ipaths.sqlUpdateDir(type),(fp)=>{
            if(!fp.endsWith('.sql')) return;
            files.push(fp);
        });

        wfs.iterate(ipaths.sqlCustomUpdateDir(type),(fp)=>{
            if(!fp.endsWith('.sql')) return;
            files.push(fp);
        })

        files.sort();

        for(const filepath of files) {
            const filename = wfs.basename(filepath);
            const applied = await cons.query(
                'SELECT * from `updates` WHERE `name` = "'+filename+'"');
            if(applied.length===0) {
                term.log(`Applying sql update ${filepath}`)
                await cons.query(wfs.read(filepath));
                await cons.query(
                      `INSERT INTO updates (name,hash,speed)`
                    + ` VALUES ("${filename}", "tswow",0);`)
            }
        }
    }

    export async function disconnect() {
        if(mysqlprocess.isRunning()) {
            mysqlprocess.stop();
        }
    }

    export async function installCharacters(connection: Connection) {
        // Special hack to get the characters tables in, because some scripts depend on it
        let charRowCount =
            await connection.query('SHOW TABLES; SELECT FOUND_ROWS()');
        if(charRowCount[1][0]['FOUND_ROWS()']===0) {
            term.log(
                 `No character tables found for ${connection.cfg.database},`
               + ` creating them...`);
            await connection.query(wfs.read(ipaths.createCharactersSql));
        }
        await applySQLFiles(connection,'characters');
    }

    export async function installAuth(connection: Connection) {
        let authRowCount =
            await connection.query('SHOW TABLES; SELECT FOUND_ROWS()');
        if(authRowCount[1][0]['FOUND_ROWS()']===0) {
            term.log(
              `No auth tables found for ${connection.cfg.database},`
            + ` creating them...`);

            await connection.query(wfs.read(ipaths.createAuthSql));
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
