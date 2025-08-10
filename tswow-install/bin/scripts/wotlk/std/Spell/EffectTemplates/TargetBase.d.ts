import { SpellImplicitTarget } from "../SpellImplicitTarget";
import { EffectTemplate } from "./EffectTemplate";
export declare class TargetBase extends EffectTemplate {
    /**
     * Generic Target type.
     */
    get ImplicitTargetA(): import("../../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof SpellImplicitTarget>;
    /**
     * Generic Target type. Value depends on TargetA
     */
    get ImplicitTargetB(): import("../../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof SpellImplicitTarget>;
    /**
     * Generic radius. Value depends on TargetA/TargetB
     */
    get Radius(): import("../SpellRadius").SpellRadiusRef<this>;
    /**
     * How many units can be chained by this spell
     */
    get ChainTargets(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get ChainAmplitude(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
