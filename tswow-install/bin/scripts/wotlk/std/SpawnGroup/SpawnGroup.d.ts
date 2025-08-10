import { spawn_group_templateRow } from "../../sql/spawn_group_template";
import { MainEntity } from "../Misc/Entity";
import { SpawnGroupBosses } from "./SpawnGroupBosses";
export declare enum SpawnGroupFlags {
    /**
     * No flags applied
     */
    NONE = 0,
    /**
     * This group is a system group (applies to standard groups 0-4)
     */
    SYSTEM = 1,
    /**
     * This group will contain legacy objects/creatures that don't work with dynamic spawn changes
     */
    COMPATIBILITY_MODE = 2,
    /**
     * This group will not be spawned by core by default. Scripts can manually spawn/despawn these groups on demand.
     */
    MANUAL_SPAWN = 4,
    /**
     * This group will have dynamic spawn rates applied (by default quest interested creatures/gos and gather nodes use this)
     */
    DYNAMIC_SPAWN_RATE = 8,
    /**
     * This group contains Escort quest NPCs. This further enhances Dynamic spawn to begin respawn time at the point a quest is taken and the escort begins
     */
    ESCORTQUESTNPC = 16
}
export declare class SpawnGroup extends MainEntity<spawn_group_templateRow> {
    get Flags(): import("../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof SpawnGroupFlags>;
    get ID(): number;
    get Name(): import("../../../data/cell/cells/Cell").CellWrapper<string, this>;
    get Bosses(): SpawnGroupBosses;
}
