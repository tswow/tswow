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
import * as fs from 'fs';
import * as path from 'path';
import { inMemory } from '../query/Query';
import { dataset } from '../Settings';
import { Table } from '../table/Table';
import { GetStage } from '../wotlkdata';
import { DBCBuffer } from './DBCBuffer';
import { DBCRow } from './DBCRow';

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

    private checkSort() {
        if(GetStage() !== 'SORT') {
            throw new Error(
                  `Attempting to sort DBC before SORT stage. `
                + `Please register a callback like this to sort:\n\n`
                + `import { sort } from "wotlkdata"\n`
                + `\n`
                + `sort('my-sort-name',()=>{\n`
                + `   // do your sort here\n`
                + `});\n\n`
            )
        }
    }

    binarySort(minVal: number, scorer: (row: R)=>number) {
        this.checkSort();
        const binSearch = (low: number, high: number, x: number): number => {
            if(high<=low) {
                return x > scorer(this.getRow(low)) ? (low+1) : low;
            }
            let mid = Math.floor((low + high) / 2);
            let midval = scorer(this.getRow(mid));
            return x === midval ? mid+1
                : x > midval
                ? binSearch(mid+1,high,x)
                : binSearch(low,mid-1,x)
        }

        let last = minVal;
        for(let i=0;i<this.rowCount;++i) {
            let cur = scorer(this.getRow(i));
            if(cur < last) {
                let j = binSearch(0,i-1,cur);
                this.buffer.move(i,j);
            } else {
                last = cur;
            }
        }
    }

    quickSort(comparator: (row1: R, row2: R)=>number) {
        this.checkSort();
        if(GetStage() !== 'SORT') {
            throw new Error(
                  `Trying to sort before SORT stage:`
                + ` register a callback to the 'sort'`
                + ` function exported from 'wotlkdata'`
            )
        }

        const partition = (left: number, right: number) => {
            let i = left-1;
            for(let j=left;j<right;++j) {
                if(comparator(this.getRow(j),this.getRow(right))<0) {
                    ++i;
                    this.buffer.swap(i,j);
                }
            }
            this.buffer.swap(i+1,right)
            return i+1;
        }

        const quicksort = (left: number, right: number) => {
            if(left < right) {
                let pi = partition(left,right);
                quicksort(left,pi-1);
                quicksort(pi+1,right);
            }
        }
        if(this.rowCount > 1) quicksort(0, this.rowCount-1);
    }

    swap(index1: number, index2: number) {
        this.checkSort();
        this.buffer.swap(index1,index2);
    }

    move(fromIndex: number, toIndex: number) {
        this.checkSort();
        this.buffer.move(fromIndex,toIndex);
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
        return path.join(dataset.dbc_source.get(), this.name + '.dbc');
    }

    first(): R {
        return this.getRow(0);
    }

    read(dbcpath: string = this.defaultPath()) {
        this.loaded = false;
        this.load(dbcpath);
        return this;
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
        return this.queryAll({} as any)
            .sort((a, b) => callback(b) > callback(a) ? 1 : -1)[0];
    }

    lowest(callback: (row: R) => number) {
        return this.queryAll({} as any)
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

    queryAll(predicate: Q): R[] {
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
