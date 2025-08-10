import { MultiRowSystem } from "../../../../data/cell/systems/MultiRowSystem";
import { playercreateinfo_itemRow } from "../../../sql/playercreateinfo_item";
import { MainEntity } from "../../Misc/Entity";
import { ClassRacePair } from "./ClassRaces";
export declare class ClassRaceItem extends MainEntity<playercreateinfo_itemRow> {
    get Race(): import("../../../../data/cell/cells/CellReadOnly").CellWrapperReadOnly<number, this>;
    get Class(): import("../../Refs/Ref").RefReadOnlyTT<this, import("../Class").Class, typeof import("../ClassIDs").ClassIDs>;
    get Item(): import("../../Refs/Ref").RefReadOnly<this, import("../../Item/ItemTemplate").ItemTemplate>;
    get Amount(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class ClassRaceItems extends MultiRowSystem<ClassRaceItem, ClassRacePair> {
    protected getAllRows(): ClassRaceItem[];
    protected isDeleted(value: ClassRaceItem): boolean;
    add(item: number, amount?: number): ClassRacePair;
}
