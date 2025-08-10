import { Cell } from "../../../data/cell/cells/Cell";
import { MaskCell32 } from "../../../data/cell/cells/MaskCell";
import { Table } from "../../../data/table/Table";
import { TotemCategoryQuery, TotemCategoryRow } from "../../dbc/TotemCategory";
import { MainEntity } from "../Misc/Entity";
import { StaticIDGenerator } from "../Misc/Ids";
import { RegistryStatic } from "../Refs/Registry";
export declare class TotemCategory extends MainEntity<TotemCategoryRow> {
    get ID(): number;
    get Name(): import("../../../data/cell/systems/CellSystem").WrappedLoc<this>;
    get Type(): import("../Refs/Ref").RefDynamicTT<this, import("./TotemType").TotemType, typeof import("./TotemType").TotemTypes>;
    get Mask(): MaskCell32<this>;
}
export declare enum ItemTotemCategory {
    SKINNING_KNIFE = 1,
    EARTH_TOTEM = 2,
    AIR_TOTEM = 3,
    FIRE_TOTEM = 4,
    WATER_TOTEM = 5,
    RUNED_COPPER_ROD = 6,
    RUNED_SILVER_ROD = 7,
    RUNED_GOLDEN_ROD = 8,
    RUNED_TRUESILVER_ROD = 9,
    RUNED_ARCANITE_ROD = 10,
    MINING_PICK = 11,
    PHILOSOPHERS_STONE = 12,
    BLACKSMITH_HAMMER = 13,
    ARCLIGHT_SPANNER = 14,
    GYROMATIC_MICRO_ADJUSTOR = 15,
    MASTER_TOTEM = 21,
    RUNED_FEL_IRON_ROD = 41,
    RUNED_ADAMANTITE_ROD = 62,
    RUNED_ETERNIUM_ROD = 63,
    HOLLOW_QUILL = 81,
    RUNED_AZURITE_ROD = 101,
    VIRTUOSO_INKING_SET = 121,
    DRUMS = 141,
    GNOMISH_ARMY_KNIFE = 161,
    BLACKSMITH_HAMMER_2 = 162,
    MINING_PICK_2 = 165,
    SKINNING_KNIFE_2 = 166,
    HAMMER_PICK = 167,
    BLADED_PICKAXE = 168,
    FLINT_AND_TINDER = 169,
    RUNED_COBALT_ROD = 189,
    RUNED_TITANIUM_ROD = 190
}
export declare class TotemCategoryRegistryClass extends RegistryStatic<TotemCategory, TotemCategoryRow, TotemCategoryQuery> {
    ref<T>(owner: T, cell: Cell<number, any>): import("../Refs/Ref").RefStaticTT<T, TotemCategory, typeof ItemTotemCategory>;
    protected Table(): Table<any, TotemCategoryQuery, TotemCategoryRow> & {
        add: (id: number) => TotemCategoryRow;
    };
    protected IDs(): StaticIDGenerator;
    Clear(entity: TotemCategory): void;
    protected FindByID(id: number): TotemCategoryRow;
    ID(e: TotemCategory): number;
    protected EmptyQuery(): TotemCategoryQuery;
    protected Entity(r: TotemCategoryRow): TotemCategory;
    createNewType(mod: string, name: string): TotemCategory;
}
export declare const TotemCategoryRegistry: TotemCategoryRegistryClass;
