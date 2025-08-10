import { CPrim } from "../../../data/cell/cells/Cell";
import { ObjectifyOptions } from "../../../data/cell/serialization/ObjectIteration";
import { ArrayEntry, ArraySystem } from "../../../data/cell/systems/ArraySystem";
import { DBCArrayCell } from "../../../data/dbc/DBCCell";
export declare class SingleArrayEntry<D extends CPrim, T> extends ArrayEntry<T> {
    protected array: DBCArrayCell<D, any>;
    protected clearValue: D;
    constructor(owner: T, index: number, array: DBCArrayCell<D, any>, clearValue: D);
    clear(): this;
    isClear(): boolean;
    set(value: D): void;
    get(): D;
    objectify(options?: ObjectifyOptions): D;
}
export declare class SingleArraySystem<D extends CPrim, T> extends ArraySystem<SingleArrayEntry<D, T>, T> {
    protected array: DBCArrayCell<D, any>;
    protected _clearValue: D;
    constructor(owner: T, array: DBCArrayCell<D, any>, clearValue: D);
    get length(): number;
    getIndex(index: number): D;
    setIndex(index: number, value: D): T;
    get(index: number): SingleArrayEntry<D, T>;
    add(value: D): T;
}
