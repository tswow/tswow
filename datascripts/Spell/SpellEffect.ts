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
import { CPrim } from "wotlkdata/cell/Cell";
import { CellArray } from "wotlkdata/cell/CellArray";
import { ArrayEntry, SystemArray } from "wotlkdata/cell/systems/SystemArray";
import { AuraType } from "./AuraType";
import { Spell } from "./Spell";
import { EffectClassSet } from "./SpellClassSet";
import { SpellEffectMechanicEnum } from "./SpellEffectMechanics";
import { SpellEffectType } from "./SpellEffectType";
import { SpellImplicitTarget } from "./SpellImplicitTarget";
import { std } from "../tswow-stdlib-data";
import { Spells } from "./Spells";
import { SharedRefs } from "../Refs/SharedRefs";

export class SpellEffects extends SystemArray<SpellEffect,Spell> {
    constructor(owner: Spell) {
        super(owner);
    }

    get length() {
        return 3;
    }

    swap(index1: number, index2: number) {
        let e1 = this.get(index1);
        let e2 = this.get(index2);
    
        let r1 = e1.Radius.Radius.get();
        let rmax1 = e1.Radius.RadiusMax.get();
        let rlev = e1.Radius.RadiusPerLevel.get();
        let i1 = e1.ItemType.get();
        let a1 = e1.AuraType.get();
        let t1 = e1.EffectType.get();
        let m1 = e1.Mechanic.get();
        let bp1 = e1.BasePoints.get();
        let ds1 = e1.DieSides.get();
        let ppl1 = e1.PointsPerLevel.get();
        let ppc1 = e1.PointsPerCombo.get();
        let ita1 = e1.ImplicitTargetA.get();
        let itb1 = e1.ImplicitTargetB.get();
        let ap1 = e1.AuraPeriod.get();
        let mva1 = e1.MiscValueA.get();
        let mvb1 = e1.MiscValueB.get();
        let ts1 = e1.TriggerSpell.get();
        let ca1 = e1.ChainAmplitude.get();
        let cma1 = e1.ClassMask.A.get();
        let cmb1 = e1.ClassMask.B.get();
        let cmc1 = e1.ClassMask.C.get();
        e1.copyFrom(e2);
        e2.Radius.set(r1,rmax1,rlev);
        e2.ItemType.set(i1);
        e2.AuraType.set(a1);
        e2.EffectType.set(t1);
        e2.Mechanic.set(m1);
        e2.BasePoints.set(bp1);
        e2.DieSides.set(ds1);
        e2.PointsPerLevel.set(ppl1);
        e2.PointsPerCombo.set(ppc1);
        e2.ImplicitTargetA.set(ita1);
        e2.ImplicitTargetB.set(itb1);
        e2.AuraPeriod.set(ap1);
        e2.MiscValueA.set(mva1);
        e2.MiscValueB.set(mvb1);
        e2.TriggerSpell.set(ts1);
        e2.ChainAmplitude.set(ca1)
        e2.ClassMask.A.set(cma1);
        e2.ClassMask.B.set(cmb1);
        e2.ClassMask.C.set(cmc1);
    }

    filterAura(type: number) {
        return [this.get(0),this.get(1),this.get(2)].filter(x=>x.AuraType.get()===type);
    }

    filterType(type: number) {
        return [this.get(0),this.get(1),this.get(2)].filter(x=>x.EffectType.get()===type);
    }

    get(index: number) {
        return new SpellEffect(this.owner, index);
    }

    add() {
        return this.getFree();
    }

    addLearnSpells(...spells: number[]) {
        for(const spell of spells) {
            this.addFreeEffect()
                .EffectType.setLearnSpell()
                .LearntSpell.set(spell)
        }
        return this.owner;
    }

    addFreeEffect() {
        const SPELL_CHAIN_TOKEN = '__tswow_spell_chain';
        function getNextSpell(spell: Spell) {
            for(let i=0;i<3;++i) {
                if(spell.Effects.get(i).EffectType.get()!==64) {
                    continue;
                }
                let nex = Spells.load(spell.Effects.get(i).TriggerSpell.get());
                if(nex.Icon.get()===SPELL_CHAIN_TOKEN) {
                    return nex;
                }
            }
            return undefined;
        }

        function getOrCreateNextSpell(spell: Spell) {
            let nex = getNextSpell(spell);
            if(nex!==undefined) {
                return nex;
            }
            nex = std.Spells.createAuto()
                .Icon.setFullPath(SPELL_CHAIN_TOKEN)
            spell.Effects.add()
                .EffectType.setTriggerSpell()
                .TriggerSpell.set(nex.ID);
            return nex;
        }

        let curSpell = getOrCreateNextSpell(this.owner);
        while(true) {
            let free = getNextSpell(curSpell)!==undefined;
            for(let i=0;i<3;++i ){
                if(curSpell.Effects.get(i).EffectType.get()===0) {
                    if(!free) {
                        free = true;
                    } else {
                        return curSpell.Effects.get(i);
                    }
                }
            }
            curSpell = getOrCreateNextSpell(curSpell);
        }
    }
}

export class SpellEffect extends ArrayEntry<Spell> {
    static owner(effect: SpellEffect) {
        return effect.owner;
    }

    isClear(): boolean {
        return this.EffectType.get() === 0;
    }

    clear(): Spell {
        this.BasePoints.set(0);
        this.ChainAmplitude.set(0);
        this.ChainTarget.set(0);
        this.DieSides.set(0);
        this.ImplicitTargetA.set(0);
        this.ImplicitTargetB.set(0);
        this.Mechanic.set(0);
        this.MiscValueA.set(0);
        this.MiscValueB.set(0);
        this.MultipleValue.set(0);
        this.PointsPerCombo.set(0);
        this.PointsPerLevel.set(0);
        this.TriggerSpell.set(0);
        this.AuraPeriod.set(0);
        this.AuraType.set(0);
        this.EffectType.set(0);
        this.Mechanic.set(0);
        return this.owner;
    }

    private w<T extends CPrim>(arr: CellArray<T,any>) {
        return this.wrapIndex(arr, this.index);
    }

    get row() { return this.owner.row; }

    get Radius() { return SharedRefs.getOrCreateSpellRadius(this, this); }
    get ItemType() { return this.w(this.row.EffectItemType); }
    get AuraType() { return new AuraType(this, this.index); }
    get EffectType() { return new SpellEffectType(this, this.index); }
    get Mechanic() { return new SpellEffectMechanicEnum(this, this.w(this.row.EffectMechanic)); }
    get BasePoints() { return this.w(this.row.EffectBasePoints)};
    get DieSides() { return this.w(this.row.EffectDieSides); }
    get PointsPerLevel() { return this.w(this.row.EffectRealPointsPerLevel); }
    get PointsPerCombo() { return this.w(this.row.EffectPointsPerCombo); }
    get ImplicitTargetA() { return new SpellImplicitTarget(this, this.row.ImplicitTargetA, this.index); }
    get ImplicitTargetB() { return new SpellImplicitTarget(this, this.row.ImplicitTargetB, this.index); }
    get AuraPeriod() { return this.w(this.row.EffectAuraPeriod); }
    get MultipleValue() { return this.w(this.row.EffectMultipleValue); }
    get ChainTarget() { return this.w(this.row.EffectChainTargets); }
    get MiscValueA() { return this.w(this.row.EffectMiscValue); }
    get MiscValueB() { return this.w(this.row.EffectMiscValueB); }
    get TriggerSpell() { return this.w(this.row.EffectTriggerSpell); }
    get ChainAmplitude() { return this.w(this.row.EffectChainAmplitude); }
    get BonusMultiplier() { return this.w(this.row.EffectBonusMultiplier); }
    get ClassMask() { return new EffectClassSet(this, this); }

    setPoints(base: number, dieSides: number, pointsPerLevel: number, pointsPerCombo: number) {
        this.BasePoints.set(base);
        this.DieSides.set(dieSides);
        this.PointsPerLevel.set(pointsPerLevel);
        this.PointsPerCombo.set(pointsPerCombo);
        return this.owner;
    }

    copyFrom(source: SpellEffect) {
        this.Radius.copyFrom(source.Radius);
        this.ItemType.set(source.ItemType.get());
        this.AuraType.set(source.AuraType.get());
        this.EffectType.set(source.EffectType.get());
        this.Mechanic.set(source.Mechanic.get());
        this.BasePoints.set(source.BasePoints.get());
        this.DieSides.set(source.DieSides.get());
        this.PointsPerLevel.set(source.PointsPerLevel.get());
        this.PointsPerCombo.set(source.PointsPerCombo.get());
        this.ImplicitTargetA.set(source.ImplicitTargetA.get());
        this.ImplicitTargetB.set(source.ImplicitTargetB.get());
        this.AuraPeriod.set(source.AuraPeriod.get());
        this.MultipleValue.set(source.MultipleValue.get());
        this.ChainTarget.set(source.ChainTarget.get());
        this.MiscValueA.set(source.MiscValueA.get());
        this.MiscValueB.set(source.MiscValueB.get());
        this.TriggerSpell.set(source.TriggerSpell.get());
        this.ChainAmplitude.set(source.ChainAmplitude.get());
        this.ClassMask.copyFrom(source.ClassMask);
        return this.owner;
    }
}
