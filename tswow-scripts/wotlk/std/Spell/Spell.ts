/*
 * This file is part of tswow (https://github.com/tswow)
 *
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
import { makeEnumCell } from "../../../data/cell/cells/EnumCell";
import { makeMaskCell32, MaskCell32, MaskCell64 } from "../../../data/cell/cells/MaskCell";
import { Transient } from "../../../data/cell/serialization/Transient";
import { loc_constructor } from "../../../data/primitives";
import { SpellRow } from "../../dbc/Spell";
import { AreaGroupRegistry } from "../Area/AreaGroup";
import { getInlineID } from "../InlineScript/InlineScript";
import { CodegenSettings, GenerateCode } from "../Misc/Codegen";
import { MainEntityID } from "../Misc/Entity";
import { IncludeExclude, IncludeExcludeGeneric, IncludeExcludeMask } from "../Misc/IncludeExclude";
import { SchoolMask } from "../Misc/School";
import { SingleArraySystem } from "../Misc/SingleArraySystem";
import { SpellFocusRegistry } from "../SpellFocus/SpellFocus";
import { AuraInterruptFlags } from "./AuraInterruptFlags";
import { CastSpells } from "./CastOnCreate";
import { SpellFacingFlags } from "./FacingCasterFlags";
import { InterruptFlags } from "./InterruptFlags";
import { SpellAttributes } from "./SpellAttributes";
import { AuraStateType } from "./SpellAuraState";
import { SpellAutoLearns } from "./SpellAutoLearn";
import { SpellBonusData } from "./SpellBonusData";
import { SpellCastTimeRegistry } from "./SpellCastTime";
import { BaseClassSet } from "./SpellClassSet";
import { SpellCustomAttr, SpellCustomAttr1 } from "./SpellCustomAttr";
import { DefenseType } from "./SpellDefenseType";
import { SpellDescriptionVariableRegistry } from "./SpellDescriptionVariable";
import { SpellDifficultyRegistry } from "./SpellDifficulty";
import { DispelType } from "./SpellDispelType";
import { SpellDurationRegistry } from "./SpellDuration";
import { SpellEffects } from "./SpellEffect";
import { SpellEffectMechanic } from "./SpellEffectMechanics";
import { SpellIconCell } from "./SpellIcon";
import { SpellItemEquips } from "./SpellItemEquips";
import { SpellLevels } from "./SpellLevels";
import { SpellMissileRegistry } from "./SpellMissile";
import { SpellPower } from "./SpellPower";
import { SpellPowerDisplay } from "./SpellPowerDisplay";
import { SpellPreventionType } from "./SpellPreventionType";
import { SpellFamilyName, SpellProc } from "./SpellProc";
import { SpellRangeRegistry } from "./SpellRange";
import { SpellRank } from "./SpellRank";
import { SpellReagents } from "./SpellReagents";
import { SpellRecovery } from "./SpellRecovery";
import { SpellReputation } from "./SpellReputation";
import { SpellScript } from "./SpellScript";
import { SpellSkillLineAbilites } from "./SpellSkillLines";
import { SpellSpellStackGroups } from "./SpellStackGroup";
import { SpellThreat } from "./SpellThreat";
import { SpellVisualRegistry } from "./SpellVisual";
import { SpellCreatureTarget } from "./TargetCreatureType";
import { SpellTargetType } from "./TargetType";

export class Spell extends MainEntityID<SpellRow> {
    get Attributes() { return new SpellAttributes(this, this); }

    @Transient
    get Visual() { return SpellVisualRegistry.ref(this, this.wrapIndex(this.row.SpellVisualID,0)); }
    get Icon() { return new SpellIconCell(this, this.row.SpellIconID); }
    get ActiveIcon() { return new SpellIconCell(this, this.row.ActiveIconID); }
    get Name() { return this.wrapLoc(this.row.Name); }
    get Subtext() { return this.wrapLoc(this.row.NameSubtext); }
    get Description() { return this.wrapLoc(this.row.Description); }
    get AuraDescription() { return this.wrapLoc(this.row.AuraDescription); }
    get PowerDisplay() {
        return makeEnumCell(SpellPowerDisplay,this, this.row.PowerDisplayID);
    }

    get ID() { return this.row.ID.get(); }

    get TargetType() {
        return makeMaskCell32(SpellTargetType,this, this.row.Targets);
    }
    get CreatureTargets() {
        return makeMaskCell32(SpellCreatureTarget,this, this.row.TargetCreatureType);
    }

    get Totems() { return new SingleArraySystem(this,this.row.Totem,0); }
    get Reagents() { return new SpellReagents(this,this); }

    /** @deprecated use RequiredSpellFocus */
    @Transient
    get RequiresSpellFocus() {
        return SpellFocusRegistry.ref(this,this.row.RequiresSpellFocus);
    }
    get RequiredSpellFocus() {
        return SpellFocusRegistry.ref(this,this.row.RequiresSpellFocus);
    }
    get FacingCasterFlags() {
        return makeMaskCell32(SpellFacingFlags, this, this.row.FacingCasterFlags);
    }

    get CasterAuraState() {
        return new IncludeExcludeGeneric(this,
            makeEnumCell(AuraStateType,this,this.row.CasterAuraState),
            makeEnumCell(AuraStateType,this,this.row.ExcludeCasterAuraState)
        )
    }

    get TargetAuraState() {
        return new IncludeExcludeGeneric(this,
            makeEnumCell(AuraStateType,this,this.row.TargetAuraState),
            makeEnumCell(AuraStateType,this,this.row.ExcludeTargetAuraState)
        )
    }

    get CasterAuraSpell() : IncludeExclude<number, this> {
        return new IncludeExclude(this,
        this.wrap(this.row.CasterAuraSpell),
        this.wrap(this.row.ExcludeCasterAuraSpell)
    )}

    get TargetAuraSpell() : IncludeExclude<number, this> {
        return new IncludeExclude(this,
        this.wrap(this.row.TargetAuraSpell),
        this.wrap(this.row.ExcludeTargetAuraSpell)
    )}

    get SkillLines() { return new SpellSkillLineAbilites(this); }
    /** How many stacks of this spell can be present on the target */
    get Stacks() { return this.wrap(this.row.CumulativeAura); }

    get ModalNextSpell() { return this.wrap(this.row.ModalNextSpell); }
    get Effects() { return new SpellEffects(this); }
    get Duration() { return SpellDurationRegistry.ref(this, this.row.DurationIndex); }
    get Range() { return SpellRangeRegistry.ref(this, this.row.RangeIndex); }
    get Speed() { return this.wrap(this.row.Speed); }
    get ClassMask() { return new BaseClassSet(this); }

    get Family() {
        return makeEnumCell(SpellFamilyName, this, this.row.SpellClassSet);
    }

    get Power(): SpellPower<this> { return new SpellPower(this,this); }

    /**
     * Note: This field is just an alias for "Power"
     */
    @Transient
    get Mana() { return new SpellPower(this,this);}


    get ItemEquips() { return new SpellItemEquips(this, this.row); }
    get Proc() { return new SpellProc(this,this); }
    get Priority() { return this.wrap(this.row.SpellPriority); }
    get Cooldown() { return new SpellRecovery(this, this); }
    get MaxTargetLevel() { return this.wrap(this.row.MaxTargetLevel); }
    get MaxTargets() { return this.wrap(this.row.MaxTargets); }
    get DefenseType() { return makeEnumCell(DefenseType, this, this.row.DefenseType); }
    get PreventionType() { return makeEnumCell(SpellPreventionType, this, this.row.PreventionType)}
    get StanceBarOrder() { return this.wrap(this.row.StanceBarOrder); }
    get CastTime() { return SpellCastTimeRegistry.ref(this,this.row.CastingTimeIndex); }

    /** @deprecated use Cooldown.Category */
    @Transient
    get Category() { return this.wrap(this.row.Category); }

    /** Points to a TotemCategory */
    get RequiredTotems() { return new SingleArraySystem(this,this.row.RequiredTotemCategoryID,0); }
    get Faction() { return new SpellReputation(this); }
    get RequiredAuraVision() { return this.wrap(this.row.RequiredAuraVision); }

    /** Points to a WorldMapArea */
    get RequiredArea() { return AreaGroupRegistry.ref(this, this.row.RequiredAreasID); }
    get SchoolMask() {
        return makeMaskCell32(SchoolMask,this, this.row.SchoolMask);
    }
    get DispelType() { return makeEnumCell(DispelType,this,this.row.DispelType)}
    get Mechanic() { return makeEnumCell(SpellEffectMechanic,this,this.row.Mechanic); }
    get Missile() { return SpellMissileRegistry.ref(this, this.row.SpellMissileID) }

    get ShapeshiftMask() { return new IncludeExcludeMask(this,
        new MaskCell64(this,this.row.ShapeshiftMask),
        new MaskCell64(this,this.row.ShapeshiftMask),
    )}

    get Levels() { return new SpellLevels(this); }
    get DescriptionVariable() { return SpellDescriptionVariableRegistry.ref(this, this.row.SpellDescriptionVariableID) }
    get Difficulty() { return SpellDifficultyRegistry.ref(this, this.row.SpellDifficultyID); }
    get ChannelInterruptFlags() { return new MaskCell32(this, this.row.ChannelInterruptFlags); }
    get AuraInterruptFlags() {
        return makeMaskCell32(AuraInterruptFlags,this, this.row.AuraInterruptFlags);
    }
    get InterruptFlags() {
        return makeMaskCell32(InterruptFlags,this, this.row.InterruptFlags);
    }
    get Rank() { return new SpellRank(this, this.ID); }
    get StackGroups() { return new SpellSpellStackGroups(this); }

    get AutoLearn() { return new SpellAutoLearns(this); }

    /** Custom server core attributes for this spell */
    readonly CustomAttributes = new SpellCustomAttr(this);
    readonly CustomAttributesEx = new SpellCustomAttr1(this);
    /** Custom server core damage bonuses */
    readonly BonusData = new SpellBonusData(this);
    /** Custom server core spell threat bonuses */
    readonly Threat = new SpellThreat(this);

    /**
     * Does **not** support setting this attribute,
     * please use TSWoW Spell events instead.
     */
    get CoreScript() { return new SpellScript(this); }

    get CastOnPlayerCreate() { return new CastSpells(this, this.ID); }

    get InlineScripts() {
        return getInlineID(
              this
            , this.ID
            , 'Spell'
            , 'livescript'
        ) as _hidden.Spell<this>
    }

    clear() {
        this.row
            .ActiveIconID.set(0)
            .Attributes.set(0)
            .AttributesEx.set(0)
            .AttributesExB.set(0)
            .AttributesExC.set(0)
            .AttributesExD.set(0)
            .AttributesExE.set(0)
            .AttributesExF.set(0)
            .AttributesExG.set(0)
            .AuraDescription.clear()
            .AuraInterruptFlags.set(0)
            .BaseLevel.set(0)
            .CasterAuraSpell.set(0)
            .CasterAuraState.set(0)
            .CastingTimeIndex.set(0)
            .Category.set(0)
            .CategoryRecoveryTime.set(0)
            .ChannelInterruptFlags.set(0)
            .CumulativeAura.set(0)
            .DefenseType.set(0)
            .Description.clear()
            .DispelType.set(0)
            .DurationIndex.set(0)
            .Effect.set([0,0,0])
            .EffectAura.set([0,0,0])
            .EffectAuraPeriod.set([0,0,0])
            .EffectBasePoints.set([0,0,0])
            .EffectChainAmplitude.set([1,1,1])
            .EffectChainTargets.set([0,0,0])
            .EffectDieSides.set([1,1,1])
            .EffectItemType.set([0,0,0])
            .EffectMechanic.set([0,0,0])
            .EffectMiscValue.set([0,0,0])
            .EffectMiscValueB.set([0,0,0])
            .EffectMultipleValue.set([0,0,0])
            .EffectPointsPerCombo.set([0,0,0])
            .EffectRadiusIndex.set([0,0,0])
            .EffectRealPointsPerLevel.set([0,0,0])
            .EffectSpellClassMaskA.set([0,0,0])
            .EffectSpellClassMaskB.set([0,0,0])
            .EffectSpellClassMaskC.set([0,0,0])
            .EffectTriggerSpell.set([0,0,0])
            .EquippedItemClass.set(-1)
            .EquippedItemInvTypes.set(0)
            .EquippedItemSubclass.set(0)
            .ExcludeCasterAuraSpell.set(0)
            .ExcludeCasterAuraState.set(0)
            .FacingCasterFlags.set(0)
            .EffectBonusMultiplier.set([0,0,0])
            .ImplicitTargetA.set([0,0,0])
            .ImplicitTargetB.set([0,0,0])
            .InterruptFlags.set(0)
            .ManaCost.set(0)
            .ManaCostPct.set(0)
            .ManaCostPerLevel.set(0)
            .ManaPerSecond.set(0)
            .ManaPerSecondPerLevel.set(0)
            .MaxLevel.set(0)
            .MaxTargetLevel.set(0)
            .MaxTargets.set(0)
            .Mechanic.set(0)
            .MinFactionID.set(0)
            .MinReputation.set(0)
            .ModalNextSpell.set(0)
            .Name.clear()
            .NameSubtext.clear()
            .PowerDisplayID.set(0)
            .PowerType.set(0)
            .PreventionType.set(0)
            .ProcChance.set(101)
            .ProcCharges.set(0)
            .ProcTypeMask.set(0)
            .RangeIndex.set(0)
            .Reagent.set([0,0,0,0,0,0,0,0])
            .ReagentCount.set([0,0,0,0,0,0,0,0])
            .RecoveryTime.set(0)
            .RequiredAreasID.set(0)
            .RequiredAuraVision.set(0)
            .RequiredTotemCategoryID.set([0,0])
            .RequiresSpellFocus.set(0)
            .RuneCostID.set(0)
            .SchoolMask.set(1)
            .ShapeshiftExclude.set(BigInt(0))
            .ShapeshiftMask.set(BigInt(0))
            .Speed.set(0)
            .SpellClassMask.set([0,0,0])
            .SpellClassSet.set(0)
            .SpellDescriptionVariableID.set(0)
            .SpellDifficultyID.set(0)
            .SpellIconID.set(1)
            .SpellLevel.set(0)
            .SpellMissileID.set(0)
            .SpellPriority.set(0)
            .SpellVisualID.set([0,0])
            .StanceBarOrder.set(0)
            .StartRecoveryCategory.set(0)
            .StartRecoveryTime.set(0)
            .TargetAuraSpell.set(0)
            .TargetAuraState.set(0)
            .TargetCreatureType.set(0)
            .Targets.set(0)
            .Totem.set([0,0])
        return this;
    }

    codify(settings: {mod?: string, id?: string, name?: loc_constructor} & CodegenSettings): string
    {
        return GenerateCode(settings,`std.Spells.create('${settings.mod || 'mod'}','${settings.id || 'id'}')`,(code)=>{
            // Warnings
            if(this.Difficulty.get())
            {
                code.line(`// Warning: Ignoring field 'Difficulty'`)
            }

            code.line(`// =================================================`)
            code.line(`// `)
            code.line(`// - Basic Properties -`)
            code.line(`// `)
            code.line(`// =================================================`)

            // Strings
            code.loc('Name',settings.name || this.Name)
            code.loc('Description', this.Description)
            code.loc('AuraDescription', this.AuraDescription)
            code.loc('Subtext', this.Subtext)
            code.line(`.Icon.setFullPath("${this.Icon.getPath().split('\\').join('\\\\')}")`)
            if(this.ActiveIcon.get())
            {
                code.line(`.ActiveIcon.setFullPath("${this.ActiveIcon.getPath().split('\\').join('\\\\')}")`)
            }
            if(this.DescriptionVariable.get())
            {
                code.line(`.DescriptionVariable.setSimple("${this.DescriptionVariable.getRef().get().split('\r').join('\\r').split('\n').join('\\n')}")`)
            }

            // Enums
            code.non_zero_enum('PowerDisplay',this.PowerDisplay)
            code.non_zero_enum('PreventionType',this.PreventionType)
            code.non_zero_enum('DispelType',this.DispelType)
            code.non_zero_enum('CasterAuraState.Include',this.CasterAuraState.Include)
            code.non_zero_enum('CasterAuraState.Exclude',this.CasterAuraState.Exclude)

            code.non_zero_enum('TargetAuraState.Include',this.TargetAuraState.Include)
            code.non_zero_enum('TargetAuraState.Exclude',this.TargetAuraState.Exclude)

            // Masks
            code.non_zero_bitmask('FacingCasterFlags',this.FacingCasterFlags);
            code.non_zero_bitmask('CreatureTargets',this.CreatureTargets)
            code.non_zero_bitmask('CustomAttributes',this.CustomAttributes)
            code.bitmask('Attributes',this.Attributes);
            code.non_zero_bitmask('InterruptFlags',this.InterruptFlags)
            code.non_zero_bitmask('SchoolMask',this.SchoolMask)
            code.non_zero_bitmask('TargetType',this.TargetType)

            // Other numbers
            code.non_def_num('DefenseType',this.DefenseType)
            code.non_def_num('MaxTargetLevel',this.MaxTargetLevel)
            code.non_def_num('MaxTargets',this.MaxTargets)
            code.non_def_num('Mechanic',this.Mechanic)
            code.non_def_num('ModalNextSpell',this.ModalNextSpell);
            code.non_def_num('Priority',this.Priority)
            code.non_def_num('RequiredArea',this.RequiredArea);
            code.non_def_num('RequiredAuraVision',this.RequiredAuraVision);
            code.non_def_num('ShapeshiftMask.Include',this.ShapeshiftMask.Include)
            code.non_def_num('ShapeshiftMask.Exclude',this.ShapeshiftMask.Exclude)
            code.non_def_num('Speed',this.Speed)
            code.non_def_num('Stacks',this.Stacks)
            code.non_def_num('StanceBarOrder',this.StanceBarOrder)
            code.non_def_num('TargetAuraSpell.Include',this.TargetAuraSpell.Include)
            code.non_def_num('TargetAuraSpell.Exclude',this.TargetAuraSpell.Exclude)
            code.non_def_num('TargetAuraState.Include',this.TargetAuraState.Include)
            code.non_def_num('TargetAuraState.Exclude',this.TargetAuraState.Exclude)
            code.non_def_num('RequiredSpellFocus',this.RequiredSpellFocus);
            code.non_def_num('Category',this.Category);

            if(this.Proc.exists())
            {
                code.begin_block('.Proc.mod(x=>x')
                code.non_zero_bitmask('AttributesMask',this.Proc.AttributesMask)
                code.non_def_num('Chance',this.Proc.Chance)
                code.non_def_num('Charges',this.Proc.Charges)
                code.non_def_num('ProcsPerMinute',this.Proc.ProcsPerMinute)

                code.non_def_num('SpellFamily',this.Proc.SpellFamily)
                code.non_def_num('Classmask.A',this.Proc.ClassMask.A)
                code.non_def_num('Classmask.B',this.Proc.ClassMask.A)
                code.non_def_num('Classmask.C',this.Proc.ClassMask.A)

                code.non_zero_bitmask('DisableEffectsMask',this.Proc.DisableEffectsMask)
                code.non_zero_bitmask('HitMask',this.Proc.HitMask)
                code.non_zero_bitmask('PhaseMask',this.Proc.PhaseMask)
                code.non_zero_bitmask('SchoolMask',this.Proc.SchoolMask)
                code.non_zero_bitmask('TriggerMask',this.Proc.TriggerMask)
                code.non_zero_bitmask('TypeMask',this.Proc.TypeMask)
                code.end_block(')')
            }

            // Bigger numbers
            if(this.Faction.Faction.get())
            {
                code.line(`.Faction.set(${this.Faction.Faction.get()},${this.Faction.MinReputation.get()})`)
            }

            code.line(`.Family.set(${this.Family.get()})`)
            code.line(`.ClassMask.set(${this.ClassMask.A.get()},${this.ClassMask.B.get()},${this.ClassMask.C.get()})`)

            if(this.ItemEquips.Class.get())
            {
                code.line(`.ItemEquips.set(${this.ItemEquips.Class.get()},${this.ItemEquips.Subclass.get()},${this.ItemEquips.InvTypes.get()})`)
            }

            code.line(`.Levels.set(${this.Levels.Spell.get()},${this.Levels.Base.get()},${this.Levels.Max.get()})`)

            if(this.Threat.APPercentMod.get() || this.Threat.FlatMod.get() || this.Threat.PercentMod.get())
            {
                code.line(`.Threat.set(${this.Threat.FlatMod.get()},${this.Threat.PercentMod.get()},${this.Threat.APPercentMod.get()})`)
            }

            // arrays
            this.Reagents.forEach((reagent)=>{
                code.line(`.Reagents.add(${reagent.Reagent.get()},${reagent.ReagentCount.get()})`)
            })

            this.RequiredTotems.forEach((x,i)=>{
                if(i)
                {
                    code.line(`.RequiredTotems.add(${i})`)
                }
            })

            this.Totems.forEach((x,i)=>{
                if(x)
                {
                    code.line(`.Totems.add(${x})`)
                }
            })

            // substructs
            if(this.Duration.get())
            {
                code.begin_block(`.Duration.modRefCopy(x=>x`)
                code.raw_objectify_non_zero(this.Duration.getRef())
                code.end_block(')');
            }

            if(this.CastTime.get())
            {
                code.begin_block('.CastTime.modRefCopy(x=>x')
                code.raw_objectify_non_zero(this.CastTime.getRef());
                code.end_block(')')
            }

            code.begin_block(`.Cooldown.mod(x=>x`)
            code.raw_objectify_non_zero(this.Cooldown)
            code.end_block(')')

            if(this.Missile.get())
            {
                code.begin_block(`.Missile.modRefCopy(x=>x`)
                code.substruct(this.Missile.getRef(),settings)
                code.end_block(')')
            }

            code.begin_block('.Power.mod(x=>x')
            code.line(`.Type.${this.Power.Type.objectify()}.set()`)
            code.non_def_num('CostBase',this.Power.CostBase);
            code.non_def_num('CostPerLevel',this.Power.CostPerLevel);
            code.non_def_num('CostPercent',this.Power.CostPercent);
            code.non_def_num('CostPerSecond',this.Power.CostPerSecond);
            code.non_def_num('CostPerSecondPerLevel',this.Power.CostPerSecondPerLevel);
            if(this.Power.RuneCost.get())
            {
                code.begin_block(`.RuneCost.modRefCopy(x=>x`)
                code.substruct(this.Power.RuneCost.getRef(),settings);
                code.end_block(')')
            }
            code.end_block(')')

            if(this.Range.get())
            {
                code.begin_block(`.Range.modRefCopy(x=>x`)
                code.substruct(this.Range.getRef(),settings);
                code.end_block(`)`)
            }

            // effects
            code.line(`// =================================================`)
            code.line(`// `)
            code.line(`// - Effects -`)
            code.line(`// `)
            code.line(`// =================================================`)
            this.Effects.forEach((eff)=>{
                if(!eff.Type.get())
                {
                    return;
                }
                code.begin_block(`.Effects.addMod(x=>x`)

                // early due to bug: some subtypes don't have classmasks that should have it
                if(eff.ClassMask.A.get() || eff.ClassMask.B.get() || eff.ClassMask.C.get())
                {
                    code.line(`.ClassMask.set(${eff.ClassMask.A.get()},${eff.ClassMask.B.get()},${eff.ClassMask.C.get()})`)
                }
                code.line(`.Type.${eff.Type.objectify()}.set()`)
                if(eff.Aura.get())
                {
                    code.line(`.Aura.${eff.Aura.objectify()}.set()`)
                }
                let obj = eff.objectify();
                for(let key in obj)
                {
                    if(key == 'Type' || key == 'Aura' || key == 'ClassMask')
                    {
                        continue;
                    }

                    else if(typeof(obj[key]) == 'object')
                    {
                        code.line(`.${key}.set(${obj[key].effective})`)
                    }
                    else if(typeof(obj[key]) == 'string')
                    {
                        if(key.includes('Percent') || key.includes('Pct'))
                        {
                            code.line(`.${key}.set(${parseInt(obj[key].replace('%',''))})`)
                        }
                        else
                        {
                            code.line(`.${key}.${obj[key]}.set()`)
                        }
                    }
                    else
                    {
                        code.line(`.${key}.set(${obj[key]})`)
                    }
                }

                code.end_block(')')
            })

            // visual
            if(this.Visual.get())
            {
                code.line(`// =================================================`)
                code.line(`// `)
                code.line(`// - Visuals -`)
                code.line(`// `)
                code.line(`// =================================================`)
                code.begin_block(`.Visual.modRefCopy(x=>x`)
                code.substruct(this.Visual.getRef(),settings);
                code.end_block(`)`)
            }
        })
    }
}