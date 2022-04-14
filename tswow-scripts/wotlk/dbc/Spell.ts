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
import { DBCFloatArrayCell, DBCFloatCell, DBCIntArrayCell, DBCIntCell, DBCKeyCell, DBCLocCell, DBCUIntArrayCell, DBCUIntCell, DBCULongCell } from '../../data/dbc/DBCCell'
import { DBCFile } from '../../data/dbc/DBCFile'
import { DBCRow } from '../../data/dbc/DBCRow'
import { float, int, loc_constructor, uint, ulong } from '../../data/primitives'
import { Relation } from '../../data/query/Relations'
import { PrimaryKey } from '../../data/table/PrimaryKey'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class SpellRow extends DBCRow<SpellCreator,SpellQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get ID() { return new DBCKeyCell(this,this.buffer,this.offset+0)}

    /**
     * No comment (yet!)
     */
    get Category() { return new DBCUIntCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get DispelType() { return new DBCUIntCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get Mechanic() { return new DBCUIntCell(this,this.buffer,this.offset+12)}

    /**
     * No comment (yet!)
     */
    get Attributes() { return new DBCUIntCell(this,this.buffer,this.offset+16)}

    /**
     * No comment (yet!)
     */
    get AttributesEx() { return new DBCUIntCell(this,this.buffer,this.offset+20)}

    /**
     * No comment (yet!)
     */
    get AttributesExB() { return new DBCUIntCell(this,this.buffer,this.offset+24)}

    /**
     * No comment (yet!)
     */
    get AttributesExC() { return new DBCUIntCell(this,this.buffer,this.offset+28)}

    /**
     * No comment (yet!)
     */
    get AttributesExD() { return new DBCUIntCell(this,this.buffer,this.offset+32)}

    /**
     * No comment (yet!)
     */
    get AttributesExE() { return new DBCUIntCell(this,this.buffer,this.offset+36)}

    /**
     * No comment (yet!)
     */
    get AttributesExF() { return new DBCUIntCell(this,this.buffer,this.offset+40)}

    /**
     * No comment (yet!)
     */
    get AttributesExG() { return new DBCUIntCell(this,this.buffer,this.offset+44)}

    /**
     * No comment (yet!)
     */
    get ShapeshiftMask() { return new DBCULongCell(this,this.buffer,this.offset+48)}

    /**
     * No comment (yet!)
     */
    get ShapeshiftExclude() { return new DBCULongCell(this,this.buffer,this.offset+56)}

    /**
     * No comment (yet!)
     */
    get Targets() { return new DBCUIntCell(this,this.buffer,this.offset+64)}

    /**
     * No comment (yet!)
     */
    get TargetCreatureType() { return new DBCUIntCell(this,this.buffer,this.offset+68)}

    /**
     * No comment (yet!)
     */
    get RequiresSpellFocus() { return new DBCUIntCell(this,this.buffer,this.offset+72)}

    /**
     * No comment (yet!)
     */
    get FacingCasterFlags() { return new DBCUIntCell(this,this.buffer,this.offset+76)}

    /**
     * No comment (yet!)
     */
    get CasterAuraState() { return new DBCUIntCell(this,this.buffer,this.offset+80)}

    /**
     * No comment (yet!)
     */
    get TargetAuraState() { return new DBCUIntCell(this,this.buffer,this.offset+84)}

    /**
     * No comment (yet!)
     */
    get ExcludeCasterAuraState() { return new DBCUIntCell(this,this.buffer,this.offset+88)}

    /**
     * No comment (yet!)
     */
    get ExcludeTargetAuraState() { return new DBCUIntCell(this,this.buffer,this.offset+92)}

    /**
     * No comment (yet!)
     */
    get CasterAuraSpell() { return new DBCUIntCell(this,this.buffer,this.offset+96)}

    /**
     * No comment (yet!)
     */
    get TargetAuraSpell() { return new DBCUIntCell(this,this.buffer,this.offset+100)}

    /**
     * No comment (yet!)
     */
    get ExcludeCasterAuraSpell() { return new DBCUIntCell(this,this.buffer,this.offset+104)}

    /**
     * No comment (yet!)
     */
    get ExcludeTargetAuraSpell() { return new DBCUIntCell(this,this.buffer,this.offset+108)}

    /**
     * No comment (yet!)
     */
    get CastingTimeIndex() { return new DBCUIntCell(this,this.buffer,this.offset+112)}

    /**
     * No comment (yet!)
     */
    get RecoveryTime() { return new DBCUIntCell(this,this.buffer,this.offset+116)}

    /**
     * No comment (yet!)
     */
    get CategoryRecoveryTime() { return new DBCUIntCell(this,this.buffer,this.offset+120)}

    /**
     * No comment (yet!)
     */
    get InterruptFlags() { return new DBCUIntCell(this,this.buffer,this.offset+124)}

    /**
     * No comment (yet!)
     */
    get AuraInterruptFlags() { return new DBCUIntCell(this,this.buffer,this.offset+128)}

    /**
     * No comment (yet!)
     */
    get ChannelInterruptFlags() { return new DBCUIntCell(this,this.buffer,this.offset+132)}

    /**
     * No comment (yet!)
     */
    get ProcTypeMask() { return new DBCUIntCell(this,this.buffer,this.offset+136)}

    /**
     * No comment (yet!)
     */
    get ProcChance() { return new DBCUIntCell(this,this.buffer,this.offset+140)}

    /**
     * No comment (yet!)
     */
    get ProcCharges() { return new DBCUIntCell(this,this.buffer,this.offset+144)}

    /**
     * No comment (yet!)
     */
    get MaxLevel() { return new DBCUIntCell(this,this.buffer,this.offset+148)}

    /**
     * No comment (yet!)
     */
    get BaseLevel() { return new DBCUIntCell(this,this.buffer,this.offset+152)}

    /**
     * No comment (yet!)
     */
    get SpellLevel() { return new DBCUIntCell(this,this.buffer,this.offset+156)}

    /**
     * No comment (yet!)
     */
    get DurationIndex() { return new DBCUIntCell(this,this.buffer,this.offset+160)}

    /**
     * No comment (yet!)
     */
    get PowerType() { return new DBCIntCell(this,this.buffer,this.offset+164)}

    /**
     * No comment (yet!)
     */
    get ManaCost() { return new DBCUIntCell(this,this.buffer,this.offset+168)}

    /**
     * No comment (yet!)
     */
    get ManaCostPerLevel() { return new DBCUIntCell(this,this.buffer,this.offset+172)}

    /**
     * No comment (yet!)
     */
    get ManaPerSecond() { return new DBCUIntCell(this,this.buffer,this.offset+176)}

    /**
     * No comment (yet!)
     */
    get ManaPerSecondPerLevel() { return new DBCUIntCell(this,this.buffer,this.offset+180)}

    /**
     * No comment (yet!)
     */
    get RangeIndex() { return new DBCUIntCell(this,this.buffer,this.offset+184)}

    /**
     * No comment (yet!)
     */
    get Speed() { return new DBCFloatCell(this,this.buffer,this.offset+188)}

    /**
     * No comment (yet!)
     */
    get ModalNextSpell() { return new DBCUIntCell(this,this.buffer,this.offset+192)}

    /**
     * No comment (yet!)
     */
    get CumulativeAura() { return new DBCUIntCell(this,this.buffer,this.offset+196)}

    /**
     * No comment (yet!)
     */
    get Totem() { return new DBCUIntArrayCell(this,2,this.buffer,this.offset+200)}

    /**
     * No comment (yet!)
     */
    get Reagent() { return new DBCIntArrayCell(this,8,this.buffer,this.offset+208)}

    /**
     * No comment (yet!)
     */
    get ReagentCount() { return new DBCIntArrayCell(this,8,this.buffer,this.offset+240)}

    /**
     * No comment (yet!)
     */
    get EquippedItemClass() { return new DBCIntCell(this,this.buffer,this.offset+272)}

    /**
     * No comment (yet!)
     */
    get EquippedItemSubclass() { return new DBCIntCell(this,this.buffer,this.offset+276)}

    /**
     * No comment (yet!)
     */
    get EquippedItemInvTypes() { return new DBCIntCell(this,this.buffer,this.offset+280)}

    /**
     * No comment (yet!)
     */
    get Effect() { return new DBCUIntArrayCell(this,3,this.buffer,this.offset+284)}

    /**
     * No comment (yet!)
     */
    get EffectDieSides() { return new DBCIntArrayCell(this,3,this.buffer,this.offset+296)}

    /**
     * No comment (yet!)
     */
    get EffectRealPointsPerLevel() { return new DBCFloatArrayCell(this,3,this.buffer,this.offset+308)}

    /**
     * No comment (yet!)
     */
    get EffectBasePoints() { return new DBCIntArrayCell(this,3,this.buffer,this.offset+320)}

    /**
     * No comment (yet!)
     */
    get EffectMechanic() { return new DBCUIntArrayCell(this,3,this.buffer,this.offset+332)}

    /**
     * No comment (yet!)
     */
    get ImplicitTargetA() { return new DBCUIntArrayCell(this,3,this.buffer,this.offset+344)}

    /**
     * No comment (yet!)
     */
    get ImplicitTargetB() { return new DBCUIntArrayCell(this,3,this.buffer,this.offset+356)}

    /**
     * No comment (yet!)
     */
    get EffectRadiusIndex() { return new DBCUIntArrayCell(this,3,this.buffer,this.offset+368)}

    /**
     * No comment (yet!)
     */
    get EffectAura() { return new DBCUIntArrayCell(this,3,this.buffer,this.offset+380)}

    /**
     * No comment (yet!)
     */
    get EffectAuraPeriod() { return new DBCUIntArrayCell(this,3,this.buffer,this.offset+392)}

    /**
     * No comment (yet!)
     */
    get EffectMultipleValue() { return new DBCFloatArrayCell(this,3,this.buffer,this.offset+404)}

    /**
     * No comment (yet!)
     */
    get EffectChainTargets() { return new DBCUIntArrayCell(this,3,this.buffer,this.offset+416)}

    /**
     * No comment (yet!)
     */
    get EffectItemType() { return new DBCUIntArrayCell(this,3,this.buffer,this.offset+428)}

    /**
     * No comment (yet!)
     */
    get EffectMiscValue() { return new DBCIntArrayCell(this,3,this.buffer,this.offset+440)}

    /**
     * No comment (yet!)
     */
    get EffectMiscValueB() { return new DBCIntArrayCell(this,3,this.buffer,this.offset+452)}

    /**
     * No comment (yet!)
     */
    get EffectTriggerSpell() { return new DBCUIntArrayCell(this,3,this.buffer,this.offset+464)}

    /**
     * No comment (yet!)
     */
    get EffectPointsPerCombo() { return new DBCFloatArrayCell(this,3,this.buffer,this.offset+476)}

    /**
     * @deprecated This declaration is wrong and does not actually refer to an array of "A" classmasks,
     *             but A/B/C in effect 0. TODO: There is currently no replacement.
     */
    get EffectSpellClassMaskA() { return new DBCUIntArrayCell(this,3,this.buffer,this.offset+488)}

    /**
     * @deprecated This declaration is wrong and does not actually refer to an array of "A" classmasks,
     *             but A/B/C in effect 1. TODO: There is currently no replacement.
     */
    get EffectSpellClassMaskB() { return new DBCUIntArrayCell(this,3,this.buffer,this.offset+500)}

    /**
     * @deprecated This declaration is wrong and does not actually refer to an array of "A" classmasks,
     *             but A/B/C in effect 2. TODO: There is currently no replacement.
     */
    get EffectSpellClassMaskC() { return new DBCUIntArrayCell(this,3,this.buffer,this.offset+512)}

    /**
     * No comment (yet!)
     */
    get SpellVisualID() { return new DBCUIntArrayCell(this,2,this.buffer,this.offset+524)}

    /**
     * No comment (yet!)
     */
    get SpellIconID() { return new DBCUIntCell(this,this.buffer,this.offset+532)}

    /**
     * No comment (yet!)
     */
    get ActiveIconID() { return new DBCUIntCell(this,this.buffer,this.offset+536)}

    /**
     * No comment (yet!)
     */
    get SpellPriority() { return new DBCUIntCell(this,this.buffer,this.offset+540)}

    /**
     * No comment (yet!)
     */
    get Name() { return new DBCLocCell(this,this.buffer,this.offset+544)}

    /**
     * No comment (yet!)
     */
    get NameSubtext() { return new DBCLocCell(this,this.buffer,this.offset+612)}

    /**
     * No comment (yet!)
     */
    get Description() { return new DBCLocCell(this,this.buffer,this.offset+680)}

    /**
     * No comment (yet!)
     */
    get AuraDescription() { return new DBCLocCell(this,this.buffer,this.offset+748)}

    /**
     * No comment (yet!)
     */
    get ManaCostPct() { return new DBCUIntCell(this,this.buffer,this.offset+816)}

    /**
     * No comment (yet!)
     */
    get StartRecoveryCategory() { return new DBCUIntCell(this,this.buffer,this.offset+820)}

    /**
     * No comment (yet!)
     */
    get StartRecoveryTime() { return new DBCUIntCell(this,this.buffer,this.offset+824)}

    /**
     * No comment (yet!)
     */
    get MaxTargetLevel() { return new DBCUIntCell(this,this.buffer,this.offset+828)}

    /**
     * No comment (yet!)
     */
    get SpellClassSet() { return new DBCUIntCell(this,this.buffer,this.offset+832)}

    /**
     * No comment (yet!)
     */
    get SpellClassMask() { return new DBCUIntArrayCell(this,3,this.buffer,this.offset+836)}

    /**
     * No comment (yet!)
     */
    get MaxTargets() { return new DBCUIntCell(this,this.buffer,this.offset+848)}

    /**
     * No comment (yet!)
     */
    get DefenseType() { return new DBCUIntCell(this,this.buffer,this.offset+852)}

    /**
     * No comment (yet!)
     */
    get PreventionType() { return new DBCUIntCell(this,this.buffer,this.offset+856)}

    /**
     * No comment (yet!)
     */
    get StanceBarOrder() { return new DBCUIntCell(this,this.buffer,this.offset+860)}

    /**
     * No comment (yet!)
     */
    get EffectChainAmplitude() { return new DBCFloatArrayCell(this,3,this.buffer,this.offset+864)}

    /**
     * No comment (yet!)
     */
    get MinFactionID() { return new DBCUIntCell(this,this.buffer,this.offset+876)}

    /**
     * No comment (yet!)
     */
    get MinReputation() { return new DBCUIntCell(this,this.buffer,this.offset+880)}

    /**
     * No comment (yet!)
     */
    get RequiredAuraVision() { return new DBCUIntCell(this,this.buffer,this.offset+884)}

    /**
     * No comment (yet!)
     */
    get RequiredTotemCategoryID() { return new DBCUIntArrayCell(this,2,this.buffer,this.offset+888)}

    /**
     * No comment (yet!)
     */
    get RequiredAreasID() { return new DBCIntCell(this,this.buffer,this.offset+896)}

    /**
     * No comment (yet!)
     */
    get SchoolMask() { return new DBCUIntCell(this,this.buffer,this.offset+900)}

    /**
     * No comment (yet!)
     */
    get RuneCostID() { return new DBCUIntCell(this,this.buffer,this.offset+904)}

    /**
     * No comment (yet!)
     */
    get SpellMissileID() { return new DBCUIntCell(this,this.buffer,this.offset+908)}

    /**
     * No comment (yet!)
     */
    get PowerDisplayID() { return new DBCIntCell(this,this.buffer,this.offset+912)}

    /**
     * No comment (yet!)
     */
    get EffectBonusMultiplier() { return new DBCFloatArrayCell(this, 3, this.buffer, this.offset + 916); }

    /**
     * No comment (yet!)
     */
    get Field227() { return new DBCFloatCell(this,this.buffer,this.offset+916)}

    /**
     * No comment (yet!)
     */
    get Field228() { return new DBCFloatCell(this,this.buffer,this.offset+920)}

    /**
     * No comment (yet!)
     */
    get Field229() { return new DBCFloatCell(this,this.buffer,this.offset+924)}


    /**
     * No comment (yet!)
     */
    get SpellDescriptionVariableID() { return new DBCUIntCell(this,this.buffer,this.offset+928)}

    /**
     * No comment (yet!)
     */
    get SpellDifficultyID() { return new DBCUIntCell(this,this.buffer,this.offset+932)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : SpellCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type SpellCreator = {
    Category?: uint
    DispelType?: uint
    Mechanic?: uint
    Attributes?: uint
    AttributesEx?: uint
    AttributesExB?: uint
    AttributesExC?: uint
    AttributesExD?: uint
    AttributesExE?: uint
    AttributesExF?: uint
    AttributesExG?: uint
    ShapeshiftMask?: ulong
    ShapeshiftExclude?: ulong
    Targets?: uint
    TargetCreatureType?: uint
    RequiresSpellFocus?: uint
    FacingCasterFlags?: uint
    CasterAuraState?: uint
    TargetAuraState?: uint
    ExcludeCasterAuraState?: uint
    ExcludeTargetAuraState?: uint
    CasterAuraSpell?: uint
    TargetAuraSpell?: uint
    ExcludeCasterAuraSpell?: uint
    ExcludeTargetAuraSpell?: uint
    CastingTimeIndex?: uint
    RecoveryTime?: uint
    CategoryRecoveryTime?: uint
    InterruptFlags?: uint
    AuraInterruptFlags?: uint
    ChannelInterruptFlags?: uint
    ProcTypeMask?: uint
    ProcChance?: uint
    ProcCharges?: uint
    MaxLevel?: uint
    BaseLevel?: uint
    SpellLevel?: uint
    DurationIndex?: uint
    PowerType?: int
    ManaCost?: uint
    ManaCostPerLevel?: uint
    ManaPerSecond?: uint
    ManaPerSecondPerLevel?: uint
    RangeIndex?: uint
    Speed?: float
    ModalNextSpell?: uint
    CumulativeAura?: uint
    Totem?: uint[]
    Reagent?: int[]
    ReagentCount?: int[]
    EquippedItemClass?: int
    EquippedItemSubclass?: int
    EquippedItemInvTypes?: int
    Effect?: uint[]
    EffectDieSides?: int[]
    EffectRealPointsPerLevel?: float[]
    EffectBasePoints?: int[]
    EffectMechanic?: uint[]
    ImplicitTargetA?: uint[]
    ImplicitTargetB?: uint[]
    EffectRadiusIndex?: uint[]
    EffectAura?: uint[]
    EffectAuraPeriod?: uint[]
    EffectMultipleValue?: float[]
    EffectChainTargets?: uint[]
    EffectItemType?: uint[]
    EffectMiscValue?: int[]
    EffectMiscValueB?: int[]
    EffectTriggerSpell?: uint[]
    EffectPointsPerCombo?: float[]
    EffectSpellClassMaskA?: uint[]
    EffectSpellClassMaskB?: uint[]
    EffectSpellClassMaskC?: uint[]
    SpellVisualID?: uint[]
    SpellIconID?: uint
    ActiveIconID?: uint
    SpellPriority?: uint
    Name?: loc_constructor
    NameSubtext?: loc_constructor
    Description?: loc_constructor
    AuraDescription?: loc_constructor
    ManaCostPct?: uint
    StartRecoveryCategory?: uint
    StartRecoveryTime?: uint
    MaxTargetLevel?: uint
    SpellClassSet?: uint
    SpellClassMask?: uint[]
    MaxTargets?: uint
    DefenseType?: uint
    PreventionType?: uint
    StanceBarOrder?: uint
    EffectChainAmplitude?: float[]
    MinFactionID?: uint
    MinReputation?: uint
    RequiredAuraVision?: uint
    RequiredTotemCategoryID?: uint[]
    RequiredAreasID?: int
    SchoolMask?: uint
    RuneCostID?: uint
    SpellMissileID?: uint
    PowerDisplayID?: int
    Field227?: float
    Field228?: float
    Field229?: float
    SpellDescriptionVariableID?: uint
    SpellDifficultyID?: uint
}

/**
 * Used for queries (Don't comment these)
 */
export type SpellQuery = {
    ID? : Relation<int>
    Category? : Relation<uint>
    DispelType? : Relation<uint>
    Mechanic? : Relation<uint>
    Attributes? : Relation<uint>
    AttributesEx? : Relation<uint>
    AttributesExB? : Relation<uint>
    AttributesExC? : Relation<uint>
    AttributesExD? : Relation<uint>
    AttributesExE? : Relation<uint>
    AttributesExF? : Relation<uint>
    AttributesExG? : Relation<uint>
    Targets? : Relation<uint>
    TargetCreatureType? : Relation<uint>
    RequiresSpellFocus? : Relation<uint>
    FacingCasterFlags? : Relation<uint>
    CasterAuraState? : Relation<uint>
    TargetAuraState? : Relation<uint>
    ExcludeCasterAuraState? : Relation<uint>
    ExcludeTargetAuraState? : Relation<uint>
    CasterAuraSpell? : Relation<uint>
    TargetAuraSpell? : Relation<uint>
    ExcludeCasterAuraSpell? : Relation<uint>
    ExcludeTargetAuraSpell? : Relation<uint>
    CastingTimeIndex? : Relation<uint>
    RecoveryTime? : Relation<uint>
    CategoryRecoveryTime? : Relation<uint>
    InterruptFlags? : Relation<uint>
    AuraInterruptFlags? : Relation<uint>
    ChannelInterruptFlags? : Relation<uint>
    ProcTypeMask? : Relation<uint>
    ProcChance? : Relation<uint>
    ProcCharges? : Relation<uint>
    MaxLevel? : Relation<uint>
    BaseLevel? : Relation<uint>
    SpellLevel? : Relation<uint>
    DurationIndex? : Relation<uint>
    PowerType? : Relation<int>
    ManaCost? : Relation<uint>
    ManaCostPerLevel? : Relation<uint>
    ManaPerSecond? : Relation<uint>
    ManaPerSecondPerLevel? : Relation<uint>
    RangeIndex? : Relation<uint>
    Speed? : Relation<float>
    ModalNextSpell? : Relation<uint>
    CumulativeAura? : Relation<uint>
    Totem? : Relation<uint>
    Reagent? : Relation<int>
    ReagentCount? : Relation<int>
    EquippedItemClass? : Relation<int>
    EquippedItemSubclass? : Relation<int>
    EquippedItemInvTypes? : Relation<int>
    Effect? : Relation<uint>
    EffectDieSides? : Relation<int>
    EffectRealPointsPerLevel? : Relation<float>
    EffectBasePoints? : Relation<int>
    EffectMechanic? : Relation<uint>
    ImplicitTargetA? : Relation<uint>
    ImplicitTargetB? : Relation<uint>
    EffectRadiusIndex? : Relation<uint>
    EffectAura? : Relation<uint>
    EffectAuraPeriod? : Relation<uint>
    EffectMultipleValue? : Relation<float>
    EffectChainTargets? : Relation<uint>
    EffectItemType? : Relation<uint>
    EffectMiscValue? : Relation<int>
    EffectMiscValueB? : Relation<int>
    EffectTriggerSpell? : Relation<uint>
    EffectPointsPerCombo? : Relation<float>
    EffectSpellClassMaskA? : Relation<uint>
    EffectSpellClassMaskB? : Relation<uint>
    EffectSpellClassMaskC? : Relation<uint>
    SpellVisualID? : Relation<uint>
    SpellIconID? : Relation<uint>
    ActiveIconID? : Relation<uint>
    SpellPriority? : Relation<uint>
    Name? : Relation<string>
    NameSubtext? : Relation<string>
    Description? : Relation<string>
    AuraDescription? : Relation<string>
    ManaCostPct? : Relation<uint>
    StartRecoveryCategory? : Relation<uint>
    StartRecoveryTime? : Relation<uint>
    MaxTargetLevel? : Relation<uint>
    SpellClassSet? : Relation<uint>
    SpellClassMask? : Relation<uint>
    MaxTargets? : Relation<uint>
    DefenseType? : Relation<uint>
    PreventionType? : Relation<uint>
    StanceBarOrder? : Relation<uint>
    EffectChainAmplitude? : Relation<float>
    MinFactionID? : Relation<uint>
    MinReputation? : Relation<uint>
    RequiredAuraVision? : Relation<uint>
    RequiredTotemCategoryID? : Relation<uint>
    RequiredAreasID? : Relation<int>
    SchoolMask? : Relation<uint>
    RuneCostID? : Relation<uint>
    SpellMissileID? : Relation<uint>
    PowerDisplayID? : Relation<int>
    Field227? : Relation<float>
    Field228? : Relation<float>
    Field229? : Relation<float>
    SpellDescriptionVariableID? : Relation<uint>
    SpellDifficultyID? : Relation<uint>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class SpellDBCFile extends DBCFile<
    SpellCreator,
    SpellQuery,
    SpellRow> {
    constructor() {
        super('Spell',(t,b,o)=>new SpellRow(t,b,o))
    }
    /** Loads a new Spell.dbc from a file. */
    static read(path: string): SpellDBCFile {
        return new SpellDBCFile().read(path);
    }
    add(ID : int, c? : SpellCreator) : SpellRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}