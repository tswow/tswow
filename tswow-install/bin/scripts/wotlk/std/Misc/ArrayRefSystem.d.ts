import { Objectified } from "../../../data/cell/serialization/ObjectIteration";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { RefDynamic, RefNoCreate, RefStatic } from "../Refs/Ref";
import { MainEntity } from "./Entity";
export declare class ArrayRefSystem<T, V extends Objectified> extends CellSystem<T> {
    protected readonly clearValue: number;
    protected readonly length: number;
    protected readonly getter: (index: number) => RefDynamic<T, V>;
    constructor(owner: T, clearValue: number, length: number, getter: (index: number) => RefDynamic<T, V>);
    clear(index: number): T;
    clearAll(): T;
    forEachRef(callback: (ref: V) => void): T;
    forEach(callback: (ref: RefDynamic<T, V>) => void): T;
    setId(index: number, ref: number): T;
    addId(refId: number): T;
    modRef(index: number, callback: (value: V) => void): void;
    modRefCopy(index: number, callback: (value: V) => void): void;
    getRef(index: number): V;
    getRefCopy(index: number): V;
    addMod(callback?: (value: V) => void): T;
    addGet(): V;
}
export declare class ArrayRefSystemStatic<T, V extends MainEntity<any>> extends CellSystem<T> {
    protected readonly clearValue: number;
    protected readonly length: number;
    protected readonly getter: (index: number) => RefStatic<T, V>;
    constructor(owner: T, clearValue: number, length: number, getter: (index: number) => RefStatic<T, V>);
    clear(index: number): T;
    clearAll(): T;
    forEachRef(callback: (ref: V) => void): T;
    forEach(callback: (ref: RefStatic<T, V>) => void): T;
    setId(index: number, ref: number): T;
    addId(refId: number): T;
    modRef(index: number, callback: (value: V) => void): void;
    modRefCopy(mod: string, id: string, index: number, callback: (value: V) => void): void;
    getRef(index: number): V;
    getRefCopy(mod: string, id: string, index: number): V;
    addMod(mod: string, id: string, callback?: (value: V) => void): T;
    addGet(mod: string, id: string): V;
}
export declare class ArrayRefSystemNoCreate<T, V extends MainEntity<any>> extends CellSystem<T> {
    protected readonly clearValue: number;
    protected readonly length: number;
    protected readonly getter: (index: number) => RefNoCreate<T, V>;
    constructor(owner: T, clearValue: number, length: number, getter: (index: number) => RefNoCreate<T, V>);
    clear(index: number): T;
    clearAll(): T;
    forEachRef(callback: (ref: V) => void): T;
    forEach(callback: (ref: RefNoCreate<T, V>) => void): T;
    setId(index: number, ref: number): T;
    addId(refId: number): T;
    modRef(index: number, callback: (value: V) => void): void;
    getRef(index: number): V;
}
