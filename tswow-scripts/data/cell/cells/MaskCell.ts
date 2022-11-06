import { Objects } from "../serialization/ObjectIteration";
import { Transient } from "../serialization/Transient";
import { Cell } from "./Cell";
import { CellReadOnly } from "./CellReadOnly";
import { CellRoot } from "./CellRoot";
import { makePrototype } from "./PrototypeRegistry";

function getUnsigned(value: number)
{
    return value < 0 ? value + 4294967296 : value;
}

function getCellSign(num: number, signed: boolean)
{
    if(num < 0 && !signed)
    {
        return num + 4294967296;
    }

    if (num > 2147483647 && signed)
    {
        return num - 4294967296;
    }

    return num;
}

export type Bit = boolean | 1 | 0

export class MaskPartReadOnly<T,D extends MaskCell32ReadOnly<T>> {
    protected owner: D;
    protected mask: number;

    constructor(owner: D, mask: number) {
        this.owner = owner;
        this.mask = mask;
    }

    protected get isMask() { return true; }

    get() {
        return (this.owner.get() & this.mask) === this.mask
    }
}

export class MaskPart<T,D extends MaskCell32<T>> {
    protected owner: D;
    protected mask: number;

    constructor(owner: D, mask: number) {
        this.owner = owner;
        this.mask = mask;
    }

    protected get isMask() { return true; }

    get() {
        return (this.owner.get() & this.mask) === this.mask
    }

    set(value: Bit) {
        return value
            ? this.owner.set(this.mask,'OR')
            : this.owner.set(this.mask,'NOT');
    }

    on(callback: ()=>void) {
        if(this.get()) callback();
        return this.owner;
    }
}

export class MaskBit<T,D extends MaskCell<T>> {
    protected owner: D;
    protected bit: number;

    constructor(owner: D, bit: number) {
        this.owner = owner;
        this.bit = bit;
    }

    protected get isBit() { return true; }

    get() { return this.owner.getBit(this.bit); }
    set(value: Bit) { return this.owner.setBit(this.bit,value)}
    on(callback: ()=>void) {
        if(this.get()) callback();
        return this.owner;
    }
}

export class MaskMultiBit<T,D extends MaskCell<T>> {
    protected owner: D;
    protected bits: number[];
    protected get isBit() { return true; }

    constructor(owner: D, bits: number[]) {
        this.owner = owner;
        this.bits = bits;
    }

    /**
     * only for objectify
     */
    protected get() {
        return this.get_all();
    }

    get_all() {
        return this.bits.find(x=>this.owner.getBit(x)) !== undefined;
    }

    get_any() {
        return !this.bits.find(x=>!this.owner.getBit(x))
    }

    set(value: Bit): T {
        this.bits.forEach(x=>this.owner.setBit(x,value))
        return MaskCell.owner(this.owner);
    }

    on(callback: ()=>void) {
        if(this.get()) callback();
        return this.owner;
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
    abstract setBit(bit: number, value: Bit): T;
    abstract clearAll(): T;
    abstract toString(): string;

    get length() { return 32; }

    objectify() {
        let usedIndices : number[] = []

        let thing = Object.keys(Objects.mapObject(this, ['object'],
            (k, v) => {
                if(v.isBit) {
                    usedIndices.push(v.bit);
                    return v.get();
                }

                if(v.isMask) {
                    MaskCell32Impl.bits_from(v.mask).forEach(x=>usedIndices.push(x))
                    return v.get();
                }

                return false;
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
    protected abstract setBit(bit: number, value: Bit): T;
    protected abstract clearAll(): T;

    static setBit<T>(cell: MaskCellReadOnly<T>, bit: number, value: Bit) {
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
    bits_from(mask: number) {
        let bits: number[] = []
        for(let i=0;i<32;++i) {
            if(this.getBit(i, mask)) {
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

    ToString(value: number) {
        return value.toString(2)
    },

    setBit(no: number, value: boolean, oldValue: number) {
        if(value)
        {
            return (oldValue | ((1 << no) >>> 0)) >>> 0;
        }
        else
        {
            return oldValue & (~((1 << no) >>> 0) >>> 0) >>> 0;
        }
    },

    getBit(no: number, oldValue: number) {
        return (oldValue & ((1 << no)) >>> 0) !== 0;
    },

    flip(oldValue: number) {
        return (~oldValue)>>>0
    },

    or(mask: number, oldValue: number) {
        return (oldValue | mask) >>> 0
    },

    not(mask: number, oldValue: number) {
        return (oldValue & ~mask) >>> 0
    },

    and(mask: number, oldValue: number) {
        return (oldValue & mask) >>> 0;
    },

    xor(mask: number, oldValue: number) {
        return (oldValue ^ mask) >>> 0;
    },

    nor(mask: number, oldValue: number) {
        return ~(oldValue|mask) >>> 0;
    },

    mask(bits: number|number[]) {
        if(!Array.isArray(bits)) bits = [bits];
        return bits.reduce((p,c)=>(p|(1<<c)),0);
    }
}

export type MaskMode =
    'OR'|'XOR'|'AND'|'OR'|'NOR'|'NOT'

export class MaskCell32<T> extends MaskCell<T> {
    static AllBits = 0xffffffff;

    extract_bits(mask: number) {
        return this.multibits(MaskCell32Impl.bits_from(getUnsigned(mask)));
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

    flip() {
        this.set(MaskCell32Impl.flip(this.get()));
        return this.owner;
    }

    toString() {
        return MaskCell32Impl.ToString(this.get());
    }

    clearAll() {
        this.cell.set(0);
        return this.owner;
    }

    setBit(no: number, value: Bit) {
        this.set(MaskCell32Impl.setBit(no,value as boolean,this.get()))
        return this.owner;
    }

    getBit(no: number): boolean {
        return MaskCell32Impl.getBit(no, this.get());
    }

    get(): number;
    get(num: number, mode: MaskMode): number

    get(num?: number, mode?: MaskMode): number {
        switch(mode) {
            case 'AND':
                return MaskCell32Impl.and(getUnsigned(num),this.get());
            case 'NOR':
                return MaskCell32Impl.nor(getUnsigned(num),this.get());
            case 'NOT':
                return MaskCell32Impl.not(getUnsigned(num),this.get());
            case 'OR':
                return MaskCell32Impl.or(getUnsigned(num),this.get());
            case 'XOR':
                return MaskCell32Impl.xor(getUnsigned(num),this.get());
            default:
                return getUnsigned(this.cell.get())
        }
    }

    add(bits: number|number[]) {
        return this.set(MaskCell32Impl.mask(bits),'OR');
    }

    remove(bits: number|number[]) {
        return this.set(MaskCell32Impl.mask(bits),'NOT');
    }

    set(value: number, mode?: MaskMode) {
        if(!mode) {
            this.cell.set(getCellSign(value, this.signed));
        } else {
            this.cell.set(getCellSign(this.get(value,mode), this.signed));
        }
        return this.owner;
    }

    protected deserialize(value: any) {
        this.set(value);
    }

    protected bit(no: number): MaskBit<T,this> { return new MaskBit(this, no); }
    protected mask(mask: number): MaskPart<T,this> { return new MaskPart(this, mask); }
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
        return MaskCell32Impl.ToString(this.get());
    }

    getBit(no: number): boolean {
        return MaskCell32Impl.getBit(no, this.get());
    }

    get(): number {
        return getUnsigned(this.cell.get());
    }

    extract_bits(mask: number) {
        return this.multibits(MaskCell32Impl.bits_from(getUnsigned(mask)));
    }

    extract_bit(mask: number) {
        return this.bit(MaskCell32Impl.bit_from(getUnsigned(mask)));
    }

    getOr(mask: number) {
        return MaskCell32Impl.or(getUnsigned(mask),this.get());
    }
    protected setOr(mask: number) { return this.set(this.getOr(mask)); }

    getNot(mask: number) {
        return MaskCell32Impl.not(getUnsigned(mask),this.get())
    }
    protected setNot(mask: number) { return this.set(this.getNot(mask)); }

    getAnd(mask: number) {
        return MaskCell32Impl.and(getUnsigned(mask),this.get())
    }

    protected setAnd(mask: number) {
        return this.set(this.getAnd(getUnsigned(mask)));
    }

    getXor(mask: number) {
        return MaskCell32Impl.xor(getUnsigned(mask),this.get())
    }

    protected setXor(mask: number) {
        return this.set(this.getXor(mask));
    }

    getNor(mask: number) {
        return MaskCell32Impl.nor(getUnsigned(mask),this.get())
    }

    protected setNor(mask: number) {
        return this.set(this.getNor(mask));
    }


    protected set(value: number) {
        CellReadOnly.set(this.cell, getCellSign(value, this.signed))
        return this.owner;
    }

    protected flip() {
        return this.set(MaskCell32Impl.flip(this.get()))
    }

    protected setBit(no: number, value: Bit): T {
        CellReadOnly.set(this.cell,getCellSign(MaskCell32Impl.setBit(no,value as boolean,this.get()), this.signed))
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

    protected mask(mask: number): MaskPartReadOnly<T,this> {
        return new MaskPartReadOnly(this, mask);
    }
}

export type MaskCon<T> = T|(T|number)[]|number|undefined
export function makeMask(obj: any, value: MaskCon<any>): number {
    if(value === undefined) return 0;
    if(typeof(value) === 'number') return value;
    if(typeof(value) === 'string') return obj[value];
    if(Array.isArray(value)) return value
        .reduce<number>((p,c)=>p|makeMask(obj,c),0)
    throw new Error(`Unknown MaskCell value: ${value}`)
}

export class MaskCell32T<T,Str> extends MaskCell32<T> {
    protected obj: any;
    protected mm(value: MaskCon<Str>) {
        return makeMask(this.obj,value);
    }

    set(value: MaskCon<Str>, mode?: MaskMode)    { return super.set(this.mm(value),mode) }
    add(value: MaskCon<Str>)    { return super.set(this.mm(value),'OR') }
    hasAll(value: MaskCon<Str>) {
        let v = this.mm(value);
        return super.get(v,'AND') === v;
    }
    hasAny(value: MaskCon<Str>) { return this.get(this.mm(value),'OR') !== 0; }
    remove(value: MaskCon<Str>) { return super.set(this.mm(value),'NOT') }
}

interface MaskValueRead<T> {
    get(): boolean
    on(callback: ()=>void): T
}

interface MaskValueWrite<T> extends MaskValueRead<T> {
    set(val: Bit): T
}

export type MaskCellWrite<T,Type> = {
    [Property in keyof Type]: MaskValueWrite<T>;
} & MaskCell32T<T,keyof Type>

export type MaskCellRead<T,Type> = {
    [Property in keyof Type]: MaskValueRead<T>;
} & Omit<MaskCell32T<T,keyof Type>,'set'>

export function makeMaskCell32<T,Enum>(obj: Enum, owner: T, cell: Cell<number,any>, signed = false) {
    let mask = makePrototype('mask',MaskCell32T.prototype,obj,{owner,cell,signed},(p,k,v)=>{
        Object.defineProperty(p,k,{
            get: function() {
                return this.mask(v);
            }
        })
    })
    mask.obj = obj;
    return mask as MaskCellWrite<T,Enum>;
}

export function makeMaskCell32ReadOnly<T,Enum>(obj: Enum, owner: T, cell: CellReadOnly<number,any>, signed = false) {
    let mask = makePrototype('mask',MaskCell32.prototype,obj,{owner,cell,signed},(p,k,v)=>{
        Object.defineProperty(p,k,{
            get: function() {
                return this.mask(v);
            }
        })
    })
    mask.obj = obj;
    return mask as MaskCellRead<T,Enum>
}

export function getBits<T>(obj: any, mask: MaskCon<T>) {
    let numMask = makeMask(obj,mask);
    return MaskCell32Impl.bits_from(getUnsigned(numMask));
}