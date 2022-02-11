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
import { float, int, mediumint, smallint, tinyint, varchar } from '../../primitives'
import { Relation } from '../../query/Relations'
import { PrimaryKey } from '../../table/PrimaryKey'
import { SQLCell, SQLCellReadOnly } from '../SQLCell'
import { SqlRow } from '../SQLRow'
import { SqlTable } from '../SQLTable'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class item_templateRow extends SqlRow<item_templateCreator,item_templateQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get entry() {return new SQLCellReadOnly<mediumint, this>(this, 'entry')}

    /**
     * No comment (yet!)
     */
    get class() {return new SQLCell<tinyint, this>(this, 'class')}

    /**
     * No comment (yet!)
     */
    get subclass() {return new SQLCell<tinyint, this>(this, 'subclass')}

    /**
     * No comment (yet!)
     */
    get SoundOverrideSubclass() {return new SQLCell<tinyint, this>(this, 'SoundOverrideSubclass')}

    /**
     * No comment (yet!)
     */
    get name() {return new SQLCell<varchar, this>(this, 'name')}

    /**
     * No comment (yet!)
     */
    get displayid() {return new SQLCell<mediumint, this>(this, 'displayid')}

    /**
     * No comment (yet!)
     */
    get Quality() {return new SQLCell<tinyint, this>(this, 'Quality')}

    /**
     * No comment (yet!)
     */
    get Flags() {return new SQLCell<int, this>(this, 'Flags')}

    /**
     * No comment (yet!)
     */
    get FlagsExtra() {return new SQLCell<int, this>(this, 'FlagsExtra')}

    /**
     * No comment (yet!)
     */
    get BuyCount() {return new SQLCell<tinyint, this>(this, 'BuyCount')}

    /**
     * No comment (yet!)
     */
    get BuyPrice() {return new SQLCell<bigint, this>(this, 'BuyPrice')}

    /**
     * No comment (yet!)
     */
    get SellPrice() {return new SQLCell<int, this>(this, 'SellPrice')}

    /**
     * No comment (yet!)
     */
    get InventoryType() {return new SQLCell<tinyint, this>(this, 'InventoryType')}

    /**
     * No comment (yet!)
     */
    get AllowableClass() {return new SQLCell<int, this>(this, 'AllowableClass')}

    /**
     * No comment (yet!)
     */
    get AllowableRace() {return new SQLCell<int, this>(this, 'AllowableRace')}

    /**
     * No comment (yet!)
     */
    get ItemLevel() {return new SQLCell<smallint, this>(this, 'ItemLevel')}

    /**
     * No comment (yet!)
     */
    get RequiredLevel() {return new SQLCell<tinyint, this>(this, 'RequiredLevel')}

    /**
     * No comment (yet!)
     */
    get RequiredSkill() {return new SQLCell<smallint, this>(this, 'RequiredSkill')}

    /**
     * No comment (yet!)
     */
    get RequiredSkillRank() {return new SQLCell<smallint, this>(this, 'RequiredSkillRank')}

    /**
     * No comment (yet!)
     */
    get requiredspell() {return new SQLCell<mediumint, this>(this, 'requiredspell')}

    /**
     * No comment (yet!)
     */
    get requiredhonorrank() {return new SQLCell<mediumint, this>(this, 'requiredhonorrank')}

    /**
     * No comment (yet!)
     */
    get RequiredCityRank() {return new SQLCell<mediumint, this>(this, 'RequiredCityRank')}

    /**
     * No comment (yet!)
     */
    get RequiredReputationFaction() {return new SQLCell<smallint, this>(this, 'RequiredReputationFaction')}

    /**
     * No comment (yet!)
     */
    get RequiredReputationRank() {return new SQLCell<smallint, this>(this, 'RequiredReputationRank')}

    /**
     * No comment (yet!)
     */
    get maxcount() {return new SQLCell<int, this>(this, 'maxcount')}

    /**
     * No comment (yet!)
     */
    get stackable() {return new SQLCell<int, this>(this, 'stackable')}

    /**
     * No comment (yet!)
     */
    get ContainerSlots() {return new SQLCell<tinyint, this>(this, 'ContainerSlots')}

    /**
     * No comment (yet!)
     */
    get StatsCount() {return new SQLCell<tinyint, this>(this, 'StatsCount')}

    /**
     * No comment (yet!)
     */
    get stat_type1() {return new SQLCell<tinyint, this>(this, 'stat_type1')}

    /**
     * No comment (yet!)
     */
    get stat_value1() {return new SQLCell<smallint, this>(this, 'stat_value1')}

    /**
     * No comment (yet!)
     */
    get stat_type2() {return new SQLCell<tinyint, this>(this, 'stat_type2')}

    /**
     * No comment (yet!)
     */
    get stat_value2() {return new SQLCell<smallint, this>(this, 'stat_value2')}

    /**
     * No comment (yet!)
     */
    get stat_type3() {return new SQLCell<tinyint, this>(this, 'stat_type3')}

    /**
     * No comment (yet!)
     */
    get stat_value3() {return new SQLCell<smallint, this>(this, 'stat_value3')}

    /**
     * No comment (yet!)
     */
    get stat_type4() {return new SQLCell<tinyint, this>(this, 'stat_type4')}

    /**
     * No comment (yet!)
     */
    get stat_value4() {return new SQLCell<smallint, this>(this, 'stat_value4')}

    /**
     * No comment (yet!)
     */
    get stat_type5() {return new SQLCell<tinyint, this>(this, 'stat_type5')}

    /**
     * No comment (yet!)
     */
    get stat_value5() {return new SQLCell<smallint, this>(this, 'stat_value5')}

    /**
     * No comment (yet!)
     */
    get stat_type6() {return new SQLCell<tinyint, this>(this, 'stat_type6')}

    /**
     * No comment (yet!)
     */
    get stat_value6() {return new SQLCell<smallint, this>(this, 'stat_value6')}

    /**
     * No comment (yet!)
     */
    get stat_type7() {return new SQLCell<tinyint, this>(this, 'stat_type7')}

    /**
     * No comment (yet!)
     */
    get stat_value7() {return new SQLCell<smallint, this>(this, 'stat_value7')}

    /**
     * No comment (yet!)
     */
    get stat_type8() {return new SQLCell<tinyint, this>(this, 'stat_type8')}

    /**
     * No comment (yet!)
     */
    get stat_value8() {return new SQLCell<smallint, this>(this, 'stat_value8')}

    /**
     * No comment (yet!)
     */
    get stat_type9() {return new SQLCell<tinyint, this>(this, 'stat_type9')}

    /**
     * No comment (yet!)
     */
    get stat_value9() {return new SQLCell<smallint, this>(this, 'stat_value9')}

    /**
     * No comment (yet!)
     */
    get stat_type10() {return new SQLCell<tinyint, this>(this, 'stat_type10')}

    /**
     * No comment (yet!)
     */
    get stat_value10() {return new SQLCell<smallint, this>(this, 'stat_value10')}

    /**
     * No comment (yet!)
     */
    get ScalingStatDistribution() {return new SQLCell<smallint, this>(this, 'ScalingStatDistribution')}

    /**
     * No comment (yet!)
     */
    get ScalingStatValue() {return new SQLCell<int, this>(this, 'ScalingStatValue')}

    /**
     * No comment (yet!)
     */
    get dmg_min1() {return new SQLCell<float, this>(this, 'dmg_min1')}

    /**
     * No comment (yet!)
     */
    get dmg_max1() {return new SQLCell<float, this>(this, 'dmg_max1')}

    /**
     * No comment (yet!)
     */
    get dmg_type1() {return new SQLCell<tinyint, this>(this, 'dmg_type1')}

    /**
     * No comment (yet!)
     */
    get dmg_min2() {return new SQLCell<float, this>(this, 'dmg_min2')}

    /**
     * No comment (yet!)
     */
    get dmg_max2() {return new SQLCell<float, this>(this, 'dmg_max2')}

    /**
     * No comment (yet!)
     */
    get dmg_type2() {return new SQLCell<tinyint, this>(this, 'dmg_type2')}

    /**
     * No comment (yet!)
     */
    get armor() {return new SQLCell<smallint, this>(this, 'armor')}

    /**
     * No comment (yet!)
     */
    get holy_res() {return new SQLCell<tinyint, this>(this, 'holy_res')}

    /**
     * No comment (yet!)
     */
    get fire_res() {return new SQLCell<tinyint, this>(this, 'fire_res')}

    /**
     * No comment (yet!)
     */
    get nature_res() {return new SQLCell<tinyint, this>(this, 'nature_res')}

    /**
     * No comment (yet!)
     */
    get frost_res() {return new SQLCell<tinyint, this>(this, 'frost_res')}

    /**
     * No comment (yet!)
     */
    get shadow_res() {return new SQLCell<tinyint, this>(this, 'shadow_res')}

    /**
     * No comment (yet!)
     */
    get arcane_res() {return new SQLCell<tinyint, this>(this, 'arcane_res')}

    /**
     * No comment (yet!)
     */
    get delay() {return new SQLCell<smallint, this>(this, 'delay')}

    /**
     * No comment (yet!)
     */
    get ammo_type() {return new SQLCell<tinyint, this>(this, 'ammo_type')}

    /**
     * No comment (yet!)
     */
    get RangedModRange() {return new SQLCell<float, this>(this, 'RangedModRange')}

    /**
     * No comment (yet!)
     */
    get spellid_1() {return new SQLCell<mediumint, this>(this, 'spellid_1')}

    /**
     * No comment (yet!)
     */
    get spelltrigger_1() {return new SQLCell<tinyint, this>(this, 'spelltrigger_1')}

    /**
     * No comment (yet!)
     */
    get spellcharges_1() {return new SQLCell<smallint, this>(this, 'spellcharges_1')}

    /**
     * No comment (yet!)
     */
    get spellppmRate_1() {return new SQLCell<float, this>(this, 'spellppmRate_1')}

    /**
     * No comment (yet!)
     */
    get spellcooldown_1() {return new SQLCell<int, this>(this, 'spellcooldown_1')}

    /**
     * No comment (yet!)
     */
    get spellcategory_1() {return new SQLCell<smallint, this>(this, 'spellcategory_1')}

    /**
     * No comment (yet!)
     */
    get spellcategorycooldown_1() {return new SQLCell<int, this>(this, 'spellcategorycooldown_1')}

    /**
     * No comment (yet!)
     */
    get spellid_2() {return new SQLCell<mediumint, this>(this, 'spellid_2')}

    /**
     * No comment (yet!)
     */
    get spelltrigger_2() {return new SQLCell<tinyint, this>(this, 'spelltrigger_2')}

    /**
     * No comment (yet!)
     */
    get spellcharges_2() {return new SQLCell<smallint, this>(this, 'spellcharges_2')}

    /**
     * No comment (yet!)
     */
    get spellppmRate_2() {return new SQLCell<float, this>(this, 'spellppmRate_2')}

    /**
     * No comment (yet!)
     */
    get spellcooldown_2() {return new SQLCell<int, this>(this, 'spellcooldown_2')}

    /**
     * No comment (yet!)
     */
    get spellcategory_2() {return new SQLCell<smallint, this>(this, 'spellcategory_2')}

    /**
     * No comment (yet!)
     */
    get spellcategorycooldown_2() {return new SQLCell<int, this>(this, 'spellcategorycooldown_2')}

    /**
     * No comment (yet!)
     */
    get spellid_3() {return new SQLCell<mediumint, this>(this, 'spellid_3')}

    /**
     * No comment (yet!)
     */
    get spelltrigger_3() {return new SQLCell<tinyint, this>(this, 'spelltrigger_3')}

    /**
     * No comment (yet!)
     */
    get spellcharges_3() {return new SQLCell<smallint, this>(this, 'spellcharges_3')}

    /**
     * No comment (yet!)
     */
    get spellppmRate_3() {return new SQLCell<float, this>(this, 'spellppmRate_3')}

    /**
     * No comment (yet!)
     */
    get spellcooldown_3() {return new SQLCell<int, this>(this, 'spellcooldown_3')}

    /**
     * No comment (yet!)
     */
    get spellcategory_3() {return new SQLCell<smallint, this>(this, 'spellcategory_3')}

    /**
     * No comment (yet!)
     */
    get spellcategorycooldown_3() {return new SQLCell<int, this>(this, 'spellcategorycooldown_3')}

    /**
     * No comment (yet!)
     */
    get spellid_4() {return new SQLCell<mediumint, this>(this, 'spellid_4')}

    /**
     * No comment (yet!)
     */
    get spelltrigger_4() {return new SQLCell<tinyint, this>(this, 'spelltrigger_4')}

    /**
     * No comment (yet!)
     */
    get spellcharges_4() {return new SQLCell<smallint, this>(this, 'spellcharges_4')}

    /**
     * No comment (yet!)
     */
    get spellppmRate_4() {return new SQLCell<float, this>(this, 'spellppmRate_4')}

    /**
     * No comment (yet!)
     */
    get spellcooldown_4() {return new SQLCell<int, this>(this, 'spellcooldown_4')}

    /**
     * No comment (yet!)
     */
    get spellcategory_4() {return new SQLCell<smallint, this>(this, 'spellcategory_4')}

    /**
     * No comment (yet!)
     */
    get spellcategorycooldown_4() {return new SQLCell<int, this>(this, 'spellcategorycooldown_4')}

    /**
     * No comment (yet!)
     */
    get spellid_5() {return new SQLCell<mediumint, this>(this, 'spellid_5')}

    /**
     * No comment (yet!)
     */
    get spelltrigger_5() {return new SQLCell<tinyint, this>(this, 'spelltrigger_5')}

    /**
     * No comment (yet!)
     */
    get spellcharges_5() {return new SQLCell<smallint, this>(this, 'spellcharges_5')}

    /**
     * No comment (yet!)
     */
    get spellppmRate_5() {return new SQLCell<float, this>(this, 'spellppmRate_5')}

    /**
     * No comment (yet!)
     */
    get spellcooldown_5() {return new SQLCell<int, this>(this, 'spellcooldown_5')}

    /**
     * No comment (yet!)
     */
    get spellcategory_5() {return new SQLCell<smallint, this>(this, 'spellcategory_5')}

    /**
     * No comment (yet!)
     */
    get spellcategorycooldown_5() {return new SQLCell<int, this>(this, 'spellcategorycooldown_5')}

    /**
     * No comment (yet!)
     */
    get bonding() {return new SQLCell<tinyint, this>(this, 'bonding')}

    /**
     * No comment (yet!)
     */
    get description() {return new SQLCell<varchar, this>(this, 'description')}

    /**
     * No comment (yet!)
     */
    get PageText() {return new SQLCell<mediumint, this>(this, 'PageText')}

    /**
     * No comment (yet!)
     */
    get LanguageID() {return new SQLCell<tinyint, this>(this, 'LanguageID')}

    /**
     * No comment (yet!)
     */
    get PageMaterial() {return new SQLCell<tinyint, this>(this, 'PageMaterial')}

    /**
     * No comment (yet!)
     */
    get startquest() {return new SQLCell<mediumint, this>(this, 'startquest')}

    /**
     * No comment (yet!)
     */
    get lockid() {return new SQLCell<mediumint, this>(this, 'lockid')}

    /**
     * No comment (yet!)
     */
    get Material() {return new SQLCell<tinyint, this>(this, 'Material')}

    /**
     * No comment (yet!)
     */
    get sheath() {return new SQLCell<tinyint, this>(this, 'sheath')}

    /**
     * No comment (yet!)
     */
    get RandomProperty() {return new SQLCell<mediumint, this>(this, 'RandomProperty')}

    /**
     * No comment (yet!)
     */
    get RandomSuffix() {return new SQLCell<mediumint, this>(this, 'RandomSuffix')}

    /**
     * No comment (yet!)
     */
    get block() {return new SQLCell<mediumint, this>(this, 'block')}

    /**
     * No comment (yet!)
     */
    get itemset() {return new SQLCell<mediumint, this>(this, 'itemset')}

    /**
     * No comment (yet!)
     */
    get MaxDurability() {return new SQLCell<smallint, this>(this, 'MaxDurability')}

    /**
     * No comment (yet!)
     */
    get area() {return new SQLCell<mediumint, this>(this, 'area')}

    /**
     * No comment (yet!)
     */
    get Map() {return new SQLCell<smallint, this>(this, 'Map')}

    /**
     * No comment (yet!)
     */
    get BagFamily() {return new SQLCell<mediumint, this>(this, 'BagFamily')}

    /**
     * No comment (yet!)
     */
    get TotemCategory() {return new SQLCell<mediumint, this>(this, 'TotemCategory')}

    /**
     * No comment (yet!)
     */
    get socketColor_1() {return new SQLCell<tinyint, this>(this, 'socketColor_1')}

    /**
     * No comment (yet!)
     */
    get socketContent_1() {return new SQLCell<mediumint, this>(this, 'socketContent_1')}

    /**
     * No comment (yet!)
     */
    get socketColor_2() {return new SQLCell<tinyint, this>(this, 'socketColor_2')}

    /**
     * No comment (yet!)
     */
    get socketContent_2() {return new SQLCell<mediumint, this>(this, 'socketContent_2')}

    /**
     * No comment (yet!)
     */
    get socketColor_3() {return new SQLCell<tinyint, this>(this, 'socketColor_3')}

    /**
     * No comment (yet!)
     */
    get socketContent_3() {return new SQLCell<mediumint, this>(this, 'socketContent_3')}

    /**
     * No comment (yet!)
     */
    get socketBonus() {return new SQLCell<mediumint, this>(this, 'socketBonus')}

    /**
     * No comment (yet!)
     */
    get GemProperties() {return new SQLCell<mediumint, this>(this, 'GemProperties')}

    /**
     * No comment (yet!)
     */
    get RequiredDisenchantSkill() {return new SQLCell<smallint, this>(this, 'RequiredDisenchantSkill')}

    /**
     * No comment (yet!)
     */
    get ArmorDamageModifier() {return new SQLCell<float, this>(this, 'ArmorDamageModifier')}

    /**
     * No comment (yet!)
     */
    get duration() {return new SQLCell<int, this>(this, 'duration')}

    /**
     * No comment (yet!)
     */
    get ItemLimitCategory() {return new SQLCell<smallint, this>(this, 'ItemLimitCategory')}

    /**
     * No comment (yet!)
     */
    get HolidayId() {return new SQLCell<int, this>(this, 'HolidayId')}

    /**
     * No comment (yet!)
     */
    get ScriptName() {return new SQLCell<varchar, this>(this, 'ScriptName')}

    /**
     * No comment (yet!)
     */
    get DisenchantID() {return new SQLCell<mediumint, this>(this, 'DisenchantID')}

    /**
     * No comment (yet!)
     */
    get FoodType() {return new SQLCell<tinyint, this>(this, 'FoodType')}

    /**
     * No comment (yet!)
     */
    get minMoneyLoot() {return new SQLCell<int, this>(this, 'minMoneyLoot')}

    /**
     * No comment (yet!)
     */
    get maxMoneyLoot() {return new SQLCell<int, this>(this, 'maxMoneyLoot')}

    /**
     * No comment (yet!)
     */
    get flagsCustom() {return new SQLCell<int, this>(this, 'flagsCustom')}

    /**
     * No comment (yet!)
     */
    get VerifiedBuild() {return new SQLCell<smallint, this>(this, 'VerifiedBuild')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(entry : mediumint, c? : item_templateCreator) : this {
        return this.cloneInternal([entry],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type item_templateCreator = {
    entry? : mediumint,
    class? : tinyint,
    subclass? : tinyint,
    SoundOverrideSubclass? : tinyint,
    name? : varchar,
    displayid? : mediumint,
    Quality? : tinyint,
    Flags? : int,
    FlagsExtra? : int,
    BuyCount? : tinyint,
    BuyPrice? : bigint,
    SellPrice? : int,
    InventoryType? : tinyint,
    AllowableClass? : int,
    AllowableRace? : int,
    ItemLevel? : smallint,
    RequiredLevel? : tinyint,
    RequiredSkill? : smallint,
    RequiredSkillRank? : smallint,
    requiredspell? : mediumint,
    requiredhonorrank? : mediumint,
    RequiredCityRank? : mediumint,
    RequiredReputationFaction? : smallint,
    RequiredReputationRank? : smallint,
    maxcount? : int,
    stackable? : int,
    ContainerSlots? : tinyint,
    StatsCount? : tinyint,
    stat_type1? : tinyint,
    stat_value1? : smallint,
    stat_type2? : tinyint,
    stat_value2? : smallint,
    stat_type3? : tinyint,
    stat_value3? : smallint,
    stat_type4? : tinyint,
    stat_value4? : smallint,
    stat_type5? : tinyint,
    stat_value5? : smallint,
    stat_type6? : tinyint,
    stat_value6? : smallint,
    stat_type7? : tinyint,
    stat_value7? : smallint,
    stat_type8? : tinyint,
    stat_value8? : smallint,
    stat_type9? : tinyint,
    stat_value9? : smallint,
    stat_type10? : tinyint,
    stat_value10? : smallint,
    ScalingStatDistribution? : smallint,
    ScalingStatValue? : int,
    dmg_min1? : float,
    dmg_max1? : float,
    dmg_type1? : tinyint,
    dmg_min2? : float,
    dmg_max2? : float,
    dmg_type2? : tinyint,
    armor? : smallint,
    holy_res? : tinyint,
    fire_res? : tinyint,
    nature_res? : tinyint,
    frost_res? : tinyint,
    shadow_res? : tinyint,
    arcane_res? : tinyint,
    delay? : smallint,
    ammo_type? : tinyint,
    RangedModRange? : float,
    spellid_1? : mediumint,
    spelltrigger_1? : tinyint,
    spellcharges_1? : smallint,
    spellppmRate_1? : float,
    spellcooldown_1? : int,
    spellcategory_1? : smallint,
    spellcategorycooldown_1? : int,
    spellid_2? : mediumint,
    spelltrigger_2? : tinyint,
    spellcharges_2? : smallint,
    spellppmRate_2? : float,
    spellcooldown_2? : int,
    spellcategory_2? : smallint,
    spellcategorycooldown_2? : int,
    spellid_3? : mediumint,
    spelltrigger_3? : tinyint,
    spellcharges_3? : smallint,
    spellppmRate_3? : float,
    spellcooldown_3? : int,
    spellcategory_3? : smallint,
    spellcategorycooldown_3? : int,
    spellid_4? : mediumint,
    spelltrigger_4? : tinyint,
    spellcharges_4? : smallint,
    spellppmRate_4? : float,
    spellcooldown_4? : int,
    spellcategory_4? : smallint,
    spellcategorycooldown_4? : int,
    spellid_5? : mediumint,
    spelltrigger_5? : tinyint,
    spellcharges_5? : smallint,
    spellppmRate_5? : float,
    spellcooldown_5? : int,
    spellcategory_5? : smallint,
    spellcategorycooldown_5? : int,
    bonding? : tinyint,
    description? : varchar,
    PageText? : mediumint,
    LanguageID? : tinyint,
    PageMaterial? : tinyint,
    startquest? : mediumint,
    lockid? : mediumint,
    Material? : tinyint,
    sheath? : tinyint,
    RandomProperty? : mediumint,
    RandomSuffix? : mediumint,
    block? : mediumint,
    itemset? : mediumint,
    MaxDurability? : smallint,
    area? : mediumint,
    Map? : smallint,
    BagFamily? : mediumint,
    TotemCategory? : mediumint,
    socketColor_1? : tinyint,
    socketContent_1? : mediumint,
    socketColor_2? : tinyint,
    socketContent_2? : mediumint,
    socketColor_3? : tinyint,
    socketContent_3? : mediumint,
    socketBonus? : mediumint,
    GemProperties? : mediumint,
    RequiredDisenchantSkill? : smallint,
    ArmorDamageModifier? : float,
    duration? : int,
    ItemLimitCategory? : smallint,
    HolidayId? : int,
    ScriptName? : varchar,
    DisenchantID? : mediumint,
    FoodType? : tinyint,
    minMoneyLoot? : int,
    maxMoneyLoot? : int,
    flagsCustom? : int,
    VerifiedBuild? : smallint,
}

/**
 * Used for object queries (Don't comment these)
 */
export type item_templateQuery = {
    entry? : Relation<mediumint>,
    class? : Relation<tinyint>,
    subclass? : Relation<tinyint>,
    SoundOverrideSubclass? : Relation<tinyint>,
    name? : Relation<varchar>,
    displayid? : Relation<mediumint>,
    Quality? : Relation<tinyint>,
    Flags? : Relation<int>,
    FlagsExtra? : Relation<int>,
    BuyCount? : Relation<tinyint>,
    SellPrice? : Relation<int>,
    InventoryType? : Relation<tinyint>,
    AllowableClass? : Relation<int>,
    AllowableRace? : Relation<int>,
    ItemLevel? : Relation<smallint>,
    RequiredLevel? : Relation<tinyint>,
    RequiredSkill? : Relation<smallint>,
    RequiredSkillRank? : Relation<smallint>,
    requiredspell? : Relation<mediumint>,
    requiredhonorrank? : Relation<mediumint>,
    RequiredCityRank? : Relation<mediumint>,
    RequiredReputationFaction? : Relation<smallint>,
    RequiredReputationRank? : Relation<smallint>,
    maxcount? : Relation<int>,
    stackable? : Relation<int>,
    ContainerSlots? : Relation<tinyint>,
    StatsCount? : Relation<tinyint>,
    stat_type1? : Relation<tinyint>,
    stat_value1? : Relation<smallint>,
    stat_type2? : Relation<tinyint>,
    stat_value2? : Relation<smallint>,
    stat_type3? : Relation<tinyint>,
    stat_value3? : Relation<smallint>,
    stat_type4? : Relation<tinyint>,
    stat_value4? : Relation<smallint>,
    stat_type5? : Relation<tinyint>,
    stat_value5? : Relation<smallint>,
    stat_type6? : Relation<tinyint>,
    stat_value6? : Relation<smallint>,
    stat_type7? : Relation<tinyint>,
    stat_value7? : Relation<smallint>,
    stat_type8? : Relation<tinyint>,
    stat_value8? : Relation<smallint>,
    stat_type9? : Relation<tinyint>,
    stat_value9? : Relation<smallint>,
    stat_type10? : Relation<tinyint>,
    stat_value10? : Relation<smallint>,
    ScalingStatDistribution? : Relation<smallint>,
    ScalingStatValue? : Relation<int>,
    dmg_min1? : Relation<float>,
    dmg_max1? : Relation<float>,
    dmg_type1? : Relation<tinyint>,
    dmg_min2? : Relation<float>,
    dmg_max2? : Relation<float>,
    dmg_type2? : Relation<tinyint>,
    armor? : Relation<smallint>,
    holy_res? : Relation<tinyint>,
    fire_res? : Relation<tinyint>,
    nature_res? : Relation<tinyint>,
    frost_res? : Relation<tinyint>,
    shadow_res? : Relation<tinyint>,
    arcane_res? : Relation<tinyint>,
    delay? : Relation<smallint>,
    ammo_type? : Relation<tinyint>,
    RangedModRange? : Relation<float>,
    spellid_1? : Relation<mediumint>,
    spelltrigger_1? : Relation<tinyint>,
    spellcharges_1? : Relation<smallint>,
    spellppmRate_1? : Relation<float>,
    spellcooldown_1? : Relation<int>,
    spellcategory_1? : Relation<smallint>,
    spellcategorycooldown_1? : Relation<int>,
    spellid_2? : Relation<mediumint>,
    spelltrigger_2? : Relation<tinyint>,
    spellcharges_2? : Relation<smallint>,
    spellppmRate_2? : Relation<float>,
    spellcooldown_2? : Relation<int>,
    spellcategory_2? : Relation<smallint>,
    spellcategorycooldown_2? : Relation<int>,
    spellid_3? : Relation<mediumint>,
    spelltrigger_3? : Relation<tinyint>,
    spellcharges_3? : Relation<smallint>,
    spellppmRate_3? : Relation<float>,
    spellcooldown_3? : Relation<int>,
    spellcategory_3? : Relation<smallint>,
    spellcategorycooldown_3? : Relation<int>,
    spellid_4? : Relation<mediumint>,
    spelltrigger_4? : Relation<tinyint>,
    spellcharges_4? : Relation<smallint>,
    spellppmRate_4? : Relation<float>,
    spellcooldown_4? : Relation<int>,
    spellcategory_4? : Relation<smallint>,
    spellcategorycooldown_4? : Relation<int>,
    spellid_5? : Relation<mediumint>,
    spelltrigger_5? : Relation<tinyint>,
    spellcharges_5? : Relation<smallint>,
    spellppmRate_5? : Relation<float>,
    spellcooldown_5? : Relation<int>,
    spellcategory_5? : Relation<smallint>,
    spellcategorycooldown_5? : Relation<int>,
    bonding? : Relation<tinyint>,
    description? : Relation<varchar>,
    PageText? : Relation<mediumint>,
    LanguageID? : Relation<tinyint>,
    PageMaterial? : Relation<tinyint>,
    startquest? : Relation<mediumint>,
    lockid? : Relation<mediumint>,
    Material? : Relation<tinyint>,
    sheath? : Relation<tinyint>,
    RandomProperty? : Relation<mediumint>,
    RandomSuffix? : Relation<mediumint>,
    block? : Relation<mediumint>,
    itemset? : Relation<mediumint>,
    MaxDurability? : Relation<smallint>,
    area? : Relation<mediumint>,
    Map? : Relation<smallint>,
    BagFamily? : Relation<mediumint>,
    TotemCategory? : Relation<mediumint>,
    socketColor_1? : Relation<tinyint>,
    socketContent_1? : Relation<mediumint>,
    socketColor_2? : Relation<tinyint>,
    socketContent_2? : Relation<mediumint>,
    socketColor_3? : Relation<tinyint>,
    socketContent_3? : Relation<mediumint>,
    socketBonus? : Relation<mediumint>,
    GemProperties? : Relation<mediumint>,
    RequiredDisenchantSkill? : Relation<smallint>,
    ArmorDamageModifier? : Relation<float>,
    duration? : Relation<int>,
    ItemLimitCategory? : Relation<smallint>,
    HolidayId? : Relation<int>,
    ScriptName? : Relation<varchar>,
    DisenchantID? : Relation<mediumint>,
    FoodType? : Relation<tinyint>,
    minMoneyLoot? : Relation<int>,
    maxMoneyLoot? : Relation<int>,
    flagsCustom? : Relation<int>,
    VerifiedBuild? : Relation<smallint>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class item_templateTable extends SqlTable<
    item_templateCreator,
    item_templateQuery,
    item_templateRow> {
    add(entry : mediumint, c? : item_templateCreator) : item_templateRow {
        const first = this.first();
        if(first) return first.clone(entry,c)
        else return this.rowCreator(this, {}).clone(entry,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_item_template = new item_templateTable(
    'item_template',
    (table, obj)=>new item_templateRow(table, obj))