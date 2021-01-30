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
import * as mysql from 'mysql';
import * as fs from 'fs';
import { SqlRow } from './SQLRow';
import { getDatabase, getDatabaseName, Settings } from '../Settings';
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
        connection.async = mysql.createPool(connection.settings);
        connection.sync = mysql.createPool(connection.settings);
        connection.syncQuery = deasync(connection.sync.query
            .bind(connection.sync));
    }

    protected settings: mysql.ConnectionConfig;
    protected async: mysql.Pool | undefined;
    protected sync: mysql.Pool | undefined;
    protected syncQuery: any;

    constructor(obj: mysql.ConnectionConfig) {
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
            return Promise.all(priority.map((x)=>new Promise((res,rej)=>{
                if(this.async===undefined) {
                    return rej(`Tried to apply while async adapter was disconnected`);
                }

                this.async.query(x,(err)=>{
                    if(err){
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
        database: getDatabaseName(dbType),
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
    static characters = new Connection(getDefaultSettings('characters'));
    static world_dst = new Connection(getDefaultSettings('world'));
    static world_src = new Connection({
        host: getDatabase('source').host,
        user: getDatabase('source').user,
        password: getDatabase('source').password,
        port: getDatabase('source').port,
        database: getDatabaseName('world')+'_source'
    });

    protected static endConnection() {
        Connection.end(this.auth);
        Connection.end(this.characters);
        Connection.end(this.world_src);
        Connection.end(this.world_dst);
        this.additional.forEach(x=>Connection.end(x));
        this.additional = [];
    }

    static connect() {
        this.endConnection();
        [this.auth,this.characters,this.world_dst,this.world_src]
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
        return this.additional.concat([this.world_src,this.world_dst,this.auth,this.characters]);
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
        try {
            await this.write(writeDb, writeFile);
        } catch (err) {
            console.error(`Error on write: ${err.message} ${err.stack}`);
        }

        this.allDbs().filter(x=>x!==undefined).map(x=>Connection.end(x));
    }
}
