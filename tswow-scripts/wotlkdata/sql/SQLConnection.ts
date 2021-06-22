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
import * as mysql from 'mysql2';
import * as fs from 'fs';
import { SqlRow } from './SQLRow';
import { getDatabase, Settings } from '../Settings';
import { SqlTable } from './SQLTable';
import { queryToSql } from '../query/Query';
import { SQLTables } from './SQLFiles';
import deasync = require('deasync');

export class Connection {
    static end(connection: Connection) {
        if(connection.sync !== undefined)  {
            connection.sync.end();
            connection.sync = undefined;
        }

        if(connection.async !== undefined) {
            connection.async.end();
            connection.async = undefined;
        }
    }

    static connect(connection: Connection) {
        this.end(connection);
        if(Settings.USE_POOLING) {
            connection.async = mysql.createPool(connection.settings);
            connection.sync = mysql.createPool(connection.settings);
        } else {
            connection.async = mysql.createConnection(connection.settings);
            connection.sync = mysql.createConnection(connection.settings);
            connection.async.connect((err)=>{
                if(!err) return;
                console.error(`Failed to connect with settings`,connection.settings,err)
                process.exit(-1);
            });
            connection.sync.connect((err)=>{
                if(!err) return;
                console.error(`Failed to connect with settings`,connection.settings,err)
                process.exit(-1);
            });
        }

        connection.syncQuery = deasync(connection.sync.query
            .bind(connection.sync));
    }

    protected settings: any;
    protected async: mysql.Pool | mysql.Connection | undefined;
    protected sync: mysql.Pool | mysql.Connection | undefined;
    protected syncQuery: any;

    constructor(obj: any) {
        this.settings = obj;
    }

    protected early: string[] = [];
    protected normal: string[] = [];
    protected late: string[] = [];

    read(query: string) {
        if(this.sync===undefined) {
            throw new Error(`Tried to read from a disconnected adapter`);
        }
        return this.syncQuery(query);
    }

    write(query: string) {
        this.normal.push(query);
    }

    writeEarly(query: string) {
        this.early.push(query);
    }

    writeLate(query: string) {
        this.late.push(query);
    }

    async apply() {
        const doPriority = (priority: string[]) => {
            return Promise.all(priority.map((x)=>new Promise<void>((res,rej)=>{
                if(this.async===undefined) {
                    return rej(`Tried to apply while async adapter was disconnected`);
                }

                this.async.query(x,(err)=>{
                        if(err){
                            err.message = `(For SQL "${x}")\n`+err.message;
                            return rej(err);
                    } else {
                        return res();
                }})
            })))
        }

        await doPriority(this.early);
        await doPriority(this.normal);
        await doPriority(this.late);
        this.early = [];
        this.normal = [];
        this.late = [];
    }
}

    function getDefaultSettings(dbType: string) {
    return {
        database: getDatabase(dbType).database,
        host: getDatabase(dbType).host,
        user: getDatabase(dbType).user,
        password: getDatabase(dbType).password,
        port: getDatabase(dbType).port
    }
}

/**
 * Represents the global SQL connection.
 *
 * @motivation Since we already decided not to allow parallell patching, this might
 * just as well be static so we avoid having to pass around a script context to all
 * data structures. Can always change if we want to support paralellism later.
 */
export class SqlConnection {
    static additional: Connection[] = [];

    static auth = new Connection(getDefaultSettings('auth'));
    //static characters = new Connection(getDefaultSettings('characters'));
    static world_dst = new Connection(getDefaultSettings('world'));
    static world_src = new Connection(getDefaultSettings('world_source'))

    protected static endConnection() {
        Connection.end(this.auth);
        //Connection.end(this.characters);
        Connection.end(this.world_src);
        Connection.end(this.world_dst);
        this.additional.forEach(x=>Connection.end(x));
        this.additional = [];
    }

    static connect() {
        this.endConnection();
        [this.auth,this.world_dst,this.world_src]
            .forEach((x)=>Connection.connect(x));
    }

    static getRows<C, Q, T extends SqlRow<C, Q>>(table: SqlTable<C, Q, T>, where: Q, first: boolean) {
        const whereSql = queryToSql(where, false);
        const sqlStr = `SELECT * FROM ${table.name} ${whereSql.length > 1 ? ` WHERE ${whereSql}` : ''} ${first ? 'LIMIT 1' : ''};`;
        const res = SqlConnection.querySource(sqlStr);
        const rowsOut: T[] = [];
        for (const row of res) {
            const jsrow = SqlTable.createRow(table, row);
            rowsOut.push(jsrow);
        }
        return rowsOut;
    }

    static querySource(sql: string): any {
        return this.world_src.read(sql);
    }

    static allDbs() {
        return this.additional.concat([this.world_src,this.world_dst,this.auth]);
    }

    static async write(writeDb: boolean = true, writeFile: boolean = true): Promise<any> {
        let sqlfile = ``;

        // @TODO fix writeToFile. Disabled for now.
        if (writeFile && false) {
            sqlfile = SQLTables
                // @ts-ignore
                .reduce((file, table) => table.writeToFile(file), sqlfile);
            fs.writeFileSync(Settings.SQL_FILE_PATH, sqlfile);
        }

        if (writeDb) {
            SQLTables.map(x=>SqlTable.writeSQL(x));
            await Promise.all(this.allDbs().map(x=>x.apply()));
        }
    }

    static async finish(writeDb: boolean = true, writeFile: boolean = true): Promise<any> {
        await this.write(writeDb, writeFile);
        this.allDbs().filter(x=>x!==undefined).map(x=>Connection.end(x));
    }
}
