import { Cell } from "../../../data/cell/cells/Cell";
import { ObjectifyOptions } from "../../../data/cell/serialization/ObjectIteration";
import { ArrayEntry, ArraySystem } from "../../../data/cell/systems/ArraySystem";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { ItemTemplate } from "./ItemTemplate";
export declare enum ItemSpellTrigger {
    ON_USE = 0,
    ON_EQUIP = 1,
    CHANCE_ON_HIT = 2,
    SOULSTONE = 4,
    USE_NO_DELAY = 5,
    ON_LEARN = 6
}
export declare class ChargesSystem<T> extends CellSystem<T> {
    protected cell: Cell<number, any>;
    constructor(owner: T, cell: Cell<number, any>);
    get Raw(): import("../../../data/cell/cells/Cell").CellWrapper<number, T>;
    objectify(options?: ObjectifyOptions): "UNLIMITED" | {
        charges: number;
        type: string;
    };
    getRawCount(): number;
    getAbsCount(): number;
    getType(): "UNLIMITED" | "DELETE_ITEM" | "NO_DELETE_ITEM";
    set(value: 'UNLIMITED'): T;
    set(value: number, type: 'DELETE_ITEM' | 'NO_DELETE_ITEM'): T;
}
export declare class ItemSpell extends ArrayEntry<ItemTemplate> {
    clear(): this;
    isClear(): boolean;
    get Spell(): import("../Refs/Ref").RefStatic<this, import("../Spell/Spell").Spell>;
    get Category(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Trigger(): import("../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof ItemSpellTrigger>;
    get Charges(): ChargesSystem<this>;
    get ProcsPerMinute(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Cooldown(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get CategoryCooldown(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class ItemSpells extends ArraySystem<ItemSpell, ItemTemplate> {
    get(index: number): ItemSpell;
    get length(): number;
    addMod(callback: (itemSpell: ItemSpell) => void): ItemTemplate;
}
