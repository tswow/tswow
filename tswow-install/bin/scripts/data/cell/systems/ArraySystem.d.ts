import { Objectified, ObjectifyOptions } from '../serialization/ObjectIteration';
import { CellSystem, CellSystemTop } from './CellSystem';
export declare abstract class ArraySystemBase<A extends Objectified, T> extends CellSystem<T> {
    filter(callback: (value: A, index: number) => any): A[];
    protected abstract isClearValue(a: A): boolean;
    protected abstract clearValue(a: A): void;
    clear(index: number): T;
    isClear(index: number): boolean;
    indexOf(callback: (value: A, index: number) => any): number;
    find(callback: (value: A, index: number) => any): A;
    clearAll(): T;
    forEach(callback: (value: A, index: number) => void): T;
    addGet(): A;
    addMod(callback: (value: A) => void): T;
    abstract get length(): number;
    mod(index: number, callback: (value: A) => void): T;
    abstract get(index: number): A;
    objectify(options?: ObjectifyOptions): any[];
}
export declare abstract class ArraySystem<A extends ArrayEntry<T>, T> extends ArraySystemBase<A, T> {
    constructor(owner: T);
    protected isClearValue(a: A): boolean;
    protected clearValue(a: A): void;
}
export declare abstract class ArrayEntry<T> extends CellSystemTop {
    protected container: T;
    constructor(owner: T, index: number);
    readonly index: number;
    static getIndex(entry: ArrayEntry<any>): number;
    abstract clear(): this;
    abstract isClear(): boolean;
}
