import { Cell, CellWrapper } from "../../../data/cell/cells/Cell";
import { CellReadOnly, CellWrapperReadOnly } from "../../../data/cell/cells/CellReadOnly";
import { EnumCon, EnumValueRead, EnumValueWrite } from "../../../data/cell/cells/EnumCell";
import { ObjectifyOptions } from "../../../data/cell/serialization/ObjectIteration";
export declare class SelfRef<T, V> {
    protected owner: T;
    protected transformer: () => V;
    constructor(owner: T, transformer: () => V);
    get(): V;
    mod(callback: (value: V) => void): T;
}
export interface LoadRegistry<V> {
    load(id: number): V;
    Exists(num: number): boolean;
    ID(entity: V): number;
}
/**
 * A reference that cannot be changed.
 */
export declare class RefReadOnly<T, V> extends CellWrapperReadOnly<number, T> {
    protected registry: LoadRegistry<V>;
    protected cached?: V;
    constructor(owner: T, cell: CellReadOnly<number, any>, registry: LoadRegistry<V>);
    getRef(): V;
    modRef(callback: (value: V) => void): void;
    is(value: number): boolean;
    exists(): boolean;
    objectify(options?: ObjectifyOptions): number | {
        [key: string]: any;
    };
}
export declare class RefUnknown<T> extends CellWrapper<number, T> {
}
/**
 * An internal base reference type that should not be used externally
 */
export declare class RefBase<T, V, R extends LoadRegistry<V>> extends CellWrapper<number, T> {
    protected registry: R;
    protected cached?: V;
    constructor(owner: T, cell: Cell<number, any>, registry: R);
    getRef(): V;
    modRef(callback: (value: V) => void): T;
    exists(): boolean;
    is(value: number): boolean;
    objectify(options?: ObjectifyOptions): number | {
        [key: string]: any;
    };
}
/**
 * A reference that cannot create new entities, but can still
 * be re-pointed.
 */
export declare class RefNoCreate<T, V> extends RefBase<T, V, LoadRegistry<V>> {
}
export interface StaticRegistry<T> extends LoadRegistry<T> {
    create(mod: string, id: string, parent?: number): T;
    ID(entity: T): number;
}
/**
 * A reference to a static entity that requires a mod/id pair to create
 */
export declare class RefStatic<T, V> extends RefBase<T, V, StaticRegistry<V>> {
    getRefCopy(mod: string, id: string): V;
    modRefCopy(mod: string, id: string, callback: (value: V) => void): T;
}
export interface DynamicRegistry<T> extends LoadRegistry<T> {
    create(parent?: number): T;
    ID(entity: T): number;
}
export declare class RefDynamic<T, V> extends RefBase<T, V, DynamicRegistry<V>> {
    getRef(): V;
    getRefCopy(): V;
    modRefCopy(callback: (value: V) => void): T;
}
export declare class RefValue<T> implements EnumValueWrite<T> {
    protected owner: T;
    protected cell: Cell<number, any>;
    protected index: number;
    constructor(owner: T, cell: Cell<number, any>, index: number);
    is(): boolean;
    on(callback: () => void): T;
    set(): T;
}
export declare class RefDynamicT<T, V, Str> extends RefDynamic<T, V> {
    protected value(index: number): RefValue<T>;
    private obj;
    set(val: EnumCon<Str>): T;
    is(val: EnumCon<Str>): boolean;
}
export type RefDynamicTT<T, V, Str> = {
    [Property in keyof Str]: EnumValueWrite<T>;
} & RefDynamicT<T, V, Str>;
export declare function makeRefDynamic<T, V, Str>(s: Str, owner: T, cell: Cell<number, any>, registry: DynamicRegistry<V>): RefDynamicTT<T, V, Str>;
export declare class RefStaticT<T, V, Str> extends RefStatic<T, V> {
    protected value(index: number): RefValue<T>;
    private obj2;
    set(val: EnumCon<Str>): T;
    is(val: EnumCon<Str>): boolean;
}
export type RefStaticTT<T, V, Str> = {
    [Property in keyof Str]: EnumValueWrite<T>;
} & RefStaticT<T, V, Str>;
export declare function makeRefStatic<T, V, Str>(s: Str, owner: T, cell: Cell<number, any>, registry: StaticRegistry<V>): RefStaticTT<T, V, Str>;
export declare class RefNoCreateT<T, V, Str> extends RefNoCreate<T, V> {
    protected value(index: number): RefValue<T>;
    protected obj2: any;
    set(val: EnumCon<Str>): T;
    is(val: EnumCon<Str>): boolean;
}
export type RefNoCreateTT<T, V, Str> = {
    [Property in keyof Str]: EnumValueWrite<T>;
} & RefNoCreateT<T, V, Str>;
export declare function makeRefNoCreate<T, V, Str>(s: Str, owner: T, cell: Cell<number, any>, registry: LoadRegistry<V>): RefNoCreateTT<T, V, Str>;
export declare class RefReadOnlyT<T, V, Str> extends RefReadOnly<T, V> {
    protected value(index: number): RefValue<T>;
    private obj2;
    set(val: EnumCon<Str>): T;
    is(val: EnumCon<Str>): boolean;
}
export type RefReadOnlyTT<T, V, Str> = {
    [Property in keyof Str]: EnumValueRead<T>;
} & RefReadOnlyT<T, V, Str>;
export declare function makeRefReadOnly<T, V, Str>(s: Str, owner: T, cell: CellReadOnly<number, any>, registry: LoadRegistry<V>): RefReadOnlyTT<T, V, Str>;
