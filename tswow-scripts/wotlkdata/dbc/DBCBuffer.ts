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

export class DBCBuffer {
    private rows: Buffer = Buffer.alloc(0);
    private strings:  Buffer = Buffer.alloc(0);
    private bufPtr: number = this.rows.length;
    private strPtr: number = this.strings.length;
    private _rowSize = 0;
    private _rowCount = 0;
    private _baseRowCount = 0;
    private _fieldCount = 0;

    static getBuffer(file: DBCBuffer) {
        return file.rows;
    }

    get rowCount() { return this._rowCount; }
    get baseRowCount() {return this._baseRowCount; }
    get rowSize() { return this._rowSize; }

    initialize(rowSize: number) {
        this._rowSize = rowSize;
        this.rows = Buffer.alloc(rowSize);
        this.strings = Buffer.alloc(1);
        this.bufPtr = rowSize;
        this.strPtr = 1;
        this._rowCount = 1;
    }

    write() {
        const totAlloc = 20 + this._rowSize * this.rowCount + this.strPtr;
        const outBuf = Buffer.allocUnsafe(totAlloc);
        outBuf.writeUInt32LE(1128416343, 0);
        outBuf.writeUInt32LE(this.rowCount, 4);
        outBuf.writeUInt32LE(this._fieldCount, 8);
        outBuf.writeUInt32LE(this._rowSize, 12);
        outBuf.writeUInt32LE(this.strPtr, 16);
        const rowEnd = this._rowSize * this.rowCount;
        this.rows.copy(outBuf, 20, 0, rowEnd);
        this.strings.copy(outBuf, rowEnd + 20, 0, this.strPtr);
        return outBuf;
    }

    read(file: string) {
        const buffer = fs.readFileSync(file);
        const rowCount = buffer.readInt32LE(4);
        const rowSize = buffer.readInt32LE(12);
        const stringSize = buffer.readInt32LE(16);

        this._rowCount = rowCount;
        this._baseRowCount = rowCount;
        this._rowSize = rowSize;
        this._fieldCount = buffer.readUInt32LE(8);
        this.rows = Buffer.alloc(rowCount * rowSize);
        this.strings = Buffer.alloc(stringSize);

        buffer.copy(this.rows, 0, 20, 20 + rowCount * rowSize);
        buffer.copy(this.strings, 0, (rowCount * rowSize) + 20, buffer.length);

        this.strPtr = this.strings.length;
        this.bufPtr = this.rows.length;
    }

    readstring(offset: number) {
        const start = this.readuint(offset);
        if (start === 0) {
            return '';
        }
        let end = start;
        while (this.strings.readUInt8(end)) {
            ++end;
        }
        return this.strings.toString('utf-8', start, end);
    }

    writebool(value: boolean, offset: number) {
        this.rows.writeUInt32LE(value ? 1 : 0, offset);
    }

    readbool(offset: number) {
        return this.rows.writeUInt32LE(offset) !== 0;
    }

    writestring(str: string, offset: number) {
        this.rows.writeUInt32LE(this.strPtr, offset);
        const buf = Buffer.from(str, 'utf-8');
        while (this.strings.length - this.strPtr < (buf.length + 1)) {
            this.strings = Buffer.concat([this.strings, Buffer.alloc(Math.max(1, this.strings.length / 2))]);
        }
        buf.copy(this.strings, this.strPtr, 0, buf.length);

        // console.log(this.strBuffer);
        this.strPtr += buf.length + 1;
        this.strings.writeUInt8(0, this.strPtr - 1);
    }

    getOffset(rowNo: number) {
        return rowNo * this._rowSize;
    }

    addRow(sourceLine: number) {
        while (this.rows.length - this.bufPtr < this._rowSize) {
            this.rows = Buffer.concat([this.rows, Buffer.allocUnsafe(this.rows.length / 2)]);
        }
        const sourceOffset = sourceLine * this.rowSize;
        this.rows.copy(this.rows, this.bufPtr, sourceOffset, sourceOffset + this._rowSize);
        this.bufPtr += this._rowSize;
        return this._rowCount++;
    }

    readint(offset: number) {
        return this.rows.readInt32LE(offset);
    }

    readbyte(offset: number) {
        return this.rows.readUInt8(offset);
    }

    writebyte(value: number, offset: number) {
        this.rows.writeUInt8(value, offset);
    }

    writeint(value: number, offset: number) {
        this.rows.writeInt32LE(value, offset);
    }

    readuint(offset: number) {
        return this.rows.readUInt32LE(offset);
    }

    writeuint(value: number, offset: number) {
        this.rows.writeUInt32LE(value, offset);
    }

    writeulong(value: bigint, offset: number) {
        this.rows.writeBigUInt64LE(value, offset);
    }

    readulong(offset: number) {
        return this.rows.readBigUInt64LE(offset);
    }

    writefloat(value: number, offset: number) {
        this.rows.writeFloatLE(value, offset);
    }

    readfloat(offset: number) {
        return this.rows.readFloatLE(offset);
    }
}
