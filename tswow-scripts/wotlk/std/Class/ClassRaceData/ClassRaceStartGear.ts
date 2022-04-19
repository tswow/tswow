import { EnumCon, makeEnum } from "../../../../data/cell/cells/EnumCell";
import { ArrayEntry, ArraySystem } from "../../../../data/cell/systems/ArraySystem";
import { CellSystem } from "../../../../data/cell/systems/CellSystem";
import { Table } from "../../../../data/table/Table";
import { CharStartOutfitQuery, CharStartOutfitRow } from "../../../dbc/CharStartOutfit";
import { DBC } from "../../../DBCFiles";
import { ItemInventoryType } from "../../Item/ItemInventoryType";
import { ItemTemplateRegistry } from "../../Item/ItemTemplate";
import { MainEntity } from "../../Misc/Entity";
import { Ids } from "../../Misc/Ids";
import { SelfRef } from "../../Refs/Ref";
import { RegistryQueryBase } from "../../Refs/Registry";
import { ClassRegistry } from "../ClassRegistry";

export class StartGearItem extends ArrayEntry<StartGear> {
    get Item() {
        return this.wrapIndex(this.container.row.ItemID, this.index)
    }

    get DisplayItem() {
        return this.wrapIndex(this.container.row.DisplayItemID, this.index)
    }

    get InventoryType() {
        return this.wrapIndex(this.container.row.InventoryType, this.index)
    }

    clear(): this {
        return this.Item.set(0)
            .DisplayItem.set(0)
            .InventoryType.set(0)
    }

    isClear(): boolean {
        return this.Item.get() === 0 && this.DisplayItem.get() === 0;
    }
}

export class StartGearItems extends ArraySystem<StartGearItem,StartGear> {
    get length(): number {
        return 12;
    }
    get(index: number): StartGearItem {
        return new StartGearItem(this.owner, index);
    }

    /**
     * Adds an item display id that will be shown on the character creation
     * screen, but won't correspond to an actual item once the character is created.
     *
     * @param displayId - ID referencing an entry in ItemDisplayInfo.dbc
     * @param slot
     * @returns
     */
    addDisplay(displayId: number, slot: EnumCon<keyof typeof ItemInventoryType>) {
        return this.addMod(gear=>gear
            .DisplayItem.set(displayId)
            .Item.set(0)
            .InventoryType.set(makeEnum(ItemInventoryType,slot))
        )
    }

    /**
     * Adds an item that will be added to the character on creation, but
     * won't be shown on the character creation screen.
     *
     * @param item
     * @param slot - The slot to use for this item. Uses the items InventoryType field by default.
     * @returns
     */
    addItem(item: number, slot?: EnumCon<keyof typeof ItemInventoryType>) {
        let template = slot === undefined ? ItemTemplateRegistry.load(item) : undefined;
        if(!slot && !template) {
            throw new Error(`Invalid item id ${item}`)
        }
        return this.addMod(gear=>gear
            .Item.set(item)
            .DisplayItem.set(0)
            .InventoryType.set(slot === undefined
                ? template.InventoryType.get()
                : makeEnum(ItemInventoryType,slot)
            )
        )
    }

    /**
     * Adds an item that will be added to the character on creation
     * and shown on the character creation screen.
     *
     * @param item
     * @param slot
     */
    addAuto(item: number, slot?: EnumCon<keyof typeof ItemInventoryType>) {
        return this.add(item, 0, slot);
    }

    /**
     * Adds an item that will be added to the character on creation,
     * optionally with a different display id on the character creation screen.
     *
     * @param item - The item to add on creation
     * @param displayId - The displayId to use on the character creation screen (same as item by default)
     * @param slot - The slot to store this item (same as items InventoryType by default)
     * @returns
     */
    add(item: number, displayId: number = 0, slot?: EnumCon<keyof typeof ItemInventoryType>) {
        let template = ItemTemplateRegistry.load(item)
        if(!template) {
            throw new Error(`Invalid item id ${item}`)
        }
        if(displayId === 0) {
            displayId = template.DisplayInfo.get()
        }
        return this.addMod(startItem=>{startItem
            .Item.set(item)
            .DisplayItem.set(displayId)
            .InventoryType.set(slot === undefined
                ? template.InventoryType.get()
                : makeEnum(ItemInventoryType,slot)
            )
        })
    }
}

export class StartGear extends MainEntity<CharStartOutfitRow> {
    get Race() { return this.wrapReadOnly(this.row.RaceID); }
    get Class() { return ClassRegistry.readOnlyRef(this, this.row.ClassID); }
    get Gender() { return this.row.SexID.get() === 0 ? 'MALE' : 'FEMALE'}
    get Items() { return new StartGearItems(this); }
}

export class StartGearRef<T> extends CellSystem<T> {
    protected cls: number;
    protected race: number;

    constructor(owner: T, cls: number, race: number) {
        super(owner);
        this.cls = cls;
        this.race = race;
    }

    get Male() {
        return new SelfRef(this.owner,()=>StartGearRegistry.load(this.race,this.cls,0,true))
    }

    get Female() {
        return new SelfRef(this.owner,()=>StartGearRegistry.load(this.race,this.cls,1,true))
    }

    both(callback: (gear: StartGear)=>void) {
        callback(this.Male.get());
        callback(this.Female.get());
    }
}

export class StartGearRegistryClass<E,R> extends RegistryQueryBase<StartGear,CharStartOutfitRow,CharStartOutfitQuery> {
    protected Table(): Table<any, CharStartOutfitQuery, CharStartOutfitRow> {
        return DBC.CharStartOutfit
    }
    protected EmptyQuery(): CharStartOutfitQuery {
        return {}
    }

    protected Entity(r: CharStartOutfitRow): StartGear {
        return new StartGear(r);
    }
    ID(e: StartGear): number {
        return e.row.ID.get()
    }

    load(race: number, cls: number, gender: number, createIfNotExists = true) {
        let old = DBC.CharStartOutfit.query({
              ClassID:cls
            , RaceID:race
            , SexID:gender
        });
        return (old !== undefined
            ? new StartGear(old)
            : ! createIfNotExists
            ? undefined
            : new StartGear(
                    DBC.CharStartOutfit.add(Ids.CharStartOutfit.id())
                        .ClassID.set(cls)
                        .RaceID.set(race)
                        .SexID.set(gender)
                    )
                    .Items.clearAll()
            ) as StartGear
    }
}
export const StartGearRegistry = new StartGearRegistryClass();