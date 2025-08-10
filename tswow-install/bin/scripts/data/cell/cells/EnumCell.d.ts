import { Objectified, ObjectifyOptions } from "../serialization/ObjectIteration";
import { CellSystemTop } from "../systems/CellSystem";
import { Cell, CellWrapper } from "./Cell";
import { CellReadOnly, CellWrapperReadOnly } from "./CellReadOnly";
export declare class EnumCellReadOnly<T> extends CellWrapperReadOnly<number, T> {
    protected value(index: number): EnumValueReadOnly<T>;
    is(index: number): boolean;
    on(index: number, callback: () => void): T;
    objectify(): string | number;
}
export declare class EnumValueReadOnly<T> {
    protected owner: T;
    protected cell: CellReadOnly<number, any>;
    protected index: number;
    protected get isEnum(): boolean;
    constructor(owner: T, cell: EnumCellReadOnly<T>, index: number);
    is(): boolean;
    protected set(): T;
}
export declare class EnumCell<T> extends EnumCellReadOnly<T> {
    protected value(index: number, setCallback?: () => void): EnumValue<T>;
    set(value: number): T;
}
export declare class EnumValue<T> extends EnumValueReadOnly<T> {
    protected get isEnum(): boolean;
    private setCallback?;
    constructor(owner: T, cell: EnumCell<T>, index: number, setCallback?: () => void);
    set(): T;
}
export declare class EnumCellTransform<T extends Objectified> extends CellWrapper<number, T> {
    value<V extends Objectified>(index: number, transformer: (t: T) => V): EnumValueTransform<T, V>;
    value_static<V extends Objectified>(index: number, transformer: (t: T, mod: string, value: string) => V): EnumValueTransformStatic<T, V>;
    plain_value(index: number): EnumValueTransform<T, T>;
    private getSelection;
    objectify(options?: ObjectifyOptions): string | number;
    static getSelection(transformEnum: EnumCellTransform<any>): {
        name: string | undefined;
        cell: EnumValueTransform<any, any>;
    };
}
export declare class EnumValueTransform<T extends Objectified, V extends Objectified> {
    private owner;
    private cell;
    private index;
    protected get isEnum(): boolean;
    protected transformer: (t: T) => V;
    constructor(owner: T, cell: EnumCellTransform<T>, index: number, transformer: (t: T) => V);
    is(): boolean;
    set(): V;
    as(): V;
    on(callback: (value: V) => void): T;
    if(): V;
}
export declare class EnumValueTransformStatic<T extends Objectified, V extends Objectified> {
    private owner;
    private cell;
    private index;
    protected get isEnum(): boolean;
    protected transformer: (t: T, mod: string, name: string) => V;
    constructor(owner: T, cell: EnumCellTransform<T>, index: number, transformer: (t: T, mod: string, name: string) => V);
    is(): boolean;
    set(mod: string, name: string): V;
}
export declare abstract class TransformedClass<T> extends CellSystemTop {
    protected abstract transformer(): EnumCellTransform<any>;
    protected abstract default(): T;
    protected objectifyParent(options?: ObjectifyOptions): {
        [key: string]: any;
    };
    objectify(options?: ObjectifyOptions): any;
}
export declare class EnumCellTransformReadOnly<T extends Objectified> extends CellWrapperReadOnly<number, T> {
    value<V extends Objectified>(index: number, transformer: (t: T) => V): EnumValueTransformReadOnly<T, V>;
    plain_value(index: number): EnumValueTransformReadOnly<T, T>;
    private getSelection;
    objectify(): string | number;
    static getSelection(transformEnum: EnumCellTransformReadOnly<any>): {
        name: string | undefined;
        cell: EnumValueTransformReadOnly<any, any>;
    };
}
export declare class EnumValueTransformReadOnly<T extends Objectified, V extends Objectified> {
    private owner;
    private cell;
    private index;
    protected get isEnum(): boolean;
    protected transformer: (t: T) => V;
    constructor(owner: T, cell: EnumCellTransformReadOnly<T>, index: number, transformer: (t: T) => V);
    is(): boolean;
    as(): V;
}
export declare abstract class TransformedClassReadOnly<T> extends CellSystemTop {
    protected abstract transformer(): EnumCellTransformReadOnly<any>;
    protected abstract default(): T;
    protected objectifyParent(options?: ObjectifyOptions): {
        [key: string]: any;
    };
    objectify(options?: ObjectifyOptions): any;
}
export type EnumCon<T> = T | number;
export declare class EnumCellT<T, V> extends EnumCell<T> {
    protected obj: any;
    constructor(owner: T, cell: Cell<number, any>, obj: any);
    private res;
    set(con: EnumCon<V>): T;
    is(con: EnumCon<V>): boolean;
    on(con: EnumCon<V>, callback: () => void): T;
}
export interface EnumValueRead<T> {
    is(): boolean;
    on(callback: () => void): T;
}
export interface EnumValueWrite<T> extends EnumValueRead<T> {
    set(): T;
}
export type EnumCellWrite<T, Type> = {
    [Property in keyof Omit<Type, 'obj'>]: EnumValueWrite<T>;
} & EnumCellT<T, keyof Type>;
export type EnumCellRead<T, Type> = {
    [Property in keyof Omit<Type, 'obj'>]: EnumValueRead<T>;
} & Omit<EnumCellT<T, keyof Type>, 'set'>;
export declare function makeEnumCell<T, Enum>(obj: Enum, owner: T, cell: Cell<number, any>): EnumCellWrite<T, Enum>;
export declare function makeEnumCellReadOnly<T, Enum>(obj: Enum, owner: T, cell: CellReadOnly<number, any>): EnumCellRead<T, Enum>;
export declare function makeEnum<T>(obj: any, con: EnumCon<T>): number;
