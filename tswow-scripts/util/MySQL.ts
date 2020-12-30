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
import * as mysql_lib from 'mysql';
import { cfg, DatabaseType, DatabaseSettings } from './Config';
import { wsys } from './System';
import { term } from './Terminal';
import { commands } from '../runtime/Commands';
import { isWindows } from './Platform';
import { Process } from './Process';
import { TrinityCore } from '../runtime/TrinityCore';
import { mpath, wfs, wfsa } from './FileSystem';
import { Timer } from './Timer';
import { Wrap } from './Wrap';
import { ipaths } from './Paths';
import { extract } from './7zip';
import { FileChanges } from './FileChanges';

/**
 * Helper function to make a mysql query and return a promise.
 * @param con The connection to query on
 * @param query The query
 */
function promiseQuery(con: mysql_lib.Connection, query: string) {
    return new Promise<any>((res, rej) => {
        con.query(query, (err, data) => {
            return err ? rej(err) : res(data);
        });
    });
}

/**
 * Helper function to connect to a mysql server and return a promise.
 * @param con The connection to connect
 */
function promiseConnect(con: Connection) {
    if (con.isConnected) {
        return;
    }
    return new Promise<void>((res, rej) =>
        con.con.connect((err) => err ? rej(err) : (con.isConnected = true) && res())
    );
}

/**
 * Represents a single connection to a mysql server.
 *
 * Typically, tswow will manage 3 Connection instances for the three TrinityCore database types `world`, `character` and `auth`.
 */
class Connection {
    con: mysql_lib.Connection;
    cfg: DatabaseSettings;
    status?: Promise<void>;
    isConnected = false;
    type: DatabaseType;

    /**
     * Creates a new connection for a specific database type.
     * @param type
     */
    constructor(type: DatabaseType) {
        this.cfg = cfg.databaseSettings(type);
        this.con = mysql_lib.createConnection(this.config());
        this.type = type;
    }

    private config() {
        return Object.assign(this.cfg, {multipleStatements: true});
    }

    /**
     * Return the database name configured for this connection.
     */
    name() {
        return this.cfg.name;
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
        return promiseQuery(this.con, query);
    }

    /**
     * Check if the database of this connection contains a specific table.
     * @param tableName Name of the table to check for
     */
    async hasTable(tableName: string) {
        return (await this.query(`SELECT * FROM information_schema.tables WHERE table_schema='${this.cfg.name}' AND TABLE_NAME = '${tableName}';`)).length > 0;
    }

    disconnect() {
        if (!this.isConnected) {
            return;
        }
        return new Promise<void>((res, rej) => {
            if (this.con.state !== 'disconnected') {
                this.con.end((err) => {
                    if (err) {
                        rej(err);
                    } else {
                        res();
                    }
                });
            }
            this.status = undefined;
            this.isConnected = false;
        });
    }

    /**
     * Initiates this connection to the database server. Creates the database if it does not yet exist.
     *
     * @returns Promise that resolves when the connection has been established.
     */
    connect() {
        if (this.status !== undefined) { return this.status; }
        this.con = mysql_lib.createConnection(this.config());
        return this.status = new Promise<void>(async (res, rej) => {
            try {
                await promiseConnect(this);
                await promiseQuery(this.con, `CREATE DATABASE IF NOT EXISTS \`${this.cfg.name}\`;`);
                await promiseQuery(this.con, `USE \`${this.cfg.name}\`;`);
            } catch (error) {
                this.status = undefined;
                rej(error);
            }
            res();
        });
    }
}

/**
 * Contains functions and fields for managing the mysql server that tswow handles.
 */
export namespace mysql {
    export const world_src = new Connection('world_source');
    /** Connection to the TrinityCore world server */
    export const world = new Connection('world');
    /** Connection to the TrinityCore auth server */
    export const auth = new Connection('auth');
    /** Connection to the TrinityCore characters server */
    export const characters = new Connection('characters');
    /** Connections to all the TrinityCore databases */
    export const all_live = [world, auth, characters];
    /** Connections to all handled databases (TrinityCore+world_source) */
    export const all = [world_src, world, auth, characters];

    const mysqlprocess: Process = new Process();

    export function showMysqlLog(show: boolean) {
        mysqlprocess.showOutput(show);
    }

    /**
     * Returns the database for a specific type.
     * @param type Database type to return
     * @throws if `type` is not a valid database type ('world'|'auth'|'characters')
     * @returns Connection for database specified by `type`
     */
    function getDatabase(type: string) {
        switch (type) {
            case 'world_source':
                return world_src;
            case 'world':
                return world;
            case 'auth':
                return auth;
            case 'characters':
                return characters;
            default:
                throw new Error(`Incorrect database type: ${type}`);
        }
    }

    export async function disconnect() {
        await Promise.all(all.map(async x => await x.disconnect()));

        if (TrinityCore.isStarted()) {
            await TrinityCore.stop();
        }

        if (isWindows() && mysqlprocess.isRunning()) {
            await mysqlprocess.stop();
        }
    }

    export async function loadWorldBackup(): Promise<Wrap<Promise<void>>> {
        const time = Timer.start();
        await disconnect();
        wfs.move(ipaths.worldPlain1,
            mpath(ipaths.mysqlData, cfg.databaseSettings('world').name));
        await start(true);
        term.success(`Loaded MySQL backup in ${time.timeSec(2)}s`);
        return new Wrap(wfsa.copy(ipaths.worldPlain2, ipaths.worldPlain1));
    }

    export async function start(skipBackup = false) {
        term.log('Starting mysql...');
        if (isWindows()) {
            if (!wfs.exists(ipaths.mysqlData)) {
                wsys.exec(`${ipaths.mysqldExe} --initialize --log_syslog=0 --datadir=${
                    wfs.absPath(ipaths.mysqlData)}`);
            }
        }

        cfg.databaseSettings('world').port;

        const startup_file = './bin/mysql_startup.txt';
        wfs.write(startup_file, `ALTER USER 'root'@'localhost' IDENTIFIED BY '';`);
        const oldAcStatus = TrinityCore.isStarted();
        await disconnect();
        if (isWindows()) {
            mysqlprocess.start(ipaths.mysqldExe,
                [
                    // assume that if we start mysql, database_all is being used.
                    `--port=${cfg.databaseSettings('world').port}`,
                    '--log_syslog=0',
                    '--console',
                    '--wait-timeout=2147483',
                    `--init-file=${wfs.absPath(startup_file)}`,
                    `--datadir=${wfs.absPath(ipaths.mysqlData)}`
                ]);
            mysqlprocess.showOutput(process.argv.includes('logmysql'));
            await mysqlprocess.waitFor('Execution of init_file*ended.', true);
            term.success('Mysql process started');
        }

        await connectDatabases();

        if (!skipBackup && (!wfs.exists(ipaths.worldPlain1) || !wfs.exists(ipaths.worldPlain2))) {
            term.log(`Creating world_plain...`);
            await disconnect();
            wfs.copy(mpath(ipaths.mysqlData, cfg.databaseSettings('world').name),
                ipaths.worldPlain1
            );
            wfs.copy(mpath(ipaths.mysqlData, cfg.databaseSettings('world').name),
                ipaths.worldPlain2
            );
            await start(true);
        }

        // Restart TrinityCore if it was started before this restart
        if (oldAcStatus) {
            TrinityCore.start();
        }
    }

    async function install_world(w: Connection, sqlPath: string) {
        const port = cfg.databaseSettings('world').port;
        term.log(`Beginning to rebuild ${w.name()}`);
        await w.status;
        await promiseConnect(w);
        await promiseQuery(w.con, `DROP DATABASE IF EXISTS \`${w.name()}\`;`);
        await w.disconnect();
        await w.connect();
        const sqlpath = isWindows() ? `"${ipaths.mysqlExe}"` : `sudo mysql`;
        await wsys.execAsync(`${sqlpath} --port ${port} -u root ${w.name()} < ${sqlPath}`);
        term.success(`Rebuilt database ${w.name()}`);
    }

    /**
     * Check if we need to build any databases to start TrinityCore, and registers mysql commands to tswow.
     */
    async function connectDatabases() {
        // Connect to all databases
        await Promise.all(all.map(x => x.connect()));

        // Rebuild world/world_src
        let shouldBuild = FileChanges.isChanged(ipaths.tdb, 'tdb');
        if (!(await world.hasTable('access_requirement'))) {
            shouldBuild = true;
        }

        if (!(await world_src.hasTable('access_requirement'))) {
            shouldBuild = true;
        }

        if (shouldBuild) {
            function clearSql() {
                wfs.readDir(ipaths.bin, false, 'files')
                    .filter(x => x.endsWith('sql'))
                    .forEach(x => wfs.remove(x));
            }
            clearSql();
            if (!wfs.exists(ipaths.tdb)) {
                throw new Error(`Missing TDB: ${ipaths.tdb}, please download a TDB, rename it "tdb.7z" and place it in "bin".`);
            }
            extract(ipaths.tdb);
            const sqls = wfs.readDir(ipaths.bin, false, 'files')
                .filter(x => x.endsWith('.sql'));

            if (sqls.length > 1) {
                throw new Error(`Failed to install TDB: Multiple SQL files lying in `);
            }

            const sql = sqls[0];
            await Promise.all([install_world(world, sql), install_world(world_src, sql)]);
            clearSql();
            FileChanges.tagChange(ipaths.tdb, 'tdb');
        }

        // Special hack to get the characters tables in, because some scripts depend on it
        let charRowCount = await characters.query('SHOW TABLES; SELECT FOUND_ROWS()');
        if(charRowCount[1][0]['FOUND_ROWS()']===0) {
            await characters.query(wfs.read(ipaths.createCharactersSql));
        }

        let authRowCount = await auth.query('SHOW TABLES; SELECT FOUND_ROWS()');
        if(authRowCount[1][0]['FOUND_ROWS()']===0) {
            await auth.query(wfs.read(ipaths.createAuthSql));
        }

        for(const db of ['world','auth','characters']) {
            await wfsa.iterate(mpath(ipaths.startupSql,db), async (file) => {
                if (file.endsWith('.sql')) {
                    const contents = wfs.read(file);
                    try {
                        await getDatabase(db).query(contents);
                        if(db==='world') {
                            await world_src.query(contents);
                        }
                    } catch(err) {
                        term.error(`Error on file ${file}`)
                        term.error(err.message);
                    }
                }
            });
        }
    }

    export async function initialize() {
        await start();
        const mysqlC = commands.addCommand('mysql');

        mysqlC.addCommand('query', 'world|auth|characters sql', 'Queries a database', async(args: string[]) => {
            if (args.length < 2) {
                throw new Error('Incorrect syntax: mysql query world|auth|characters sql"');
            }
            const db = getDatabase(args[0]);
            const sql = args.slice(1).join(' ');
            term.log(JSON.stringify(await db.query(sql)));
        });

        mysqlC.addCommand('end', '', 'Stops the MySQL process and disconnects all connections', async() => {
            await disconnect();
        });

        mysqlC.addCommand('start', '', 'Starts/Restarts the MySQL process and all connections', async() => {
            await start();
        });

        mysqlC.addCommand('log','true|false?','Shows or hides the MySQL log', async(args) => {
            showMysqlLog(args[0]==='true');
        });

        term.success('MySQL initialized');
    }
}
