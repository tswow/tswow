import { Cell } from "../../../data/cell/cells/Cell";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { CellBasic } from "../GameObject/ElevatorKeyframes";
export declare function makeSQLDate(year: number, month: number, day: number, hours?: number, minutes?: number, seconds?: number): string;
export declare function splitSQLDate(dateString: string): {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    seconds: number;
};
export declare const default_end_date: string;
export declare class SQLDateCell<T> extends CellSystem<T> {
    protected cell: Cell<string, any>;
    private reconstruct;
    private split;
    private makeCell;
    constructor(owner: T, cell: Cell<string, any>);
    get Year(): CellBasic<number, T>;
    get Month(): CellBasic<number, T>;
    get Day(): CellBasic<number, T>;
    get Hour(): CellBasic<number, T>;
    get Minute(): CellBasic<number, T>;
    get Second(): CellBasic<number, T>;
    set(year: number, month?: number, day?: number, hour?: number, minute?: number, seconds?: number): T;
}
