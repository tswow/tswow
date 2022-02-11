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
import { SpellRow } from "../../dbc/Spell";
import { AreaGroupRegistry } from "../Area/AreaGroup";
import { getInlineID } from "../InlineScript/InlineScript";
import { MainEntity } from "../Misc/Entity";
import { IncludeExclude, IncludeExcludeMask } from "../Misc/IncludeExclude";
import { SchoolMask } from "../Misc/School";
import { SingleArraySystem } from "../Misc/SingleArraySystem";
import { SpellFocusRegistry } from "../SpellFocus/SpellFocus";
import { AuraInterruptFlags } from "./AuraInterruptFlags";
import { CastSpells } from "./CastOnCreate";
import { InterruptFlags } from "./InterruptFlags";
import { SpellAttributes } from "./SpellAttributes";
import { SpellAutoLearns } from "./SpellAutoLearn";
import { SpellBonusData } from "./SpellBonusData";
import { SpellCastTimeRegistry } from "./SpellCastTime";
import { BaseClassSet } from "./SpellClassSet";
import { SpellCustomAttr } from "./SpellCustomAttr";
import { SpellDescriptionVariableRegistry } from "./SpellDescriptionVariable";
import { SpellDifficultyRegistry } from "./SpellDifficulty";
import { SpellDurationRegistry } from "./SpellDuration";
import { SpellEffects } from "./SpellEffect";
import { SpellIconCell } from "./SpellIcon";
import { SpellItemEquips } from "./SpellItemEquips";
import { SpellLevels } from "./SpellLevels";
import { SpellMissileRegistry } from "./SpellMissile";
import { SpellPower } from "./SpellPower";
import { SpellPowerDisplay } from "./SpellPowerDisplay";
import { SpellProc } from "./SpellProc";
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

export class Spell extends MainEntity<SpellRow> {
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

    get RequiresSpellFocus() {
        return SpellFocusRegistry.ref(this,this.row.RequiresSpellFocus);
    }
    get FacingCasterFlags() {
        return new MaskCell32(this, this.row.FacingCasterFlags);
    }

    get CasterAuraState() : IncludeExclude<number, this> {
        return new IncludeExclude(this,
            this.wrap(this.row.CasterAuraState),
            this.wrap(this.row.ExcludeCasterAuraState)
    )}

    get TargetAuraState() : IncludeExclude<number, this> {
        return new IncludeExclude(this,
            this.wrap(this.row.TargetAuraState),
            this.wrap(this.row.ExcludeTargetAuraState)
    )}

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

    get Power() { return new SpellPower(this,this); }

    /**
     * Note: This field is just an alias for "Power"
     */
    @Transient
    get Mana() { return new SpellPower(this,this);}


    get ItemEquips() { return new SpellItemEquips(this, this.row); }
    get Proc() { return new SpellProc(this); }
    get Priority() { return this.wrap(this.row.SpellPriority); }
    get Cooldown() { return new SpellRecovery(this, this); }
    get MaxTargetLevel() { return this.wrap(this.row.MaxTargetLevel); }
    get MaxTargets() { return this.wrap(this.row.MaxTargets); }
    get DefenseType() { return this.wrap(this.row.DefenseType); }
    get PreventionType() { return this.wrap(this.row.PreventionType); }
    get StanceBarOrder() { return this.wrap(this.row.StanceBarOrder); }
    get CastTime() { return SpellCastTimeRegistry.ref(this,this.row.CastingTimeIndex); }
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
    get DispelType() { return this.wrap(this.row.DispelType); }
    get Mechanic() { return this.wrap(this.row.Mechanic); }
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
            , 'SpellID'
        ) as _hidden.Spells<this>
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
}