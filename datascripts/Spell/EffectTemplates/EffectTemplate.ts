import { CellSystem } from "wotlkdata/cell/systems/CellSystem";
import { SpellEffect } from "../SpellEffect";
import { Transient } from "wotlkdata/cell/misc/Transient";
import { CPrim } from "wotlkdata/cell/cells/Cell";
import { CellArray, CellIndexWrapper } from "wotlkdata/cell/cells/CellArray";

export const all_effects : any = {}
export function EffectID(id: number) {
    return function(target: any) {
        all_effects[id] = target;
    }
}

export class EffectTemplate<T> extends CellSystem<T> {
    protected w<T extends CPrim>(arr: CellArray<T,any>): CellIndexWrapper<T,this> {
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