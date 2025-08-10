import { ArrayEntry, ArraySystem } from "../../../data/cell/systems/ArraySystem";
import { ItemDisplayInfo } from "./ItemDisplayInfo";
export declare class ItemVisualModel<T> extends ArrayEntry<ItemDisplayInfo> {
    get Model(): import("../../../data/cell/cells/CellArray").CellIndexWrapper<string, this>;
    get ModelTexture(): import("../../../data/cell/cells/CellArray").CellIndexWrapper<string, this>;
    clear(): this;
    isClear(): boolean;
}
export declare class ItemVisualModels<T> extends ArraySystem<ItemVisualModel<T>, ItemDisplayInfo> {
    get length(): number;
    get(index: number): ItemVisualModel<T>;
    set(index: number, model?: string, texture?: string): ItemDisplayInfo;
    add(model: string, texture: string): ItemDisplayInfo;
}
