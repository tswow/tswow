import { CellSystem } from "wotlkdata/cell/systems/CellSystem";
import { SpellEffect } from "../SpellEffect";
import { Transient } from "wotlkdata/cell/serialization/Transient";
import { CPrim } from "wotlkdata/cell/cells/Cell";
import { CellArray, CellIndexWrapper } from "wotlkdata/cell/cells/CellArray";

export const all_effects : any = {}
export function EffectID(id: number) {
    return function(target: any) {
        all_effects[id] = target;
    }
}

export class EffectTemplate extends CellSystem<SpellEffect> {
    protected w<T extends CPrim>(arr: CellArray<T,any>): CellIndexWrapper<T,this> {
        return this.wrapIndex(arr, this.index);
    }

    @Transient
    protected get row() { return this.owner.row; }

    @Transient
    get index() { return this.owner.index; }

    AsRawEffect() {
        return this.owner;
    }
}