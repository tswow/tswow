import { Cell } from "../../../data/cell/cells/Cell";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { OffsetCell } from "../Misc/OffsetCell";
import { DayOfTheWeekCell } from "./DayOfTheWeek";
import { MonthCell } from "./Month";
export declare class HolidayPackedCell<T> extends Cell<number, T> {
    private readonly raw;
    private readonly offset;
    private readonly mask;
    private readonly name;
    constructor(owner: T, raw: Cell<number, any>, offset: number, length: number, name: string);
    get(): number;
    set(value: number): T;
}
export declare function HolidayMinutes<T>(owner: T, cell: Cell<number, any>): HolidayPackedCell<T>;
export declare function HolidayHours<T>(owner: T, cell: Cell<number, any>): HolidayPackedCell<T>;
export declare function HolidayDayOfTheWeek<T>(owner: T, cell: Cell<number, any>): HolidayPackedCell<T>;
export declare function HolidayMonthday<T>(owner: T, cell: Cell<number, any>): OffsetCell<T>;
export declare function HolidayMonth<T>(owner: T, cell: Cell<number, any>): MonthCell<T>;
export declare function HolidayYear<T>(owner: T, cell: Cell<number, any>): HolidayPackedCell<T>;
export declare function HolidayTimezone<T>(owner: T, cell: Cell<number, any>): HolidayPackedCell<T>;
export declare class HolidayFullDate<T> extends CellSystem<T> {
    protected cell: Cell<number, any>;
    constructor(owner: T, cell: Cell<number, any>);
    get Year(): HolidayPackedCell<T>;
    get Timezone(): HolidayPackedCell<T>;
    get Month(): MonthCell<T>;
    get DayOfMonth(): OffsetCell<T>;
    get DayOfWeek(): DayOfTheWeekCell<T>;
    get Hours(): HolidayPackedCell<T>;
    get Minutes(): HolidayPackedCell<T>;
    set(value: number): T;
    get(): number;
}
