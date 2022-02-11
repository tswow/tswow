import { makeMaskCell32 } from "../../../data/cell/cells/MaskCell";
import { spawn_group_templateRow } from "../../sql/spawn_group_template";
import { MainEntity } from "../Misc/Entity";
import { SpawnGroupBosses } from "./SpawnGroupBosses";

export enum SpawnGroupFlags {
    /**
     * No flags applied
     */
    NONE = 0x00,

    /**
     * This group is a system group (applies to standard groups 0-4)
     */
    SYSTEM = 0x01,

    /**
     * This group will contain legacy objects/creatures that don't work with dynamic spawn changes
     */
    COMPATIBILITY_MODE = 0x02,

    /**
     * This group will not be spawned by core by default. Scripts can manually spawn/despawn these groups on demand.
     */
    MANUAL_SPAWN = 0x04,

    /**
     * This group will have dynamic spawn rates applied (by default quest interested creatures/gos and gather nodes use this)
     */
    DYNAMIC_SPAWN_RATE = 0x08,

    /**
     * This group contains Escort quest NPCs. This further enhances Dynamic spawn to begin respawn time at the point a quest is taken and the escort begins
     */
    ESCORTQUESTNPC = 0x10,

}

export class SpawnGroup extends MainEntity<spawn_group_templateRow> {
    get Flags() {
        return makeMaskCell32(SpawnGroupFlags,this, this.row.groupFlags)
    }
    get ID() { return this.row.groupId.get()}
    get Name() { return this.wrap(this.row.groupName); }
    get Bosses() { return new SpawnGroupBosses(this); }
}