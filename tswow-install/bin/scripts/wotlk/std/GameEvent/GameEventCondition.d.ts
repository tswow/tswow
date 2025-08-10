import { MultiRowSystem } from "../../../data/cell/systems/MultiRowSystem";
import { game_event_conditionRow } from "../../sql/game_event_condition";
import { MainEntity } from "../Misc/Entity";
export declare class GameEventCondition extends MainEntity<game_event_conditionRow> {
    get Index(): number;
    get Event(): import("../Refs/Ref").RefReadOnly<this, import("./GameEvent").GameEvent>;
    get RequiredNumber(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get MaxWorldState(): import("../Refs/Ref").RefStatic<this, import("../WorldState/WorldState").WorldState>;
    get DoneWorldState(): import("../Refs/Ref").RefStatic<this, import("../WorldState/WorldState").WorldState>;
}
export declare class GameEventConditions<T> extends MultiRowSystem<GameEventCondition, T> {
    protected readonly event: number;
    constructor(owner: T, event: number);
    protected getAllRows(): GameEventCondition[];
    add(mod: string, id: string, requiredNumber?: number, doneWorldState?: number, maxWorldState?: number): T;
    addMod(mod: string, id: string, callback: (condition: GameEventCondition) => void): T;
    addGet(mod: string, id: string): GameEventCondition;
    protected isDeleted(value: GameEventCondition): boolean;
}
