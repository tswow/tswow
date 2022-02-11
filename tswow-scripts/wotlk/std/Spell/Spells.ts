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
import { DBC } from "../../DBCFiles";
import { SpellQuery, SpellRow } from "../../dbc/Spell";
import { Table } from "../../../data/table/Table";
import { Ids, StaticIDGenerator } from "../Misc/Ids";
import { RegistryStatic } from "../Refs/Registry";
import { Spell } from "./Spell";

export class SpellRegistryClass extends RegistryStatic<Spell,SpellRow,SpellQuery> {
    create(mod: string, id: string, parent = 0, cloneServerData = true) {
        let v = super.create(mod,id,parent);

        // it's on by default, so be nice
        if(parent > this.nullID() && cloneServerData) {
            let parentEntity = this.load(parent);
            if(parentEntity.BonusData.exists()) {
                parentEntity.BonusData.getSQL().clone(v.ID)
            }

            if(parentEntity.Threat.exists()) {
                parentEntity.Threat.getSQL().clone(v.ID);
            }

            if(parentEntity.CustomAttributes.exists()) {
                parentEntity.CustomAttributes.sqlRow().clone(v.ID)
            }
            // note: we're never cloning spell_script_names, spell_scripts or spell_target_position
        }
        return v;
    }

    protected Table(): Table<any, SpellQuery, SpellRow> & { add: (id: number) => SpellRow; } {
        return DBC.Spell;
    }
    protected IDs(): StaticIDGenerator {
        return Ids.Spell
    }
    protected Entity(r: SpellRow): Spell {
        return new Spell(r);
    }
    protected FindByID(id: number): SpellRow {
        return DBC.Spell.findById(id);
    }
    protected EmptyQuery(): SpellQuery {
        return {}
    }
    ID(e: Spell): number {
        return e.ID;
    }
    Clear(r: Spell) {
        r.row
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
    }
}
export const SpellRegistry = new SpellRegistryClass();