import { Cell } from "../../../data/cell/cells/Cell";
import { ObjectifyOptions } from "../../../data/cell/serialization/ObjectIteration";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
export declare const Months: readonly ["JANUARY", "FEBRUARY", "MARS", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
export type Month = typeof Months[number] | number;
export declare function resolveMonth(month: Month): number;
export declare class MonthCell<T> extends CellSystem<T> {
    protected cell: Cell<number, any>;
    constructor(owner: T, cell: Cell<number, any>);
    getRaw(): number;
    get(): Month;
    set(value: Month): T;
    objectify(options?: ObjectifyOptions): Month;
}
