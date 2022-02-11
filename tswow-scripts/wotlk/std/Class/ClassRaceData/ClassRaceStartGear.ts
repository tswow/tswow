import { DBC } from "wotlkdata";
import { EnumCon, makeEnum } from "wotlkdata/wotlkdata/cell/cells/EnumCell";
import { ArrayEntry, ArraySystem } from "wotlkdata/wotlkdata/cell/systems/ArraySystem";
import { CellSystem } from "wotlkdata/wotlkdata/cell/systems/CellSystem";
import { CharStartOutfitQuery, CharStartOutfitRow } from "wotlkdata/wotlkdata/dbc/types/CharStartOutfit";
import { Table } from "wotlkdata/wotlkdata/table/Table";
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

    add(item: number, displayId: number = 0, invTypeOverride?: EnumCon<keyof typeof ItemInventoryType>) {
        let template = ItemTemplateRegistry.load(item)
        if(displayId === 0) {
            displayId = template.DisplayInfo.get()
        }
        return this.addMod(i=>{
            i
                .Item.set(item)
                .DisplayItem.set(displayId)
                .InventoryType.set(invTypeOverride === undefined
                    ? template.InventoryType.get()
                    : makeEnum(ItemInventoryType,invTypeOverride)
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