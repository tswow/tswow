import { EnumCon } from "../../../data/cell/cells/EnumCell";
import { MultiRowSystem } from "../../../data/cell/systems/MultiRowSystem";
import { instance_door_objectRow } from "../../sql/instance_door_object";
import { MainEntity } from "../Misc/Entity";
import { GameObjectDoor } from "./GameObjectTemplate";
export declare enum InstanceDoorType {
    /** Door can open if encounter is not in progress */
    CLOSED_DURING_ENCOUNTER = 0,
    /** Door can open if encounter is done */
    OPEN_AFTER_ENCOUNTER = 1,
    /** Door can open if encounter is in progress, typically used for spawning places */
    OPEN_DURING_ENCOUNTER = 2
}
export declare class InstanceDoorObject extends MainEntity<instance_door_objectRow> {
    get GameObjectTemplate(): number;
    get Map(): import("../Refs/Ref").RefReadOnly<this, import("../Map/Map").Map>;
    get Boss(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Type(): import("../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof InstanceDoorType>;
}
export declare class InstanceDoorObjects extends MultiRowSystem<InstanceDoorObject, GameObjectDoor> {
    protected getAllRows(): InstanceDoorObject[];
    protected isDeleted(value: InstanceDoorObject): boolean;
    add(map: number, boss: number, type: EnumCon<keyof typeof InstanceDoorType>): GameObjectDoor;
}
