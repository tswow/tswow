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
import { DBC } from "wotlkdata/dbc/DBCFiles";
import { SpellQuery } from "wotlkdata/dbc/types/Spell";
import { SQL } from "wotlkdata/sql/SQLFiles";
import { Ids } from "../Misc/Ids";
import { Spell } from "./Spell";
import { SpellRanks } from "./SpellRanks";
import { TotemCreatures } from "./TotemCreatures";
import { SpellGroup } from "./SpellGroup";

function createSpell(id: number, parent: number = 0) {
    if(parent===0) {
        return new Spell(DBC.Spell.add(id)
        .ActiveIconID.set(0)
        .Attributes.set(0)
        .AttributesEx.set(0)
        .AttributesExB.set(0)
        .AttributesExC.set(0)
        .AttributesExD.set(0)
        .AttributesExE.set(0)
        .AttributesExF.set(0)
        .AttributesExG.set(0)
        .AuraDescription.set({enGB:"Placeholder"})
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
        .Description.set({enGB:"Placeholder"})
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
        .Name.set({enGB:"Placeholder"})
        .NameSubtext.set({enGB:"Placeholder"})
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
        .SpellVisualID.set([0,0])
        .StanceBarOrder.set(0)
        .StartRecoveryCategory.set(0)
        .StartRecoveryTime.set(0)
        .TargetAuraSpell.set(0)
        .TargetAuraState.set(0)
        .TargetCreatureType.set(0)
        .Targets.set(0)
        .Totem.set([0,0]))
    } else {
        const spell = new Spell(DBC.Spell.findById(parent).clone(id))
        if(spell.Visual.getRefID()>0) {
            spell.Visual.modRefCopy(()=>{})
        }
        return spell;
    }
}

export const SpellGroups = {
    load(id: number) {
        return new SpellGroup(id);
    },

    create() {
        let id = Ids.spell_group.id();
        SQL.spell_group_stack_rules.add(id,{stack_rule: 0});
        return id;
    }
}

export const Spells = {
    /**
     * @warn Do NOT use this function if you don't know what you're doing.
     * You should almost always just use "create". The purpose of this
     * function is to allow creation of some temporary spells that do not
     * require persistent ids, such as teaching spells and effect chains.
     */
    createAuto(parent: number = 0) {
        return createSpell(Ids.SpellAuto.id(),parent);
    },

    create(mod: string, id: string, parent: number = 0) {
        return createSpell(Ids.Spell.id(mod,id),parent);
    },

    createRanks(mod: string, id: string, parent: number, ranks: number) {
        const spells : Spell[] = [];
        for(let i=0;i<ranks; ++i) {
            const spell = Spells.create(mod, id+i, parent);
            spell.row.NameSubtext.set({enGB: `Rank ${i+1}`});
            spells.push(spell);
        }

        let fst = spells[0];
        spells.forEach((x,i)=>{
            SQL.spell_ranks.add(fst.ID,i+1).spell_id.set(x.ID);
        });

        return new SpellRanks(spells);
    },

    load(id: number = 0) {
        return new Spell(DBC.Spell.findById(id))
    },

    filter(query: SpellQuery) {
        return DBC.Spell.filter(query).map(x=>new Spell(x));
    },

    find(query: SpellQuery): Spell {
        let v = DBC.Spell.find(query);
        return v ? new Spell(v) : undefined as any as Spell;
    },

    TotemCreatures: TotemCreatures
}