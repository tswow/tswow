import { GetIdRange } from "../../../util/ids/Ids";
import { MultiRowSystem } from "../../../data/cell/systems/MultiRowSystem";
import { SQL } from "../../SQLFiles";
import { game_event_conditionRow } from "../../sql/game_event_condition";
import { MainEntity } from "../Misc/Entity";
import { WorldStateRegistry } from "../WorldState/WorldState";
import { GameEventRegistry } from "./GameEvent";

export class GameEventCondition extends MainEntity<game_event_conditionRow> {
    get Index() { return this.row.condition_id.get(); }
    get Event() {
        return GameEventRegistry.readOnlyRef(this, this.row.eventEntry);
    }
    get RequiredNumber() { return this.wrap(this.row.req_num) }

    get MaxWorldState() {
        return WorldStateRegistry.refCreate(this, this.row.max_world_state_field)
    }

    get DoneWorldState() {
        return WorldStateRegistry.refCreate(this, this.row.done_world_state_field)
    }
}

export class GameEventConditions<T> extends MultiRowSystem<GameEventCondition,T> {
    protected readonly event: number;

    constructor(owner: T, event: number) {
        super(owner);
        this.event = event;
    }

    protected getAllRows(): GameEventCondition[] {
        return SQL.game_event_condition
        .queryAll({eventEntry:this.event})
        .map(x=>new GameEventCondition(x))
        .sort((a,b)=>a.Index < b.Index ? 1 : -1)
    }

    add(mod: string, id: string, requiredNumber = 0, doneWorldState = 0, maxWorldState = 0) {
        this.addGet(mod,id)
            .RequiredNumber.set(requiredNumber)
            .MaxWorldState.set(maxWorldState)
            .DoneWorldState.set(doneWorldState)
        return this.owner;
    }

    addMod(mod: string, id: string, callback: (condition: GameEventCondition)=>void) {
        callback(this.addGet(mod,id));
        return this.owner;
    }

    addGet(mod: string, id: string) {
        // we want these to be unique per game_event
        let range = GetIdRange(
            `game_event_condition_${this.event}`, mod, id, 1, 1
        )

        return new GameEventCondition(
            SQL.game_event_condition
                .add(this.event, range.low)
                .done_world_state_field.set(0)
                .max_world_state_field.set(0)
                .req_num.set(0)
                .done_world_state_field.set(0)
                .max_world_state_field.set(0)
                .description.set('tswow')
        )
    }

    protected isDeleted(value: GameEventCondition): boolean {
        return value.row.isDeleted();
    }
}
