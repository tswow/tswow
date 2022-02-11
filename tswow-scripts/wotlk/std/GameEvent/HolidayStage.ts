import { DummyCell } from "../../../data/cell/cells/DummyCell";
import { MulticastCell } from "../../../data/cell/cells/MulticastCell";
import { ArrayEntry, ArraySystem } from "../../../data/cell/systems/ArraySystem";
import { MultiRowSystem } from "../../../data/cell/systems/MultiRowSystem";
import { SQL } from "../../SQLFiles";
import { holiday_datesRow } from "../../sql/holiday_dates";
import { CellBasic } from "../GameObject/ElevatorKeyframes";
import { DurationCell, TimeUnit } from "../Misc/DurationCell";
import { makeSQLDate } from "./Date";
import { DayOfTheWeek, DayOfTheWeekCell } from "./DayOfTheWeek";
import { GameEvent, GameEventRegistry } from "./GameEvent";
import { HolidayAnnual, HolidayBase, HolidayCustomPeriod, HolidayWeekly } from "./Holiday";
import { HolidayDayOfTheWeek, HolidayFullDate, HolidayHours, HolidayMinutes, HolidayMonth, HolidayMonthday } from "./HolidayDates";
import { Month } from "./Month";

export class GameEventsBase<O,V extends HolidayBase,T extends HolidayStageBase<V>> extends MultiRowSystem<GameEvent,O> {
    protected stage: T;

    constructor(owner: O, stage: T) {
        super(owner);
        this.stage = stage;
    }

    protected getAllRows(): GameEvent[] {
        return GameEventRegistry.queryAll({
              holiday:HolidayStageBase.Holiday(this.stage).ID
            , holidayStage:this.stage.index
        })
    }

    protected isDeleted(value: GameEvent): boolean {
        return value.row.isDeleted();
    }

    addGet(mod: string, id: string) {
        let holiday = HolidayStageBase.Holiday(this.stage);
        let event = GameEventRegistry.create(mod,id)
        event.row.holiday.set(holiday.ID)
                 .holidayStage.set(this.stage.index)
                 .description.set('tswow')
        // update date, duration and occurrence so game event receives it
        let date = HolidayStageBase.Date(this.stage);
        date.set(date.get());
        this.stage.Duration.set(this.stage.Duration.get());
        GameEvent.updateHolidayOccurrence(event,holiday.Type.get())
        return event;
    }
}

export class GameEventsStages<V extends HolidayBase,T extends HolidayStageBase<V>> extends GameEventsBase<T,V,T> {
    addMod(mod: string, id: string, callback: (event: GameEvent)=>void = ()=>{}) {
        callback(this.addGet(mod,id));
        return this.owner;
    }
}

export class GameEventsPeriod extends GameEventsBase<HolidayCustomPeriod,HolidayCustomPeriod,HolidayPeriod> {
    addGet(mod: string, id: string) {
        let row = super.addGet(mod,id);
        // force update period
        this.stage.Period.set(this.stage.Period.get());
        return row;
    }
    addMod(mod: string, id: string, callback: (event: GameEvent)=>void = ()=>{}) {
        callback(this.addGet(mod,id));
        return this.owner;
    }
}

export class HolidayStageBase<T extends HolidayBase> extends ArrayEntry<T> {
    private _sql?: holiday_datesRow
    protected sql() {
        if(this._sql !== undefined
            && this._sql.id.get() === this.container.ID
            && this._sql.date_id.get() === this.index
        ) return this._sql;
        return this._sql = SQL.holiday_dates
            .query({id:this.container.ID,date_id:this.index})
            || SQL.holiday_dates.add(this.container.ID,this.index)
                  .date_value.set(this.DBCDate().get())
                  .holiday_duration.set(this.DBCDuration().get())
    }

    static Holiday(base: HolidayStageBase<HolidayBase>) {
        return base.container;
    }

    private DBCDuration() {
        return this.index >= 10
            ? new DummyCell(this, 0)
            : this.wrapIndex(this.container.row.Duration,this.index)
    }

    private DBCDate() {
        return this.index >= 26
            ? new DummyCell(this, 0)
            : this.wrapIndex(this.container.row.Date,this.index)
    }

    get Duration() {
        return new DurationCell(
              this
            , 'HOURS'
            , true
            , new MulticastCell(this,
                [
                      this.sql().holiday_duration
                    , this.DBCDuration()
                    , new CellBasic(this,()=>0,(value)=>{
                        this._GameEvents.forEach(x=>{
                            // convert to minutes
                            x.row.length.set(BigInt(value*60));
                        })
                    })
                ]
            )
        )
    }

    static Date(stage: HolidayStageBase<any>) {
        return stage.Date;
    }
    protected get Date() {
        return new MulticastCell(this,
            [
                  this.sql().date_value
                , this.DBCDate()
                , new CellBasic(this,()=>0,(value)=>{
                    this._GameEvents.forEach(x=>{
                        let full = new HolidayFullDate(this,new DummyCell(this,value))

                        let year = 2004;
                        let month;
                        let monthDay;

                        let type = this.container.Type.get();
                        switch(type) {
                            // weekly
                            case 0:
                                month = 1;
                                monthDay = 4 + full.DayOfWeek.getRaw()
                                break;
                            // annual
                            case -1:
                            case 1:
                                month = full.Month.getRaw()
                                monthDay = full.DayOfMonth.get()
                                break;
                            // custom period
                            case 2:
                                year = 2016
                                // call to arms are offset + 1 in tc db
                                month = (full.Month.getRaw()%12)+1
                                monthDay = full.DayOfMonth.get()
                                break;
                            default:
                                throw new Error(`Invalid container type:${type}`)
                        }

                        x.row.start_time.set(makeSQLDate(
                              year
                            , month
                            , monthDay
                            , full.Hours.get()
                            , full.Minutes.get()
                        ))
                    })
                })
            ])
    }

    protected get _GameEvents(): GameEventsBase<this,T,this> { return new GameEventsBase(this,this); }


    /**
     * @deprecated Using this manually will likely break your dates
     */
    get FullDate() { return new HolidayFullDate(this, this.Date); }

    clear(): this {
        this.Date.set(0);
        this.Duration.set(0)
        return this;
    }

    isClear(): boolean {
        return this.Date.get() === 0 && this.Duration.get() === 0;
    }
}

export class HolidayAnnualStage extends HolidayStageBase<HolidayAnnual> {
    get Month() { return HolidayMonth(this, this.Date); }
    get DayOfMonth() { return HolidayMonthday(this, this.Date); }
    get Hour() { return HolidayHours(this, this.Date)}
    get Minute() { return HolidayMinutes(this, this.Date)}
    get GameEvents() { return new GameEventsStages(this, this)}

    set(startMonth: Month, startDay: number, startHour: number, startMinute: number, duration: number, durationType: TimeUnit) {
        this.Month.set(startMonth);
        this.DayOfMonth.set(startDay);
        this.Hour.set(startHour);
        this.Minute.set(startMinute);
        this.Duration.set(duration,durationType);
        return this;
    }
}

export class HolidayAnnualStages extends ArraySystem<HolidayAnnualStage,HolidayAnnual> {
    get length(): number {
        return 26;
    }
    get(index: number): HolidayAnnualStage {
        return new HolidayAnnualStage(this.owner, index);
    }

    add(startMonth: Month, startDay: number, startHour: number, startMinute: number, duration: number, durationType: TimeUnit) {
        this.addGet().set(startMonth,startDay,startHour,startMinute,duration,durationType);
        return this.owner;
    }

    addGet() {
        return super.addGet()
            .FullDate.set(529823808)
            .FullDate.Year.set(31)
            .FullDate.DayOfWeek.set(0)
    }

    addMod(callback: (value: HolidayAnnualStage)=>void) {
        callback(this.addGet());
        return this.owner;
    }
}

export class HolidayWeeklyStage extends HolidayStageBase<HolidayWeekly> {
    get DayOfWeek() {
        return new DayOfTheWeekCell(this, HolidayDayOfTheWeek(this, this.Date))
    }
    get Hour() { return HolidayHours(this, this.Date); }
    get Minute() { return HolidayMinutes(this, this.Date); }

    get GameEvents() { return new GameEventsStages(this, this)}

    set(day: DayOfTheWeek, startHour: number, startMinute: number, duration: number, timeUnit: TimeUnit) {
        this.DayOfWeek.set(day);
        this.Hour.set(startHour);
        this.Minute.set(startMinute);
        this.Duration.set(duration, timeUnit);
        return this;
    }
}

export class HolidayWeeklyStages extends ArraySystem<HolidayWeeklyStage,HolidayWeekly> {
    get length(): number {
        return 26;
    }

    get(index: number): HolidayWeeklyStage {
        return new HolidayWeeklyStage(this.owner, index);
    }

    addGet() {
        return super.addGet().FullDate.set(536867712)
    }

    addMod(callback: (value: HolidayWeeklyStage)=>void) {
        callback(this.addGet());
        return this.owner;
    }

    addWithEvent(mod: string, id: string, day: DayOfTheWeek, startHour: number, startMinute: number, duration: number, durationType: TimeUnit) {
        this.addGet().set(day,startHour,startMinute,duration,durationType)
            .GameEvents.addMod(mod,id);
        return this.owner;
    }

    add(day: DayOfTheWeek, startHour: number, startMinute: number, duration: number, durationType: TimeUnit) {
        this.addGet().set(day,startHour,startMinute,duration,durationType);
        return this.owner;
    }
}

export class HolidayPeriod extends HolidayStageBase<HolidayCustomPeriod> {
    get StartMonth() {  return HolidayMonth(this.container, this.Date); }
    get StartDay() {  return HolidayMonthday(this.container, this.Date); }
    get StartHour() {  return HolidayHours(this.container, this.Date); }
    get StartMinutes() {  return HolidayMinutes(this.container, this.Date); }

    get GameEvents() { return new GameEventsPeriod(this.container, this); }

    // periods are hardcoded at duration index 1
    get Period() {
        return new DurationCell(
              this.container
            , 'HOURS'
            , true
            , new CellBasic(null,
                  ()=>this.container.row.Duration.getIndex(1)
                , (value)=>{
                    this.container.row.Duration.setIndex(1,value)
                    this._GameEvents.forEach(x=>{
                        x.row.occurence.set(BigInt(value*60));
                    });
                })
        )
    }
}