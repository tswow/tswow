import { PercentCell } from "../../Misc/PercentCell";
import { ShiftedNumberCell } from "../../Misc/ShiftedNumberCell";
import { SpellPowerType } from "../SpellPowerType";
import { TargetBase } from "./TargetBase";
export declare class PointsRoot extends TargetBase {
    get BonusMultiplier(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get MultipleValue(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get ChainTargets(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get ChainAmplitude(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class ChanceBase extends PointsRoot {
    get ChanceBase(): PercentCell<this>;
    get ChanceDieSides(): PercentCell<this>;
    get ChancePerLevel(): PercentCell<this>;
    get ChancePerCombo(): PercentCell<this>;
}
export declare class PercentBase extends PointsRoot {
    get PercentBase(): PercentCell<this>;
    get PercentDieSides(): PercentCell<this>;
    get PercentPerLevel(): PercentCell<this>;
    get PercentPerCombo(): PercentCell<this>;
}
export declare class PointsBase extends PointsRoot {
    get PointsBase(): ShiftedNumberCell<this>;
    get PointsDieSides(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get PointsPerLevel(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get PointsPerCombo(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class CountBase extends PointsRoot {
    get CountBase(): ShiftedNumberCell<this>;
    get CountDieSides(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get CountPerLevel(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get CountPerCombo(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class DamageBase extends PointsRoot {
    get DamageBase(): ShiftedNumberCell<this>;
    get DamageDieSides(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get DamagePerLevel(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get DamagePerCombo(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class DamageBasePct extends PointsRoot {
    get DamagePctBase(): PercentCell<this>;
    get DamagePctDieSides(): PercentCell<this>;
    get DamagePctPerLevel(): PercentCell<this>;
    get DamagePctPerCombo(): PercentCell<this>;
}
export declare class HealBase extends PointsRoot {
    get HealBase(): ShiftedNumberCell<this>;
    get HealDieSides(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get HealPerLevel(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get HealPerCombo(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class HealBasePct extends PointsRoot {
    get HealPctBase(): PercentCell<this>;
    get HealPctDieSides(): PercentCell<this>;
    get HealPctPerLevel(): PercentCell<this>;
    get HealPctPerCombo(): PercentCell<this>;
}
export declare class PowerBase extends PointsRoot {
    get PowerType(): import("../../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof SpellPowerType>;
    get PowerBase(): ShiftedNumberCell<this>;
    get PowerDieSides(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get PowerPerLevel(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get PowerPerCombo(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class ManaBase extends PointsRoot {
    get ManaBase(): ShiftedNumberCell<this>;
    get ManaDieSides(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get ManaPerLevel(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get ManaPerCombo(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class PowerBasePct extends PointsRoot {
    get PowerType(): import("../../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof SpellPowerType>;
    get PowerPctBase(): PercentCell<this>;
    get PowerPctDieSides(): PercentCell<this>;
    get PowerPerLevelPct(): PercentCell<this>;
    get PowerPerComboPct(): PercentCell<this>;
}
