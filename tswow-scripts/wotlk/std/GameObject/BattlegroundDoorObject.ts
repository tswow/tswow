import { SQL } from "../../SQLFiles";
import { EnumCon, makeEnumCell } from "../../../data/cell/cells/EnumCell";
import { MultiRowSystem } from "../../../data/cell/systems/MultiRowSystem";
import { battleground_door_objectRow } from "../../sql/battleground_door_object";
import { MapRegistry } from "../Map/Maps";
import { MainEntity } from "../Misc/Entity";
import { GameObjectDoor } from "./GameObjectTemplate";

export enum BattlegroundDoorType {
    OPENS_ON_START  = 0,
    CLOSES_ON_START = 1,
}

export class BattlegroundDoorObject extends MainEntity<battleground_door_objectRow> {
    get GameObjectTemplate() { return this.row.entry.get(); }
    get Map() { return MapRegistry.readOnlyRef(this, this.row.map); }
    get Type() { return makeEnumCell(BattlegroundDoorType, this, this.row.type)}
}

export class BattlegroundDoorObjects extends MultiRowSystem<BattlegroundDoorObject,GameObjectDoor> {
    protected getAllRows(): BattlegroundDoorObject[] {
        return SQL
            .battleground_door_object
            .queryAll({entry:this.owner.ID})
            .map(x=>new BattlegroundDoorObject(x))
    }
    protected isDeleted(value: BattlegroundDoorObject): boolean {
        return value.isDeleted()
    }

    add(map: number, type: EnumCon<keyof typeof BattlegroundDoorType>) {
        new BattlegroundDoorObject(
            SQL.battleground_door_object.add(this.owner.ID,map)
        )
            .Type.set(type)
        return this.owner
    }
}