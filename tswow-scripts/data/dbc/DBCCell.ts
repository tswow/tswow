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
import { Cell, CPrim } from '../cell/cells/Cell';
import { CellArray } from '../cell/cells/CellArray';
import { CellReadOnly } from '../cell/cells/CellReadOnly';
import { PendingCell } from '../cell/cells/PendingCell';
import { LocSystem } from '../cell/systems/CellSystem';
import { iterLocConstructor, loc_constructor } from '../primitives';
import { DBCBuffer } from './DBCBuffer';
import { Language } from './Localization';

export abstract class DBCCell<D extends CPrim, T> extends Cell<D, T> {
    protected buffer: DBCBuffer;
    protected offset: number;
    constructor(owner: T, buffer: DBCBuffer, offset: number) {
        super(owner);
        this.buffer = buffer;
        this.offset = offset;
    }
}

export abstract class DBCArrayCell<D extends CPrim, T> extends CellArray<D, T> {
    protected buffer: DBCBuffer;
    protected offset: number;
    protected size: number;

    constructor(owner: T, size: number, buffer: DBCBuffer, offset: number) {
        super(owner);
        this.buffer = buffer;
        this.offset = offset;
        this.size = size;
    }

    length() {
        return this.size;
    }
}

export class DBCIntArrayCell<T> extends DBCArrayCell<number, T> {
    getIndex(index: number) {
        return this.buffer.readint(this.offset + index * 4);
    }

    setIndex(index: number, value: number) {
        this.buffer.writeint(value, this.offset + index * 4);
        return this.owner;
    }
}

export class DBCByteArrayCell<T> extends DBCArrayCell<number, T> {
    getIndex(index: number) {
        return this.buffer.readbyte(this.offset + index);
    }

    setIndex(index: number, value: number) {
        this.buffer.writebyte(value, this.offset + index);
        return this.owner;
    }
}

export class DBCUIntArrayCell<T> extends DBCArrayCell<number, T> {
    getIndex(index: number) {
        return this.buffer.readuint(this.offset + index * 4);
    }

    setIndex(index: number, value: number) {
        this.buffer.writeuint(value, this.offset + index * 4);
        return this.owner;
    }
}

export class DBCStringArrayCell<T> extends DBCArrayCell<string, T> {
    getIndex(index: number) {
        return this.buffer.readstring(this.offset + index * 4);
    }

    setIndex(index: number, value: string) {
        this.buffer.writestring(value, this.offset + index * 4);
        return this.owner;
    }
}


export class DBCFloatArrayCell<T> extends DBCArrayCell<number, T> {
    getIndex(index: number) {
        return this.buffer.readfloat(this.offset + index * 4);
    }

    setIndex(index: number, value: number) {
        this.buffer.writefloat(value, this.offset + index * 4);
        return this.owner;
    }
}

export class DBCMultiArrayCell<T> extends DBCArrayCell<number, T> {
    setIndex(index: number, value: number): T {
        this.buffer.writefloat(value, this.offset + index * 4);
        return this.owner;
    }
    getIndex(index: number): number {
        return this.buffer.readfloat(this.offset + index * 4);
    }

    setIndexFloat(index: number, value: number)  {
        this.buffer.writefloat(value, this.offset + index * 4);
        return this.owner;
    }

    getIndexFloat(index: number): number {
        return this.buffer.readfloat(this.offset + index * 4);
    }

    setIndexUInt32(index: number, value: number)  {
        this.buffer.writeuint(value, this.offset + index * 4);
        return this.owner;
    }

    getIndexUInt32(index: number): number {
        return this.buffer.readuint(this.offset + index * 4);
    }

    setIndexInt32(index: number, value: number)  {
        this.buffer.writeint(value, this.offset + index * 4);
        return this.owner;
    }

    getIndexInt32(index: number): number {
        return this.buffer.readint(this.offset + index * 4);
    }
}

export abstract class MultiWrapper<T> extends Cell<number,T> {
    protected multi: DBCMultiArrayCell<any>;
    protected index: number;
    constructor(owner: T, multi: DBCMultiArrayCell<any>, index: number){
        super(owner)
        this.multi = multi;
        this.index = index;
    }
}

export class MultiFloatWrapper<T> extends MultiWrapper<T> {
    get(): number {
        return this.multi.getIndexFloat(this.index);
    }
    set(value: number): T {
        this.multi.setIndexFloat(this.index, value);
        return this.owner;
    }
}

export class MultiUIntWrapper<T> extends MultiWrapper<T> {
    get(): number {
        return this.multi.getIndexUInt32(this.index);
    }
    set(value: number): T {
        this.multi.setIndexUInt32(this.index, value);
        return this.owner;
    }
}

export class MultiIntWrapper<T> extends MultiWrapper<T> {
    get(): number {
        return this.multi.getIndexInt32(this.index);
    }
    set(value: number): T {
        this.multi.setIndexInt32(this.index, value);
        return this.owner;
    }
}

export class DBCIntCell<T> extends DBCCell<number, T> {
    get(): number {
        return this.buffer.readint(this.offset);
    }
    set(value: number): T {
        this.buffer.writeint(value, this.offset);
        return this.owner;
    }
}

export class DBCKeyCell<T> extends CellReadOnly<number, T> {
    protected buffer: DBCBuffer;
    protected offset: number;

    constructor(owner: T, buffer: DBCBuffer, offset: number) {
        super(owner);
        this.buffer = buffer;
        this.offset = offset;
    }
    get(): number {
        return this.buffer.readint(this.offset);
    }

    protected set(value: number): T {
        this.buffer.writeint(value, this.offset);
        return this.owner;
    }
}


export class DBCUIntCell<T> extends DBCCell<number, T> {
    get(): number {
        return this.buffer.readuint(this.offset);
    }
    set(value: number): T {
        this.buffer.writeuint(value, this.offset);
        return this.owner;
    }
}

export class DBCFloatCell<T> extends DBCCell<number, T> {
    get(): number { return this.buffer.readfloat(this.offset); }
    set(value: number): T {
        this.buffer.writefloat(value, this.offset);
        return this.owner;
    }
}

export class DBCStringCell<T> extends DBCCell<string, T> implements PendingCell {
    get(): string { return this.buffer.readstring(this.offset); }
    set(value: string): T {
        this.buffer.writestring(value, this.offset);
        return this.owner;
    }

    exists(): boolean {
        return this.buffer.readuint(this.offset) > 0;
    }
}

export class DBCByteCell<T> extends DBCCell<number, T> {
    get(): number { return this.buffer.readbyte(this.offset); }
    set(value: number): T {
        this.buffer.writebyte(value, this.offset);
        return this.owner;
    }
}

export class DBCBoolCell<T> extends DBCCell<boolean, T> {
    get(): boolean { return this.buffer.readbool(this.offset); }
    set(value: boolean): T {
        this.buffer.writebool(value, this.offset);
        return this.owner;
    }
}

export class DBCULongCell<T> extends DBCCell<bigint, T> {
    get(): bigint { return this.buffer.readulong(this.offset); }
    set(value: bigint): T {
        this.buffer.writeulong(value, this.offset);
        return this.owner;
    }
}

export class DBCEnumCell<T> extends DBCCell<number, T> {
    get(): number { return this.buffer.readint(this.offset); }
    set(value: number): T {
        this.buffer.writeint(value, this.offset);
        return this.owner;
    }
}

export class DBCFlagCell<T> extends DBCCell<number, T> {
    get(): number { return this.buffer.readint(this.offset); }
    set(value: number): T {
        this.buffer.writeint(value, this.offset);
        return this.owner;
    }
}

export class DBCPointerCell<T> extends DBCCell<number, T> {
    get(): number { return this.buffer.readint(this.offset); }
    set(value: number): T {
        this.buffer.writeint(value, this.offset);
        return this.owner;
    }
}

export class DBCMaskCell<T> extends DBCCell<number, T> {
    get(): number { return this.buffer.readuint(this.offset); }
    set(value: number): T {
        this.buffer.writeuint(value, this.offset);
        return this.owner;
    }

    markAll(bits: number[]) {
        bits.forEach((x) => this.mark(x));
        return this.owner;
    }

    mark(bit: number) {
        this.set(this.get() | 1 << bit);
        return this.owner;
    }

    clear(bit: number) {
        this.set(this.get() & ~(1 << bit));
        return this.owner;
    }
}

export class DBCLocCell<T> extends LocSystem<T> {
    protected buffer: DBCBuffer;
    protected offset: number;

    get isLoc() { return true; }

    private langOffset(lang: Language) {
        switch (lang) {
            case 'enGB': return 0;
            case 'koKR': return 1;
            case 'frFR': return 2;
            case 'deDE': return 3;
            case 'enCN': return 4;
            case 'zhCN': return 5;
            case 'zhTW': return 6;
            case 'enTW': return 7;
            case 'zhTW': return 8;
            case 'esES': return 9;
            case 'esMX': return 10;
            case 'ruRU': return 11;
            case 'ptPT': return 12;
            case 'itIT': return 13;
            case 'Unk': return 14;
        }
        return 15;
    }

    lang(lang: Language) {
        return new DBCStringCell(this.owner, this.buffer, this.offset + this.langOffset(lang) * 4);
    }

    get mask() {
        return new DBCUIntCell(this.owner, this.buffer, this.offset + 64);
    }

    set(con: loc_constructor) {
        iterLocConstructor(con, (lang, value) => {
            this.lang(lang).set(value);
        });
        return this.owner;
    }

    objectify() {
        // enGB optimization
        if (this.mask.get() === 16712190) {
            return {enGB: this.enGB.get(), mask: 16712190};
        } else {
            return super.objectify();
        }
    }

    constructor(owner: T, buffer: DBCBuffer, offset: number) {
        super(owner);
        this.buffer = buffer;
        this.offset = offset;
    }
}
