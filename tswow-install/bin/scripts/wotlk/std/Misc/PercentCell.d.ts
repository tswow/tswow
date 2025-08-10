import { Cell } from "../../../data/cell/cells/Cell";
import { ObjectifyOptions } from "../../../data/cell/serialization/ObjectIteration";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
export declare const PercentUnits: readonly ["[0-1]", "[0-100]", "[1-101]", "[0-99]", "AUTO"];
export type PercentUnit = typeof PercentUnits[number];
export declare function convertPercent(num: number, from: PercentUnit, to: PercentUnit): number;
export declare class PercentCell<T> extends CellSystem<T> {
    protected cell: Cell<number, any>;
    protected unit: PercentUnit | (() => PercentUnit);
    protected getUnit(): "[0-1]" | "[0-100]" | "[1-101]" | "[0-99]" | "AUTO";
    protected isRounded: boolean;
    constructor(owner: T, unit: PercentUnit | (() => PercentUnit), isRounded: boolean, cell: Cell<number, any>);
    get IsRounded(): boolean;
    get(type?: PercentUnit): number;
    set(value: number, type?: PercentUnit): T;
    objectify(options?: ObjectifyOptions): string;
}
