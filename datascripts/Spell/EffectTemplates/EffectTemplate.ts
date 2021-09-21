import { CPrim } from "wotlkdata/cell/cells/Cell";
import { CellArray, CellIndexWrapper } from "wotlkdata/cell/cells/CellArray";
import { Transient } from "wotlkdata/cell/serialization/Transient";
import { CellSystem } from "wotlkdata/cell/systems/CellSystem";
import { SelfRef } from "../../Refs/Ref";
import { SpellEffect } from "../SpellEffect";

export class EffectTemplate extends CellSystem<SpellEffect> {
    protected w<T extends CPrim>(arr: CellArray<T,any>): CellIndexWrapper<T,this> {
        return this.wrapIndex(arr, this.index);
    }
    @Transient
    protected get row() { return this.owner.row; }
    @Transient
    get index() { return this.owner.index; }
    @Transient
    get AsEffect() { return new SelfRef(this, ()=>this.owner); }
}