import { EnumCell, EnumCon } from "../../../data/cell/cells/EnumCell";
import { ArrayEntry, ArraySystem } from "../../../data/cell/systems/ArraySystem";
import { ItemTemplate } from "./ItemTemplate";
export declare enum ItemColorMask {
    NONE = 0,
    META = 1,
    RED = 2,
    YELLOW = 4,
    BLUE = 8
}
export declare class ItemColorCell extends EnumCell<ItemSocket> {
    get NONE(): import("../../../data/cell/cells/EnumCell").EnumValue<ItemSocket>;
    get META(): import("../../../data/cell/cells/EnumCell").EnumValue<ItemSocket>;
    get RED(): import("../../../data/cell/cells/EnumCell").EnumValue<ItemSocket>;
    get YELLOW(): import("../../../data/cell/cells/EnumCell").EnumValue<ItemSocket>;
    get BLUE(): import("../../../data/cell/cells/EnumCell").EnumValue<ItemSocket>;
}
export declare class ItemSocket extends ArrayEntry<ItemTemplate> {
    /** @deprecated use Color */
    get color(): ItemColorCell;
    /** @deprecated use Content */
    get content(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Content(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Color(): import("../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof ItemColorMask>;
    set(color: EnumCon<keyof typeof ItemColorMask>, content: number): this;
    clear(): this;
    isClear(): boolean;
}
export declare class ItemSockets extends ArraySystem<ItemSocket, ItemTemplate> {
    constructor(owner: ItemTemplate);
    get length(): number;
    get(index: number): ItemSocket;
    protected _add(col: number): ItemTemplate;
    add(color: EnumCon<keyof typeof ItemColorMask>, content?: number): ItemTemplate;
    get Properties(): import("../../../data/cell/cells/Cell").CellWrapper<number, ItemTemplate>;
    addMeta(): ItemTemplate;
    addRed(): ItemTemplate;
    addYellow(): ItemTemplate;
    addBlue(): ItemTemplate;
}
