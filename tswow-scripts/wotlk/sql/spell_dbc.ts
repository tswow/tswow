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
import { float, int, varchar } from '../../data/primitives'
import { Relation } from '../../data/query/Relations'
import { PrimaryKey } from '../../data/table/PrimaryKey'
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell'
import { SqlRow } from '../../data/sql/SQLRow'
import { SqlTable } from '../../data/sql/SQLTable'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class spell_dbcRow extends SqlRow<spell_dbcCreator,spell_dbcQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get Id() {return new SQLCellReadOnly<int, this>(this, 'Id')}

    /**
     * No comment (yet!)
     */
    get Dispel() {return new SQLCell<int, this>(this, 'Dispel')}

    /**
     * No comment (yet!)
     */
    get Mechanic() {return new SQLCell<int, this>(this, 'Mechanic')}

    /**
     * No comment (yet!)
     */
    get Attributes() {return new SQLCell<int, this>(this, 'Attributes')}

    /**
     * No comment (yet!)
     */
    get AttributesEx() {return new SQLCell<int, this>(this, 'AttributesEx')}

    /**
     * No comment (yet!)
     */
    get AttributesEx2() {return new SQLCell<int, this>(this, 'AttributesEx2')}

    /**
     * No comment (yet!)
     */
    get AttributesEx3() {return new SQLCell<int, this>(this, 'AttributesEx3')}

    /**
     * No comment (yet!)
     */
    get AttributesEx4() {return new SQLCell<int, this>(this, 'AttributesEx4')}

    /**
     * No comment (yet!)
     */
    get AttributesEx5() {return new SQLCell<int, this>(this, 'AttributesEx5')}

    /**
     * No comment (yet!)
     */
    get AttributesEx6() {return new SQLCell<int, this>(this, 'AttributesEx6')}

    /**
     * No comment (yet!)
     */
    get AttributesEx7() {return new SQLCell<int, this>(this, 'AttributesEx7')}

    /**
     * No comment (yet!)
     */
    get Stances() {return new SQLCell<int, this>(this, 'Stances')}

    /**
     * No comment (yet!)
     */
    get StancesNot() {return new SQLCell<int, this>(this, 'StancesNot')}

    /**
     * No comment (yet!)
     */
    get Targets() {return new SQLCell<int, this>(this, 'Targets')}

    /**
     * No comment (yet!)
     */
    get CastingTimeIndex() {return new SQLCell<int, this>(this, 'CastingTimeIndex')}

    /**
     * No comment (yet!)
     */
    get AuraInterruptFlags() {return new SQLCell<int, this>(this, 'AuraInterruptFlags')}

    /**
     * No comment (yet!)
     */
    get ProcFlags() {return new SQLCell<int, this>(this, 'ProcFlags')}

    /**
     * No comment (yet!)
     */
    get ProcChance() {return new SQLCell<int, this>(this, 'ProcChance')}

    /**
     * No comment (yet!)
     */
    get ProcCharges() {return new SQLCell<int, this>(this, 'ProcCharges')}

    /**
     * No comment (yet!)
     */
    get MaxLevel() {return new SQLCell<int, this>(this, 'MaxLevel')}

    /**
     * No comment (yet!)
     */
    get BaseLevel() {return new SQLCell<int, this>(this, 'BaseLevel')}

    /**
     * No comment (yet!)
     */
    get SpellLevel() {return new SQLCell<int, this>(this, 'SpellLevel')}

    /**
     * No comment (yet!)
     */
    get DurationIndex() {return new SQLCell<int, this>(this, 'DurationIndex')}

    /**
     * No comment (yet!)
     */
    get RangeIndex() {return new SQLCell<int, this>(this, 'RangeIndex')}

    /**
     * No comment (yet!)
     */
    get StackAmount() {return new SQLCell<int, this>(this, 'StackAmount')}

    /**
     * No comment (yet!)
     */
    get EquippedItemClass() {return new SQLCell<int, this>(this, 'EquippedItemClass')}

    /**
     * No comment (yet!)
     */
    get EquippedItemSubClassMask() {return new SQLCell<int, this>(this, 'EquippedItemSubClassMask')}

    /**
     * No comment (yet!)
     */
    get EquippedItemInventoryTypeMask() {return new SQLCell<int, this>(this, 'EquippedItemInventoryTypeMask')}

    /**
     * No comment (yet!)
     */
    get Effect1() {return new SQLCell<int, this>(this, 'Effect1')}

    /**
     * No comment (yet!)
     */
    get Effect2() {return new SQLCell<int, this>(this, 'Effect2')}

    /**
     * No comment (yet!)
     */
    get Effect3() {return new SQLCell<int, this>(this, 'Effect3')}

    /**
     * No comment (yet!)
     */
    get EffectDieSides1() {return new SQLCell<int, this>(this, 'EffectDieSides1')}

    /**
     * No comment (yet!)
     */
    get EffectDieSides2() {return new SQLCell<int, this>(this, 'EffectDieSides2')}

    /**
     * No comment (yet!)
     */
    get EffectDieSides3() {return new SQLCell<int, this>(this, 'EffectDieSides3')}

    /**
     * No comment (yet!)
     */
    get EffectRealPointsPerLevel1() {return new SQLCell<float, this>(this, 'EffectRealPointsPerLevel1')}

    /**
     * No comment (yet!)
     */
    get EffectRealPointsPerLevel2() {return new SQLCell<float, this>(this, 'EffectRealPointsPerLevel2')}

    /**
     * No comment (yet!)
     */
    get EffectRealPointsPerLevel3() {return new SQLCell<float, this>(this, 'EffectRealPointsPerLevel3')}

    /**
     * No comment (yet!)
     */
    get EffectBasePoints1() {return new SQLCell<int, this>(this, 'EffectBasePoints1')}

    /**
     * No comment (yet!)
     */
    get EffectBasePoints2() {return new SQLCell<int, this>(this, 'EffectBasePoints2')}

    /**
     * No comment (yet!)
     */
    get EffectBasePoints3() {return new SQLCell<int, this>(this, 'EffectBasePoints3')}

    /**
     * No comment (yet!)
     */
    get EffectMechanic1() {return new SQLCell<int, this>(this, 'EffectMechanic1')}

    /**
     * No comment (yet!)
     */
    get EffectMechanic2() {return new SQLCell<int, this>(this, 'EffectMechanic2')}

    /**
     * No comment (yet!)
     */
    get EffectMechanic3() {return new SQLCell<int, this>(this, 'EffectMechanic3')}

    /**
     * No comment (yet!)
     */
    get EffectImplicitTargetA1() {return new SQLCell<int, this>(this, 'EffectImplicitTargetA1')}

    /**
     * No comment (yet!)
     */
    get EffectImplicitTargetA2() {return new SQLCell<int, this>(this, 'EffectImplicitTargetA2')}

    /**
     * No comment (yet!)
     */
    get EffectImplicitTargetA3() {return new SQLCell<int, this>(this, 'EffectImplicitTargetA3')}

    /**
     * No comment (yet!)
     */
    get EffectImplicitTargetB1() {return new SQLCell<int, this>(this, 'EffectImplicitTargetB1')}

    /**
     * No comment (yet!)
     */
    get EffectImplicitTargetB2() {return new SQLCell<int, this>(this, 'EffectImplicitTargetB2')}

    /**
     * No comment (yet!)
     */
    get EffectImplicitTargetB3() {return new SQLCell<int, this>(this, 'EffectImplicitTargetB3')}

    /**
     * No comment (yet!)
     */
    get EffectRadiusIndex1() {return new SQLCell<int, this>(this, 'EffectRadiusIndex1')}

    /**
     * No comment (yet!)
     */
    get EffectRadiusIndex2() {return new SQLCell<int, this>(this, 'EffectRadiusIndex2')}

    /**
     * No comment (yet!)
     */
    get EffectRadiusIndex3() {return new SQLCell<int, this>(this, 'EffectRadiusIndex3')}

    /**
     * No comment (yet!)
     */
    get EffectApplyAuraName1() {return new SQLCell<int, this>(this, 'EffectApplyAuraName1')}

    /**
     * No comment (yet!)
     */
    get EffectApplyAuraName2() {return new SQLCell<int, this>(this, 'EffectApplyAuraName2')}

    /**
     * No comment (yet!)
     */
    get EffectApplyAuraName3() {return new SQLCell<int, this>(this, 'EffectApplyAuraName3')}

    /**
     * No comment (yet!)
     */
    get EffectAmplitude1() {return new SQLCell<int, this>(this, 'EffectAmplitude1')}

    /**
     * No comment (yet!)
     */
    get EffectAmplitude2() {return new SQLCell<int, this>(this, 'EffectAmplitude2')}

    /**
     * No comment (yet!)
     */
    get EffectAmplitude3() {return new SQLCell<int, this>(this, 'EffectAmplitude3')}

    /**
     * No comment (yet!)
     */
    get EffectMultipleValue1() {return new SQLCell<float, this>(this, 'EffectMultipleValue1')}

    /**
     * No comment (yet!)
     */
    get EffectMultipleValue2() {return new SQLCell<float, this>(this, 'EffectMultipleValue2')}

    /**
     * No comment (yet!)
     */
    get EffectMultipleValue3() {return new SQLCell<float, this>(this, 'EffectMultipleValue3')}

    /**
     * No comment (yet!)
     */
    get EffectItemType1() {return new SQLCell<int, this>(this, 'EffectItemType1')}

    /**
     * No comment (yet!)
     */
    get EffectItemType2() {return new SQLCell<int, this>(this, 'EffectItemType2')}

    /**
     * No comment (yet!)
     */
    get EffectItemType3() {return new SQLCell<int, this>(this, 'EffectItemType3')}

    /**
     * No comment (yet!)
     */
    get EffectMiscValue1() {return new SQLCell<int, this>(this, 'EffectMiscValue1')}

    /**
     * No comment (yet!)
     */
    get EffectMiscValue2() {return new SQLCell<int, this>(this, 'EffectMiscValue2')}

    /**
     * No comment (yet!)
     */
    get EffectMiscValue3() {return new SQLCell<int, this>(this, 'EffectMiscValue3')}

    /**
     * No comment (yet!)
     */
    get EffectMiscValueB1() {return new SQLCell<int, this>(this, 'EffectMiscValueB1')}

    /**
     * No comment (yet!)
     */
    get EffectMiscValueB2() {return new SQLCell<int, this>(this, 'EffectMiscValueB2')}

    /**
     * No comment (yet!)
     */
    get EffectMiscValueB3() {return new SQLCell<int, this>(this, 'EffectMiscValueB3')}

    /**
     * No comment (yet!)
     */
    get EffectTriggerSpell1() {return new SQLCell<int, this>(this, 'EffectTriggerSpell1')}

    /**
     * No comment (yet!)
     */
    get EffectTriggerSpell2() {return new SQLCell<int, this>(this, 'EffectTriggerSpell2')}

    /**
     * No comment (yet!)
     */
    get EffectTriggerSpell3() {return new SQLCell<int, this>(this, 'EffectTriggerSpell3')}

    /**
     * No comment (yet!)
     */
    get EffectSpellClassMaskA1() {return new SQLCell<int, this>(this, 'EffectSpellClassMaskA1')}

    /**
     * No comment (yet!)
     */
    get EffectSpellClassMaskA2() {return new SQLCell<int, this>(this, 'EffectSpellClassMaskA2')}

    /**
     * No comment (yet!)
     */
    get EffectSpellClassMaskA3() {return new SQLCell<int, this>(this, 'EffectSpellClassMaskA3')}

    /**
     * No comment (yet!)
     */
    get EffectSpellClassMaskB1() {return new SQLCell<int, this>(this, 'EffectSpellClassMaskB1')}

    /**
     * No comment (yet!)
     */
    get EffectSpellClassMaskB2() {return new SQLCell<int, this>(this, 'EffectSpellClassMaskB2')}

    /**
     * No comment (yet!)
     */
    get EffectSpellClassMaskB3() {return new SQLCell<int, this>(this, 'EffectSpellClassMaskB3')}

    /**
     * No comment (yet!)
     */
    get EffectSpellClassMaskC1() {return new SQLCell<int, this>(this, 'EffectSpellClassMaskC1')}

    /**
     * No comment (yet!)
     */
    get EffectSpellClassMaskC2() {return new SQLCell<int, this>(this, 'EffectSpellClassMaskC2')}

    /**
     * No comment (yet!)
     */
    get EffectSpellClassMaskC3() {return new SQLCell<int, this>(this, 'EffectSpellClassMaskC3')}

    /**
     * No comment (yet!)
     */
    get SpellName() {return new SQLCell<varchar, this>(this, 'SpellName')}

    /**
     * No comment (yet!)
     */
    get MaxTargetLevel() {return new SQLCell<int, this>(this, 'MaxTargetLevel')}

    /**
     * No comment (yet!)
     */
    get SpellFamilyName() {return new SQLCell<int, this>(this, 'SpellFamilyName')}

    /**
     * No comment (yet!)
     */
    get SpellFamilyFlags1() {return new SQLCell<int, this>(this, 'SpellFamilyFlags1')}

    /**
     * No comment (yet!)
     */
    get SpellFamilyFlags2() {return new SQLCell<int, this>(this, 'SpellFamilyFlags2')}

    /**
     * No comment (yet!)
     */
    get SpellFamilyFlags3() {return new SQLCell<int, this>(this, 'SpellFamilyFlags3')}

    /**
     * No comment (yet!)
     */
    get MaxAffectedTargets() {return new SQLCell<int, this>(this, 'MaxAffectedTargets')}

    /**
     * No comment (yet!)
     */
    get DmgClass() {return new SQLCell<int, this>(this, 'DmgClass')}

    /**
     * No comment (yet!)
     */
    get PreventionType() {return new SQLCell<int, this>(this, 'PreventionType')}

    /**
     * No comment (yet!)
     */
    get DmgMultiplier1() {return new SQLCell<float, this>(this, 'DmgMultiplier1')}

    /**
     * No comment (yet!)
     */
    get DmgMultiplier2() {return new SQLCell<float, this>(this, 'DmgMultiplier2')}

    /**
     * No comment (yet!)
     */
    get DmgMultiplier3() {return new SQLCell<float, this>(this, 'DmgMultiplier3')}

    /**
     * No comment (yet!)
     */
    get AreaGroupId() {return new SQLCell<int, this>(this, 'AreaGroupId')}

    /**
     * No comment (yet!)
     */
    get SchoolMask() {return new SQLCell<int, this>(this, 'SchoolMask')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(Id : int, c? : spell_dbcCreator) : this {
        return this.cloneInternal([Id],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type spell_dbcCreator = {
    Id? : int,
    Dispel? : int,
    Mechanic? : int,
    Attributes? : int,
    AttributesEx? : int,
    AttributesEx2? : int,
    AttributesEx3? : int,
    AttributesEx4? : int,
    AttributesEx5? : int,
    AttributesEx6? : int,
    AttributesEx7? : int,
    Stances? : int,
    StancesNot? : int,
    Targets? : int,
    CastingTimeIndex? : int,
    AuraInterruptFlags? : int,
    ProcFlags? : int,
    ProcChance? : int,
    ProcCharges? : int,
    MaxLevel? : int,
    BaseLevel? : int,
    SpellLevel? : int,
    DurationIndex? : int,
    RangeIndex? : int,
    StackAmount? : int,
    EquippedItemClass? : int,
    EquippedItemSubClassMask? : int,
    EquippedItemInventoryTypeMask? : int,
    Effect1? : int,
    Effect2? : int,
    Effect3? : int,
    EffectDieSides1? : int,
    EffectDieSides2? : int,
    EffectDieSides3? : int,
    EffectRealPointsPerLevel1? : float,
    EffectRealPointsPerLevel2? : float,
    EffectRealPointsPerLevel3? : float,
    EffectBasePoints1? : int,
    EffectBasePoints2? : int,
    EffectBasePoints3? : int,
    EffectMechanic1? : int,
    EffectMechanic2? : int,
    EffectMechanic3? : int,
    EffectImplicitTargetA1? : int,
    EffectImplicitTargetA2? : int,
    EffectImplicitTargetA3? : int,
    EffectImplicitTargetB1? : int,
    EffectImplicitTargetB2? : int,
    EffectImplicitTargetB3? : int,
    EffectRadiusIndex1? : int,
    EffectRadiusIndex2? : int,
    EffectRadiusIndex3? : int,
    EffectApplyAuraName1? : int,
    EffectApplyAuraName2? : int,
    EffectApplyAuraName3? : int,
    EffectAmplitude1? : int,
    EffectAmplitude2? : int,
    EffectAmplitude3? : int,
    EffectMultipleValue1? : float,
    EffectMultipleValue2? : float,
    EffectMultipleValue3? : float,
    EffectItemType1? : int,
    EffectItemType2? : int,
    EffectItemType3? : int,
    EffectMiscValue1? : int,
    EffectMiscValue2? : int,
    EffectMiscValue3? : int,
    EffectMiscValueB1? : int,
    EffectMiscValueB2? : int,
    EffectMiscValueB3? : int,
    EffectTriggerSpell1? : int,
    EffectTriggerSpell2? : int,
    EffectTriggerSpell3? : int,
    EffectSpellClassMaskA1? : int,
    EffectSpellClassMaskA2? : int,
    EffectSpellClassMaskA3? : int,
    EffectSpellClassMaskB1? : int,
    EffectSpellClassMaskB2? : int,
    EffectSpellClassMaskB3? : int,
    EffectSpellClassMaskC1? : int,
    EffectSpellClassMaskC2? : int,
    EffectSpellClassMaskC3? : int,
    SpellName? : varchar,
    MaxTargetLevel? : int,
    SpellFamilyName? : int,
    SpellFamilyFlags1? : int,
    SpellFamilyFlags2? : int,
    SpellFamilyFlags3? : int,
    MaxAffectedTargets? : int,
    DmgClass? : int,
    PreventionType? : int,
    DmgMultiplier1? : float,
    DmgMultiplier2? : float,
    DmgMultiplier3? : float,
    AreaGroupId? : int,
    SchoolMask? : int,
}

/**
 * Used for object queries (Don't comment these)
 */
export type spell_dbcQuery = {
    Id? : Relation<int>,
    Dispel? : Relation<int>,
    Mechanic? : Relation<int>,
    Attributes? : Relation<int>,
    AttributesEx? : Relation<int>,
    AttributesEx2? : Relation<int>,
    AttributesEx3? : Relation<int>,
    AttributesEx4? : Relation<int>,
    AttributesEx5? : Relation<int>,
    AttributesEx6? : Relation<int>,
    AttributesEx7? : Relation<int>,
    Stances? : Relation<int>,
    StancesNot? : Relation<int>,
    Targets? : Relation<int>,
    CastingTimeIndex? : Relation<int>,
    AuraInterruptFlags? : Relation<int>,
    ProcFlags? : Relation<int>,
    ProcChance? : Relation<int>,
    ProcCharges? : Relation<int>,
    MaxLevel? : Relation<int>,
    BaseLevel? : Relation<int>,
    SpellLevel? : Relation<int>,
    DurationIndex? : Relation<int>,
    RangeIndex? : Relation<int>,
    StackAmount? : Relation<int>,
    EquippedItemClass? : Relation<int>,
    EquippedItemSubClassMask? : Relation<int>,
    EquippedItemInventoryTypeMask? : Relation<int>,
    Effect1? : Relation<int>,
    Effect2? : Relation<int>,
    Effect3? : Relation<int>,
    EffectDieSides1? : Relation<int>,
    EffectDieSides2? : Relation<int>,
    EffectDieSides3? : Relation<int>,
    EffectRealPointsPerLevel1? : Relation<float>,
    EffectRealPointsPerLevel2? : Relation<float>,
    EffectRealPointsPerLevel3? : Relation<float>,
    EffectBasePoints1? : Relation<int>,
    EffectBasePoints2? : Relation<int>,
    EffectBasePoints3? : Relation<int>,
    EffectMechanic1? : Relation<int>,
    EffectMechanic2? : Relation<int>,
    EffectMechanic3? : Relation<int>,
    EffectImplicitTargetA1? : Relation<int>,
    EffectImplicitTargetA2? : Relation<int>,
    EffectImplicitTargetA3? : Relation<int>,
    EffectImplicitTargetB1? : Relation<int>,
    EffectImplicitTargetB2? : Relation<int>,
    EffectImplicitTargetB3? : Relation<int>,
    EffectRadiusIndex1? : Relation<int>,
    EffectRadiusIndex2? : Relation<int>,
    EffectRadiusIndex3? : Relation<int>,
    EffectApplyAuraName1? : Relation<int>,
    EffectApplyAuraName2? : Relation<int>,
    EffectApplyAuraName3? : Relation<int>,
    EffectAmplitude1? : Relation<int>,
    EffectAmplitude2? : Relation<int>,
    EffectAmplitude3? : Relation<int>,
    EffectMultipleValue1? : Relation<float>,
    EffectMultipleValue2? : Relation<float>,
    EffectMultipleValue3? : Relation<float>,
    EffectItemType1? : Relation<int>,
    EffectItemType2? : Relation<int>,
    EffectItemType3? : Relation<int>,
    EffectMiscValue1? : Relation<int>,
    EffectMiscValue2? : Relation<int>,
    EffectMiscValue3? : Relation<int>,
    EffectMiscValueB1? : Relation<int>,
    EffectMiscValueB2? : Relation<int>,
    EffectMiscValueB3? : Relation<int>,
    EffectTriggerSpell1? : Relation<int>,
    EffectTriggerSpell2? : Relation<int>,
    EffectTriggerSpell3? : Relation<int>,
    EffectSpellClassMaskA1? : Relation<int>,
    EffectSpellClassMaskA2? : Relation<int>,
    EffectSpellClassMaskA3? : Relation<int>,
    EffectSpellClassMaskB1? : Relation<int>,
    EffectSpellClassMaskB2? : Relation<int>,
    EffectSpellClassMaskB3? : Relation<int>,
    EffectSpellClassMaskC1? : Relation<int>,
    EffectSpellClassMaskC2? : Relation<int>,
    EffectSpellClassMaskC3? : Relation<int>,
    SpellName? : Relation<varchar>,
    MaxTargetLevel? : Relation<int>,
    SpellFamilyName? : Relation<int>,
    SpellFamilyFlags1? : Relation<int>,
    SpellFamilyFlags2? : Relation<int>,
    SpellFamilyFlags3? : Relation<int>,
    MaxAffectedTargets? : Relation<int>,
    DmgClass? : Relation<int>,
    PreventionType? : Relation<int>,
    DmgMultiplier1? : Relation<float>,
    DmgMultiplier2? : Relation<float>,
    DmgMultiplier3? : Relation<float>,
    AreaGroupId? : Relation<int>,
    SchoolMask? : Relation<int>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class spell_dbcTable extends SqlTable<
    spell_dbcCreator,
    spell_dbcQuery,
    spell_dbcRow> {
    add(Id : int, c? : spell_dbcCreator) : spell_dbcRow {
        const first = this.first();
        if(first) return first.clone(Id,c)
        else return this.rowCreator(this, {}).clone(Id,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_spell_dbc = new spell_dbcTable(
    'spell_dbc',
    (table, obj)=>new spell_dbcRow(table, obj))