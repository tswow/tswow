import { Cell, CPrim } from '../cell/cells/Cell';
import { CellArray } from '../cell/cells/CellArray';
import { CellReadOnly } from '../cell/cells/CellReadOnly';
import { PendingCell } from '../cell/cells/PendingCell';
import { ObjectifyOptions } from '../cell/serialization/ObjectIteration';
import { LocSystem } from '../cell/systems/CellSystem';
import { loc_constructor } from '../primitives';
import { DBCBuffer } from './DBCBuffer';
import { Language } from './Localization';
export declare abstract class DBCCell<D extends CPrim, T> extends Cell<D, T> {
    protected buffer: DBCBuffer;
    protected offset: number;
    constructor(owner: T, buffer: DBCBuffer, offset: number);
}
export declare abstract class DBCArrayCell<D extends CPrim, T> extends CellArray<D, T> {
    protected buffer: DBCBuffer;
    protected offset: number;
    protected size: number;
    constructor(owner: T, size: number, buffer: DBCBuffer, offset: number);
    length(): number;
}
export declare class DBCIntArrayCell<T> extends DBCArrayCell<number, T> {
    getIndex(index: number): number;
    setIndex(index: number, value: number): T;
}
export declare class DBCByteArrayCell<T> extends DBCArrayCell<number, T> {
    getIndex(index: number): number;
    setIndex(index: number, value: number): T;
}
export declare class DBCUIntArrayCell<T> extends DBCArrayCell<number, T> {
    getIndex(index: number): number;
    setIndex(index: number, value: number): T;
}
export declare class DBCStringArrayCell<T> extends DBCArrayCell<string, T> {
    getIndex(index: number): string;
    setIndex(index: number, value: string): T;
}
export declare class DBCFloatArrayCell<T> extends DBCArrayCell<number, T> {
    getIndex(index: number): number;
    setIndex(index: number, value: number): T;
}
export declare class DBCMultiArrayCell<T> extends DBCArrayCell<number, T> {
    setIndex(index: number, value: number): T;
    getIndex(index: number): number;
    setIndexFloat(index: number, value: number): T;
    getIndexFloat(index: number): number;
    setIndexUInt32(index: number, value: number): T;
    getIndexUInt32(index: number): number;
    setIndexInt32(index: number, value: number): T;
    getIndexInt32(index: number): number;
}
export declare abstract class MultiWrapper<T> extends Cell<number, T> {
    protected multi: DBCMultiArrayCell<any>;
    protected index: number;
    constructor(owner: T, multi: DBCMultiArrayCell<any>, index: number);
}
export declare class MultiFloatWrapper<T> extends MultiWrapper<T> {
    get(): number;
    set(value: number): T;
}
export declare class MultiUIntWrapper<T> extends MultiWrapper<T> {
    get(): number;
    set(value: number): T;
}
export declare class MultiIntWrapper<T> extends MultiWrapper<T> {
    get(): number;
    set(value: number): T;
}
export declare class DBCIntCell<T> extends DBCCell<number, T> {
    get(): number;
    set(value: number): T;
}
export declare class DBCKeyCell<T> extends CellReadOnly<number, T> {
    protected buffer: DBCBuffer;
    protected offset: number;
    constructor(owner: T, buffer: DBCBuffer, offset: number);
    get(): number;
    protected set(value: number): T;
}
export declare class DBCUIntCell<T> extends DBCCell<number, T> {
    get(): number;
    set(value: number): T;
}
export declare class DBCFloatCell<T> extends DBCCell<number, T> {
    get(): number;
    set(value: number): T;
}
export declare class DBCStringCell<T> extends DBCCell<string, T> implements PendingCell {
    get(): string;
    set(value: string): T;
    exists(): boolean;
}
export declare class DBCByteCell<T> extends DBCCell<number, T> {
    get(): number;
    set(value: number): T;
}
export declare class DBCBoolCell<T> extends DBCCell<boolean, T> {
    get(): boolean;
    set(value: boolean): T;
}
export declare class DBCULongCell<T> extends DBCCell<bigint, T> {
    get(): bigint;
    set(value: bigint): T;
}
export declare class DBCEnumCell<T> extends DBCCell<number, T> {
    get(): number;
    set(value: number): T;
}
export declare class DBCFlagCell<T> extends DBCCell<number, T> {
    get(): number;
    set(value: number): T;
}
export declare class DBCPointerCell<T> extends DBCCell<number, T> {
    get(): number;
    set(value: number): T;
}
export declare class DBCMaskCell<T> extends DBCCell<number, T> {
    get(): number;
    set(value: number): T;
    markAll(bits: number[]): T;
    mark(bit: number): T;
    clear(bit: number): T;
}
export declare class DBCLocCell<T> extends LocSystem<T> {
    protected buffer: DBCBuffer;
    protected offset: number;
    get isLoc(): boolean;
    private langOffset;
    lang(lang: Language): DBCStringCell<T>;
    get mask(): DBCUIntCell<T>;
    set(con: loc_constructor): T;
    objectify(options?: ObjectifyOptions): any;
    constructor(owner: T, buffer: DBCBuffer, offset: number);
}
