import { TargetBase } from "./TargetBase";
import { SpellPowerType } from "../SpellPowerType";


export class PointsRoot<T> extends TargetBase<T> {
    get BonusMultiplier() { return this.wrap(this.effect.BonusMultiplier); }
    get MultipleValue() { return this.wrap(this.effect.MultipleValue); }
    get ChainTargets() { return this.wrap(this.effect.ChainTarget); }
    get ChainAmplitude() { return this.wrap(this.effect.ChainAmplitude); }
}

export class ChanceBase<T> extends PointsRoot<T> {
    get BaseChance() { return this.wrap(this.effect.BasePoints); }
    get RandomChance() { return this.wrap(this.effect.DieSides); }
    get ChancePerLevel() {return this.wrap(this.effect.PointsPerLevel); }
    get ChancePerCombo() { return this.wrap(this.effect.PointsPerCombo); }
}

export class PercentBase<T> extends PointsRoot<T> {
    get BasePercent() { return this.wrap(this.effect.BasePoints); }
    get RandomPercent() { return this.wrap(this.effect.DieSides); }
    get PercentPerLevel() {return this.wrap(this.effect.PointsPerLevel); }
    get PercentPerCombo() { return this.wrap(this.effect.PointsPerCombo); }
}

export class PointsBase<T> extends PointsRoot<T> {
    get BasePoints() { return this.wrap(this.effect.BasePoints); }
    get RandomPoints() { return this.wrap(this.effect.DieSides); }
    get PointsPerLevel() {return this.wrap(this.effect.PointsPerLevel); }
    get PointsPerCombo() { return this.wrap(this.effect.PointsPerCombo); }
}

export class CountBase<T> extends PointsRoot<T> {
    get BaseCount() { return this.wrap(this.effect.BasePoints); }
    get RandomCount() { return this.wrap(this.effect.DieSides); }
    get CountPerLevel() {return this.wrap(this.effect.PointsPerLevel); }
    get CountPerCombo() { return this.wrap(this.effect.PointsPerCombo); }
}

export class DamageBase<T> extends PointsRoot<T> {
    get BaseDamage() { return this.wrap(this.effect.BasePoints); }
    get RandomDamage() { return this.wrap(this.effect.DieSides); }
    get DamagePerLevel() {return this.wrap(this.effect.PointsPerLevel); }
    get DamagePerCombo() { return this.wrap(this.effect.PointsPerCombo); }
}

export class DamageBasePct<T> extends PointsRoot<T> {
    get BaseDamagePct() { return this.wrap(this.effect.BasePoints); }
    get RandomDamagePct() { return this.wrap(this.effect.DieSides); }
    get DamagePctPerLevel() {return this.wrap(this.effect.PointsPerLevel); }
    get DamagePctPerCombo() { return this.wrap(this.effect.PointsPerCombo); }
}

export class HealBase<T> extends PointsRoot<T> {
    get BaseHeal() { return this.wrap(this.effect.BasePoints); }
    get RandomHeal() { return this.wrap(this.effect.DieSides); }
    get HealPerLevel() {return this.wrap(this.effect.PointsPerLevel); }
    get HealPerCombo() { return this.wrap(this.effect.PointsPerCombo); }
}

export class HealBasePct<T> extends PointsRoot<T> {
    get BaseHealPct() { return this.wrap(this.effect.BasePoints); }
    get RandomHealPct() { return this.wrap(this.effect.DieSides); }
    get HealPctPerLevel() {return this.wrap(this.effect.PointsPerLevel); }
    get HealPctPerCombo() { return this.wrap(this.effect.PointsPerCombo); }
}

export class PowerBase<T> extends PointsRoot<T> {
    get PowerType() { return new SpellPowerType(this, this.effect.MiscValueA); }
    get BasePower() { return this.wrap(this.effect.BasePoints); }
    get RandomPower() { return this.wrap(this.effect.DieSides); }
    get PowerPerLevel() {return this.wrap(this.effect.PointsPerLevel); }
    get PowerPerCombo() { return this.wrap(this.effect.PointsPerCombo); }
}

export class ManaBase<T> extends PointsRoot<T> {
    get BaseMana() { return this.wrap(this.effect.BasePoints); }
    get RandomMana() { return this.wrap(this.effect.DieSides); }
    get ManaPerLevel() {return this.wrap(this.effect.PointsPerLevel); }
    get ManaPerCombo() { return this.wrap(this.effect.PointsPerCombo); }
}

export class PowerBasePct<T> extends PointsRoot<T> {
    get PowerType() { return new SpellPowerType(this, this.effect.MiscValueA); }
    get BasePowerPct() { return this.wrap(this.effect.BasePoints); }
    get RandomPowerPct() { return this.wrap(this.effect.DieSides); }
    get PowerPerLevelPct() {return this.wrap(this.effect.PointsPerLevel); }
    get PowerPerComboPct() { return this.wrap(this.effect.PointsPerCombo); }
}