import { Subsystem } from "wotlkdata/cell/Subsystem";
import { SpellEffect } from "../SpellEffect";

export const all_effects : any = {}
export function EffectID(id: number) {
    return function(target: any) {
        all_effects[id] = target;
    }
}

export class EffectTemplate<T> extends Subsystem<T> {
    readonly effect: SpellEffect;
    
    protected get row() { return this.effect.row; }
    get index() { return this.effect.index; }

    constructor(owner: T, effect: SpellEffect) {
        super(owner);
        this.effect = effect;
    }

    transientFields() { 
        return super.transientFields().concat(['effect','owner','index','row']);
    }
}