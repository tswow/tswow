import { MultiRowSystem } from "../../../data/cell/systems/MultiRowSystem";
import { spawn_groupRow } from "../../sql/spawn_group";
import { MainEntity } from "../Misc/Entity";
import { SpawnGroup } from "./SpawnGroup";
export declare enum SpawnGroupEntryType {
    CREATURE = 0,
    ENUM = 1
}
export declare class SpawnGroupEntry extends MainEntity<spawn_groupRow> {
    get Type(): import("../../../data/cell/cells/EnumCell").EnumCellRead<this, typeof SpawnGroupEntryType>;
    get Group(): number;
    get SpawnID(): number;
    get Creature(): import("../Refs/Ref").RefReadOnly<this, import("../Creature/CreatureInstance").CreatureInstance>;
    get GameObject(): import("../Refs/Ref").RefReadOnly<this, import("../GameObject/GameObjectInstance").GameObjectInstance>;
}
export declare class SpawnGroupCreatureEntries extends MultiRowSystem<SpawnGroupEntry, SpawnGroup> {
    protected getAllRows(): SpawnGroupEntry[];
    protected isDeleted(value: SpawnGroupEntry): boolean;
    addCreature(creature: number): this;
    addGameObject(gobj: number): this;
}
