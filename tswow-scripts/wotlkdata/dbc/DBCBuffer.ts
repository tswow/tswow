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
import { GetStage } from '../wotlkdata';

export class DBCBuffer {
    private rows: Buffer = Buffer.alloc(0);
    private strings:  Buffer = Buffer.alloc(0);
    private bufPtr: number = this.rows.length;
    private strPtr: number = this.strings.length;
    private deletedIndices: number[] = [];
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

    protected deleteIndex(search: number) {
        let index = 0,high = this.deletedIndices.length;
        while (index < high) {
            var mid = (index + high) >>> 1;
            if (this.deletedIndices[mid] < search) index = mid + 1;
            else high = mid;
        }
        return index;
    }

    isDeleted(rowNo: number) {
        let index = this.deleteIndex(rowNo);
        return this.deletedIndices[index] === rowNo;
    }

    undelete(rowNo: number) {
        let index = this.deleteIndex(rowNo);
        if(this.deletedIndices[index] == rowNo) {
            this.deletedIndices.splice(index,1);
        }
    }

    delete(rowNo: number) {
        let insertIndex = this.deleteIndex(rowNo);
        if(this.deletedIndices[insertIndex] != rowNo) {
            this.deletedIndices.splice(insertIndex,0,rowNo);
        }
    }

    initialize(rowSize: number) {
        this._rowSize = rowSize;
        this.rows = Buffer.alloc(rowSize);
        this.strings = Buffer.alloc(1);
        this.bufPtr = rowSize;
        this.strPtr = 1;
        this._rowCount = 1;
    }

    applyDeletes() {
        for(let i=this.deletedIndices.length-1;i>=0;--i) {
            let end = this.deletedIndices[i];
            let start = end;
            while(i>0 && this.deletedIndices[i-1] == start-1) {
                start--;
                i--;
            }
            this.rows.copyWithin(start*this.rowSize,(end+1)*this.rowSize);
        }
        this._rowCount -= this.deletedIndices.length;
    }

    write() {
        const totAlloc = 20 + this._rowSize * this.rowCount + this.strPtr;
        const outBuf = Buffer.allocUnsafe(totAlloc);

        outBuf.writeUInt32LE(1128416343, 0);
        outBuf.writeUInt32LE(this.rowCount, 4);
        outBuf.writeUInt32LE(this._fieldCount, 8);
        outBuf.writeUInt32LE(this._rowSize, 12);
        outBuf.writeUInt32LE(this.strPtr, 16);

        const rowEnd = this._rowSize * this.rowCount
        this.rows.copy(outBuf, 20, 0, rowEnd);
        this.strings.copy(outBuf, rowEnd + 20, 0, this.strPtr);
        return outBuf;
    }

    private sliceRows(offset: number, size: number) {
        let buf = Buffer.alloc(size);
        this.rows.copy(buf,0,offset);
        return buf;
    }

    move(sourceIndex: number, targetIndex: number) {
        if(GetStage() !== 'SORT') {
            throw new Error(`Trying to move array indices before SORT stage`)
        }
        if(sourceIndex === targetIndex) return;
        let sourceOffset = sourceIndex*this.rowSize;
        let targetOffset = targetIndex*this.rowSize;
        let sourceBuf = this.sliceRows(sourceOffset,this.rowSize);
        if(sourceIndex > targetIndex) {
            let betweenBuf = this.sliceRows(targetOffset,sourceOffset-targetOffset);
            sourceBuf.copy(this.rows,targetOffset)
            betweenBuf.copy(this.rows,targetOffset+this.rowSize);
        } else {
            let betweenBuf = Buffer.from(this.rows,sourceOffset+1,targetOffset-sourceOffset)
            sourceBuf.copy(this.rows,targetOffset,0)
            betweenBuf.copy(this.rows,sourceOffset)
        }
    }

    swap(index1: number, index2: number) {
        if(index1 === index2) return;
        if(index1<0||index1>=this.rowCount) throw new Error(`Invalid index1: ${index1}`)
        if(index2<0||index2>=this.rowCount) throw new Error(`Invalid index2: ${index2}`)
        let offset1 = index1*this.rowSize;
        let offset2 = index2*this.rowSize;
        let buf1 = this.sliceRows(offset1,this._rowSize);
        this.rows.copyWithin(offset1,offset2,offset2+this._rowSize);
        buf1.copy(this.rows,offset2);
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
