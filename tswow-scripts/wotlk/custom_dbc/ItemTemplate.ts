/*
 * Copyright (C) 2020 tswow <https://github.com/tswow/>
 * This program is free software: you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */

/* tslint:disable */
import { DBCFloatCell, DBCIntCell, DBCKeyCell, DBCLocCell, DBCStringCell, DBCUIntCell } from '../../data/dbc/DBCCell'
import { DBCFile } from '../../data/dbc/DBCFile'
import { DBCRow } from '../../data/dbc/DBCRow'
import { Relation } from '../../data/query/Relations'
import { PrimaryKey } from '../../data/table/PrimaryKey'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class ItemTemplateRow extends DBCRow<ItemTemplateCreator,ItemTemplateQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get entry() { return new DBCKeyCell(this,this.buffer,this.offset+0)}

    /**
     * No comment (yet!)
     */
    get class() { return new DBCIntCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get subclass() { return new DBCIntCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get SoundOverrideSubclass() { return new DBCIntCell(this,this.buffer,this.offset+12)}

    /**
     * No comment (yet!)
     */
    get name() { return new DBCLocCell(this,this.buffer,this.offset+16)}

    /**
     * No comment (yet!)
     */
    get displayid() { return new DBCIntCell(this,this.buffer,this.offset+84)}

    /**
     * No comment (yet!)
     */
    get Quality() { return new DBCIntCell(this,this.buffer,this.offset+88)}

    /**
     * No comment (yet!)
     */
    get Flags() { return new DBCUIntCell(this,this.buffer,this.offset+92)}

    /**
     * No comment (yet!)
     */
    get FlagsExtra() { return new DBCIntCell(this,this.buffer,this.offset+96)}

    /**
     * No comment (yet!)
     */
    get BuyCount() { return new DBCIntCell(this,this.buffer,this.offset+100)}

    /**
     * No comment (yet!)
     */
    get BuyPrice() { return new DBCIntCell(this,this.buffer,this.offset+104)}

    /**
     * No comment (yet!)
     */
    get SellPrice() { return new DBCIntCell(this,this.buffer,this.offset+108)}

    /**
     * No comment (yet!)
     */
    get InventoryType() { return new DBCIntCell(this,this.buffer,this.offset+112)}

    /**
     * No comment (yet!)
     */
    get AllowableClass() { return new DBCIntCell(this,this.buffer,this.offset+116)}

    /**
     * No comment (yet!)
     */
    get AllowableRace() { return new DBCIntCell(this,this.buffer,this.offset+120)}

    /**
     * No comment (yet!)
     */
    get ItemLevel() { return new DBCIntCell(this,this.buffer,this.offset+124)}

    /**
     * No comment (yet!)
     */
    get RequiredLevel() { return new DBCIntCell(this,this.buffer,this.offset+128)}

    /**
     * No comment (yet!)
     */
    get RequiredSkill() { return new DBCIntCell(this,this.buffer,this.offset+132)}

    /**
     * No comment (yet!)
     */
    get RequiredSkillRank() { return new DBCIntCell(this,this.buffer,this.offset+136)}

    /**
     * No comment (yet!)
     */
    get requiredspell() { return new DBCIntCell(this,this.buffer,this.offset+140)}

    /**
     * No comment (yet!)
     */
    get requiredhonorrank() { return new DBCIntCell(this,this.buffer,this.offset+144)}

    /**
     * No comment (yet!)
     */
    get RequiredCityRank() { return new DBCIntCell(this,this.buffer,this.offset+148)}

    /**
     * No comment (yet!)
     */
    get RequiredReputationFaction() { return new DBCIntCell(this,this.buffer,this.offset+152)}

    /**
     * No comment (yet!)
     */
    get RequiredReputationRank() { return new DBCIntCell(this,this.buffer,this.offset+156)}

    /**
     * No comment (yet!)
     */
    get maxcount() { return new DBCIntCell(this,this.buffer,this.offset+160)}

    /**
     * No comment (yet!)
     */
    get stackable() { return new DBCIntCell(this,this.buffer,this.offset+164)}

    /**
     * No comment (yet!)
     */
    get ContainerSlots() { return new DBCIntCell(this,this.buffer,this.offset+168)}

    /**
     * 
     * No comment (yet!)
     */
    get StatsCount() { return new DBCIntCell(this,this.buffer,this.offset+172)}

    /**
     *
     * No comment (yet!)
     */
    get stat_type1() { return new DBCIntCell(this,this.buffer,this.offset+176)}

    /**
     *
     * No comment (yet!)
     */
    get stat_value1() { return new DBCIntCell(this,this.buffer,this.offset+180)}

    /**
     *
     * No comment (yet!)
     */
    get stat_type2() { return new DBCIntCell(this,this.buffer,this.offset+184)}

    /**
     *
     * No comment (yet!)
     */
    get stat_value2() { return new DBCIntCell(this,this.buffer,this.offset+188)}

    /**
     *
     * No comment (yet!)
     */
    get stat_type3() { return new DBCIntCell(this,this.buffer,this.offset+192)}

    /**
     *
     * No comment (yet!)
     */
    get stat_value3() { return new DBCIntCell(this,this.buffer,this.offset+196)}

    /**
     *
     * No comment (yet!)
     */
    get stat_type4() { return new DBCIntCell(this,this.buffer,this.offset+200)}

    /**
     *
     * No comment (yet!)
     */
    get stat_value4() { return new DBCIntCell(this,this.buffer,this.offset+204)}

    /**
     *
     * No comment (yet!)
     */
    get stat_type5() { return new DBCIntCell(this,this.buffer,this.offset+208)}

    /**
     *
     * No comment (yet!)
     */
    get stat_value5() { return new DBCIntCell(this,this.buffer,this.offset+212)}

    /**
     *
     * No comment (yet!)
     */
    get stat_type6() { return new DBCIntCell(this,this.buffer,this.offset+216)}

    /**
     *
     * No comment (yet!)
     */
    get stat_value6() { return new DBCIntCell(this,this.buffer,this.offset+220)}

    /**
     *
     * No comment (yet!)
     */
    get stat_type7() { return new DBCIntCell(this,this.buffer,this.offset+224)}

    /**
     *
     * No comment (yet!)
     */
    get stat_value7() { return new DBCIntCell(this,this.buffer,this.offset+228)}

    /**
     *
     * No comment (yet!)
     */
    get stat_type8() { return new DBCIntCell(this,this.buffer,this.offset+232)}

    /**
     *
     * No comment (yet!)
     */
    get stat_value8() { return new DBCIntCell(this,this.buffer,this.offset+236)}

    /**
     *
     * No comment (yet!)
     */
    get stat_type9() { return new DBCIntCell(this,this.buffer,this.offset+240)}

    /**
     *
     * No comment (yet!)
     */
    get stat_value9() { return new DBCIntCell(this,this.buffer,this.offset+244)}

    /**
     *
     * No comment (yet!)
     */
    get stat_type10() { return new DBCIntCell(this,this.buffer,this.offset+248)}

    /**
     *
     * No comment (yet!)
     */
    get stat_value10() { return new DBCIntCell(this,this.buffer,this.offset+252)}

    /**
     *
     * No comment (yet!)
     */
    get ScalingStatDistribution() { return new DBCIntCell(this,this.buffer,this.offset+256)}

    /**
     * No comment (yet!)
     */
    get ScalingStatValue() { return new DBCIntCell(this,this.buffer,this.offset+260)}

    /**
     * No comment (yet!)
     */
    get dmg_min1() { return new DBCFloatCell(this,this.buffer,this.offset+264)}

    /**
     * No comment (yet!)
     */
    get dmg_max1() { return new DBCFloatCell(this,this.buffer,this.offset+268)}

    /**
     * No comment (yet!)
     */
    get dmg_type1() { return new DBCIntCell(this,this.buffer,this.offset+272)}

    /**
     * No comment (yet!)
     */
    get dmg_min2() { return new DBCFloatCell(this,this.buffer,this.offset+276)}

    /**
     * No comment (yet!)
     */
    get dmg_max2() { return new DBCFloatCell(this,this.buffer,this.offset+280)}

    /**
     * No comment (yet!)
     */
    get dmg_type2() { return new DBCIntCell(this,this.buffer,this.offset+284)}

    /**
     * No comment (yet!)
     */
    get armor() { return new DBCIntCell(this,this.buffer,this.offset+288)}

    /**
     * No comment (yet!)
     */
    get holy_res() { return new DBCIntCell(this,this.buffer,this.offset+292)}

    /**
     * No comment (yet!)
     */
    get fire_res() { return new DBCIntCell(this,this.buffer,this.offset+296)}

    /**
     * No comment (yet!)
     */
    get nature_res() { return new DBCIntCell(this,this.buffer,this.offset+300)}

    /**
     * No comment (yet!)
     */
    get frost_res() { return new DBCIntCell(this,this.buffer,this.offset+304)}

    /**
     * No comment (yet!)
     */
    get shadow_res() { return new DBCIntCell(this,this.buffer,this.offset+308)}

    /**
     * No comment (yet!)
     */
    get arcane_res() { return new DBCIntCell(this,this.buffer,this.offset+312)}

    /**
     * No comment (yet!)
     */
    get delay() { return new DBCIntCell(this,this.buffer,this.offset+316)}

    /**
     * No comment (yet!)
     */
    get ammo_type() { return new DBCIntCell(this,this.buffer,this.offset+320)}

    /**
     * No comment (yet!)
     */
    get RangedModRange() { return new DBCFloatCell(this,this.buffer,this.offset+324)}

    /**
     * No comment (yet!)
     */
    get spellid_1() { return new DBCIntCell(this,this.buffer,this.offset+328)}

    /**
     * No comment (yet!)
     */
    get spelltrigger_1() { return new DBCIntCell(this,this.buffer,this.offset+332)}

    /**
     * No comment (yet!)
     */
    get spellcharges_1() { return new DBCIntCell(this,this.buffer,this.offset+336)}

    /**
     * No comment (yet!)
     */
    get spellppmRate_1() { return new DBCFloatCell(this,this.buffer,this.offset+340)}

    /**
     * No comment (yet!)
     */
    get spellcooldown_1() { return new DBCIntCell(this,this.buffer,this.offset+344)}

    /**
     * No comment (yet!)
     */
    get spellcategory_1() { return new DBCIntCell(this,this.buffer,this.offset+348)}

    /**
     * No comment (yet!)
     */
    get spellcategorycooldown_1() { return new DBCIntCell(this,this.buffer,this.offset+352)}

    /**
     * No comment (yet!)
     */
    get spellid_2() { return new DBCIntCell(this,this.buffer,this.offset+356)}

    /**
     * No comment (yet!)
     */
    get spelltrigger_2() { return new DBCIntCell(this,this.buffer,this.offset+360)}

    /**
     * No comment (yet!)
     */
    get spellcharges_2() { return new DBCIntCell(this,this.buffer,this.offset+364)}

    /**
     * No comment (yet!)
     */
    get spellppmRate_2() { return new DBCFloatCell(this,this.buffer,this.offset+368)}

    /**
     * No comment (yet!)
     */
    get spellcooldown_2() { return new DBCIntCell(this,this.buffer,this.offset+372)}

    /**
     * No comment (yet!)
     */
    get spellcategory_2() { return new DBCIntCell(this,this.buffer,this.offset+376)}

    /**
     * No comment (yet!)
     */
    get spellcategorycooldown_2() { return new DBCIntCell(this,this.buffer,this.offset+380)}

    /**
     * No comment (yet!)
     */
    get spellid_3() { return new DBCIntCell(this,this.buffer,this.offset+384)}

    /**
     * No comment (yet!)
     */
    get spelltrigger_3() { return new DBCIntCell(this,this.buffer,this.offset+388)}

    /**
     * No comment (yet!)
     */
    get spellcharges_3() { return new DBCIntCell(this,this.buffer,this.offset+392)}

    /**
     * No comment (yet!)
     */
    get spellppmRate_3() { return new DBCFloatCell(this,this.buffer,this.offset+396)}

    /**
     * No comment (yet!)
     */
    get spellcooldown_3() { return new DBCIntCell(this,this.buffer,this.offset+400)}

    /**
     * No comment (yet!)
     */
    get spellcategory_3() { return new DBCIntCell(this,this.buffer,this.offset+404)}

    /**
     * No comment (yet!)
     */
    get spellcategorycooldown_3() { return new DBCIntCell(this,this.buffer,this.offset+408)}

    /**
     * No comment (yet!)
     */
    get spellid_4() { return new DBCIntCell(this,this.buffer,this.offset+412)}

    /**
     * No comment (yet!)
     */
    get spelltrigger_4() { return new DBCIntCell(this,this.buffer,this.offset+416)}

    /**
     * No comment (yet!)
     */
    get spellcharges_4() { return new DBCIntCell(this,this.buffer,this.offset+420)}

    /**
     * No comment (yet!)
     */
    get spellppmRate_4() { return new DBCFloatCell(this,this.buffer,this.offset+424)}

    /**
     * No comment (yet!)
     */
    get spellcooldown_4() { return new DBCIntCell(this,this.buffer,this.offset+428)}

    /**
     * No comment (yet!)
     */
    get spellcategory_4() { return new DBCIntCell(this,this.buffer,this.offset+432)}

    /**
     * No comment (yet!)
     */
    get spellcategorycooldown_4() { return new DBCIntCell(this,this.buffer,this.offset+436)}

    /**
     * No comment (yet!)
     */
    get spellid_5() { return new DBCIntCell(this,this.buffer,this.offset+440)}

    /**
     * No comment (yet!)
     */
    get spelltrigger_5() { return new DBCIntCell(this,this.buffer,this.offset+444)}

    /**
     * No comment (yet!)
     */
    get spellcharges_5() { return new DBCIntCell(this,this.buffer,this.offset+448)}

    /**
     * No comment (yet!)
     */
    get spellppmRate_5() { return new DBCFloatCell(this,this.buffer,this.offset+452)}

    /**
     * No comment (yet!)
     */
    get spellcooldown_5() { return new DBCIntCell(this,this.buffer,this.offset+456)}

    /**
     * No comment (yet!)
     */
    get spellcategory_5() { return new DBCIntCell(this,this.buffer,this.offset+460)}

    /**
     * No comment (yet!)
     */
    get spellcategorycooldown_5() { return new DBCIntCell(this,this.buffer,this.offset+464)}

    /**
     * No comment (yet!)
     */
    get bonding() { return new DBCIntCell(this,this.buffer,this.offset+468)}

    /**
     * No comment (yet!)
     */
    get description() { return new DBCLocCell(this,this.buffer,this.offset+472)}

    /**
     * No comment (yet!)
     */
    get PageText() { return new DBCIntCell(this,this.buffer,this.offset+540)}

    /**
     * No comment (yet!)
     */
    get LanguageID() { return new DBCIntCell(this,this.buffer,this.offset+544)}

    /**
     * No comment (yet!)
     */
    get PageMaterial() { return new DBCIntCell(this,this.buffer,this.offset+548)}

    /**
     * No comment (yet!)
     */
    get startquest() { return new DBCIntCell(this,this.buffer,this.offset+552)}

    /**
     * No comment (yet!)
     */
    get lockid() { return new DBCIntCell(this,this.buffer,this.offset+556)}

    /**
     * No comment (yet!)
     */
    get Material() { return new DBCIntCell(this,this.buffer,this.offset+560)}

    /**
     * No comment (yet!)
     */
    get sheath() { return new DBCIntCell(this,this.buffer,this.offset+564)}

    /**
     * No comment (yet!)
     */
    get RandomProperty() { return new DBCIntCell(this,this.buffer,this.offset+568)}

    /**
     * No comment (yet!)
     */
    get RandomSuffix() { return new DBCIntCell(this,this.buffer,this.offset+572)}

    /**
     * No comment (yet!)
     */
    get block() { return new DBCIntCell(this,this.buffer,this.offset+576)}

    /**
     * No comment (yet!)
     */
    get itemset() { return new DBCIntCell(this,this.buffer,this.offset+580)}

    /**
     * No comment (yet!)
     */
    get MaxDurability() { return new DBCIntCell(this,this.buffer,this.offset+584)}

    /**
     * No comment (yet!)
     */
    get area() { return new DBCIntCell(this,this.buffer,this.offset+588)}

    /**
     * No comment (yet!)
     */
    get Map() { return new DBCIntCell(this,this.buffer,this.offset+592)}

    /**
     * No comment (yet!)
     */
    get BagFamily() { return new DBCIntCell(this,this.buffer,this.offset+596)}

    /**
     * No comment (yet!)
     */
    get TotemCategory() { return new DBCIntCell(this,this.buffer,this.offset+600)}

    /**
     * No comment (yet!)
     */
    get socketColor_1() { return new DBCIntCell(this,this.buffer,this.offset+604)}

    /**
     * No comment (yet!)
     */
    get socketContent_1() { return new DBCIntCell(this,this.buffer,this.offset+608)}

    /**
     * No comment (yet!)
     */
    get socketColor_2() { return new DBCIntCell(this,this.buffer,this.offset+612)}

    /**
     * No comment (yet!)
     */
    get socketContent_2() { return new DBCIntCell(this,this.buffer,this.offset+616)}

    /**
     * No comment (yet!)
     */
    get socketColor_3() { return new DBCIntCell(this,this.buffer,this.offset+620)}

    /**
     * No comment (yet!)
     */
    get socketContent_3() { return new DBCIntCell(this,this.buffer,this.offset+624)}

    /**
     * No comment (yet!)
     */
    get socketBonus() { return new DBCIntCell(this,this.buffer,this.offset+628)}

    /**
     * No comment (yet!)
     */
    get GemProperties() { return new DBCIntCell(this,this.buffer,this.offset+632)}

    /**
     * No comment (yet!)
     */
    get RequiredDisenchantSkill() { return new DBCIntCell(this,this.buffer,this.offset+636)}

    /**
     * No comment (yet!)
     */
    get ArmorDamageModifier() { return new DBCFloatCell(this,this.buffer,this.offset+640)}

    /**
     * No comment (yet!)
     */
    get duration() { return new DBCIntCell(this,this.buffer,this.offset+644)}

    /**
     * No comment (yet!)
     */
    get ItemLimitCategory() { return new DBCIntCell(this,this.buffer,this.offset+648)}

    /**
     * No comment (yet!)
     */
    get HolidayId() { return new DBCIntCell(this,this.buffer,this.offset+652)}

    /**
     * No comment (yet!)
     */
    get ScriptName() { return new DBCStringCell(this,this.buffer,this.offset+656)}

    /**
     * No comment (yet!)
     */
    get DisenchantID() { return new DBCIntCell(this,this.buffer,this.offset+660)}

    /**
     * No comment (yet!)
     */
    get FoodType() { return new DBCIntCell(this,this.buffer,this.offset+664)}

    /**
     * No comment (yet!)
     */
    get minMoneyLoot() { return new DBCIntCell(this,this.buffer,this.offset+668)}

    /**
     * No comment (yet!)
     */
    get maxMoneyLoot() { return new DBCIntCell(this,this.buffer,this.offset+672)}

    /**
     * No comment (yet!)
     */
    get flagsCustom() { return new DBCIntCell(this,this.buffer,this.offset+676)}

    static SIZE = 680;

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int32, c? : ItemTemplateCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type ItemTemplateCreator = {
    entry? : int32,
    class? : int32,
    subclass? : int32,
    SoundOverrideSubclass? : int32,
    name? : string,
    displayid? : int32,
    Quality? : int32,
    Flags? : int32,
    FlagsExtra? : int32,
    BuyCount? : int32,
    BuyPrice? : int32,
    SellPrice? : int32,
    InventoryType? : int32,
    AllowableClass? : int32,
    AllowableRace? : int32,
    ItemLevel? : int32,
    RequiredLevel? : int32,
    RequiredSkill? : int32,
    RequiredSkillRank? : int32,
    requiredspell? : int32,
    requiredhonorrank? : int32,
    RequiredCityRank? : int32,
    RequiredReputationFaction? : int32,
    RequiredReputationRank? : int32,
    maxcount? : int32,
    stackable? : int32,
    ContainerSlots? : int32,
    StatsCount? : int32,
    stat_type1? : int32,
    stat_value1? : int32,
    stat_type2? : int32,
    stat_value2? : int32,
    stat_type3? : int32,
    stat_value3? : int32,
    stat_type4? : int32,
    stat_value4? : int32,
    stat_type5? : int32,
    stat_value5? : int32,
    stat_type6? : int32,
    stat_value6? : int32,
    stat_type7? : int32,
    stat_value7? : int32,
    stat_type8? : int32,
    stat_value8? : int32,
    stat_type9? : int32,
    stat_value9? : int32,
    stat_type10? : int32,
    stat_value10? : int32,
    ScalingStatDistribution? : int32,
    ScalingStatValue? : int32,
    dmg_min1? : float,
    dmg_max1? : float,
    dmg_type1? : int32,
    dmg_min2? : float,
    dmg_max2? : float,
    dmg_type2? : int32,
    armor? : int32,
    holy_res? : int32,
    fire_res? : int32,
    nature_res? : int32,
    frost_res? : int32,
    shadow_res? : int32,
    arcane_res? : int32,
    delay? : int32,
    ammo_type? : int32,
    RangedModRange? : float,
    spellid_1? : int32,
    spelltrigger_1? : int32,
    spellcharges_1? : int32,
    spellppmRate_1? : float,
    spellcooldown_1? : int32,
    spellcategory_1? : int32,
    spellcategorycooldown_1? : int32,
    spellid_2? : int32,
    spelltrigger_2? : int32,
    spellcharges_2? : int32,
    spellppmRate_2? : float,
    spellcooldown_2? : int32,
    spellcategory_2? : int32,
    spellcategorycooldown_2? : int32,
    spellid_3? : int32,
    spelltrigger_3? : int32,
    spellcharges_3? : int32,
    spellppmRate_3? : float,
    spellcooldown_3? : int32,
    spellcategory_3? : int32,
    spellcategorycooldown_3? : int32,
    spellid_4? : int32,
    spelltrigger_4? : int32,
    spellcharges_4? : int32,
    spellppmRate_4? : float,
    spellcooldown_4? : int32,
    spellcategory_4? : int32,
    spellcategorycooldown_4? : int32,
    spellid_5? : int32,
    spelltrigger_5? : int32,
    spellcharges_5? : int32,
    spellppmRate_5? : float,
    spellcooldown_5? : int32,
    spellcategory_5? : int32,
    spellcategorycooldown_5? : int32,
    bonding? : int32,
    description? : string,
    PageText? : int32,
    LanguageID? : int32,
    PageMaterial? : int32,
    startquest? : int32,
    lockid? : int32,
    Material? : int32,
    sheath? : int32,
    RandomProperty? : int32,
    RandomSuffix? : int32,
    block? : int32,
    itemset? : int32,
    MaxDurability? : int32,
    area? : int32,
    Map? : int32,
    BagFamily? : int32,
    TotemCategory? : int32,
    socketColor_1? : int32,
    socketContent_1? : int32,
    socketColor_2? : int32,
    socketContent_2? : int32,
    socketColor_3? : int32,
    socketContent_3? : int32,
    socketBonus? : int32,
    GemProperties? : int32,
    RequiredDisenchantSkill? : int32,
    ArmorDamageModifier? : float,
    duration? : int32,
    ItemLimitCategory? : int32,
    HolidayId? : int32,
    ScriptName? : string,
    DisenchantID? : int32,
    FoodType? : int32,
    minMoneyLoot? : int32,
    maxMoneyLoot? : int32,
    flagsCustom? : int32,
}

/**
 * Used for queries (Don't comment these)
 */
export type ItemTemplateQuery = {
    entry? : Relation<int32>,
    class? : Relation<int32>,
    subclass? : Relation<int32>,
    SoundOverrideSubclass? : Relation<int32>,
    name? : Relation<string>,
    displayid? : Relation<int32>,
    Quality? : Relation<int32>,
    Flags? : Relation<int32>,
    FlagsExtra? : Relation<int32>,
    BuyCount? : Relation<int32>,
    SellPrice? : Relation<int32>,
    InventoryType? : Relation<int32>,
    AllowableClass? : Relation<int32>,
    AllowableRace? : Relation<int32>,
    ItemLevel? : Relation<int32>,
    RequiredLevel? : Relation<int32>,
    RequiredSkill? : Relation<int32>,
    RequiredSkillRank? : Relation<int32>,
    requiredspell? : Relation<int32>,
    requiredhonorrank? : Relation<int32>,
    RequiredCityRank? : Relation<int32>,
    RequiredReputationFaction? : Relation<int32>,
    RequiredReputationRank? : Relation<int32>,
    maxcount? : Relation<int32>,
    stackable? : Relation<int32>,
    ContainerSlots? : Relation<int32>,
    StatsCount? : Relation<int32>,
    stat_type1? : Relation<int32>,
    stat_value1? : Relation<int32>,
    stat_type2? : Relation<int32>,
    stat_value2? : Relation<int32>,
    stat_type3? : Relation<int32>,
    stat_value3? : Relation<int32>,
    stat_type4? : Relation<int32>,
    stat_value4? : Relation<int32>,
    stat_type5? : Relation<int32>,
    stat_value5? : Relation<int32>,
    stat_type6? : Relation<int32>,
    stat_value6? : Relation<int32>,
    stat_type7? : Relation<int32>,
    stat_value7? : Relation<int32>,
    stat_type8? : Relation<int32>,
    stat_value8? : Relation<int32>,
    stat_type9? : Relation<int32>,
    stat_value9? : Relation<int32>,
    stat_type10? : Relation<int32>,
    stat_value10? : Relation<int32>,
    ScalingStatDistribution? : Relation<int32>,
    ScalingStatValue? : Relation<int32>,
    dmg_min1? : Relation<float>,
    dmg_max1? : Relation<float>,
    dmg_type1? : Relation<int32>,
    dmg_min2? : Relation<float>,
    dmg_max2? : Relation<float>,
    dmg_type2? : Relation<int32>,
    armor? : Relation<int32>,
    holy_res? : Relation<int32>,
    fire_res? : Relation<int32>,
    nature_res? : Relation<int32>,
    frost_res? : Relation<int32>,
    shadow_res? : Relation<int32>,
    arcane_res? : Relation<int32>,
    delay? : Relation<int32>,
    ammo_type? : Relation<int32>,
    RangedModRange? : Relation<float>,
    spellid_1? : Relation<int32>,
    spelltrigger_1? : Relation<int32>,
    spellcharges_1? : Relation<int32>,
    spellppmRate_1? : Relation<float>,
    spellcooldown_1? : Relation<int32>,
    spellcategory_1? : Relation<int32>,
    spellcategorycooldown_1? : Relation<int32>,
    spellid_2? : Relation<int32>,
    spelltrigger_2? : Relation<int32>,
    spellcharges_2? : Relation<int32>,
    spellppmRate_2? : Relation<float>,
    spellcooldown_2? : Relation<int32>,
    spellcategory_2? : Relation<int32>,
    spellcategorycooldown_2? : Relation<int32>,
    spellid_3? : Relation<int32>,
    spelltrigger_3? : Relation<int32>,
    spellcharges_3? : Relation<int32>,
    spellppmRate_3? : Relation<float>,
    spellcooldown_3? : Relation<int32>,
    spellcategory_3? : Relation<int32>,
    spellcategorycooldown_3? : Relation<int32>,
    spellid_4? : Relation<int32>,
    spelltrigger_4? : Relation<int32>,
    spellcharges_4? : Relation<int32>,
    spellppmRate_4? : Relation<float>,
    spellcooldown_4? : Relation<int32>,
    spellcategory_4? : Relation<int32>,
    spellcategorycooldown_4? : Relation<int32>,
    spellid_5? : Relation<int32>,
    spelltrigger_5? : Relation<int32>,
    spellcharges_5? : Relation<int32>,
    spellppmRate_5? : Relation<float>,
    spellcooldown_5? : Relation<int32>,
    spellcategory_5? : Relation<int32>,
    spellcategorycooldown_5? : Relation<int32>,
    bonding? : Relation<int32>,
    description? : Relation<string>,
    PageText? : Relation<int32>,
    LanguageID? : Relation<int32>,
    PageMaterial? : Relation<int32>,
    startquest? : Relation<int32>,
    lockid? : Relation<int32>,
    Material? : Relation<int32>,
    sheath? : Relation<int32>,
    RandomProperty? : Relation<int32>,
    RandomSuffix? : Relation<int32>,
    block? : Relation<int32>,
    itemset? : Relation<int32>,
    MaxDurability? : Relation<int32>,
    area? : Relation<int32>,
    Map? : Relation<int32>,
    BagFamily? : Relation<int32>,
    TotemCategory? : Relation<int32>,
    socketColor_1? : Relation<int32>,
    socketContent_1? : Relation<int32>,
    socketColor_2? : Relation<int32>,
    socketContent_2? : Relation<int32>,
    socketColor_3? : Relation<int32>,
    socketContent_3? : Relation<int32>,
    socketBonus? : Relation<int32>,
    GemProperties? : Relation<int32>,
    RequiredDisenchantSkill? : Relation<int32>,
    ArmorDamageModifier? : Relation<float>,
    duration? : Relation<int32>,
    ItemLimitCategory? : Relation<int32>,
    HolidayId? : Relation<int32>,
    ScriptName? : Relation<string>,
    DisenchantID? : Relation<int32>,
    FoodType? : Relation<int32>,
    minMoneyLoot? : Relation<int32>,
    maxMoneyLoot? : Relation<int32>,
    flagsCustom? : Relation<int32>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class ItemTemplateDBCFile extends DBCFile<
    ItemTemplateCreator,
    ItemTemplateQuery,
    ItemTemplateRow> {
    constructor() {
        super('ItemTemplate',(t,b,o)=>new ItemTemplateRow(t,b,o))
    }
    /** Loads a new ItemTemplate.dbc from a file. */
    static read(path: string): ItemTemplateDBCFile {
        return new ItemTemplateDBCFile().read(path);
    }

    add(entry : int32, c? : ItemTemplateCreator) : ItemTemplateRow {
        return this.makeRow(0).clone(entry,c)
    }

    findById(id: number) {
        return this.fastSearch(id);
    }
}