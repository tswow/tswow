import { SQL } from "wotlkdata"
import { makeEnumCellReadOnly } from "wotlkdata/wotlkdata/cell/cells/EnumCell"
import { MultiRowSystem } from "wotlkdata/wotlkdata/cell/systems/MultiRowSystem"
import { spawn_groupRow } from "wotlkdata/wotlkdata/sql/types/spawn_group"
import { CreatureInstanceRegistry } from "../Creature/Creatures"
import { GameObjectInstances } from "../GameObject/GameObjects"
import { MainEntity } from "../Misc/Entity"
import { SpawnGroup } from "./SpawnGroup"

export enum SpawnGroupEntryType {
    CREATURE = 0,
    ENUM = 1,
}

export class SpawnGroupEntry extends MainEntity<spawn_groupRow> {
    get Type() {
        return makeEnumCellReadOnly(SpawnGroupEntryType,this,this.row.spawnType)
    }

    get Group() {
        return this.row.groupId.get()
    }

    get SpawnID() {
        return this.row.spawnId.get()
    }

    get Creature() {
        return CreatureInstanceRegistry.readOnlyRef(this, this.row.spawnId)
    }

    get GameObject() {
        return GameObjectInstances.readOnlyRef(this, this.row.spawnId)
    }
}

export class SpawnGroupCreatureEntries extends MultiRowSystem<SpawnGroupEntry,SpawnGroup> {
    protected getAllRows(): SpawnGroupEntry[] {
        return SQL.spawn_group.queryAll({groupId:this.owner.ID})
            .map(x=>new SpawnGroupEntry(x))
    }
    protected isDeleted(value: SpawnGroupEntry): boolean {
        return value.isDeleted()
    }

    addCreature(creature: number) {
        SQL.spawn_group.add(this.owner.ID,SpawnGroupEntryType.CREATURE,creature);
        return this;
    }

    addGameObject(gobj: number) {
        SQL.spawn_group.add(this.owner.ID,SpawnGroupEntryType.CREATURE,gobj);
        return this;
    }
}