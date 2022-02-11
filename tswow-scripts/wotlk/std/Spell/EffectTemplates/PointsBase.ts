import { makeEnumCell } from "../../../../data/cell/cells/EnumCell";
import { PercentCell } from "../../Misc/PercentCell";
import { ShiftedNumberCell } from "../../Misc/ShiftedNumberCell";
import { SpellPowerType } from "../SpellPowerType";
import { TargetBase } from "./TargetBase";


export class PointsRoot extends TargetBase {
    get BonusMultiplier() { return this.wrap(this.owner.BonusMultiplier); }
    get MultipleValue() { return this.wrap(this.owner.MultipleValue); }
    get ChainTargets() { return this.wrap(this.owner.ChainTarget); }
    get ChainAmplitude() { return this.wrap(this.owner.ChainAmplitude); }
}

export class ChanceBase extends PointsRoot {
    get ChanceBase() {
        return new PercentCell(
              this,()=>this.owner.PointsDieSides.get() > 0
                    ? '[0-99]'
                    : '[0-100]'
            , true
            , this.owner.PointsBase.AsCell()
        );
    }
    get ChanceDieSides() {
        return new PercentCell(
              this
            , '[0-100]'
            , true
            , this.wrap(this.owner.PointsDieSides)
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
    get PercentBase() {
        return new PercentCell(
              this
            , ()=>this.owner.PointsDieSides.get() > 0 ? '[0-99]' : '[0-100]'
            , true
            , this.owner.PointsBase.AsCell()
        )
    }
    get PercentDieSides() {
        return new PercentCell(
            this
          , '[0-100]'
          , true
          , this.owner.PointsDieSides
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
    get PointsBase() {
        return new ShiftedNumberCell(
            this
          , ()=>this.owner.PointsDieSides.get() > 0
                ? 'STORED_AS_MINUS_ONE'
                : 'NO_CHANGE'
          , this.owner.PointsBase.AsCell()
        )
    }
    get PointsDieSides() {
        return this.wrap(this.owner.PointsDieSides);
    }
    get PointsPerLevel() {
        return this.wrap(this.owner.PointsPerLevel);
    }
    get PointsPerCombo() {
        return this.wrap(this.owner.PointsPerCombo);
    }
}

export class CountBase extends PointsRoot {
    get CountBase() {
        return new ShiftedNumberCell(
            this
          , ()=>this.owner.PointsDieSides.get() > 0
                ? 'STORED_AS_MINUS_ONE'
                : 'NO_CHANGE'
          , this.owner.PointsBase.AsCell()
        )
    }
    get CountDieSides() { return this.wrap(this.owner.PointsDieSides); }
    get CountPerLevel() {return this.wrap(this.owner.PointsPerLevel); }
    get CountPerCombo() { return this.wrap(this.owner.PointsPerCombo); }
}

export class DamageBase extends PointsRoot {
    get DamageBase() {
        return new ShiftedNumberCell(
            this
          , ()=>this.owner.PointsDieSides.get() > 0
                ? 'STORED_AS_MINUS_ONE'
                : 'NO_CHANGE'
          , this.owner.PointsBase.AsCell()
        )
    }
    get DamageDieSides() { return this.wrap(this.owner.PointsDieSides); }
    get DamagePerLevel() {return this.wrap(this.owner.PointsPerLevel); }
    get DamagePerCombo() { return this.wrap(this.owner.PointsPerCombo); }
}

export class DamageBasePct extends PointsRoot {
    get DamagePctBase() {
        return new PercentCell(
            this,()=>this.owner.PointsDieSides.get() > 0
                  ? '[0-99]'
                  : '[0-100]'
          , true
          , this.owner.PointsBase.AsCell()
        );
    }
    get DamagePctDieSides() {
        return new PercentCell(
            this
          , '[0-100]'
          , true
          , this.wrap(this.owner.PointsDieSides)
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
    get HealBase() {
        return new ShiftedNumberCell(
            this
          , ()=>this.owner.PointsDieSides.get() > 0
                ? 'STORED_AS_MINUS_ONE'
                : 'NO_CHANGE'
          , this.owner.PointsBase.AsCell()
        )
    }
    get HealDieSides() { return this.wrap(this.owner.PointsDieSides); }
    get HealPerLevel() {return this.wrap(this.owner.PointsPerLevel); }
    get HealPerCombo() { return this.wrap(this.owner.PointsPerCombo); }
}

export class HealBasePct extends PointsRoot {
    get HealPctBase() {
        return new PercentCell(
            this,()=>this.owner.PointsDieSides.get() > 0
                  ? '[0-99]'
                  : '[0-100]'
          , true
          , this.owner.PointsBase.AsCell()
        );
    }
    get HealPctDieSides() {
        return new PercentCell(
            this
          , '[0-100]'
          , true
          , this.wrap(this.owner.PointsDieSides)
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
    get PowerBase() {
        return new ShiftedNumberCell(
            this
          , ()=>this.owner.PointsDieSides.get() > 0
                ? 'STORED_AS_MINUS_ONE'
                : 'NO_CHANGE'
          , this.owner.PointsBase.AsCell()
        )
    }
    get PowerDieSides() { return this.wrap(this.owner.PointsDieSides); }
    get PowerPerLevel() {return this.wrap(this.owner.PointsPerLevel); }
    get PowerPerCombo() { return this.wrap(this.owner.PointsPerCombo); }
}

export class ManaBase extends PointsRoot {
    get ManaBase() {
        return new ShiftedNumberCell(
            this
          , ()=>this.owner.PointsDieSides.get() > 0
                ? 'STORED_AS_MINUS_ONE'
                : 'NO_CHANGE'
          , this.owner.PointsBase.AsCell()
        )
    }
    get ManaDieSides() { return this.wrap(this.owner.PointsDieSides); }
    get ManaPerLevel() {return this.wrap(this.owner.PointsPerLevel); }
    get ManaPerCombo() { return this.wrap(this.owner.PointsPerCombo); }
}

export class PowerBasePct extends PointsRoot {
    get PowerType() {
        return makeEnumCell(SpellPowerType,this, this.owner.MiscValueA);
    }
    get PowerPctBase() {
        return new PercentCell(
            this,()=>this.owner.PointsDieSides.get() > 0
                  ? '[0-99]'
                  : '[0-100]'
          , true
          , this.owner.PointsBase.AsCell()
        );
    }
    get PowerPctDieSides() {
        return new PercentCell(
            this
          , '[0-100]'
          , true
          , this.wrap(this.owner.PointsDieSides)
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