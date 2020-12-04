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
import { DBC } from "wotlkdata";
import { SpellRow } from "wotlkdata/dbc/types/Spell";
import { Ids } from "../Base/Ids";
import { MainEntity } from "../Base/MainEntity";
import { SpellAttributes } from "./SpellAttributes";
import { SpellEffects } from "./SpellEffect";
import { SpellIconCell } from "./SpellIcon";
import { SpellVisual } from "./SpellVisual";
import { SpellCreatureTarget } from "./TargetCreatureType";
import { SpellTargetType } from "./TargetType";

export class Spell extends MainEntity<SpellRow> {
    get Attributes() { return new SpellAttributes(this); }
    get Visual() { return new SpellVisual(this); }
    get Icon() { return new SpellIconCell(this, this.row.SpellIconID); }
    get ActiveIcon() { return new SpellIconCell(this, this.row.ActiveIconID); }
    get Name() { return this.wrapLoc(this.row.Name); }

    get TargetType() { return new SpellTargetType(this); }
    get CreatureTargets() { return new SpellCreatureTarget(this); }

    get Effects() { return new SpellEffects(this); }

    /**
     * Creates a separate clone of this spell
     * @param mod 
     * @param id 
     * @param keepVisualLink - Whether the new spell should keep sharing visual rows with its parent.
     */
    clone(mod: string, id: string, keepVisualLink: boolean = false) {
        const newId = Ids.Spell.id(mod, id);
        let spell = new Spell(this.row.clone(newId));
        if(!keepVisualLink) {
            spell.Visual.makeUnique();
        }
        return spell;
    }
}

export const Spells = {
    create(mod: string, id: string, parent: number = 0, keepVisualLink: boolean = false) {
        if(parent === 0) {
            return new Spell(DBC.Spell.add(Ids.Spell.id(mod, id))
                .ActiveIconID.set(0)
                .Attributes.set(0)
                .AttributesEx.set(0)
                .AttributesExB.set(0)
                .AttributesExC.set(0)
                .AttributesExD.set(0)
                .AttributesExE.set(0)
                .AttributesExF.set(0)
                .AttributesExG.set(0)
                .AuraDescription.read({enGB:"Placeholder"})
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
                .Description.read({enGB:"Placeholder"})
                .DispelType.set(0)
                .DurationIndex.set(0)
                .Effect.set([0,0,0])
                .EffectAura.set([0,0,0])
                .EffectAuraPeriod.set([0,0,0])
                .EffectBasePoints.set([0,0,0])
                .EffectChainAmplitude.set([0,0,0])
                .EffectChainTargets.set([0,0,0])
                .EffectDieSides.set([0,0,0])
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
                .Field227.set(0)
                .Field228.set(0)
                .Field229.set(0)
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
                .Name.read({enGB:"Placeholder"})
                .NameSubtext.read({enGB:"Placeholder"})
                .PowerDisplayID.set(0)
                .PowerType.set(0)
                .PreventionType.set(0)
                .ProcChance.set(0)
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
                .SchoolMask.set(0)
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
                .SpellVisualID.set([1,0])
                .StanceBarOrder.set(0)
                .StartRecoveryCategory.set(0)
                .StartRecoveryTime.set(0)
                .TargetAuraSpell.set(0)
                .TargetAuraState.set(0)
                .TargetCreatureType.set(0)
                .Targets.set(0)
                .Totem.set([0,0]))
        }
        return Spells.load(parent).clone(mod, id, keepVisualLink);
    },

    /**
     * @param mod 
     * @param id 
     * @param ranks 
     * @param parent 
     * @param keepVisualLink Whether new spells should keep sharing visual rows with its parent.
     * @param shareVisuals Whether each spell should share visual row with the first. Does nothing if keepVisualLink is true.
     * @param callback
     */
    createRanks(mod: string, id: string, ranks: number, parent: number, keepVisualLink: boolean, shareVisuals: boolean, callback? : (spell: Spell, rank: number) => void) {
        let spells : Spell[] = [];
        let cur = Spells.load(parent);

        // TODO: Set up SkillLineAbility
        for(let i=0;i<ranks;++i) {
            let rank = i+1;
            let spl = cur.clone(mod, id+"_rank"+rank, )
            // TODO: Set non-english languages
            spl.row.NameSubtext.enGB.set(`Rank ${rank}`);
            spells.push(spl);
            cur = spl;
            if((rank==1 && !keepVisualLink) || (rank>1 && !shareVisuals && !keepVisualLink)) {
                spl.Visual.makeUnique();
            }
        }

        if(callback) {
            spells.forEach((x,i)=>callback(x,i+1));
        }

        return spells;
    },

    load(id: number) {
        return new Spell(DBC.Spell.findById(id));
    },
}