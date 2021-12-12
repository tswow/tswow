import { SQL } from "wotlkdata";
import { getBits, makeMaskCell32, makeMaskCell32ReadOnly, MaskCon } from "wotlkdata/wotlkdata/cell/cells/MaskCell";
import { MultiRowSystem } from "wotlkdata/wotlkdata/cell/systems/MultiRowSystem";
import { instance_spawn_groupsRow } from "wotlkdata/wotlkdata/sql/types/instance_spawn_groups";
import { MapRegistry } from "../Map/Maps";
import { MainEntity } from "../Misc/Entity";
import { SpawnGroup } from "./SpawnGroup";

export enum SpawnGroupBossFlags {
    ACTIVATE_SPAWN = 0x01,
    BLOCK_SPAWN    = 0x02,
    HORDE_ONLY     = 0x04,
    ALLIANCE_ONLY  = 0x08,
}

export enum BossStateMask {
    NOT_STARTED   = 0x1,
    IN_PROGRESS   = 0x2,
    FAIL          = 0x4,
    DONE          = 0x8,
    SPECIAL       = 0x10,
    TO_BE_DECIDED = 0x20,
}

export class SpawnGroupBossEntry extends MainEntity<instance_spawn_groupsRow> {
    get Map() {
        return MapRegistry.readOnlyRef(this, this.row.instanceMapId);
    }

    get Boss() {
        return makeMaskCell32ReadOnly(BossStateMask,this,this.row.bossStates)
    }

    get States() {
        return this.row.bossStates.get();
    }

    get SpawnGroup() {
        return this.row.spawnGroupId.get();
    }

    get Flags() {
        return makeMaskCell32(SpawnGroupBossFlags,this,this.row.flags);
    }
}

export class SpawnGroupBosses extends MultiRowSystem<SpawnGroupBossEntry,SpawnGroup> {
    protected getAllRows(): SpawnGroupBossEntry[] {
        return SQL.instance_spawn_groups.queryAll({spawnGroupId:this.owner.ID})
            .map(x=>new SpawnGroupBossEntry(x))
    }
    protected isDeleted(value: SpawnGroupBossEntry): boolean {
        return value.row.isDeleted()
    }

    addGet(map: number, boss: number, states: MaskCon<keyof typeof BossStateMask>) {
        const stateMask = getBits(BossStateMask,states).reduce((p,c)=>p|c,0)
        return new SpawnGroupBossEntry(
            SQL.instance_spawn_groups.add(map,boss,this.owner.ID,stateMask)
                .flags.set(0)
        )
    }

    add(
          map: number
        , boss: number
        , states: MaskCon<keyof typeof BossStateMask>
        , flags: MaskCon<keyof typeof SpawnGroupBossFlags>
    ) {
        this.addGet(map,boss,states)
            .Flags.set(flags)
        return this.owner;
    }
}