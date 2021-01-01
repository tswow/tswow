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
import { Settings } from '../Settings';
import { SqlTable } from './SQLTable';
import { queryToSql } from '../query/Query';
import { SQLTables } from './SQLFiles';
import deasync = require('deasync');

/**
 * Represents the global SQL connection.
 *
 * @motivation Since we already decided not to allow parallell patching, this might
 * just as well be static so we avoid having to pass around a script context to all
 * data structures. Can always change if we want to support paralellism later.
 */
export class SqlConnection {
    private static sourceConnection: mysql.Connection;
    private static destConnection: mysql.Connection;
    private static sourceQuery: any;

    private static priorityQueries: string[] = [];
    private static normalQueries: string[] = [];

    static addWriteQuery(query: string) {
        this.normalQueries.push(query);
    }

    static addPriorityWriteQuery(query: string) {
        this.priorityQueries.push(query);
    }

    static connect() {
        this.sourceConnection = mysql.createConnection({
            host: Settings.MYSQL_HOST_SOURCE,
            user: Settings.MYSQL_USER_SOURCE,
            password: Settings.MYSQL_PASSWORD_SOURCE,
            database: Settings.MYSQL_DATABASE_SOURCE,
            port: Settings.MYSQL_PORT_SOURCE
        });

        this.sourceQuery = deasync(this.sourceConnection.query
            .bind(this.sourceConnection));

        this.destConnection = mysql.createConnection({
            host: Settings.MYSQL_HOST_DEST,
            user: Settings.MYSQL_USER_DEST,
            password: Settings.MYSQL_PASSWORD_DEST,
            database: Settings.MYSQL_DATABASE_DEST,
            port: Settings.MYSQL_PORT_DEST
        });
        this.destConnection.connect();
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

    static queryDest(sql: string): Promise<any> {
        const promise = new Promise<any>((acc, rej) => {
            this.destConnection.query(sql, (err, res) => {
                if (err) {
                    rej(err);
                } else {
                    acc(res);
                }
            });
        });
        return promise;
    }

    static querySource(sql: string): any {
        return this.sourceQuery(sql);
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
            await Promise.all(this.priorityQueries.map(x=>this.queryDest(x)));
            // @ts-ignore TODO fix writeToDatabase
            await Promise.all(SQLTables.map(x => x.writeToDatabase()));
            await Promise.all(this.normalQueries.map(x=>this.queryDest(x)));
        }
    }

    static async finish(writeDb: boolean = true, writeFile: boolean = true): Promise<any> {
        try {
            await this.write(writeDb, writeFile);
        } catch (err) {
            console.error(`Error on write: ${err.message} ${err.stack}`);
        }
        this.destConnection.end();
        this.sourceConnection.end();
        return;
    }
}
