import { SQL } from "../../SQLFiles";
import { Cell } from "../../../data/cell/cells/Cell";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { game_event_quest_conditionRow } from "../../sql/game_event_quest_condition";
import { GameEventCondition } from "../GameEvent/GameEventCondition";
import { MaybeSQLEntity } from "../Misc/SQLDBCEntity";
import { Quest } from "./Quest";

export class GameEventConditionRef<T> extends CellSystem<T> {
    protected eventCell: Cell<number,any>
    protected conditionCell: Cell<number,any>

    constructor(owner: T , conditionCell: Cell<number,any>, eventCell: Cell<number,any>) {
        super(owner);
        this.eventCell = eventCell;
        this.conditionCell = conditionCell;
    }

    exists(): boolean {
        return this.conditionCell.get() > 0 && this.eventCell.get() > 0;
    }

    getRef(): GameEventCondition {
        return new GameEventCondition(
            SQL.game_event_condition.query(
                {
                      eventEntry:this.eventCell.get()
                    , condition_id:this.conditionCell.get()
                }))
    }

    getEventID() { return this.eventCell.get(); }
    getConditionID() { return this.conditionCell.get(); }

    set(event: number, condition: number) {
        this.eventCell.set(event);
        this.conditionCell.set(condition);
        return this.owner;
    }

    modRef(callback: (condition: GameEventCondition)=>void) {
        callback(this.getRef());
        return this.owner;
    }
}

export class QuestGameEventCondition extends MaybeSQLEntity<Quest,game_event_quest_conditionRow> {
    protected createSQL(): game_event_quest_conditionRow {
        return SQL.game_event_quest_condition.add(this.owner.ID)
            .eventEntry.set(0)
            .num.set(0)
    }
    protected findSQL(): game_event_quest_conditionRow {
        return SQL.game_event_quest_condition.query({quest:this.owner.ID})
    }
    protected isValidSQL(sql: game_event_quest_conditionRow): boolean {
        return sql.quest.get() === this.owner.ID;
    }

    get Condition() {
        return new GameEventConditionRef(this.owner,
                  this.wrapSQL(0, sql=>sql.condition_id)
                , this.wrapSQL(0, sql=>sql.eventEntry
        ))
    }

    get NumIncrease() {
        return this.wrapSQL(0, sql=>sql.num)
    }
}