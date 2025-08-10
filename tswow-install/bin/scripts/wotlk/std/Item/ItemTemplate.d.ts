import { MulticastCell } from "../../../data/cell/cells/MulticastCell";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { Table } from "../../../data/table/Table";
import { ItemRow } from "../../dbc/Item";
import { item_templateQuery, item_templateRow } from "../../sql/item_template";
import { ClassMask } from "../Class/ClassRegistry";
import { LootSetRef } from "../Loot/Loot";
import { CodegenSettings } from "../Misc/Codegen";
import { DurationCell } from "../Misc/DurationCell";
import { MainEntityID } from "../Misc/Entity";
import { StaticIDGenerator } from "../Misc/Ids";
import { MaybeDBCEntity } from "../Misc/SQLDBCEntity";
import { RaceMask } from "../Race/RaceType";
import { RegistryStatic } from "../Refs/Registry";
import { BagFamily } from "./BagFamily";
import { ItemAmmoType } from "./ItemAmmoTypes";
import { ItemBonding } from "./ItemBonding";
import { ItemClass } from "./ItemClass";
import { ItemDamages } from "./ItemDamage";
import { ItemFlags } from "./ItemFlags";
import { ItemFlagsCustom } from "./ItemFlagsCustom";
import { ItemFlagsExtra } from "./ItemFlagsExtra";
import { ItemFoodType } from "./ItemFoodType";
import { ItemInventoryType } from "./ItemInventoryType";
import { ItemMaterial } from "./ItemMaterial";
import { ItemMoneyLoot } from "./ItemMoneyLoot";
import { ItemPrice } from "./ItemPrice";
import { ItemQuality } from "./ItemQuality";
import { ItemRequiredFaction } from "./ItemRequiredFaction";
import { ItemRequirements } from "./ItemRequirements";
import { ItemResistance } from "./ItemResistances";
import { ItemScalingStat } from "./ItemScalingStat";
import { ItemSetName, ItemSetNameRow } from "./ItemSetName";
import { ItemSheath } from "./ItemSheath";
import { ItemSockets } from "./ItemSocket";
import { ItemSpells } from "./ItemSpells";
import { ItemStats } from "./ItemStats";
import { ItemDescription, ItemName } from "./ItemText";
import { PageMaterialCell } from "./PageMaterial";
export declare class ItemDBC extends MaybeDBCEntity<ItemTemplate, ItemRow> {
    protected createDBC(): ItemRow;
    protected findDBC(): ItemRow;
    protected isValidDBC(dbc: ItemRow): boolean;
    get ClassID(): import("../Misc/SQLDBCEntity").MaybeDBCCell<ItemTemplate, number, ItemRow, this>;
    get SubclassID(): import("../Misc/SQLDBCEntity").MaybeDBCCell<ItemTemplate, number, ItemRow, this>;
    get SoundOverride(): import("../Misc/SQLDBCEntity").MaybeDBCCell<ItemTemplate, number, ItemRow, this>;
    get Material(): import("../Misc/SQLDBCEntity").MaybeDBCCell<ItemTemplate, number, ItemRow, this>;
    get DisplayInfoID(): import("../Misc/SQLDBCEntity").MaybeDBCCell<ItemTemplate, number, ItemRow, this>;
    get InventoryType(): import("../Misc/SQLDBCEntity").MaybeDBCCell<ItemTemplate, number, ItemRow, this>;
    get SheatheType(): import("../Misc/SQLDBCEntity").MaybeDBCCell<ItemTemplate, number, ItemRow, this>;
}
export declare class ItemDBCRow extends CellSystem<ItemTemplate> {
    protected readonly DBC: ItemDBC;
    exists(): boolean;
    get(): ItemRow;
    mod(callback: (row: ItemRow) => void): ItemTemplate;
    static dbc(inst: ItemTemplate): ItemDBC;
}
export declare class ItemTemplate extends MainEntityID<item_templateRow> {
    protected get dbc(): ItemDBC;
    readonly DBCRow: ItemDBCRow;
    protected ItemSetNameRow: ItemSetNameRow;
    static ItemSetNameRow(template: ItemTemplate): ItemSetNameRow;
    get Name(): ItemName;
    get ItemSetName(): ItemSetName;
    get Socket(): ItemSockets;
    get StartQuest(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Lock(): import("../Refs/Ref").RefStatic<this, import("../Locks/Lock").Lock>;
    get RandomProperty(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get RandomSuffix(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get InlineScripts(): _hidden.Item<this>;
    /** Only applicable if item is a shield */
    get Block(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get ItemSet(): import("../Refs/Ref").RefStatic<this, import("./ItemSet").ItemSet>;
    get Resistances(): ItemResistance;
    get Stats(): ItemStats;
    get Area(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Map(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get BagFamily(): import("../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof BagFamily>;
    get TotemCategory(): import("../Refs/Ref").RefStaticTT<this, import("../TotemCategory/TotemCategory").TotemCategory, typeof import("../TotemCategory/TotemCategory").ItemTotemCategory>;
    get Sheath(): import("../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof ItemSheath>;
    get ScalingStats(): ItemScalingStat;
    get Armor(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get BonusArmor(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Delay(): DurationCell<this>;
    get RangeMod(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Description(): ItemDescription;
    get Quality(): import("../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof ItemQuality>;
    get Durability(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Disenchant(): import("../Loot/Loot").LootSetPointer<this>;
    get RequiredLevel(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get ItemLevel(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get RequiredSpell(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get RequiredHonorRank(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get ClassMask(): import("../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof ClassMask>;
    get RaceMask(): import("../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof RaceMask>;
    get MaxCount(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get MaxStack(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Bonding(): import("../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof ItemBonding>;
    get Damage(): ItemDamages;
    get Requirements(): ItemRequirements;
    get Spells(): ItemSpells;
    get Class(): ItemClass;
    get SoundOverride(): MulticastCell<number, this>;
    get Price(): ItemPrice;
    get Material(): import("../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof ItemMaterial>;
    get Flags(): import("../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof ItemFlags>;
    get InventoryType(): import("../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof ItemInventoryType>;
    get SheatheType(): import("../Misc/SQLDBCEntity").MaybeDBCCell<ItemTemplate, number, ItemRow, ItemDBC>;
    get RequiredFaction(): ItemRequiredFaction;
    get ContainerSlots(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get RequiredDisenchantSkill(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Duration(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Holiday(): import("../Refs/Ref").RefNoCreate<this, import("../GameEvent/Holiday").HolidayPlain>;
    get ScriptName(): import("../../../data/cell/cells/Cell").CellWrapper<string, this>;
    get FoodType(): import("../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof ItemFoodType>;
    get MoneyLoot(): ItemMoneyLoot;
    get FlagsCustom(): import("../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof ItemFlagsCustom>;
    get Loot(): LootSetRef<this>;
    /**
     * This is readonly, because changing the gem properties
     * will also require changing the item id in the
     * enchantment connected to the gem.
     *
     * To create a new gem, see `std.Gems.create(...)` and its parenting options.
     */
    get GemProperties(): import("../Refs/Ref").RefReadOnly<this, import("../Gem/Gem").Gem>;
    get SocketBonus(): import("../Refs/Ref").RefStatic<this, import("../Enchant/Enchantment").Enchantment>;
    get DisplayInfo(): import("./ItemDisplayInfo").ItemDisplayInfoRef<this>;
    get PageText(): import("../PageText/PageText").PageTextRef<this>;
    get PageMaterial(): PageMaterialCell<this>;
    get AmmoType(): import("../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof ItemAmmoType>;
    /** Note: This field seem to have loads of data for >cata in the docs, so it can be very wrong. */
    get FlagsExtra(): import("../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof ItemFlagsExtra>;
    get ID(): number;
    codify(settings: {
        mod?: string;
        id?: string;
        name?: string;
        create_spells?: boolean;
        all_locs?: bool;
    } & CodegenSettings): string;
}
export declare class ItemTemplateRegistryClass extends RegistryStatic<ItemTemplate, item_templateRow, item_templateQuery> {
    protected Clone(mod: string, id: string, r: ItemTemplate, parent: ItemTemplate): void;
    protected Table(): Table<any, item_templateQuery, item_templateRow> & {
        add: (id: number) => item_templateRow;
    };
    protected IDs(): StaticIDGenerator;
    protected Entity(r: item_templateRow): ItemTemplate;
    protected FindByID(id: number): item_templateRow;
    protected EmptyQuery(): item_templateQuery;
    ID(e: ItemTemplate): number;
    Clear(r: ItemTemplate): void;
}
export declare const ItemTemplateRegistry: ItemTemplateRegistryClass;
