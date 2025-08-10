import { Cell } from "../../../data/cell/cells/Cell";
import { ObjectifyOptions } from "../../../data/cell/serialization/ObjectIteration";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
export declare enum ShiftedNumbers {
    STORED_AS_MINUS_ONE = 0,
    STORED_AS_PLUS_ONE = 1,
    NO_CHANGE = 2
}
export type ShiftedNumber = keyof typeof ShiftedNumbers;
export declare enum ShiftedNumberConversions {
    EFFECTIVE = 0,
    STORED = 1
}
export type ShiftedNumberConversion = keyof typeof ShiftedNumberConversions;
export declare function convertShiftedNumber(value: number, type: ShiftedNumber, conv: ShiftedNumberConversion): number;
export declare class ShiftedNumberCell<T> extends CellSystem<T> {
    protected numberType: ShiftedNumber | (() => ShiftedNumber);
    protected cell: Cell<number, any>;
    protected getType(): "STORED_AS_MINUS_ONE" | "STORED_AS_PLUS_ONE" | "NO_CHANGE";
    AsCell(): Cell<number, any>;
    constructor(owner: T, numberType: ShiftedNumber | (() => ShiftedNumber), cell: Cell<number, any>);
    get Type(): "STORED_AS_MINUS_ONE" | "STORED_AS_PLUS_ONE" | "NO_CHANGE" | (() => ShiftedNumber);
    objectify(options?: ObjectifyOptions): number | {
        effective: number;
        stored: number;
    };
    set(value: number, conversion?: ShiftedNumberConversion): T;
    get(conversion?: ShiftedNumberConversion): number;
}
