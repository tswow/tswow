import { DBCFloatArrayCell, DBCFloatCell, DBCIntArrayCell, DBCIntCell, DBCKeyCell, DBCLocCell, DBCUIntArrayCell, DBCUIntCell, DBCULongCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
import { float, int, loc_constructor, uint, ulong } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class SpellRow extends DBCRow<SpellCreator, SpellQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get Category(): DBCUIntCell<this>;
    /**
     * No comment (yet!)
     */
    get DispelType(): DBCUIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Mechanic(): DBCUIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Attributes(): DBCUIntCell<this>;
    /**
     * No comment (yet!)
     */
    get AttributesEx(): DBCUIntCell<this>;
    /**
     * No comment (yet!)
     */
    get AttributesExB(): DBCUIntCell<this>;
    /**
     * No comment (yet!)
     */
    get AttributesExC(): DBCUIntCell<this>;
    /**
     * No comment (yet!)
     */
    get AttributesExD(): DBCUIntCell<this>;
    /**
     * No comment (yet!)
     */
    get AttributesExE(): DBCUIntCell<this>;
    /**
     * No comment (yet!)
     */
    get AttributesExF(): DBCUIntCell<this>;
    /**
     * No comment (yet!)
     */
    get AttributesExG(): DBCUIntCell<this>;
    /**
     * No comment (yet!)
     */
    get ShapeshiftMask(): DBCULongCell<this>;
    /**
     * No comment (yet!)
     */
    get ShapeshiftExclude(): DBCULongCell<this>;
    /**
     * No comment (yet!)
     */
    get Targets(): DBCUIntCell<this>;
    /**
     * No comment (yet!)
     */
    get TargetCreatureType(): DBCUIntCell<this>;
    /**
     * No comment (yet!)
     */
    get RequiresSpellFocus(): DBCUIntCell<this>;
    /**
     * No comment (yet!)
     */
    get FacingCasterFlags(): DBCUIntCell<this>;
    /**
     * No comment (yet!)
     */
    get CasterAuraState(): DBCUIntCell<this>;
    /**
     * No comment (yet!)
     */
    get TargetAuraState(): DBCUIntCell<this>;
    /**
     * No comment (yet!)
     */
    get ExcludeCasterAuraState(): DBCUIntCell<this>;
    /**
     * No comment (yet!)
     */
    get ExcludeTargetAuraState(): DBCUIntCell<this>;
    /**
     * No comment (yet!)
     */
    get CasterAuraSpell(): DBCUIntCell<this>;
    /**
     * No comment (yet!)
     */
    get TargetAuraSpell(): DBCUIntCell<this>;
    /**
     * No comment (yet!)
     */
    get ExcludeCasterAuraSpell(): DBCUIntCell<this>;
    /**
     * No comment (yet!)
     */
    get ExcludeTargetAuraSpell(): DBCUIntCell<this>;
    /**
     * No comment (yet!)
     */
    get CastingTimeIndex(): DBCUIntCell<this>;
    /**
     * No comment (yet!)
     */
    get RecoveryTime(): DBCUIntCell<this>;
    /**
     * No comment (yet!)
     */
    get CategoryRecoveryTime(): DBCUIntCell<this>;
    /**
     * No comment (yet!)
     */
    get InterruptFlags(): DBCUIntCell<this>;
    /**
     * No comment (yet!)
     */
    get AuraInterruptFlags(): DBCUIntCell<this>;
    /**
     * No comment (yet!)
     */
    get ChannelInterruptFlags(): DBCUIntCell<this>;
    /**
     * No comment (yet!)
     */
    get ProcTypeMask(): DBCUIntCell<this>;
    /**
     * No comment (yet!)
     */
    get ProcChance(): DBCUIntCell<this>;
    /**
     * No comment (yet!)
     */
    get ProcCharges(): DBCUIntCell<this>;
    /**
     * No comment (yet!)
     */
    get MaxLevel(): DBCUIntCell<this>;
    /**
     * No comment (yet!)
     */
    get BaseLevel(): DBCUIntCell<this>;
    /**
     * No comment (yet!)
     */
    get SpellLevel(): DBCUIntCell<this>;
    /**
     * No comment (yet!)
     */
    get DurationIndex(): DBCUIntCell<this>;
    /**
     * No comment (yet!)
     */
    get PowerType(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get ManaCost(): DBCUIntCell<this>;
    /**
     * No comment (yet!)
     */
    get ManaCostPerLevel(): DBCUIntCell<this>;
    /**
     * No comment (yet!)
     */
    get ManaPerSecond(): DBCUIntCell<this>;
    /**
     * No comment (yet!)
     */
    get ManaPerSecondPerLevel(): DBCUIntCell<this>;
    /**
     * No comment (yet!)
     */
    get RangeIndex(): DBCUIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Speed(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get ModalNextSpell(): DBCUIntCell<this>;
    /**
     * No comment (yet!)
     */
    get CumulativeAura(): DBCUIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Totem(): DBCUIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get Reagent(): DBCIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get ReagentCount(): DBCIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get EquippedItemClass(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get EquippedItemSubclass(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get EquippedItemInvTypes(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Effect(): DBCUIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get EffectDieSides(): DBCIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get EffectRealPointsPerLevel(): DBCFloatArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get EffectBasePoints(): DBCIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get EffectMechanic(): DBCUIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get ImplicitTargetA(): DBCUIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get ImplicitTargetB(): DBCUIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get EffectRadiusIndex(): DBCUIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get EffectAura(): DBCUIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get EffectAuraPeriod(): DBCUIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get EffectMultipleValue(): DBCFloatArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get EffectChainTargets(): DBCUIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get EffectItemType(): DBCUIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get EffectMiscValue(): DBCIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get EffectMiscValueB(): DBCIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get EffectTriggerSpell(): DBCUIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get EffectPointsPerCombo(): DBCFloatArrayCell<this>;
    /**
     * @deprecated This declaration is wrong and does not actually refer to an array of "A" classmasks,
     *             but A/B/C in effect 0. TODO: There is currently no replacement.
     */
    get EffectSpellClassMaskA(): DBCUIntArrayCell<this>;
    /**
     * @deprecated This declaration is wrong and does not actually refer to an array of "A" classmasks,
     *             but A/B/C in effect 1. TODO: There is currently no replacement.
     */
    get EffectSpellClassMaskB(): DBCUIntArrayCell<this>;
    /**
     * @deprecated This declaration is wrong and does not actually refer to an array of "A" classmasks,
     *             but A/B/C in effect 2. TODO: There is currently no replacement.
     */
    get EffectSpellClassMaskC(): DBCUIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get SpellVisualID(): DBCUIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get SpellIconID(): DBCUIntCell<this>;
    /**
     * No comment (yet!)
     */
    get ActiveIconID(): DBCUIntCell<this>;
    /**
     * No comment (yet!)
     */
    get SpellPriority(): DBCUIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Name(): DBCLocCell<this>;
    /**
     * No comment (yet!)
     */
    get NameSubtext(): DBCLocCell<this>;
    /**
     * No comment (yet!)
     */
    get Description(): DBCLocCell<this>;
    /**
     * No comment (yet!)
     */
    get AuraDescription(): DBCLocCell<this>;
    /**
     * No comment (yet!)
     */
    get ManaCostPct(): DBCUIntCell<this>;
    /**
     * No comment (yet!)
     */
    get StartRecoveryCategory(): DBCUIntCell<this>;
    /**
     * No comment (yet!)
     */
    get StartRecoveryTime(): DBCUIntCell<this>;
    /**
     * No comment (yet!)
     */
    get MaxTargetLevel(): DBCUIntCell<this>;
    /**
     * No comment (yet!)
     */
    get SpellClassSet(): DBCUIntCell<this>;
    /**
     * No comment (yet!)
     */
    get SpellClassMask(): DBCUIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get MaxTargets(): DBCUIntCell<this>;
    /**
     * No comment (yet!)
     */
    get DefenseType(): DBCUIntCell<this>;
    /**
     * No comment (yet!)
     */
    get PreventionType(): DBCUIntCell<this>;
    /**
     * No comment (yet!)
     */
    get StanceBarOrder(): DBCUIntCell<this>;
    /**
     * No comment (yet!)
     */
    get EffectChainAmplitude(): DBCFloatArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get MinFactionID(): DBCUIntCell<this>;
    /**
     * No comment (yet!)
     */
    get MinReputation(): DBCUIntCell<this>;
    /**
     * No comment (yet!)
     */
    get RequiredAuraVision(): DBCUIntCell<this>;
    /**
     * No comment (yet!)
     */
    get RequiredTotemCategoryID(): DBCUIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get RequiredAreasID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get SchoolMask(): DBCUIntCell<this>;
    /**
     * No comment (yet!)
     */
    get RuneCostID(): DBCUIntCell<this>;
    /**
     * No comment (yet!)
     */
    get SpellMissileID(): DBCUIntCell<this>;
    /**
     * No comment (yet!)
     */
    get PowerDisplayID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get EffectBonusMultiplier(): DBCFloatArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get Field227(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get Field228(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get Field229(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get SpellDescriptionVariableID(): DBCUIntCell<this>;
    /**
     * No comment (yet!)
     */
    get SpellDifficultyID(): DBCUIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: SpellCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type SpellCreator = {
    Category?: uint;
    DispelType?: uint;
    Mechanic?: uint;
    Attributes?: uint;
    AttributesEx?: uint;
    AttributesExB?: uint;
    AttributesExC?: uint;
    AttributesExD?: uint;
    AttributesExE?: uint;
    AttributesExF?: uint;
    AttributesExG?: uint;
    ShapeshiftMask?: ulong;
    ShapeshiftExclude?: ulong;
    Targets?: uint;
    TargetCreatureType?: uint;
    RequiresSpellFocus?: uint;
    FacingCasterFlags?: uint;
    CasterAuraState?: uint;
    TargetAuraState?: uint;
    ExcludeCasterAuraState?: uint;
    ExcludeTargetAuraState?: uint;
    CasterAuraSpell?: uint;
    TargetAuraSpell?: uint;
    ExcludeCasterAuraSpell?: uint;
    ExcludeTargetAuraSpell?: uint;
    CastingTimeIndex?: uint;
    RecoveryTime?: uint;
    CategoryRecoveryTime?: uint;
    InterruptFlags?: uint;
    AuraInterruptFlags?: uint;
    ChannelInterruptFlags?: uint;
    ProcTypeMask?: uint;
    ProcChance?: uint;
    ProcCharges?: uint;
    MaxLevel?: uint;
    BaseLevel?: uint;
    SpellLevel?: uint;
    DurationIndex?: uint;
    PowerType?: int;
    ManaCost?: uint;
    ManaCostPerLevel?: uint;
    ManaPerSecond?: uint;
    ManaPerSecondPerLevel?: uint;
    RangeIndex?: uint;
    Speed?: float;
    ModalNextSpell?: uint;
    CumulativeAura?: uint;
    Totem?: uint[];
    Reagent?: int[];
    ReagentCount?: int[];
    EquippedItemClass?: int;
    EquippedItemSubclass?: int;
    EquippedItemInvTypes?: int;
    Effect?: uint[];
    EffectDieSides?: int[];
    EffectRealPointsPerLevel?: float[];
    EffectBasePoints?: int[];
    EffectMechanic?: uint[];
    ImplicitTargetA?: uint[];
    ImplicitTargetB?: uint[];
    EffectRadiusIndex?: uint[];
    EffectAura?: uint[];
    EffectAuraPeriod?: uint[];
    EffectMultipleValue?: float[];
    EffectChainTargets?: uint[];
    EffectItemType?: uint[];
    EffectMiscValue?: int[];
    EffectMiscValueB?: int[];
    EffectTriggerSpell?: uint[];
    EffectPointsPerCombo?: float[];
    EffectSpellClassMaskA?: uint[];
    EffectSpellClassMaskB?: uint[];
    EffectSpellClassMaskC?: uint[];
    SpellVisualID?: uint[];
    SpellIconID?: uint;
    ActiveIconID?: uint;
    SpellPriority?: uint;
    Name?: loc_constructor;
    NameSubtext?: loc_constructor;
    Description?: loc_constructor;
    AuraDescription?: loc_constructor;
    ManaCostPct?: uint;
    StartRecoveryCategory?: uint;
    StartRecoveryTime?: uint;
    MaxTargetLevel?: uint;
    SpellClassSet?: uint;
    SpellClassMask?: uint[];
    MaxTargets?: uint;
    DefenseType?: uint;
    PreventionType?: uint;
    StanceBarOrder?: uint;
    EffectChainAmplitude?: float[];
    MinFactionID?: uint;
    MinReputation?: uint;
    RequiredAuraVision?: uint;
    RequiredTotemCategoryID?: uint[];
    RequiredAreasID?: int;
    SchoolMask?: uint;
    RuneCostID?: uint;
    SpellMissileID?: uint;
    PowerDisplayID?: int;
    Field227?: float;
    Field228?: float;
    Field229?: float;
    SpellDescriptionVariableID?: uint;
    SpellDifficultyID?: uint;
};
/**
 * Used for queries (Don't comment these)
 */
export type SpellQuery = {
    ID?: Relation<int>;
    Category?: Relation<uint>;
    DispelType?: Relation<uint>;
    Mechanic?: Relation<uint>;
    Attributes?: Relation<uint>;
    AttributesEx?: Relation<uint>;
    AttributesExB?: Relation<uint>;
    AttributesExC?: Relation<uint>;
    AttributesExD?: Relation<uint>;
    AttributesExE?: Relation<uint>;
    AttributesExF?: Relation<uint>;
    AttributesExG?: Relation<uint>;
    Targets?: Relation<uint>;
    TargetCreatureType?: Relation<uint>;
    RequiresSpellFocus?: Relation<uint>;
    FacingCasterFlags?: Relation<uint>;
    CasterAuraState?: Relation<uint>;
    TargetAuraState?: Relation<uint>;
    ExcludeCasterAuraState?: Relation<uint>;
    ExcludeTargetAuraState?: Relation<uint>;
    CasterAuraSpell?: Relation<uint>;
    TargetAuraSpell?: Relation<uint>;
    ExcludeCasterAuraSpell?: Relation<uint>;
    ExcludeTargetAuraSpell?: Relation<uint>;
    CastingTimeIndex?: Relation<uint>;
    RecoveryTime?: Relation<uint>;
    CategoryRecoveryTime?: Relation<uint>;
    InterruptFlags?: Relation<uint>;
    AuraInterruptFlags?: Relation<uint>;
    ChannelInterruptFlags?: Relation<uint>;
    ProcTypeMask?: Relation<uint>;
    ProcChance?: Relation<uint>;
    ProcCharges?: Relation<uint>;
    MaxLevel?: Relation<uint>;
    BaseLevel?: Relation<uint>;
    SpellLevel?: Relation<uint>;
    DurationIndex?: Relation<uint>;
    PowerType?: Relation<int>;
    ManaCost?: Relation<uint>;
    ManaCostPerLevel?: Relation<uint>;
    ManaPerSecond?: Relation<uint>;
    ManaPerSecondPerLevel?: Relation<uint>;
    RangeIndex?: Relation<uint>;
    Speed?: Relation<float>;
    ModalNextSpell?: Relation<uint>;
    CumulativeAura?: Relation<uint>;
    Totem?: Relation<uint>;
    Reagent?: Relation<int>;
    ReagentCount?: Relation<int>;
    EquippedItemClass?: Relation<int>;
    EquippedItemSubclass?: Relation<int>;
    EquippedItemInvTypes?: Relation<int>;
    Effect?: Relation<uint>;
    EffectDieSides?: Relation<int>;
    EffectRealPointsPerLevel?: Relation<float>;
    EffectBasePoints?: Relation<int>;
    EffectMechanic?: Relation<uint>;
    ImplicitTargetA?: Relation<uint>;
    ImplicitTargetB?: Relation<uint>;
    EffectRadiusIndex?: Relation<uint>;
    EffectAura?: Relation<uint>;
    EffectAuraPeriod?: Relation<uint>;
    EffectMultipleValue?: Relation<float>;
    EffectChainTargets?: Relation<uint>;
    EffectItemType?: Relation<uint>;
    EffectMiscValue?: Relation<int>;
    EffectMiscValueB?: Relation<int>;
    EffectTriggerSpell?: Relation<uint>;
    EffectPointsPerCombo?: Relation<float>;
    EffectSpellClassMaskA?: Relation<uint>;
    EffectSpellClassMaskB?: Relation<uint>;
    EffectSpellClassMaskC?: Relation<uint>;
    SpellVisualID?: Relation<uint>;
    SpellIconID?: Relation<uint>;
    ActiveIconID?: Relation<uint>;
    SpellPriority?: Relation<uint>;
    Name?: Relation<string>;
    NameSubtext?: Relation<string>;
    Description?: Relation<string>;
    AuraDescription?: Relation<string>;
    ManaCostPct?: Relation<uint>;
    StartRecoveryCategory?: Relation<uint>;
    StartRecoveryTime?: Relation<uint>;
    MaxTargetLevel?: Relation<uint>;
    SpellClassSet?: Relation<uint>;
    SpellClassMask?: Relation<uint>;
    MaxTargets?: Relation<uint>;
    DefenseType?: Relation<uint>;
    PreventionType?: Relation<uint>;
    StanceBarOrder?: Relation<uint>;
    EffectChainAmplitude?: Relation<float>;
    MinFactionID?: Relation<uint>;
    MinReputation?: Relation<uint>;
    RequiredAuraVision?: Relation<uint>;
    RequiredTotemCategoryID?: Relation<uint>;
    RequiredAreasID?: Relation<int>;
    SchoolMask?: Relation<uint>;
    RuneCostID?: Relation<uint>;
    SpellMissileID?: Relation<uint>;
    PowerDisplayID?: Relation<int>;
    Field227?: Relation<float>;
    Field228?: Relation<float>;
    Field229?: Relation<float>;
    SpellDescriptionVariableID?: Relation<uint>;
    SpellDifficultyID?: Relation<uint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class SpellDBCFile extends DBCFile<SpellCreator, SpellQuery, SpellRow> {
    constructor();
    /** Loads a new Spell.dbc from a file. */
    static read(path: string): SpellDBCFile;
    add(ID: int, c?: SpellCreator): SpellRow;
    findById(id: number): SpellRow;
}
