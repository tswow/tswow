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
import { inMemoryRelation, Relation, relationToSql } from './Relations';

interface Query {[key: string]: Relation<any>; }

class AnyQuery {
    values: Query[];
    isAnyQuery = true;

    constructor(values: Query[]) {
        this.values = values;
    }
}

class AllQuery {
    values: Query[];
    isAllQuery = true;
    constructor(values: Query[]) {
        this.values = values;
    }
}

function isAnyQuery(query: any): query is AnyQuery {
    return (query as AnyQuery).isAnyQuery;
}

function isAllQuery(query: any): query is AllQuery {
    return (query as AllQuery).isAllQuery;
}

export function qany(...query: Query[]) {
    return new AnyQuery(query);
}

export function qall(...query: Query[]) {
    return new AllQuery(query);
}

function queryToSqlRecurse(query: Query|AnyQuery|AllQuery): string {
    if (isAnyQuery(query)) {
        return `${query.values.map(x => `(${queryToSqlRecurse(x)})`).join(' OR ')}`;
    } else if (isAllQuery(query)) {
        return `${query.values.map(x => `(${queryToSqlRecurse(x)})`).join(' AND ')}`;
    } else {
        return `${Object.keys(query).map(x => `${relationToSql(`\`${x}\``, query[x])}`).join(' AND ')}`;
    }
}

export function queryToSql(query: Query|AnyQuery|AllQuery, addSemicolon: boolean = true): string {
    return `${queryToSqlRecurse(query)}${addSemicolon ? ';' : ''}`;
}

export function inMemory(query: Query|AnyQuery|AllQuery, obj: any): boolean {
    if (obj === undefined || !(typeof(obj) === 'object')) {
        throw new Error('Can\'t make in-memory comparison with null or non-object');
    }

    if (isAnyQuery(query)) {
        for (const subquery of query.values) {
            if (inMemory(subquery, obj)) { return true; }
        }
        return false;
    } else if (isAllQuery(query)) {
        for (const subquery of query.values) {
            if (!inMemory(subquery, obj)) { return false; }
        }
        return true;
    } else {
        for (const key in query) {
            if (query[key] === undefined) {
                throw new Error(`Internal error: key in query pointing at undefined value: ${key}`);
            } else {
                const qv = query[key];
                let ov = obj[key];
                if (ov && typeof(ov) === 'object' && ov.isCell) {
                    ov = ov.get();
                }

                if (ov.objectify) {
                    ov = ov.objectify();
                }

                if (qv === undefined) { if (ov !== undefined) { return false; } else { continue; } }
                if (qv === null) { if (ov !== null) { return false; } else { continue; } }
                if (!inMemoryRelation(ov, qv)) { return false; }
            }
        }
            return true;
    }
}
