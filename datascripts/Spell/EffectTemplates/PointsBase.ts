import { makeEnumCell } from "wotlkdata/wotlkdata/cell/cells/EnumCell";
import { SpellPowerType } from "../SpellPowerType";
import { TargetBase } from "./TargetBase";


export class PointsRoot extends TargetBase {
    get BonusMultiplier() { return this.wrap(this.owner.BonusMultiplier); }
    get MultipleValue() { return this.wrap(this.owner.MultipleValue); }
    get ChainTargets() { return this.wrap(this.owner.ChainTarget); }
    get ChainAmplitude() { return this.wrap(this.owner.ChainAmplitude); }
}

export class ChanceBase extends PointsRoot {
    get BaseChance() { return this.wrap(this.owner.BasePoints); }
    get RandomChance() { return this.wrap(this.owner.DieSides); }
    get ChancePerLevel() {return this.wrap(this.owner.PointsPerLevel); }
    get ChancePerCombo() { return this.wrap(this.owner.PointsPerCombo); }
}

export class PercentBase extends PointsRoot {
    get BasePercent() { return this.wrap(this.owner.BasePoints); }
    get RandomPercent() { return this.wrap(this.owner.DieSides); }
    get PercentPerLevel() {return this.wrap(this.owner.PointsPerLevel); }
    get PercentPerCombo() { return this.wrap(this.owner.PointsPerCombo); }
}

export class PointsBase extends PointsRoot {
    get BasePoints() { return this.wrap(this.owner.BasePoints); }
    get RandomPoints() { return this.wrap(this.owner.DieSides); }
    get PointsPerLevel() {return this.wrap(this.owner.PointsPerLevel); }
    get PointsPerCombo() { return this.wrap(this.owner.PointsPerCombo); }
}

export class CountBase extends PointsRoot {
    get BaseCount() { return this.wrap(this.owner.BasePoints); }
    get RandomCount() { return this.wrap(this.owner.DieSides); }
    get CountPerLevel() {return this.wrap(this.owner.PointsPerLevel); }
    get CountPerCombo() { return this.wrap(this.owner.PointsPerCombo); }
}

export class DamageBase extends PointsRoot {
    get BaseDamage() { return this.wrap(this.owner.BasePoints); }
    get RandomDamage() { return this.wrap(this.owner.DieSides); }
    get DamagePerLevel() {return this.wrap(this.owner.PointsPerLevel); }
    get DamagePerCombo() { return this.wrap(this.owner.PointsPerCombo); }
}

export class DamageBasePct extends PointsRoot {
    get BaseDamagePct() { return this.wrap(this.owner.BasePoints); }
    get RandomDamagePct() { return this.wrap(this.owner.DieSides); }
    get DamagePctPerLevel() {return this.wrap(this.owner.PointsPerLevel); }
    get DamagePctPerCombo() { return this.wrap(this.owner.PointsPerCombo); }
}

export class HealBase extends PointsRoot {
    get BaseHeal() { return this.wrap(this.owner.BasePoints); }
    get RandomHeal() { return this.wrap(this.owner.DieSides); }
    get HealPerLevel() {return this.wrap(this.owner.PointsPerLevel); }
    get HealPerCombo() { return this.wrap(this.owner.PointsPerCombo); }
}

export class HealBasePct extends PointsRoot {
    get BaseHealPct() { return this.wrap(this.owner.BasePoints); }
    get RandomHealPct() { return this.wrap(this.owner.DieSides); }
    get HealPctPerLevel() {return this.wrap(this.owner.PointsPerLevel); }
    get HealPctPerCombo() { return this.wrap(this.owner.PointsPerCombo); }
}

export class PowerBase extends PointsRoot {
    get PowerType() {
        return makeEnumCell(SpellPowerType,this, this.owner.MiscValueA);
    }
    get BasePower() { return this.wrap(this.owner.BasePoints); }
    get RandomPower() { return this.wrap(this.owner.DieSides); }
    get PowerPerLevel() {return this.wrap(this.owner.PointsPerLevel); }
    get PowerPerCombo() { return this.wrap(this.owner.PointsPerCombo); }
}

export class ManaBase extends PointsRoot {
    get BaseMana() { return this.wrap(this.owner.BasePoints); }
    get RandomMana() { return this.wrap(this.owner.DieSides); }
    get ManaPerLevel() {return this.wrap(this.owner.PointsPerLevel); }
    get ManaPerCombo() { return this.wrap(this.owner.PointsPerCombo); }
}

export class PowerBasePct extends PointsRoot {
    get PowerType() {
        return makeEnumCell(SpellPowerType,this, this.owner.MiscValueA);
    }
    get BasePowerPct() { return this.wrap(this.owner.BasePoints); }
    get RandomPowerPct() { return this.wrap(this.owner.DieSides); }
    get PowerPerLevelPct() {return this.wrap(this.owner.PointsPerLevel); }
    get PowerPerComboPct() { return this.wrap(this.owner.PointsPerCombo); }
}