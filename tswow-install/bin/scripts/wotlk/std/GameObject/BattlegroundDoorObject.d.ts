import { EnumCon } from "../../../data/cell/cells/EnumCell";
import { MultiRowSystem } from "../../../data/cell/systems/MultiRowSystem";
import { battleground_door_objectRow } from "../../sql/battleground_door_object";
import { MainEntity } from "../Misc/Entity";
import { GameObjectDoor } from "./GameObjectTemplate";
export declare enum BattlegroundDoorType {
    OPENS_ON_START = 0,
    CLOSES_ON_START = 1
}
export declare class BattlegroundDoorObject extends MainEntity<battleground_door_objectRow> {
    get GameObjectTemplate(): number;
    get Map(): import("../Refs/Ref").RefReadOnly<this, import("../Map/Map").Map>;
    get Type(): import("../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof BattlegroundDoorType>;
}
export declare class BattlegroundDoorObjects extends MultiRowSystem<BattlegroundDoorObject, GameObjectDoor> {
    protected getAllRows(): BattlegroundDoorObject[];
    protected isDeleted(value: BattlegroundDoorObject): boolean;
    add(map: number, type: EnumCon<keyof typeof BattlegroundDoorType>): GameObjectDoor;
}
