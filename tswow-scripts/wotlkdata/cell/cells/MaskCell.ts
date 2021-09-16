import { Objects } from "../serialization/ObjectIteration";
import { Transient } from "../serialization/Transient";
import { Cell } from "./Cell";
import { CellReadOnly } from "./CellReadOnly";
import { CellRoot } from "./CellRoot";

export class MaskBit<T,D extends MaskCell<T>> {
    protected owner: D;
    protected bit: number;

    constructor(owner: D, bit: number) {
        this.owner = owner;
        this.bit = bit;
    }

    protected get isBit() { return true; }

    get() { return this.owner.getBit(this.bit); }
    set(value: boolean) { return this.owner.setBit(this.bit,value)}
}

export class MaskMultiBit<T,D extends MaskCell<T>> {
    protected owner: D;
    protected bits: number[];
    protected get isBit() { return true; }

    constructor(owner: D, bits: number[]) {
        this.owner = owner;
        this.bits = bits;
    }

    get_all() {
        return this.bits.find(x=>this.owner.getBit(x)) !== undefined;
    }

    get_any() {
        return !this.bits.find(x=>!this.owner.getBit(x))
    }

    set(value: boolean): T {
        this.bits.forEach(x=>this.owner.setBit(x,value))
        return MaskCell.owner(this.owner);
    }
}

export abstract class MaskCell<T> extends CellRoot<T> {
    static owner<T>(cell: MaskCell<T>) {
        return cell.owner;
    }

    protected bit(no: number): MaskBit<T,this> {
        return new MaskBit(this, no);
    }

    protected multibits(bits: number[]): MaskMultiBit<T,this> {
        return new MaskMultiBit(this,bits);
    }

    abstract getBit(bit: number): boolean;
    abstract setBit(bit: number, value: boolean): T;
    abstract clearAll(): T;
    abstract toString(): string;

    get length() { return 32; }

    objectify() {
        let usedIndices : number[] = []
        let thing = Object.keys(Objects.mapObject(this, ['object'],
            (k, v) => {
                usedIndices.push(v.bit);
                return v.isBit && v.get();
            },
            (k, v) => {
                return k;
            }
        ));

        for(let i=0;i<this.length;++i) {
            if(this.bit(i).get() && ! usedIndices.includes(i)) {
                thing.push(`Bit${i}`);
            }
        }
        return thing;
    }
}


export class MaskCell64<T> extends MaskCell<T> {
    @Transient
    protected cell: Cell<bigint, any>;

    constructor(owner: T, cell: Cell<bigint, any>) {
        super(owner);
        this.cell = cell;
    }

    set(value: bigint) {
        this.cell.set(value);
        return this.owner;
    }

    get length() { return 64; }

    get() { return this.cell.get(); }

    setBit(no: number, value: boolean) {
        if(value) {
            this.cell.set(this.cell.get() | (BigInt(1) << BigInt(no)));
        } else {
            this.cell.set(this.cell.get() & (~((BigInt(1) << BigInt(no)))));
        }
        return this.owner;
    }

    getBit(no: number): boolean {
        return (this.cell.get() & ((BigInt(1) << BigInt(no)))) !== BigInt(0);
    }

    clearAll(): T {
        this.cell.set(BigInt(0));
        return this.owner;
    }

    toString(): string {
        return this.cell.get().toString(2);
    }

    protected deserialize(value: any) {
        this.set(value);
    }
}


export class MaskBitReadOnly<T,D extends MaskCellReadOnly<T>> {
    protected owner: D;
    protected bit: number;

    constructor(owner: D, bit: number) {
        this.owner = owner;
        this.bit = bit;
    }

    protected get isBit() { return true; }

    get() { return this.owner.getBit(this.bit); }
    protected set(value: boolean): T {
        return MaskCellReadOnly.setBit(this.owner,this.bit,value)
    }

    static set<T,D extends MaskCellReadOnly<T>>(mask: MaskBitReadOnly<T,D>, value: boolean) {
        return mask.set(value);
    }
}

export class MaskMultiBitReadOnly<T,D extends MaskCellReadOnly<T>> {
    protected owner: D;
    protected bits: number[];
    protected get isBit() { return true; }

    constructor(owner: D, bits: number[]) {
        this.owner = owner;
        this.bits = bits;
    }

    get() {
        return !this.bits.find(x=>!this.owner.getBit(x))
    }

    protected set(value: boolean): T {
        this.bits.forEach(x=>MaskCellReadOnly.setBit(this.owner, x,value))
        return MaskCellReadOnly.owner(this.owner);
    }
    static set<T,D extends MaskCellReadOnly<T>>(cell: MaskMultiBitReadOnly<T,D>, value: boolean) {
        return cell.set(value);
    }
}

export abstract class MaskCellReadOnly<T> extends CellRoot<T> {
    static owner<T>(cell: MaskCellReadOnly<T>) {
        return cell.owner;
    }

    protected bit(no: number): MaskBitReadOnly<T,MaskCellReadOnly<T>> {
        return new MaskBitReadOnly(this, no);
    }

    protected multibits(bits: number[]): MaskMultiBitReadOnly<T,MaskCellReadOnly<T>> {
        return new MaskMultiBitReadOnly(this,bits);
    }

    abstract getBit(bit: number): boolean;
    abstract toString(): string;
    protected abstract setBit(bit: number, value: boolean): T;
    protected abstract clearAll(): T;

    static setBit<T>(cell: MaskCellReadOnly<T>, bit: number, value: boolean) {
        return cell.setBit(bit,value);
    }
    static clearAll<T>(cell: MaskCellReadOnly<T>) {
        return cell.clearAll();
    }

    get length() { return 32; }

    objectify() {
        let usedIndices : number[] = []
        let thing = Object.keys(Objects.mapObject(this, ['object'],
            (k, v) => {
                usedIndices.push(v.bit);
                return v.isBit && v.get();
            },
            (k, v) => {
                return k;
            }
        ));

        for(let i=0;i<this.length;++i) {
            if(this.bit(i).get() && ! usedIndices.includes(i)) {
                thing.push(`Bit${i}`);
            }
        }
        return thing;
    }
}


const MaskCell32Impl = {
    bits_from(mask: number, signed: boolean = false) {
        let bits: number[] = []
        for(let i=0;i<mask;++i) {
            if((signed && mask === -1) || (mask&(1<<i))) {
                bits.push(i)
            }
        }
        return bits;
    },

    bit_from(mask: number) {
        let found = -1;
        for(let i=0;i<32;++i) {
            if(!(mask&i)) continue;
            if(found>=0) {
                throw new Error(
                      `Tried extracting single bit,`
                    + ` but multiple found: ${found}, ${i}`
                )
            }
            found = i;
        }
        if(found<0) {
            throw new Error(`Not a valid uint32 bitmask: ${mask}`)
        }
        return found;
    },

    ToString(signed: boolean, value: number) {
        return (signed && value == -1)
            ? '1'.repeat(32)
            : value.toString(2)
    },

    set(signed: boolean, value: number) {
        return signed && value == 0xffffffff
            ? -1
            : value
    },

    setBit(signed: boolean, no: number, value: boolean, oldValue: number) {
        if(value) {
            if(!signed || oldValue != -1) {
                return this.set(signed, (oldValue | 1 << no)>>>0);
            }
        } else {
            if(signed && oldValue == -1 && no < 32 && no >= 0) {
                return 0xffffffff
            }
            return this.set(signed, (oldValue & ~(1 << no))>>>0);
        }
        return oldValue;
    },

    getBit(signed: boolean, no: number, oldValue: number) {
        return (signed && oldValue == -1)
            || ((oldValue) & ((1 << no))>>>0) !== 0;
    }
}

export class MaskCell32<T> extends MaskCell<T> {
    extract_bits(mask: number, signed: boolean = false) {
        return this.multibits(MaskCell32Impl.bits_from(mask,signed));
    }

    extract_bit(mask: number) {
        return this.bit(MaskCell32Impl.bit_from(mask));
    }

    @Transient
    protected cell: Cell<number, any>;
    protected readonly signed: boolean;

    constructor(owner: T, cell: Cell<number, any>, signed = false) {
        super(owner);
        this.cell = cell;
        this.signed = signed;
    }

    toString() {
        return MaskCell32Impl.ToString(this.signed, this.cell.get());
    }

    clearAll() {
        this.cell.set(0);
        return this.owner;
    }

    setBit(no: number, value: boolean) {
        this.cell.set(
            MaskCell32Impl.setBit(this.signed,no,value,this.cell.get())
        )
        return this.owner;
    }

    getBit(no: number): boolean {
        return MaskCell32Impl.getBit(this.signed, no, this.cell.get());
    }

    get(): number {
        return this.cell.get();
    }

    set(value: number) {
        this.cell.set(MaskCell32Impl.set(this.signed,value));
        return this.owner;
    }

    protected deserialize(value: any) {
        this.set(value);
    }

    protected bit(no: number): MaskBit<T,this> { return new MaskBit(this, no); }
}

export class MaskCell32ReadOnly<T> extends MaskCellReadOnly<T> {
    @Transient
    protected cell: CellReadOnly<number, any>;
    protected readonly signed: boolean;

    constructor(owner: T, cell: CellReadOnly<number, any>, signed = false) {
        super(owner);
        this.cell = cell;
        this.signed = signed;
    }

    toString() {
        return MaskCell32Impl.ToString(this.signed, this.cell.get());
    }

    getBit(no: number): boolean {
        return MaskCell32Impl.getBit(this.signed, no, this.cell.get());
    }

    get(): number {
        return this.cell.get();
    }

    extract_bits(mask: number, signed: boolean = false) {
        return this.multibits(MaskCell32Impl.bits_from(mask,signed));
    }

    extract_bit(mask: number) {
        return this.bit(MaskCell32Impl.bit_from(mask));
    }

    protected set(value: number) {
        CellReadOnly.set(this.cell, MaskCell32Impl.set(this.signed, value));
        return this.owner;
    }

    protected setBit(no: number, value: boolean): T {
        CellReadOnly.set(this.cell,MaskCell32Impl.setBit(this.signed,no,value,this.cell.get()))
        return this.owner;
    }

    protected clearAll(): T {
        CellReadOnly.set(this.cell,0);
        return this.owner;
    }

    protected deserialize(value: any): void {
        this.set(value);
    }

    protected bit(no: number): MaskBitReadOnly<T,MaskCell32ReadOnly<T>> {
        return new MaskBitReadOnly(this, no);
    }
}