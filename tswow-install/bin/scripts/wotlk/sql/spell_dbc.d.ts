import { float, int, varchar } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class spell_dbcRow extends SqlRow<spell_dbcCreator, spell_dbcQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get Id(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get Dispel(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Mechanic(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Attributes(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get AttributesEx(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get AttributesEx2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get AttributesEx3(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get AttributesEx4(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get AttributesEx5(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get AttributesEx6(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get AttributesEx7(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Stances(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get StancesNot(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Targets(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get CastingTimeIndex(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get AuraInterruptFlags(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get ProcFlags(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get ProcChance(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get ProcCharges(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get MaxLevel(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get BaseLevel(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get SpellLevel(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get DurationIndex(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RangeIndex(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get StackAmount(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EquippedItemClass(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EquippedItemSubClassMask(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EquippedItemInventoryTypeMask(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Effect1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Effect2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Effect3(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EffectDieSides1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EffectDieSides2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EffectDieSides3(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EffectRealPointsPerLevel1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EffectRealPointsPerLevel2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EffectRealPointsPerLevel3(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EffectBasePoints1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EffectBasePoints2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EffectBasePoints3(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EffectMechanic1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EffectMechanic2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EffectMechanic3(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EffectImplicitTargetA1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EffectImplicitTargetA2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EffectImplicitTargetA3(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EffectImplicitTargetB1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EffectImplicitTargetB2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EffectImplicitTargetB3(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EffectRadiusIndex1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EffectRadiusIndex2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EffectRadiusIndex3(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EffectApplyAuraName1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EffectApplyAuraName2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EffectApplyAuraName3(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EffectAmplitude1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EffectAmplitude2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EffectAmplitude3(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EffectMultipleValue1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EffectMultipleValue2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EffectMultipleValue3(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EffectItemType1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EffectItemType2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EffectItemType3(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EffectMiscValue1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EffectMiscValue2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EffectMiscValue3(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EffectMiscValueB1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EffectMiscValueB2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EffectMiscValueB3(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EffectTriggerSpell1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EffectTriggerSpell2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EffectTriggerSpell3(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EffectSpellClassMaskA1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EffectSpellClassMaskA2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EffectSpellClassMaskA3(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EffectSpellClassMaskB1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EffectSpellClassMaskB2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EffectSpellClassMaskB3(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EffectSpellClassMaskC1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EffectSpellClassMaskC2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EffectSpellClassMaskC3(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get SpellName(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get MaxTargetLevel(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get SpellFamilyName(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get SpellFamilyFlags1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get SpellFamilyFlags2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get SpellFamilyFlags3(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get MaxAffectedTargets(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get DmgClass(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get PreventionType(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get DmgMultiplier1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get DmgMultiplier2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get DmgMultiplier3(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get AreaGroupId(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get SchoolMask(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(Id: int, c?: spell_dbcCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type spell_dbcCreator = {
    Id?: int;
    Dispel?: int;
    Mechanic?: int;
    Attributes?: int;
    AttributesEx?: int;
    AttributesEx2?: int;
    AttributesEx3?: int;
    AttributesEx4?: int;
    AttributesEx5?: int;
    AttributesEx6?: int;
    AttributesEx7?: int;
    Stances?: int;
    StancesNot?: int;
    Targets?: int;
    CastingTimeIndex?: int;
    AuraInterruptFlags?: int;
    ProcFlags?: int;
    ProcChance?: int;
    ProcCharges?: int;
    MaxLevel?: int;
    BaseLevel?: int;
    SpellLevel?: int;
    DurationIndex?: int;
    RangeIndex?: int;
    StackAmount?: int;
    EquippedItemClass?: int;
    EquippedItemSubClassMask?: int;
    EquippedItemInventoryTypeMask?: int;
    Effect1?: int;
    Effect2?: int;
    Effect3?: int;
    EffectDieSides1?: int;
    EffectDieSides2?: int;
    EffectDieSides3?: int;
    EffectRealPointsPerLevel1?: float;
    EffectRealPointsPerLevel2?: float;
    EffectRealPointsPerLevel3?: float;
    EffectBasePoints1?: int;
    EffectBasePoints2?: int;
    EffectBasePoints3?: int;
    EffectMechanic1?: int;
    EffectMechanic2?: int;
    EffectMechanic3?: int;
    EffectImplicitTargetA1?: int;
    EffectImplicitTargetA2?: int;
    EffectImplicitTargetA3?: int;
    EffectImplicitTargetB1?: int;
    EffectImplicitTargetB2?: int;
    EffectImplicitTargetB3?: int;
    EffectRadiusIndex1?: int;
    EffectRadiusIndex2?: int;
    EffectRadiusIndex3?: int;
    EffectApplyAuraName1?: int;
    EffectApplyAuraName2?: int;
    EffectApplyAuraName3?: int;
    EffectAmplitude1?: int;
    EffectAmplitude2?: int;
    EffectAmplitude3?: int;
    EffectMultipleValue1?: float;
    EffectMultipleValue2?: float;
    EffectMultipleValue3?: float;
    EffectItemType1?: int;
    EffectItemType2?: int;
    EffectItemType3?: int;
    EffectMiscValue1?: int;
    EffectMiscValue2?: int;
    EffectMiscValue3?: int;
    EffectMiscValueB1?: int;
    EffectMiscValueB2?: int;
    EffectMiscValueB3?: int;
    EffectTriggerSpell1?: int;
    EffectTriggerSpell2?: int;
    EffectTriggerSpell3?: int;
    EffectSpellClassMaskA1?: int;
    EffectSpellClassMaskA2?: int;
    EffectSpellClassMaskA3?: int;
    EffectSpellClassMaskB1?: int;
    EffectSpellClassMaskB2?: int;
    EffectSpellClassMaskB3?: int;
    EffectSpellClassMaskC1?: int;
    EffectSpellClassMaskC2?: int;
    EffectSpellClassMaskC3?: int;
    SpellName?: varchar;
    MaxTargetLevel?: int;
    SpellFamilyName?: int;
    SpellFamilyFlags1?: int;
    SpellFamilyFlags2?: int;
    SpellFamilyFlags3?: int;
    MaxAffectedTargets?: int;
    DmgClass?: int;
    PreventionType?: int;
    DmgMultiplier1?: float;
    DmgMultiplier2?: float;
    DmgMultiplier3?: float;
    AreaGroupId?: int;
    SchoolMask?: int;
};
/**
 * Used for object queries (Don't comment these)
 */
export type spell_dbcQuery = {
    Id?: Relation<int>;
    Dispel?: Relation<int>;
    Mechanic?: Relation<int>;
    Attributes?: Relation<int>;
    AttributesEx?: Relation<int>;
    AttributesEx2?: Relation<int>;
    AttributesEx3?: Relation<int>;
    AttributesEx4?: Relation<int>;
    AttributesEx5?: Relation<int>;
    AttributesEx6?: Relation<int>;
    AttributesEx7?: Relation<int>;
    Stances?: Relation<int>;
    StancesNot?: Relation<int>;
    Targets?: Relation<int>;
    CastingTimeIndex?: Relation<int>;
    AuraInterruptFlags?: Relation<int>;
    ProcFlags?: Relation<int>;
    ProcChance?: Relation<int>;
    ProcCharges?: Relation<int>;
    MaxLevel?: Relation<int>;
    BaseLevel?: Relation<int>;
    SpellLevel?: Relation<int>;
    DurationIndex?: Relation<int>;
    RangeIndex?: Relation<int>;
    StackAmount?: Relation<int>;
    EquippedItemClass?: Relation<int>;
    EquippedItemSubClassMask?: Relation<int>;
    EquippedItemInventoryTypeMask?: Relation<int>;
    Effect1?: Relation<int>;
    Effect2?: Relation<int>;
    Effect3?: Relation<int>;
    EffectDieSides1?: Relation<int>;
    EffectDieSides2?: Relation<int>;
    EffectDieSides3?: Relation<int>;
    EffectRealPointsPerLevel1?: Relation<float>;
    EffectRealPointsPerLevel2?: Relation<float>;
    EffectRealPointsPerLevel3?: Relation<float>;
    EffectBasePoints1?: Relation<int>;
    EffectBasePoints2?: Relation<int>;
    EffectBasePoints3?: Relation<int>;
    EffectMechanic1?: Relation<int>;
    EffectMechanic2?: Relation<int>;
    EffectMechanic3?: Relation<int>;
    EffectImplicitTargetA1?: Relation<int>;
    EffectImplicitTargetA2?: Relation<int>;
    EffectImplicitTargetA3?: Relation<int>;
    EffectImplicitTargetB1?: Relation<int>;
    EffectImplicitTargetB2?: Relation<int>;
    EffectImplicitTargetB3?: Relation<int>;
    EffectRadiusIndex1?: Relation<int>;
    EffectRadiusIndex2?: Relation<int>;
    EffectRadiusIndex3?: Relation<int>;
    EffectApplyAuraName1?: Relation<int>;
    EffectApplyAuraName2?: Relation<int>;
    EffectApplyAuraName3?: Relation<int>;
    EffectAmplitude1?: Relation<int>;
    EffectAmplitude2?: Relation<int>;
    EffectAmplitude3?: Relation<int>;
    EffectMultipleValue1?: Relation<float>;
    EffectMultipleValue2?: Relation<float>;
    EffectMultipleValue3?: Relation<float>;
    EffectItemType1?: Relation<int>;
    EffectItemType2?: Relation<int>;
    EffectItemType3?: Relation<int>;
    EffectMiscValue1?: Relation<int>;
    EffectMiscValue2?: Relation<int>;
    EffectMiscValue3?: Relation<int>;
    EffectMiscValueB1?: Relation<int>;
    EffectMiscValueB2?: Relation<int>;
    EffectMiscValueB3?: Relation<int>;
    EffectTriggerSpell1?: Relation<int>;
    EffectTriggerSpell2?: Relation<int>;
    EffectTriggerSpell3?: Relation<int>;
    EffectSpellClassMaskA1?: Relation<int>;
    EffectSpellClassMaskA2?: Relation<int>;
    EffectSpellClassMaskA3?: Relation<int>;
    EffectSpellClassMaskB1?: Relation<int>;
    EffectSpellClassMaskB2?: Relation<int>;
    EffectSpellClassMaskB3?: Relation<int>;
    EffectSpellClassMaskC1?: Relation<int>;
    EffectSpellClassMaskC2?: Relation<int>;
    EffectSpellClassMaskC3?: Relation<int>;
    SpellName?: Relation<varchar>;
    MaxTargetLevel?: Relation<int>;
    SpellFamilyName?: Relation<int>;
    SpellFamilyFlags1?: Relation<int>;
    SpellFamilyFlags2?: Relation<int>;
    SpellFamilyFlags3?: Relation<int>;
    MaxAffectedTargets?: Relation<int>;
    DmgClass?: Relation<int>;
    PreventionType?: Relation<int>;
    DmgMultiplier1?: Relation<float>;
    DmgMultiplier2?: Relation<float>;
    DmgMultiplier3?: Relation<float>;
    AreaGroupId?: Relation<int>;
    SchoolMask?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class spell_dbcTable extends SqlTable<spell_dbcCreator, spell_dbcQuery, spell_dbcRow> {
    add(Id: int, c?: spell_dbcCreator): spell_dbcRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_spell_dbc: spell_dbcTable;
