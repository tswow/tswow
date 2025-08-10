import { Cell } from "./Cell";
import { CellReadOnly } from "./CellReadOnly";
import { CellRoot } from "./CellRoot";
export type Bit = boolean | 1 | 0;
export declare class MaskPartReadOnly<T, D extends MaskCell32ReadOnly<T>> {
    protected owner: D;
    protected mask: number;
    constructor(owner: D, mask: number);
    protected get isMask(): boolean;
    get(): boolean;
}
export declare class MaskPart<T, D extends MaskCell32<T>> {
    protected owner: D;
    protected mask: number;
    constructor(owner: D, mask: number);
    protected get isMask(): boolean;
    get(): boolean;
    set(value: Bit): T;
    on(callback: () => void): D;
}
export declare class MaskBit<T, D extends MaskCell<T>> {
    protected owner: D;
    protected bit: number;
    constructor(owner: D, bit: number);
    protected get isBit(): boolean;
    get(): boolean;
    set(value: Bit): T;
    on(callback: () => void): D;
}
export declare class MaskMultiBit<T, D extends MaskCell<T>> {
    protected owner: D;
    protected bits: number[];
    protected get isBit(): boolean;
    constructor(owner: D, bits: number[]);
    /**
     * only for objectify
     */
    protected get(): boolean;
    get_all(): boolean;
    get_any(): boolean;
    set(value: Bit): T;
    on(callback: () => void): D;
}
export declare abstract class MaskCell<T> extends CellRoot<T> {
    static owner<T>(cell: MaskCell<T>): T;
    protected bit(no: number): MaskBit<T, this>;
    protected multibits(bits: number[]): MaskMultiBit<T, this>;
    abstract getBit(bit: number): boolean;
    abstract setBit(bit: number, value: Bit): T;
    abstract clearAll(): T;
    abstract toString(): string;
    get length(): number;
    objectify(): string[];
}
export declare class MaskCell64<T> extends MaskCell<T> {
    protected cell: Cell<bigint, any>;
    constructor(owner: T, cell: Cell<bigint, any>);
    set(value: bigint): T;
    get length(): number;
    get(): bigint;
    setBit(no: number, value: boolean): T;
    getBit(no: number): boolean;
    clearAll(): T;
    toString(): string;
    protected deserialize(value: any): void;
}
export declare class MaskBitReadOnly<T, D extends MaskCellReadOnly<T>> {
    protected owner: D;
    protected bit: number;
    constructor(owner: D, bit: number);
    protected get isBit(): boolean;
    get(): boolean;
    protected set(value: boolean): T;
    static set<T, D extends MaskCellReadOnly<T>>(mask: MaskBitReadOnly<T, D>, value: boolean): T;
}
export declare class MaskMultiBitReadOnly<T, D extends MaskCellReadOnly<T>> {
    protected owner: D;
    protected bits: number[];
    protected get isBit(): boolean;
    constructor(owner: D, bits: number[]);
    get(): boolean;
    protected set(value: boolean): T;
    static set<T, D extends MaskCellReadOnly<T>>(cell: MaskMultiBitReadOnly<T, D>, value: boolean): T;
}
export declare abstract class MaskCellReadOnly<T> extends CellRoot<T> {
    static owner<T>(cell: MaskCellReadOnly<T>): T;
    protected bit(no: number): MaskBitReadOnly<T, MaskCellReadOnly<T>>;
    protected multibits(bits: number[]): MaskMultiBitReadOnly<T, MaskCellReadOnly<T>>;
    abstract getBit(bit: number): boolean;
    abstract toString(): string;
    protected abstract setBit(bit: number, value: Bit): T;
    protected abstract clearAll(): T;
    static setBit<T>(cell: MaskCellReadOnly<T>, bit: number, value: Bit): T;
    static clearAll<T>(cell: MaskCellReadOnly<T>): T;
    get length(): number;
    objectify(): string[];
}
export type MaskMode = 'OR' | 'XOR' | 'AND' | 'OR' | 'NOR' | 'NOT';
export declare class MaskCell32<T> extends MaskCell<T> {
    static AllBits: number;
    extract_bits(mask: number): MaskMultiBit<T, this>;
    extract_bit(mask: number): MaskBit<T, this>;
    protected cell: Cell<number, any>;
    protected readonly signed: boolean;
    constructor(owner: T, cell: Cell<number, any>, signed?: boolean);
    flip(): T;
    toString(): string;
    clearAll(): T;
    setBit(no: number, value: Bit): T;
    getBit(no: number): boolean;
    get(): number;
    get(num: number, mode: MaskMode): number;
    add(bits: number | number[]): T;
    remove(bits: number | number[]): T;
    set(value: number, mode?: MaskMode): T;
    protected deserialize(value: any): void;
    protected bit(no: number): MaskBit<T, this>;
    protected mask(mask: number): MaskPart<T, this>;
}
export declare class MaskCell32ReadOnly<T> extends MaskCellReadOnly<T> {
    protected cell: CellReadOnly<number, any>;
    protected readonly signed: boolean;
    constructor(owner: T, cell: CellReadOnly<number, any>, signed?: boolean);
    toString(): string;
    getBit(no: number): boolean;
    get(): number;
    extract_bits(mask: number): MaskMultiBitReadOnly<T, MaskCellReadOnly<T>>;
    extract_bit(mask: number): MaskBitReadOnly<T, MaskCell32ReadOnly<T>>;
    getOr(mask: number): number;
    protected setOr(mask: number): T;
    getNot(mask: number): number;
    protected setNot(mask: number): T;
    getAnd(mask: number): number;
    protected setAnd(mask: number): T;
    getXor(mask: number): number;
    protected setXor(mask: number): T;
    getNor(mask: number): number;
    protected setNor(mask: number): T;
    protected set(value: number): T;
    protected flip(): T;
    protected setBit(no: number, value: Bit): T;
    protected clearAll(): T;
    protected deserialize(value: any): void;
    protected bit(no: number): MaskBitReadOnly<T, MaskCell32ReadOnly<T>>;
    protected mask(mask: number): MaskPartReadOnly<T, this>;
}
export type MaskCon<T> = T | (T | number)[] | number | undefined;
export declare function makeMask(obj: any, value: MaskCon<any>): number;
export declare class MaskCell32T<T, Str> extends MaskCell32<T> {
    protected obj: any;
    protected mm(value: MaskCon<Str>): number;
    set(value: MaskCon<Str>, mode?: MaskMode): T;
    add(value: MaskCon<Str>): T;
    hasAll(value: MaskCon<Str>): boolean;
    hasAny(value: MaskCon<Str>): boolean;
    remove(value: MaskCon<Str>): T;
}
interface MaskValueRead<T> {
    get(): boolean;
    on(callback: () => void): T;
}
interface MaskValueWrite<T> extends MaskValueRead<T> {
    set(val: Bit): T;
}
export type MaskCellWrite<T, Type> = {
    [Property in keyof Type]: MaskValueWrite<T>;
} & MaskCell32T<T, keyof Type>;
export type MaskCellRead<T, Type> = {
    [Property in keyof Type]: MaskValueRead<T>;
} & Omit<MaskCell32T<T, keyof Type>, 'set'>;
export declare function makeMaskCell32<T, Enum>(obj: Enum, owner: T, cell: Cell<number, any>, signed?: boolean): MaskCellWrite<T, Enum>;
export declare function makeMaskCell32ReadOnly<T, Enum>(obj: Enum, owner: T, cell: CellReadOnly<number, any>, signed?: boolean): MaskCellRead<T, Enum>;
export declare function getBits<T>(obj: any, mask: MaskCon<T>): number[];
export {};
