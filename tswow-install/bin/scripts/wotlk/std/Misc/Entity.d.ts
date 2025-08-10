import { TransformedClass, TransformedClassReadOnly } from "../../../data/cell/cells/EnumCell";
import { ObjectifyOptions } from "../../../data/cell/serialization/ObjectIteration";
import { ArrayEntry } from "../../../data/cell/systems/ArraySystem";
import { CellSystem, CellSystemTop } from "../../../data/cell/systems/CellSystem";
import { EntityTags } from "../Tags/Tags";
export interface IMainEntity<T> {
    readonly row: T;
}
export interface IDeletable {
    isDeleted(): boolean;
    delete(): void;
    undelete(): void;
}
export declare class MainEntity<T extends IDeletable> extends CellSystemTop {
    readonly row: T;
    constructor(row: T);
    delete(): this;
    isDeleted(): boolean;
    undelete(): this;
    transform<T>(fn: (self: this) => T): T;
}
export declare abstract class MainEntityID<T extends IDeletable> extends MainEntity<T> {
    protected abstract get ID(): number;
    get Tags(): EntityTags<this>;
}
export declare class TwoRowMainEntity<DBC extends IDeletable, SQL extends IDeletable> extends CellSystemTop {
    readonly dbc_row: DBC;
    readonly sql_row: SQL;
    constructor(dbc: DBC, sql: SQL);
    delete(): this;
    isDeleted(): boolean;
    undelete(): this;
}
export declare abstract class TransformedEntity<R extends IDeletable, C> extends TransformedClass<C> {
    readonly row: R;
    constructor(row: R);
    delete(): this;
    isDeleted(): boolean;
    undelete(): this;
}
export declare abstract class TransformedEntityID<R extends IDeletable, C> extends TransformedEntity<R, C> {
    protected abstract get ID(): number;
    get Tags(): EntityTags<this>;
}
export declare abstract class TransformedEntityReadOnly<R extends IDeletable, C> extends TransformedClassReadOnly<C> {
    readonly row: R;
    constructor(row: R);
    delete(): this;
    isDeleted(): boolean;
    undelete(): this;
}
export declare abstract class TransformedEntityReadOnlyID<R extends IDeletable, C> extends TransformedEntityReadOnly<R, C> {
    abstract get ID(): number;
    get Tags(): EntityTags<this>;
}
export declare class ChildEntity<R extends IDeletable, T extends MainEntity<R>> extends CellSystem<T> {
    get row(): R;
}
export declare abstract class ArrayEntity<R extends IDeletable, O, A extends ArrayEntry<O>> extends MainEntity<R> {
    filter(callback: (value: A, index: number) => boolean): A[];
    findIndex(callback: (value: A, index: number) => boolean): number;
    find(callback: (value: A, index: number) => boolean): A;
    clear(index: number): this;
    clearAll(): this;
    forEach(callback: (value: A, index: number) => void): this;
    addGet(): A;
    addMod(callback: (value: A) => void): this;
    abstract get length(): number;
    mod(index: number, callback: (value: A) => void): this;
    abstract get(index: number): A;
    objectify(options?: ObjectifyOptions): any[];
}
