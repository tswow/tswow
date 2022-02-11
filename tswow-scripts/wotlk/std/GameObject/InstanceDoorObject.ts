import { EnumCon, makeEnumCell } from "wotlkdata/wotlkdata/cell/cells/EnumCell";
import { MultiRowSystem } from "wotlkdata/wotlkdata/cell/systems/MultiRowSystem";
import { SQL } from "wotlkdata/wotlkdata/sql/SQLFiles";
import { instance_door_objectRow } from "wotlkdata/wotlkdata/sql/types/instance_door_object";
import { MapRegistry } from "../Map/Maps";
import { MainEntity } from "../Misc/Entity";
import { GameObjectDoor } from "./GameObjectTemplate";

export enum InstanceDoorType
{
    /** Door can open if encounter is not in progress */
    CLOSED_DURING_ENCOUNTER = 0,
    /** Door can open if encounter is done */
    OPEN_AFTER_ENCOUNTER    = 1,
    /** Door can open if encounter is in progress, typically used for spawning places */
    OPEN_DURING_ENCOUNTER   = 2,
};

export class InstanceDoorObject extends MainEntity<instance_door_objectRow> {
    get GameObjectTemplate() { return this.row.entry.get() }
    get Map() { return MapRegistry.readOnlyRef(this, this.row.map)}
    get Boss() { return this.wrap(this.row.boss); }
    get Type() { return makeEnumCell(InstanceDoorType, this, this.row.type)}
}

export class InstanceDoorObjects extends MultiRowSystem<InstanceDoorObject,GameObjectDoor> {
    protected getAllRows(): InstanceDoorObject[] {
        return SQL
            .instance_door_object
            .queryAll({entry:this.owner.ID})
            .map(x=>new InstanceDoorObject(x))
    }
    protected isDeleted(value: InstanceDoorObject): boolean {
        return value.row.isDeleted();
    }

    add(map: number, boss: number, type: EnumCon<keyof typeof InstanceDoorType>) {
        new InstanceDoorObject(SQL.instance_door_object.add(this.owner.ID,map))
            .Boss.set(boss)
            .Type.set(type)
        return this.owner
    }
}