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
import { DBCBuffer } from './DBCBuffer';
import { loc_constructor, iterLocConstructor } from '../primitives';
import { Language } from './Localization';
import { Cell, CPrim } from '../cell/Cell';
import { LocSystem } from '../cell/LocSystem';
import { PendingCell } from '../cell/PendingCell';
import { CellArray } from '../cell/CellArray';
import { CellReadOnly } from '../cell/CellReadOnly';

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
    constructor(owner: T, size: number, buffer: DBCBuffer, offset: number) {
        super(owner, size);
        this.buffer = buffer;
        this.offset = offset;
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
