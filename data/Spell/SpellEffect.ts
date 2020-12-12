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
import { ArrayEntry, SystemArray } from "wotlkdata/cell/Systems/SystemArray";
import { AuraType } from "./AuraType";
import { Spell } from "./Spell";
import { EffectClassSet } from "./SpellClassSet";
import { SpellEffectMechanics } from "./SpellEffectMechanics";
import { SpellEffectType } from "./SpellEffectType";

export class SpellEffects extends SystemArray<SpellEffect,Spell> {
    constructor(owner: Spell) {
        super(owner);
    }

    get length() {
        return 3;
    }

    get(index: number) {
        return new SpellEffect(this.owner, index);
    }

    add() {
        return this.getFree();
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

    protected get row() { return this.owner.row; }

    get AuraType() { return new AuraType(this, this.index); }
    get EffectType() { return new SpellEffectType(this, this.index); }
    get Mechanic() { return new SpellEffectMechanics(this, this.index); }
    get BasePoints() { return this.w(this.row.EffectBasePoints)};
    get DieSides() { return this.w(this.row.EffectDieSides); }
    get PointsPerLevel() { return this.w(this.row.EffectRealPointsPerLevel); }
    get PointsPerCombo() { return this.w(this.row.EffectPointsPerCombo); }
    get ImplicitTargetA() { return this.w(this.row.ImplicitTargetA); }
    get ImplicitTargetB() { return this.w(this.row.ImplicitTargetB); }
    get AuraPeriod() { return this.w(this.row.EffectAuraPeriod); }
    get MultipleValue() { return this.w(this.row.EffectMultipleValue); }
    get ChainTarget() { return this.w(this.row.EffectChainTargets); }
    get MiscValueA() { return this.w(this.row.EffectMiscValue); }
    get MiscValueB() { return this.w(this.row.EffectMiscValueB); }
    get TriggerSpell() { return this.w(this.row.EffectTriggerSpell); }
    get ChainAmplitude() { return this.w(this.row.EffectChainAmplitude); }

    get ClassMask() { return new EffectClassSet(this); }

    setPoints(base: number, dieSides: number, pointsPerLevel: number, pointsPerCombo: number) {
        this.BasePoints.set(base);
        this.DieSides.set(dieSides);
        this.PointsPerLevel.set(pointsPerLevel);
        this.PointsPerCombo.set(pointsPerCombo);
        return this.owner;
    }

    copyFrom(source: SpellEffect) {
        this.AuraType.set(source.AuraType.get());
        this.EffectType.set(source.EffectType.get());
        this.Mechanic.set(source.EffectType.get());
        this.BasePoints.set(source.BasePoints.get());
        this.DieSides.set(source.DieSides.get());
        this.PointsPerLevel.set(source.PointsPerLevel.get());
        this.PointsPerCombo.set(source.PointsPerCombo.get());
        this.ImplicitTargetA.set(source.ImplicitTargetA.get());
        this.ImplicitTargetB.set(source.ImplicitTargetB.get());
        this.AuraPeriod.set(source.AuraPeriod.get());
        this.MultipleValue.set(source.MultipleValue.get());
        this.ChainTarget.set(source.ChainTarget.get());
        this.MiscValueA.set(source.MiscValueB.get());
        this.TriggerSpell.set(source.TriggerSpell.get());
        this.ChainAmplitude.set(source.ChainAmplitude.get());
        this.ClassMask.copyFrom(source.ClassMask);
        return this.owner;
    }
}
