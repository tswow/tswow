import { Cell } from "wotlkdata/cell/cells/Cell";
import { EnumCell } from "wotlkdata/cell/cells/EnumCell";
import { CellSystem } from "wotlkdata/cell/systems/CellSystem";
import { SQL } from "wotlkdata/sql/SQLFiles";
import { game_eventQuery, game_eventRow } from "wotlkdata/sql/types/game_event";
import { convertTime, DurationCell, TimeUnit } from "../Misc/DurationCell";
import { MainEntity } from "../Misc/Entity";
import { Ids } from "../Misc/Ids";
import { RefReadOnly, RefStatic } from "../Refs/RefOld";
import { default_end_date, makeSQLDate, SQLDateCell } from "./Date";
import { DayOfTheWeek, resolveDayOfTheWeek } from "./DayOfTheWeek";
import { GameEventConditions } from "./GameEventCondition";
import { GameEventPrerequisitesBackward, GameEventPrerequisitesForward } from "./GameEventPrerequisites";

export class GameEventOccurrence extends CellSystem<GameEvent> {
    setYearly(startMonth: number, startDay: number, startHour: number = 0, startMinute = 0) {
        GameEvent.checkHoliday(this.owner);
        this.owner.row.occurence.set(BigInt(525600));
        this.owner.row.start_time.set(
            makeSQLDate(2004,startMonth,startDay,startHour,startMinute))
        return this.owner;
    }

    setWeekly(day: DayOfTheWeek, hour: number, minute: number) {
        GameEvent.checkHoliday(this.owner);
        this.owner.row.occurence.set(BigInt(10080))
        this.owner.row.start_time.set(
            makeSQLDate(2016,10,23+resolveDayOfTheWeek(day),hour,minute)
        );
        return this.owner;
    }

    set(startHour: number, startMinute: number, waitTime: number, unit: TimeUnit = 'minutes') {
        GameEvent.checkHoliday(this.owner);
        this.owner.row.occurence.set(BigInt(convertTime(waitTime,unit,'minutes')));
        this.owner.row.start_time.set(
            makeSQLDate(2016,10,28,startHour,startMinute)
        );
        return this.owner;
    }

    setHourly(hour: number, minute: number) {
        GameEvent.checkHoliday(this.owner);
        return this.set(hour,minute,60);
    }

    setDaily(hour: number, minute: number) {
        GameEvent.checkHoliday(this.owner);
        return this.set(hour,minute,1440);
    }

    get StartDate() {
        return new SQLDateCell(this.owner, this.owner.row.start_time);
    }

    get EndDate() {
        return new SQLDateCell(this.owner, this.owner.row.end_time);
    }

    get Period() {
        return new DurationCell(
              this.owner
            , 'minutes'
            , true
            , new GameEventBigIntCell(this.owner, this.owner.row.occurence)
        );
    }
}

/**
 * Occurrence and length
 */
class GameEventBigIntCell extends Cell<number,GameEvent> {
    protected cell: Cell<bigint,any>

    constructor(owner: GameEvent, cell: Cell<bigint,any>) {
        super(owner);
        this.cell = cell;
    }

    get(): number {
        return Number(this.cell.get());
    }

    set(value: number) {
        GameEvent.checkHoliday(this.owner);
        this.cell.set(BigInt(value));
        return this.owner;
    }
}

export class GameEventState extends EnumCell<GameEvent> {
    set(value: number) {
        GameEvent.checkHoliday(this.owner);
        return super.set(value);
    }

    /** Enum Value = 0 */
    get Normal() { return this.value(0); }

    /** Enum Value = 1 */
    get WorldEvent() {
        return this.value(1,()=>{
            this.owner.row.start_time.set(null as any);
            this.owner.row.end_time.set(null as any);
            this.owner.row.occurence.set(BigInt(0));
            this.owner.row.length.set(BigInt(0));
        });
    }

    /** Enum Value = 5 */
    get Internal() { return this.value(5); }
}

export class GameEvent extends MainEntity<game_eventRow> {
    get ID() { return this.row.eventEntry.get(); }
    get Type() { return new GameEventState(this, this.row.world_event)}
    get Length() { return this.wrap(this.row.length); }

    get Occurrence() { return new GameEventOccurrence(this); }

    get Duration() {
        return new DurationCell(
              this
            , 'minutes'
            , true
            , new GameEventBigIntCell(this, this.row.length)
        );
    }

    get Prerequisites() {
        return new GameEventPrerequisitesForward(this);
    }

    get PrerequisiteFor() {
        return new GameEventPrerequisitesBackward(this);
    }

    get Conditions() { return new GameEventConditions(this, this.ID); }

    static checkHoliday(event: GameEvent) {
        if(event.row.holiday.get() !== 0) {
            throw new Error(
                  `Do not set event times or durations for holiday `
                + `game events. Instead, change them in the holiday itself.`
            )
        }
    }

    static updateHolidayOccurrence(event: GameEvent, type: number) {
        // note: tswow only supports weekly and yearly holidays for now
        switch(type) {
            case 0:
                event.row.occurence.set(BigInt(10080))
                break;
            case 1:
            case -1:
                event.row.occurence.set(BigInt(525600))
                break;
            // Don't actually change it here, the change should come
            // (and if it doesn't we probably don't want to change anything)
            case 2:
                break;
        }
    }
}

export const GameEventRegistry = {
    create(mod: string, id: string, parent = 0) {
        return new GameEvent(
            parent
            ? SQL.game_event.find({eventEntry:parent})
                .clone(Ids.game_event.id(mod,id))
            : SQL.game_event.add(Ids.game_event.id(mod,id))
                .end_time.set(default_end_date)
                .holidayStage.set(0)
                .holiday.set(0)
                .start_time.set('2004-01-01:07:00:00')
                .occurence.set(BigInt(1))
                .length.set(BigInt(1))
                .description.set('tswow')
        )
    },

    load(id: number) {
        let res = SQL.game_event.find({eventEntry:id});
        return (res ? new GameEvent(res) : undefined) as GameEvent;
    },

    filter(query: game_eventQuery) {
        return SQL.game_event
            .filter(query)
            .map(x=>new GameEvent(x))
    },

    find(query: game_eventQuery) {
        let res = SQL.game_event.find(query)
        return(res ? new GameEvent(res) : undefined) as GameEvent
    }
}

export class GameEventRef<T> extends RefStatic<T,GameEvent> {
    protected create(mod: string, id: string): GameEvent {
        return GameEventRegistry.create(mod,id);
    }
    protected clone(mod: string, id: string): GameEvent {
        return GameEventRegistry.create(mod,id,this.cell.get());
    }
    exists(): boolean {
        return this.cell.get() > 0;
    }
    protected id(v: GameEvent): number {
        return v.ID;
    }
    protected resolve(): GameEvent {
        return GameEventRegistry.load(this.cell.get());
    }
}

export class GameEventRefReadOnly<T> extends RefReadOnly<T,GameEvent> {
    getRef(): GameEvent {
        return GameEventRegistry.load(this.cell.get())
    }
    exists(): boolean {
        return this.cell.get() > 0;
    }
}