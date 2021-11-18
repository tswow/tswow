import { makeEnumCell } from "wotlkdata/wotlkdata/cell/cells/EnumCell";
import { ShiftedNumberCell } from "../../Misc/ShiftedNumberCell";
import { PercentCell } from "../../Misc/PercentCell";
import { SpellPowerType } from "../SpellPowerType";
import { TargetBase } from "./TargetBase";


export class PointsRoot extends TargetBase {
    get BonusMultiplier() { return this.wrap(this.owner.BonusMultiplier); }
    get MultipleValue() { return this.wrap(this.owner.MultipleValue); }
    get ChainTargets() { return this.wrap(this.owner.ChainTarget); }
    get ChainAmplitude() { return this.wrap(this.owner.ChainAmplitude); }
}

export class ChanceBase extends PointsRoot {
    get BaseChance() {
        return new PercentCell(
              this,()=>this.owner.DieSides.get() > 0
                    ? '[0-99]'
                    : '[0-100]'
            , true
            , this.owner.BasePoints.AsCell()
        );
    }
    get RandomChance() {
        return new PercentCell(
              this
            , '[0-100]'
            , true
            , this.wrap(this.owner.DieSides)
        );
    }
    get ChancePerLevel() {
        return new PercentCell(
              this
            , '[0-100]'
            , true
            , this.wrap(this.owner.PointsPerLevel)
        )
    }
    get ChancePerCombo() {
        return new PercentCell(
              this
            , '[0-100]'
            , true
            , this.wrap(this.owner.PointsPerLevel)
        )
    }
}

export class PercentBase extends PointsRoot {
    get BasePercent() {
        return new PercentCell(
              this
            , ()=>this.owner.DieSides.get() > 0 ? '[0-99]' : '[0-100]'
            , true
            , this.owner.BasePoints.AsCell()
        )
    }
    get RandomPercent() {
        return new PercentCell(
            this
          , '[0-100]'
          , true
          , this.owner.DieSides
        )
    }
    get PercentPerLevel() {
        return new PercentCell(
            this
          , '[0-100]'
          , true
          , this.owner.PointsPerLevel
        )
    }
    get PercentPerCombo() {
        return new PercentCell(
            this
          , '[0-100]'
          , true
          , this.owner.PointsPerCombo
        )
    }
}

export class PointsBase extends PointsRoot {
    get BasePoints() {
        return new ShiftedNumberCell(
            this
          , ()=>this.owner.DieSides.get() > 0
                ? 'STORED_AS_MINUS_ONE'
                : 'NO_CHANGE'
          , this.owner.BasePoints.AsCell()
        )
    }
    get RandomPoints() {
        return this.wrap(this.owner.DieSides);
    }
    get PointsPerLevel() {
        return this.wrap(this.owner.PointsPerLevel);
    }
    get PointsPerCombo() {
        return this.wrap(this.owner.PointsPerCombo);
    }
}

export class CountBase extends PointsRoot {
    get BaseCount() {
        return new ShiftedNumberCell(
            this
          , ()=>this.owner.DieSides.get() > 0
                ? 'STORED_AS_MINUS_ONE'
                : 'NO_CHANGE'
          , this.owner.BasePoints.AsCell()
        )
    }
    get RandomCount() { return this.wrap(this.owner.DieSides); }
    get CountPerLevel() {return this.wrap(this.owner.PointsPerLevel); }
    get CountPerCombo() { return this.wrap(this.owner.PointsPerCombo); }
}

export class DamageBase extends PointsRoot {
    get BaseDamage() {
        return new ShiftedNumberCell(
            this
          , ()=>this.owner.DieSides.get() > 0
                ? 'STORED_AS_MINUS_ONE'
                : 'NO_CHANGE'
          , this.owner.BasePoints.AsCell()
        )
    }
    get RandomDamage() { return this.wrap(this.owner.DieSides); }
    get DamagePerLevel() {return this.wrap(this.owner.PointsPerLevel); }
    get DamagePerCombo() { return this.wrap(this.owner.PointsPerCombo); }
}

export class DamageBasePct extends PointsRoot {
    get BaseDamagePct() {
        return new PercentCell(
            this,()=>this.owner.DieSides.get() > 0
                  ? '[0-99]'
                  : '[0-100]'
          , true
          , this.owner.BasePoints.AsCell()
        );
    }
    get RandomDamagePct() {
        return new PercentCell(
            this
          , '[0-100]'
          , true
          , this.wrap(this.owner.DieSides)
        );
    }
    get DamagePctPerLevel() {
        return new PercentCell(
            this
          , '[0-100]'
          , true
          , this.wrap(this.owner.PointsPerLevel)
        );
    }
    get DamagePctPerCombo() {
        return new PercentCell(
            this
          , '[0-100]'
          , true
          , this.wrap(this.owner.PointsPerCombo)
        );
    }
}

export class HealBase extends PointsRoot {
    get BaseHeal() {
        return new ShiftedNumberCell(
            this
          , ()=>this.owner.DieSides.get() > 0
                ? 'STORED_AS_MINUS_ONE'
                : 'NO_CHANGE'
          , this.owner.BasePoints.AsCell()
        )
    }
    get RandomHeal() { return this.wrap(this.owner.DieSides); }
    get HealPerLevel() {return this.wrap(this.owner.PointsPerLevel); }
    get HealPerCombo() { return this.wrap(this.owner.PointsPerCombo); }
}

export class HealBasePct extends PointsRoot {
    get BaseHealPct() {
        return new PercentCell(
            this,()=>this.owner.DieSides.get() > 0
                  ? '[0-99]'
                  : '[0-100]'
          , true
          , this.owner.BasePoints.AsCell()
        );
    }
    get RandomHealPct() {
        return new PercentCell(
            this
          , '[0-100]'
          , true
          , this.wrap(this.owner.DieSides)
        );
    }
    get HealPctPerLevel() {
        return new PercentCell(
            this
          , '[0-100]'
          , true
          , this.wrap(this.owner.PointsPerLevel)
        );
    }
    get HealPctPerCombo() {
        return new PercentCell(
            this
          , '[0-100]'
          , true
          , this.wrap(this.owner.PointsPerCombo)
        );
    }
}

export class PowerBase extends PointsRoot {
    get PowerType() {
        return makeEnumCell(SpellPowerType,this, this.owner.MiscValueA);
    }
    get BasePower() {
        return new ShiftedNumberCell(
            this
          , ()=>this.owner.DieSides.get() > 0
                ? 'STORED_AS_MINUS_ONE'
                : 'NO_CHANGE'
          , this.owner.BasePoints.AsCell()
        )
    }
    get RandomPower() { return this.wrap(this.owner.DieSides); }
    get PowerPerLevel() {return this.wrap(this.owner.PointsPerLevel); }
    get PowerPerCombo() { return this.wrap(this.owner.PointsPerCombo); }
}

export class ManaBase extends PointsRoot {
    get BaseMana() {
        return new ShiftedNumberCell(
            this
          , ()=>this.owner.DieSides.get() > 0
                ? 'STORED_AS_MINUS_ONE'
                : 'NO_CHANGE'
          , this.owner.BasePoints.AsCell()
        )
    }
    get RandomMana() { return this.wrap(this.owner.DieSides); }
    get ManaPerLevel() {return this.wrap(this.owner.PointsPerLevel); }
    get ManaPerCombo() { return this.wrap(this.owner.PointsPerCombo); }
}

export class PowerBasePct extends PointsRoot {
    get PowerType() {
        return makeEnumCell(SpellPowerType,this, this.owner.MiscValueA);
    }
    get BasePowerPct() {
        return new PercentCell(
            this,()=>this.owner.DieSides.get() > 0
                  ? '[0-99]'
                  : '[0-100]'
          , true
          , this.owner.BasePoints.AsCell()
        );
    }
    get RandomPowerPct() {
        return new PercentCell(
            this
          , '[0-100]'
          , true
          , this.wrap(this.owner.DieSides)
        );
    }
    get PowerPerLevelPct() {
        return new PercentCell(
            this
          , '[0-100]'
          , true
          , this.wrap(this.owner.PointsPerLevel)
        );
    }
    get PowerPerComboPct() {
        return new PercentCell(
            this
          , '[0-100]'
          , true
          , this.wrap(this.owner.PointsPerCombo)
        );
    }
}