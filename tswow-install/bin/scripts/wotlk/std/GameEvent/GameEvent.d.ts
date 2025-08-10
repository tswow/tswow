import { EnumCell } from "../../../data/cell/cells/EnumCell";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { Table } from "../../../data/table/Table";
import { game_eventQuery, game_eventRow } from "../../sql/game_event";
import { DurationCell, TimeUnit } from "../Misc/DurationCell";
import { MainEntityID } from "../Misc/Entity";
import { StaticIDGenerator } from "../Misc/Ids";
import { RegistryStaticNoClone } from "../Refs/Registry";
import { SQLDateCell } from "./Date";
import { DayOfTheWeek } from "./DayOfTheWeek";
import { GameEventConditions } from "./GameEventCondition";
import { GameEventPrerequisitesBackward, GameEventPrerequisitesForward } from "./GameEventPrerequisites";
export declare class GameEventOccurrence extends CellSystem<GameEvent> {
    setYearly(startMonth: number, startDay: number, startHour?: number, startMinute?: number): GameEvent;
    setWeekly(day: DayOfTheWeek, hour: number, minute: number): GameEvent;
    set(startHour: number, startMinute: number, waitTime: number, unit?: TimeUnit): GameEvent;
    setHourly(hour: number, minute: number): GameEvent;
    setDaily(hour: number, minute: number): GameEvent;
    get StartDate(): SQLDateCell<GameEvent>;
    get EndDate(): SQLDateCell<GameEvent>;
    get Period(): DurationCell<GameEvent>;
}
export declare class GameEventState extends EnumCell<GameEvent> {
    set(value: number): GameEvent;
    get NORMAL(): import("../../../data/cell/cells/EnumCell").EnumValue<GameEvent>;
    get WORLD_EVENT(): import("../../../data/cell/cells/EnumCell").EnumValue<GameEvent>;
    get INTERNAL(): import("../../../data/cell/cells/EnumCell").EnumValue<GameEvent>;
}
export declare class GameEvent extends MainEntityID<game_eventRow> {
    get ID(): number;
    get Type(): GameEventState;
    get Occurrence(): GameEventOccurrence;
    get Duration(): DurationCell<this>;
    get Prerequisites(): GameEventPrerequisitesForward;
    get PrerequisiteFor(): GameEventPrerequisitesBackward;
    get Conditions(): GameEventConditions<this>;
    get InlineScripts(): _hidden.GameEvent<this>;
    static checkHoliday(event: GameEvent): void;
    static updateHolidayOccurrence(event: GameEvent, type: number): void;
}
export declare class GameEventRegistryClass extends RegistryStaticNoClone<GameEvent, game_eventRow, game_eventQuery> {
    protected Table(): Table<any, game_eventQuery, game_eventRow> & {
        add: (id: number) => game_eventRow;
    };
    protected IDs(): StaticIDGenerator;
    Clear(event: GameEvent): void;
    protected FindByID(id: number): game_eventRow;
    protected EmptyQuery(): game_eventQuery;
    ID(e: GameEvent): number;
    protected Entity(r: game_eventRow): GameEvent;
}
export declare const GameEventRegistry: GameEventRegistryClass;
