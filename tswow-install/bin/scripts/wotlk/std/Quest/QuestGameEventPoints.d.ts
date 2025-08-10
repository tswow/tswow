import { Cell } from "../../../data/cell/cells/Cell";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { game_event_quest_conditionRow } from "../../sql/game_event_quest_condition";
import { GameEventCondition } from "../GameEvent/GameEventCondition";
import { MaybeSQLEntity } from "../Misc/SQLDBCEntity";
import { Quest } from "./Quest";
export declare class GameEventConditionRef<T> extends CellSystem<T> {
    protected eventCell: Cell<number, any>;
    protected conditionCell: Cell<number, any>;
    constructor(owner: T, conditionCell: Cell<number, any>, eventCell: Cell<number, any>);
    exists(): boolean;
    getRef(): GameEventCondition;
    getEventID(): number;
    getConditionID(): number;
    set(event: number, condition: number): T;
    modRef(callback: (condition: GameEventCondition) => void): T;
}
export declare class QuestGameEventCondition extends MaybeSQLEntity<Quest, game_event_quest_conditionRow> {
    protected createSQL(): game_event_quest_conditionRow;
    protected findSQL(): game_event_quest_conditionRow;
    protected isValidSQL(sql: game_event_quest_conditionRow): boolean;
    get Condition(): GameEventConditionRef<Quest>;
    get NumIncrease(): import("../Misc/SQLDBCEntity").MaybeSQLCell<Quest, number, game_event_quest_conditionRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<Quest, game_event_quest_conditionRow>>;
}
