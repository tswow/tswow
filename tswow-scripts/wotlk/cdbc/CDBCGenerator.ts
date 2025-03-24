import * as fs from 'fs';

export class CDBCGenerator {
    private magic = 0x43424457; // "WDBC" in ASCII
    private recordCount = 1; // Single base row
    private fieldCount: number;
    private recordSize: number;
    private stringBlockSize = 1; 
    private stringTable: Map<string, number> = new Map();
    private stringBuffer: Buffer = Buffer.alloc(1, 0); // Start with null byte
    
    constructor(private values: (number | string)[]) {
        this.fieldCount = values.length;
        this.recordSize = this.fieldCount * 4; // Each field is 4 bytes
    }

    private addString(value: string): number {
        if (this.stringTable.has(value)) {
            return this.stringTable.get(value)!;
        }
        let strBuffer = Buffer.from(value + '\0', 'utf8');
        this.stringTable.set(value, this.stringBlockSize);
        this.stringBuffer = Buffer.concat([this.stringBuffer, strBuffer]);
        let oldSize = this.stringBlockSize;
        this.stringBlockSize += strBuffer.length;
        return oldSize;
    }

    private createRecord(): Buffer {
        let buffer = Buffer.alloc(this.recordSize);
        let offset = 0;

        for (const value of this.values) {
            if (typeof value === 'string') {
                buffer.writeInt32LE(this.addString(value), offset);
            } else if (Number.isInteger(value)) {
                if (value >= 0) {
                    buffer.writeUInt32LE(value, offset);
                } else {
                    buffer.writeInt32LE(value, offset);
                }
            } else {
                buffer.writeFloatLE(value, offset);
            }
            offset += 4;
        }

        return buffer;
    }

    public generate(filename: string): void {
        let header = Buffer.alloc(20);
        header.writeUInt32LE(this.magic, 0);
        header.writeUInt32LE(this.recordCount, 4);
        header.writeUInt32LE(this.fieldCount, 8);
        header.writeUInt32LE(this.recordSize, 12);
        let record = this.createRecord()
        header.writeUInt32LE(this.stringBlockSize, 16);
        let output = Buffer.concat([header, record, this.stringBuffer]);

        fs.writeFileSync(filename, output);
        console.log(`CDBC file "${filename}" generated successfully.`);
    }
}