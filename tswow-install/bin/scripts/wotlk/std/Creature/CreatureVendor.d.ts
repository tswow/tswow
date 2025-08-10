import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { npc_vendorRow } from "../../sql/npc_vendor";
import { CreatureTemplate } from "./CreatureTemplate";
export declare class CreatureVendor extends CellSystem<CreatureTemplate> {
    protected rows(): npc_vendorRow[];
    get length(): number;
    addItem(item: number, maxcount?: number, incrTime?: number, extendedCostId?: number): CreatureTemplate;
    copyFrom(creatureTemplate: number, filter?: (row: npc_vendorRow) => boolean): CreatureTemplate;
}
