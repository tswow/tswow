import { float, int, mediumint, smallint, tinyint, varchar } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class item_templateRow extends SqlRow<item_templateCreator, item_templateQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get entry(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get class(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get subclass(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get SoundOverrideSubclass(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get name(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get displayid(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Quality(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Flags(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get FlagsExtra(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get BuyCount(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get BuyPrice(): SQLCell<bigint, this>;
    /**
     * No comment (yet!)
     */
    get SellPrice(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get InventoryType(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get AllowableClass(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get AllowableRace(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get ItemLevel(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RequiredLevel(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RequiredSkill(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RequiredSkillRank(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get requiredspell(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get requiredhonorrank(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RequiredCityRank(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RequiredReputationFaction(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RequiredReputationRank(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get maxcount(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get stackable(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get ContainerSlots(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get StatsCount(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get stat_type1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get stat_value1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get stat_type2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get stat_value2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get stat_type3(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get stat_value3(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get stat_type4(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get stat_value4(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get stat_type5(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get stat_value5(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get stat_type6(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get stat_value6(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get stat_type7(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get stat_value7(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get stat_type8(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get stat_value8(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get stat_type9(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get stat_value9(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get stat_type10(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get stat_value10(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get ScalingStatDistribution(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get ScalingStatValue(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get dmg_min1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get dmg_max1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get dmg_type1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get dmg_min2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get dmg_max2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get dmg_type2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get armor(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get holy_res(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get fire_res(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get nature_res(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get frost_res(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get shadow_res(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get arcane_res(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get delay(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get ammo_type(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RangedModRange(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get spellid_1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get spelltrigger_1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get spellcharges_1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get spellppmRate_1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get spellcooldown_1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get spellcategory_1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get spellcategorycooldown_1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get spellid_2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get spelltrigger_2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get spellcharges_2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get spellppmRate_2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get spellcooldown_2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get spellcategory_2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get spellcategorycooldown_2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get spellid_3(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get spelltrigger_3(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get spellcharges_3(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get spellppmRate_3(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get spellcooldown_3(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get spellcategory_3(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get spellcategorycooldown_3(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get spellid_4(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get spelltrigger_4(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get spellcharges_4(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get spellppmRate_4(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get spellcooldown_4(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get spellcategory_4(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get spellcategorycooldown_4(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get spellid_5(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get spelltrigger_5(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get spellcharges_5(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get spellppmRate_5(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get spellcooldown_5(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get spellcategory_5(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get spellcategorycooldown_5(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get bonding(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get description(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get PageText(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get LanguageID(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get PageMaterial(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get startquest(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get lockid(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Material(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get sheath(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RandomProperty(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RandomSuffix(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get block(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get itemset(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get MaxDurability(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get area(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Map(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get BagFamily(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get TotemCategory(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get socketColor_1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get socketContent_1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get socketColor_2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get socketContent_2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get socketColor_3(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get socketContent_3(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get socketBonus(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get GemProperties(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RequiredDisenchantSkill(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get ArmorDamageModifier(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get duration(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get ItemLimitCategory(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get HolidayId(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get ScriptName(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get DisenchantID(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get FoodType(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get minMoneyLoot(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get maxMoneyLoot(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get flagsCustom(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get VerifiedBuild(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(entry: mediumint, c?: item_templateCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type item_templateCreator = {
    entry?: mediumint;
    class?: tinyint;
    subclass?: tinyint;
    SoundOverrideSubclass?: tinyint;
    name?: varchar;
    displayid?: mediumint;
    Quality?: tinyint;
    Flags?: int;
    FlagsExtra?: int;
    BuyCount?: tinyint;
    BuyPrice?: bigint;
    SellPrice?: int;
    InventoryType?: tinyint;
    AllowableClass?: int;
    AllowableRace?: int;
    ItemLevel?: smallint;
    RequiredLevel?: tinyint;
    RequiredSkill?: smallint;
    RequiredSkillRank?: smallint;
    requiredspell?: mediumint;
    requiredhonorrank?: mediumint;
    RequiredCityRank?: mediumint;
    RequiredReputationFaction?: smallint;
    RequiredReputationRank?: smallint;
    maxcount?: int;
    stackable?: int;
    ContainerSlots?: tinyint;
    StatsCount?: tinyint;
    stat_type1?: tinyint;
    stat_value1?: smallint;
    stat_type2?: tinyint;
    stat_value2?: smallint;
    stat_type3?: tinyint;
    stat_value3?: smallint;
    stat_type4?: tinyint;
    stat_value4?: smallint;
    stat_type5?: tinyint;
    stat_value5?: smallint;
    stat_type6?: tinyint;
    stat_value6?: smallint;
    stat_type7?: tinyint;
    stat_value7?: smallint;
    stat_type8?: tinyint;
    stat_value8?: smallint;
    stat_type9?: tinyint;
    stat_value9?: smallint;
    stat_type10?: tinyint;
    stat_value10?: smallint;
    ScalingStatDistribution?: smallint;
    ScalingStatValue?: int;
    dmg_min1?: float;
    dmg_max1?: float;
    dmg_type1?: tinyint;
    dmg_min2?: float;
    dmg_max2?: float;
    dmg_type2?: tinyint;
    armor?: smallint;
    holy_res?: tinyint;
    fire_res?: tinyint;
    nature_res?: tinyint;
    frost_res?: tinyint;
    shadow_res?: tinyint;
    arcane_res?: tinyint;
    delay?: smallint;
    ammo_type?: tinyint;
    RangedModRange?: float;
    spellid_1?: mediumint;
    spelltrigger_1?: tinyint;
    spellcharges_1?: smallint;
    spellppmRate_1?: float;
    spellcooldown_1?: int;
    spellcategory_1?: smallint;
    spellcategorycooldown_1?: int;
    spellid_2?: mediumint;
    spelltrigger_2?: tinyint;
    spellcharges_2?: smallint;
    spellppmRate_2?: float;
    spellcooldown_2?: int;
    spellcategory_2?: smallint;
    spellcategorycooldown_2?: int;
    spellid_3?: mediumint;
    spelltrigger_3?: tinyint;
    spellcharges_3?: smallint;
    spellppmRate_3?: float;
    spellcooldown_3?: int;
    spellcategory_3?: smallint;
    spellcategorycooldown_3?: int;
    spellid_4?: mediumint;
    spelltrigger_4?: tinyint;
    spellcharges_4?: smallint;
    spellppmRate_4?: float;
    spellcooldown_4?: int;
    spellcategory_4?: smallint;
    spellcategorycooldown_4?: int;
    spellid_5?: mediumint;
    spelltrigger_5?: tinyint;
    spellcharges_5?: smallint;
    spellppmRate_5?: float;
    spellcooldown_5?: int;
    spellcategory_5?: smallint;
    spellcategorycooldown_5?: int;
    bonding?: tinyint;
    description?: varchar;
    PageText?: mediumint;
    LanguageID?: tinyint;
    PageMaterial?: tinyint;
    startquest?: mediumint;
    lockid?: mediumint;
    Material?: tinyint;
    sheath?: tinyint;
    RandomProperty?: mediumint;
    RandomSuffix?: mediumint;
    block?: mediumint;
    itemset?: mediumint;
    MaxDurability?: smallint;
    area?: mediumint;
    Map?: smallint;
    BagFamily?: mediumint;
    TotemCategory?: mediumint;
    socketColor_1?: tinyint;
    socketContent_1?: mediumint;
    socketColor_2?: tinyint;
    socketContent_2?: mediumint;
    socketColor_3?: tinyint;
    socketContent_3?: mediumint;
    socketBonus?: mediumint;
    GemProperties?: mediumint;
    RequiredDisenchantSkill?: smallint;
    ArmorDamageModifier?: float;
    duration?: int;
    ItemLimitCategory?: smallint;
    HolidayId?: int;
    ScriptName?: varchar;
    DisenchantID?: mediumint;
    FoodType?: tinyint;
    minMoneyLoot?: int;
    maxMoneyLoot?: int;
    flagsCustom?: int;
    VerifiedBuild?: smallint;
};
/**
 * Used for object queries (Don't comment these)
 */
export type item_templateQuery = {
    entry?: Relation<mediumint>;
    class?: Relation<tinyint>;
    subclass?: Relation<tinyint>;
    SoundOverrideSubclass?: Relation<tinyint>;
    name?: Relation<varchar>;
    displayid?: Relation<mediumint>;
    Quality?: Relation<tinyint>;
    Flags?: Relation<int>;
    FlagsExtra?: Relation<int>;
    BuyCount?: Relation<tinyint>;
    SellPrice?: Relation<int>;
    InventoryType?: Relation<tinyint>;
    AllowableClass?: Relation<int>;
    AllowableRace?: Relation<int>;
    ItemLevel?: Relation<smallint>;
    RequiredLevel?: Relation<tinyint>;
    RequiredSkill?: Relation<smallint>;
    RequiredSkillRank?: Relation<smallint>;
    requiredspell?: Relation<mediumint>;
    requiredhonorrank?: Relation<mediumint>;
    RequiredCityRank?: Relation<mediumint>;
    RequiredReputationFaction?: Relation<smallint>;
    RequiredReputationRank?: Relation<smallint>;
    maxcount?: Relation<int>;
    stackable?: Relation<int>;
    ContainerSlots?: Relation<tinyint>;
    StatsCount?: Relation<tinyint>;
    stat_type1?: Relation<tinyint>;
    stat_value1?: Relation<smallint>;
    stat_type2?: Relation<tinyint>;
    stat_value2?: Relation<smallint>;
    stat_type3?: Relation<tinyint>;
    stat_value3?: Relation<smallint>;
    stat_type4?: Relation<tinyint>;
    stat_value4?: Relation<smallint>;
    stat_type5?: Relation<tinyint>;
    stat_value5?: Relation<smallint>;
    stat_type6?: Relation<tinyint>;
    stat_value6?: Relation<smallint>;
    stat_type7?: Relation<tinyint>;
    stat_value7?: Relation<smallint>;
    stat_type8?: Relation<tinyint>;
    stat_value8?: Relation<smallint>;
    stat_type9?: Relation<tinyint>;
    stat_value9?: Relation<smallint>;
    stat_type10?: Relation<tinyint>;
    stat_value10?: Relation<smallint>;
    ScalingStatDistribution?: Relation<smallint>;
    ScalingStatValue?: Relation<int>;
    dmg_min1?: Relation<float>;
    dmg_max1?: Relation<float>;
    dmg_type1?: Relation<tinyint>;
    dmg_min2?: Relation<float>;
    dmg_max2?: Relation<float>;
    dmg_type2?: Relation<tinyint>;
    armor?: Relation<smallint>;
    holy_res?: Relation<tinyint>;
    fire_res?: Relation<tinyint>;
    nature_res?: Relation<tinyint>;
    frost_res?: Relation<tinyint>;
    shadow_res?: Relation<tinyint>;
    arcane_res?: Relation<tinyint>;
    delay?: Relation<smallint>;
    ammo_type?: Relation<tinyint>;
    RangedModRange?: Relation<float>;
    spellid_1?: Relation<mediumint>;
    spelltrigger_1?: Relation<tinyint>;
    spellcharges_1?: Relation<smallint>;
    spellppmRate_1?: Relation<float>;
    spellcooldown_1?: Relation<int>;
    spellcategory_1?: Relation<smallint>;
    spellcategorycooldown_1?: Relation<int>;
    spellid_2?: Relation<mediumint>;
    spelltrigger_2?: Relation<tinyint>;
    spellcharges_2?: Relation<smallint>;
    spellppmRate_2?: Relation<float>;
    spellcooldown_2?: Relation<int>;
    spellcategory_2?: Relation<smallint>;
    spellcategorycooldown_2?: Relation<int>;
    spellid_3?: Relation<mediumint>;
    spelltrigger_3?: Relation<tinyint>;
    spellcharges_3?: Relation<smallint>;
    spellppmRate_3?: Relation<float>;
    spellcooldown_3?: Relation<int>;
    spellcategory_3?: Relation<smallint>;
    spellcategorycooldown_3?: Relation<int>;
    spellid_4?: Relation<mediumint>;
    spelltrigger_4?: Relation<tinyint>;
    spellcharges_4?: Relation<smallint>;
    spellppmRate_4?: Relation<float>;
    spellcooldown_4?: Relation<int>;
    spellcategory_4?: Relation<smallint>;
    spellcategorycooldown_4?: Relation<int>;
    spellid_5?: Relation<mediumint>;
    spelltrigger_5?: Relation<tinyint>;
    spellcharges_5?: Relation<smallint>;
    spellppmRate_5?: Relation<float>;
    spellcooldown_5?: Relation<int>;
    spellcategory_5?: Relation<smallint>;
    spellcategorycooldown_5?: Relation<int>;
    bonding?: Relation<tinyint>;
    description?: Relation<varchar>;
    PageText?: Relation<mediumint>;
    LanguageID?: Relation<tinyint>;
    PageMaterial?: Relation<tinyint>;
    startquest?: Relation<mediumint>;
    lockid?: Relation<mediumint>;
    Material?: Relation<tinyint>;
    sheath?: Relation<tinyint>;
    RandomProperty?: Relation<mediumint>;
    RandomSuffix?: Relation<mediumint>;
    block?: Relation<mediumint>;
    itemset?: Relation<mediumint>;
    MaxDurability?: Relation<smallint>;
    area?: Relation<mediumint>;
    Map?: Relation<smallint>;
    BagFamily?: Relation<mediumint>;
    TotemCategory?: Relation<mediumint>;
    socketColor_1?: Relation<tinyint>;
    socketContent_1?: Relation<mediumint>;
    socketColor_2?: Relation<tinyint>;
    socketContent_2?: Relation<mediumint>;
    socketColor_3?: Relation<tinyint>;
    socketContent_3?: Relation<mediumint>;
    socketBonus?: Relation<mediumint>;
    GemProperties?: Relation<mediumint>;
    RequiredDisenchantSkill?: Relation<smallint>;
    ArmorDamageModifier?: Relation<float>;
    duration?: Relation<int>;
    ItemLimitCategory?: Relation<smallint>;
    HolidayId?: Relation<int>;
    ScriptName?: Relation<varchar>;
    DisenchantID?: Relation<mediumint>;
    FoodType?: Relation<tinyint>;
    minMoneyLoot?: Relation<int>;
    maxMoneyLoot?: Relation<int>;
    flagsCustom?: Relation<int>;
    VerifiedBuild?: Relation<smallint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class item_templateTable extends SqlTable<item_templateCreator, item_templateQuery, item_templateRow> {
    add(entry: mediumint, c?: item_templateCreator): item_templateRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_item_template: item_templateTable;
