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
import { DBCRow } from './DBCRow';
import { Settings } from '../Settings';
import { inMemory } from '../query/Query';
import { Table } from '../table/Table';
import * as path from 'path';
import * as fs from 'fs';
import { DBCBuffer } from './DBCBuffer';

export type AnyFile = DBCFile<any, any, any>;

export type DBCRowCreator<C, Q, R extends DBCRow<C, Q>> = (table: DBCFile<C, Q, R>, buffer: DBCBuffer, offset: number) => R;

/**
 * Represents an entire DBC file loaded in memory, with all rows fully loaded.
 */
export class DBCFile<C, Q, R extends DBCRow<C, Q>> extends Table<C, Q, R> {
    private loaded = false;
    protected buffer: DBCBuffer;
    protected rowMaker: DBCRowCreator<C, Q, R>;

    constructor(name: string, rowMaker: DBCRowCreator<C, Q, R>) {
        super(name);
        this.rowMaker = rowMaker;
        this.buffer = new DBCBuffer();
    }

    static getBuffer(file: DBCFile<any, any, any>) {
        return file.buffer;
    }

    static createRow(file: DBCFile<any, any, any>, offset: number) {
        return file.rowMaker(file, file.buffer, offset);
    }

    get rowCount() {
        this.load();
        return this.buffer.rowCount;
    }

    isLoaded() {
        return this.loaded;
    }

    write(filePath: string) {
        if (!this.loaded) {
            this.load();
        }
        fs.writeFileSync(filePath, this.buffer.write());
    }

    private defaultPath() {
        return path.join(Settings.DBC_SOURCE, this.name + '.dbc');
    }

    first(): R {
        return this.getRow(0);
    }

    read(dbcpath: string = this.defaultPath()) {
        this.loaded = false;
        this.load(dbcpath);
    }

    private load(filePath: string = this.defaultPath()) {
        if (!this.loaded) {
            this.buffer.read(filePath);
            this.loaded = true;
        }
    }

    protected makeRow(index: number) {
        this.load();
        return this.rowMaker(this, this.buffer, index);
    }

    highest(callback: (row: R) => number) {
        return this.filter({} as any)
            .sort((a, b) => callback(b) > callback(a) ? 1 : -1)[0];
    }

    lowest(callback: (row: R) => number) {
        return this.filter({} as any)
            .sort((a, b) => callback(a) > callback(b) ? 1 : -1)[0];
    }

    protected fastSearch(value: number): R {
        let low = 0;
        let high = this.rowCount - 1;
        const row = this.getRow(0);

        DBCRow.setIndex(row, this.buffer.baseRowCount - 1);
        if (this.buffer.readuint(DBCRow.getOffset(row)) < value) {
            for (let i = this.buffer.baseRowCount; i < this.buffer.rowCount; ++i) {
                DBCRow.setIndex(row, i);
                if (this.buffer.readuint(DBCRow.getOffset(row)) === value) {
                    return row;
                }
            }

            // @ts-ignore
            return undefined;
        }

        DBCRow.setIndex(row, 0);

        while (true) {
            if (high < low) {
                // @ts-ignore
                return undefined;
            }

            const mid = Math.floor(low + (high - low) / 2);
            DBCRow.setIndex(row, mid);
            const cur = this.buffer.readuint(DBCRow.getOffset(row));

            if (cur < value) {
                low = mid + 1;
            } else if (cur > value) {
                high = mid - 1;
            } else {
                return row;
            }
        }
    }

    getName() {
        return this.name;
    }

    getRow(index: number) {
        this.load();
        return this.rowMaker(this, this.buffer, index);
    }

    filter(predicate: Q): R[] {
        this.load();
        const arr: R[] = [];
        const row = this.getRow(0);
        for (let i = 0; i < this.buffer.rowCount; ++i) {
            DBCRow.setIndex(row, i);
            if (inMemory(predicate, row)) {
                arr.push(this.getRow(i));
            }
        }

        return arr;
    }
}
