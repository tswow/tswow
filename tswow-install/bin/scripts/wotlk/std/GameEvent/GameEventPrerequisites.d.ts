import { MultiRowSystem } from "../../../data/cell/systems/MultiRowSystem";
import { game_event_prerequisiteRow } from "../../sql/game_event_prerequisite";
import { MainEntity } from "../Misc/Entity";
import { GameEvent } from "./GameEvent";
export declare class GameEventPrerequisite extends MainEntity<game_event_prerequisiteRow> {
    get Event(): import("../Refs/Ref").RefReadOnly<this, GameEvent>;
    get Prerequisite(): import("../Refs/Ref").RefReadOnly<this, GameEvent>;
}
export declare class GameEventPrerequisitesForward extends MultiRowSystem<GameEventPrerequisite, GameEvent> {
    protected getAllRows(): GameEventPrerequisite[];
    add(prerequisite: number): GameEvent;
    protected isDeleted(value: GameEventPrerequisite): boolean;
}
export declare class GameEventPrerequisitesBackward extends MultiRowSystem<GameEventPrerequisite, GameEvent> {
    protected getAllRows(): GameEventPrerequisite[];
    add(event: number): GameEvent;
    protected isDeleted(value: GameEventPrerequisite): boolean;
}
