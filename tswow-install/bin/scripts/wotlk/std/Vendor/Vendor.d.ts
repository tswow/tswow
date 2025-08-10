import { CellSystemTop } from "../../../data/cell/systems/CellSystem";
import { MultiRowSystem } from "../../../data/cell/systems/MultiRowSystem";
import { npc_vendorRow } from "../../sql/npc_vendor";
import { ClassMask } from "../Class/ClassRegistry";
import { MainEntity } from "../Misc/Entity";
import { RaceMask } from "../Race/RaceType";
export declare class VendorItem extends MainEntity<npc_vendorRow> {
    get CreatureTemplate(): import("../Refs/Ref").RefReadOnly<this, import("../Creature/CreatureTemplate").CreatureTemplate>;
    get Slot(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get MaxCount(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get IncreaseTime(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get ClassMask(): import("../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof ClassMask>;
    get RaceMask(): import("../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof RaceMask>;
    get ExtendedCost(): import("../Refs/Ref").RefReadOnly<this, import("../ExtendedCost/ExtendedCost").ExtendedCost>;
    get Item(): import("../Refs/Ref").RefReadOnly<this, import("../Item/ItemTemplate").ItemTemplate>;
}
export declare class VendorItems<T> extends MultiRowSystem<VendorItem, T> {
    protected getAllRows(): VendorItem[];
    protected isDeleted(value: VendorItem): boolean;
    readonly ID: number;
    constructor(owner: T, id: number);
    add(item: number, extendedCostId?: number, maxCount?: number, incrTime?: number): T;
    addGet(item: number, extendedCostId?: number | 'GENERATE'): VendorItem;
    addMod(item: number, extendedCostId: number | 'GENERATE', callback: (item: VendorItem) => void): T;
}
export declare class Vendor extends CellSystemTop {
    protected id: number;
    constructor(id: number);
    get Items(): VendorItems<this>;
}
