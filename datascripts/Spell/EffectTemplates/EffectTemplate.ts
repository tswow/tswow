import { Subsystem } from "wotlkdata/cell/Subsystem";
import { SpellEffect } from "../SpellEffect";
import { Transient } from "wotlkdata/cell/Transient";
import { CPrim } from "wotlkdata/cell/Cell";
import { CellArray } from "wotlkdata/cell/CellArray";

export const all_effects : any = {}
export function EffectID(id: number) {
    return function(target: any) {
        all_effects[id] = target;
    }
}

export class EffectTemplate<T> extends Subsystem<T> {
    protected w<T extends CPrim>(arr: CellArray<T,any>) {
        return this.wrapIndex(arr, this.index);
    }

    @Transient
    readonly effect: SpellEffect<any>;
    
    @Transient
    protected get row() { return this.effect.row; }

    @Transient
    get index() { return this.effect.index; }

    constructor(owner: T, effect: SpellEffect<any>) {
        super(owner);
        this.effect = effect;
    }
}