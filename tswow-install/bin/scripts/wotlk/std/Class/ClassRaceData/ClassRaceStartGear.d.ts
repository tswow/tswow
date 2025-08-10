import { EnumCon } from "../../../../data/cell/cells/EnumCell";
import { ArrayEntry, ArraySystem } from "../../../../data/cell/systems/ArraySystem";
import { CellSystem } from "../../../../data/cell/systems/CellSystem";
import { Table } from "../../../../data/table/Table";
import { CharStartOutfitQuery, CharStartOutfitRow } from "../../../dbc/CharStartOutfit";
import { ItemInventoryType } from "../../Item/ItemInventoryType";
import { MainEntity } from "../../Misc/Entity";
import { SelfRef } from "../../Refs/Ref";
import { RegistryQueryBase } from "../../Refs/Registry";
export declare class StartGearItem extends ArrayEntry<StartGear> {
    get Item(): import("../../../../data/cell/cells/CellArray").CellIndexWrapper<number, this>;
    get DisplayItem(): import("../../../../data/cell/cells/CellArray").CellIndexWrapper<number, this>;
    get InventoryType(): import("../../../../data/cell/cells/CellArray").CellIndexWrapper<number, this>;
    clear(): this;
    isClear(): boolean;
}
export declare class StartGearItems extends ArraySystem<StartGearItem, StartGear> {
    get length(): number;
    get(index: number): StartGearItem;
    /**
     * Adds an item display id that will be shown on the character creation
     * screen, but won't correspond to an actual item once the character is created.
     *
     * @param displayId - ID referencing an entry in ItemDisplayInfo.dbc
     * @param slot
     * @returns
     */
    addDisplay(displayId: number, slot: EnumCon<keyof typeof ItemInventoryType>): StartGear;
    /**
     * Adds an item that will be added to the character on creation, but
     * won't be shown on the character creation screen.
     *
     * @param item
     * @param slot - The slot to use for this item. Uses the items InventoryType field by default.
     * @returns
     */
    addItem(item: number, slot?: EnumCon<keyof typeof ItemInventoryType>): StartGear;
    /**
     * Adds an item that will be added to the character on creation
     * and shown on the character creation screen.
     *
     * @param item
     * @param slot
     */
    addAuto(item: number, slot?: EnumCon<keyof typeof ItemInventoryType>): StartGear;
    /**
     * Adds an item that will be added to the character on creation,
     * optionally with a different display id on the character creation screen.
     *
     * @param item - The item to add on creation
     * @param displayId - The displayId to use on the character creation screen (same as item by default)
     * @param slot - The slot to store this item (same as items InventoryType by default)
     * @returns
     */
    add(item: number, displayId?: number, slot?: EnumCon<keyof typeof ItemInventoryType>): StartGear;
}
export declare class StartGear extends MainEntity<CharStartOutfitRow> {
    get Race(): import("../../../../data/cell/cells/CellReadOnly").CellWrapperReadOnly<number, this>;
    get Class(): import("../../Refs/Ref").RefReadOnlyTT<this, import("../Class").Class, typeof import("../ClassIDs").ClassIDs>;
    get Gender(): "MALE" | "FEMALE";
    get Items(): StartGearItems;
}
export declare class StartGearRef<T> extends CellSystem<T> {
    protected cls: number;
    protected race: number;
    constructor(owner: T, cls: number, race: number);
    get Male(): SelfRef<T, StartGear>;
    get Female(): SelfRef<T, StartGear>;
    both(callback: (gear: StartGear) => void): void;
}
export declare class StartGearRegistryClass<E, R> extends RegistryQueryBase<StartGear, CharStartOutfitRow, CharStartOutfitQuery> {
    protected Table(): Table<any, CharStartOutfitQuery, CharStartOutfitRow>;
    protected EmptyQuery(): CharStartOutfitQuery;
    protected Entity(r: CharStartOutfitRow): StartGear;
    ID(e: StartGear): number;
    load(race: number, cls: number, gender: number, createIfNotExists?: boolean): StartGear;
}
export declare const StartGearRegistry: StartGearRegistryClass<unknown, unknown>;
