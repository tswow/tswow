import { MulticastCell } from "../../../data/cell/cells/MulticastCell";
import { ArrayEntry, ArraySystem } from "../../../data/cell/systems/ArraySystem";
import { MultiRowSystem } from "../../../data/cell/systems/MultiRowSystem";
import { holiday_datesRow } from "../../sql/holiday_dates";
import { DurationCell, TimeUnit } from "../Misc/DurationCell";
import { DayOfTheWeek, DayOfTheWeekCell } from "./DayOfTheWeek";
import { GameEvent } from "./GameEvent";
import { HolidayAnnual, HolidayBase, HolidayCustomPeriod, HolidayWeekly } from "./Holiday";
import { HolidayFullDate } from "./HolidayDates";
import { Month } from "./Month";
export declare class GameEventsBase<O, V extends HolidayBase, T extends HolidayStageBase<V>> extends MultiRowSystem<GameEvent, O> {
    protected stage: T;
    constructor(owner: O, stage: T);
    protected getAllRows(): GameEvent[];
    protected isDeleted(value: GameEvent): boolean;
    addGet(mod: string, id: string): GameEvent;
}
export declare class GameEventsStages<V extends HolidayBase, T extends HolidayStageBase<V>> extends GameEventsBase<T, V, T> {
    addMod(mod: string, id: string, callback?: (event: GameEvent) => void): T;
}
export declare class GameEventsPeriod extends GameEventsBase<HolidayCustomPeriod, HolidayCustomPeriod, HolidayPeriod> {
    addGet(mod: string, id: string): GameEvent;
    addMod(mod: string, id: string, callback?: (event: GameEvent) => void): HolidayCustomPeriod;
}
export declare class HolidayStageBase<T extends HolidayBase> extends ArrayEntry<T> {
    private _sql?;
    protected sql(): holiday_datesRow;
    static Holiday(base: HolidayStageBase<HolidayBase>): HolidayBase;
    private DBCDuration;
    private DBCDate;
    get Duration(): DurationCell<this>;
    static Date(stage: HolidayStageBase<any>): MulticastCell<number, HolidayStageBase<any>>;
    protected get Date(): MulticastCell<number, this>;
    protected get _GameEvents(): GameEventsBase<this, T, this>;
    /**
     * @deprecated Using this manually will likely break your dates
     */
    get FullDate(): HolidayFullDate<this>;
    clear(): this;
    isClear(): boolean;
}
export declare class HolidayAnnualStage extends HolidayStageBase<HolidayAnnual> {
    get Month(): import("./Month").MonthCell<this>;
    get DayOfMonth(): import("../Misc/OffsetCell").OffsetCell<this>;
    get Hour(): import("./HolidayDates").HolidayPackedCell<this>;
    get Minute(): import("./HolidayDates").HolidayPackedCell<this>;
    get GameEvents(): GameEventsStages<HolidayBase, this>;
    set(startMonth: Month, startDay: number, startHour: number, startMinute: number, duration: number, durationType: TimeUnit): this;
}
export declare class HolidayAnnualStages extends ArraySystem<HolidayAnnualStage, HolidayAnnual> {
    get length(): number;
    get(index: number): HolidayAnnualStage;
    add(startMonth: Month, startDay: number, startHour: number, startMinute: number, duration: number, durationType: TimeUnit): HolidayAnnual;
    addGet(): HolidayAnnualStage;
    addMod(callback: (value: HolidayAnnualStage) => void): HolidayAnnual;
}
export declare class HolidayWeeklyStage extends HolidayStageBase<HolidayWeekly> {
    get DayOfWeek(): DayOfTheWeekCell<this>;
    get Hour(): import("./HolidayDates").HolidayPackedCell<this>;
    get Minute(): import("./HolidayDates").HolidayPackedCell<this>;
    get GameEvents(): GameEventsStages<HolidayBase, this>;
    set(day: DayOfTheWeek, startHour: number, startMinute: number, duration: number, timeUnit: TimeUnit): this;
}
export declare class HolidayWeeklyStages extends ArraySystem<HolidayWeeklyStage, HolidayWeekly> {
    get length(): number;
    get(index: number): HolidayWeeklyStage;
    addGet(): HolidayWeeklyStage;
    addMod(callback: (value: HolidayWeeklyStage) => void): HolidayWeekly;
    addWithEvent(mod: string, id: string, day: DayOfTheWeek, startHour: number, startMinute: number, duration: number, durationType: TimeUnit): HolidayWeekly;
    add(day: DayOfTheWeek, startHour: number, startMinute: number, duration: number, durationType: TimeUnit): HolidayWeekly;
}
export declare class HolidayPeriod extends HolidayStageBase<HolidayCustomPeriod> {
    get StartMonth(): import("./Month").MonthCell<HolidayCustomPeriod>;
    get StartDay(): import("../Misc/OffsetCell").OffsetCell<HolidayCustomPeriod>;
    get StartHour(): import("./HolidayDates").HolidayPackedCell<HolidayCustomPeriod>;
    get StartMinutes(): import("./HolidayDates").HolidayPackedCell<HolidayCustomPeriod>;
    get GameEvents(): GameEventsPeriod;
    get Period(): DurationCell<HolidayCustomPeriod>;
}
