import { ObjectifyOptions } from "../../../data/cell/serialization/ObjectIteration";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { ItemDisplayInfo } from "./ItemDisplayInfo";
export declare class ItemIcon extends CellSystem<ItemDisplayInfo> {
    set(value: string): ItemDisplayInfo;
    get(): string;
    objectify(options?: ObjectifyOptions): string[];
}
