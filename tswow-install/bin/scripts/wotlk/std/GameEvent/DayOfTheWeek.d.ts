import { Cell } from "../../../data/cell/cells/Cell";
import { ObjectifyOptions } from "../../../data/cell/serialization/ObjectIteration";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
export declare const DaysOfTheWeek: readonly ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
export type DayOfTheWeek = typeof DaysOfTheWeek[number] | number;
export declare function resolveDayOfTheWeek(day: DayOfTheWeek): number;
export declare class DayOfTheWeekCell<T> extends CellSystem<T> {
    protected cell: Cell<number, any>;
    constructor(owner: T, cell: Cell<number, any>);
    getRaw(): number;
    get(): DayOfTheWeek;
    set(value: DayOfTheWeek): T;
    objectify(options?: ObjectifyOptions): DayOfTheWeek;
}
