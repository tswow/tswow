import { Subsystem } from "wotlkdata/cell/Subsystem";
import { SpellEffect } from "../SpellEffect";

export function EffectID(id: number) {
    return function(target: any) {

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
}