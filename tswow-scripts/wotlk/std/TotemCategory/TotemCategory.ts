import { DBC } from "../../DBCFiles";
import { Cell } from "../../../data/cell/cells/Cell";
import { MaskCell32 } from "../../../data/cell/cells/MaskCell";
import { TotemCategoryQuery, TotemCategoryRow } from "../../dbc/TotemCategory";
import { Table } from "../../../data/table/Table";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator, Ids } from "../Misc/Ids";
import { makeRefDynamic } from "../Refs/Ref";
import { RegistryDynamic } from "../Refs/Registry";
import { TotemTypeRegistry } from "./TotemType";

export class TotemCategory extends MainEntity<TotemCategoryRow> {
    get ID() { return this.row.ID.get(); }
    get Name() { return this.wrapLoc(this.row.Name); }
    get Type() {
        return TotemTypeRegistry.ref(this, this.row.TotemCategoryType);
    }
    get Mask() {
        return new MaskCell32(this, this.row.TotemCategoryMask);
    }
}

export enum ItemTotemCategory {
    SKINNING_KNIFE           = 1,
    EARTH_TOTEM              = 2,
    AIR_TOTEM                = 3,
    FIRE_TOTEM               = 4,
    WATER_TOTEM              = 5,
    RUNED_COPPER_ROD         = 6,
    RUNED_SILVER_ROD         = 7,
    RUNED_GOLDEN_ROD         = 8,
    RUNED_TRUESILVER_ROD     = 9,
    RUNED_ARCANITE_ROD       = 10,
    MINING_PICK              = 11,
    PHILOSOPHERS_STONE       = 12,
    BLACKSMITH_HAMMER        = 13,
    ARCLIGHT_SPANNER         = 14,
    GYROMATIC_MICRO_ADJUSTOR = 15,
    MASTER_TOTEM             = 21,
    RUNED_FEL_IRON_ROD       = 41,
    RUNED_ADAMANTITE_ROD     = 62,
    RUNED_ETERNIUM_ROD       = 63,
    HOLLOW_QUILL             = 81,
    RUNED_AZURITE_ROD        = 101,
    VIRTUOSO_INKING_SET      = 121,
    DRUMS                    = 141,
    GNOMISH_ARMY_KNIFE       = 161,
    BLACKSMITH_HAMMER_2      = 162,
    MINING_PICK_2            = 165,
    SKINNING_KNIFE_2         = 166,
    HAMMER_PICK              = 167,
    BLADED_PICKAXE           = 168,
    FLINT_AND_TINDER         = 169,
    RUNED_COBALT_ROD         = 189,
    RUNED_TITANIUM_ROD       = 190,
}

export class TotemCategoryRegistryClass
    extends RegistryDynamic<TotemCategory,TotemCategoryRow,TotemCategoryQuery>
{
    ref<T>(owner: T, cell: Cell<number,any>) {
        return makeRefDynamic(ItemTotemCategory,owner,cell,this);
    }

    protected Table(): Table<any, TotemCategoryQuery, TotemCategoryRow> & { add: (id: number) => TotemCategoryRow; } {
        return DBC.TotemCategory
    }
    protected ids(): DynamicIDGenerator {
        return Ids.TotemCategory
    }
    Clear(entity: TotemCategory): void {
        entity.Name.clear()
            .Mask.clearAll()
            .Mask.setBit(0,true)
            .Type.set(0)
    }
    protected FindByID(id: number): TotemCategoryRow {
        return DBC.TotemCategory.findById(id);
    }
    ID(e: TotemCategory): number {
        return e.ID
    }
    protected EmptyQuery(): TotemCategoryQuery {
        return {}
    }
    protected Entity(r: TotemCategoryRow): TotemCategory {
        return new TotemCategory(r);
    }

    createNewType() {
        return this.create().Type.modRefCopy(()=>{})
    }
}

export const TotemCategoryRegistry = new TotemCategoryRegistryClass();