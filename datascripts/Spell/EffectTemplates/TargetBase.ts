import { EffectTemplate } from "./EffectTemplate";
import { SpellImplicitTarget } from "../SpellImplicitTarget";
import { SpellRadiusPointer } from "../SpellRadius";

export class TargetBase extends EffectTemplate {
    /**
     * Generic Target type. 
     */
    get TargetA() { return new SpellImplicitTarget(this, this.row.ImplicitTargetA, this.index); }

    /**
     * Generic Target type. Value depends on TargetA
     */
    get TargetB() { return new SpellImplicitTarget(this, this.row.ImplicitTargetB, this.index); }

    /**
     * Generic radius. Value depends on TargetA/TargetB
     */
    get Radius() { return new SpellRadiusPointer(this, this.w(this.row.EffectRadiusIndex)); }

    /**
     * How many units can be chained by this spell
     */
    get ChainTargets() { return this.wrap(this.owner.ChainTarget); }

    get ChainAmplitude() { return this.wrap(this.owner.ChainAmplitude); }
}