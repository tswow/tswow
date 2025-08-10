import { MaskCon } from "../../../data/cell/cells/MaskCell";
import { MultiRowSystem } from "../../../data/cell/systems/MultiRowSystem";
import { instance_spawn_groupsRow } from "../../sql/instance_spawn_groups";
import { MainEntity } from "../Misc/Entity";
import { SpawnGroup } from "./SpawnGroup";
export declare enum SpawnGroupBossFlags {
    ACTIVATE_SPAWN = 1,
    BLOCK_SPAWN = 2,
    HORDE_ONLY = 4,
    ALLIANCE_ONLY = 8
}
export declare enum BossStateMask {
    NOT_STARTED = 1,
    IN_PROGRESS = 2,
    FAIL = 4,
    DONE = 8,
    SPECIAL = 16,
    TO_BE_DECIDED = 32
}
export declare class SpawnGroupBossEntry extends MainEntity<instance_spawn_groupsRow> {
    get Map(): import("../Refs/Ref").RefReadOnly<this, import("../Map/Map").Map>;
    get Boss(): import("../../../data/cell/cells/MaskCell").MaskCellRead<this, typeof BossStateMask>;
    get States(): number;
    get SpawnGroup(): number;
    get Flags(): import("../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof SpawnGroupBossFlags>;
}
export declare class SpawnGroupBosses extends MultiRowSystem<SpawnGroupBossEntry, SpawnGroup> {
    protected getAllRows(): SpawnGroupBossEntry[];
    protected isDeleted(value: SpawnGroupBossEntry): boolean;
    addGet(map: number, boss: number, states: MaskCon<keyof typeof BossStateMask>): SpawnGroupBossEntry;
    add(map: number, boss: number, states: MaskCon<keyof typeof BossStateMask>, flags: MaskCon<keyof typeof SpawnGroupBossFlags>): SpawnGroup;
}
