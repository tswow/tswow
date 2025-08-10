import { CPrim } from "../../../../data/cell/cells/Cell";
import { CellArray, CellIndexWrapper } from "../../../../data/cell/cells/CellArray";
import { ObjectifyOptions } from "../../../../data/cell/serialization/ObjectIteration";
import { CellSystem } from "../../../../data/cell/systems/CellSystem";
import { SelfRef } from "../../Refs/Ref";
import { SpellEffect } from "../SpellEffect";
import { SpellTargetPosition } from "../SpellTargetPosition";
export declare class EffectTemplate extends CellSystem<SpellEffect> {
    protected w<T extends CPrim>(arr: CellArray<T, any>): CellIndexWrapper<T, this>;
    protected get row(): import("../../../dbc/Spell").SpellRow;
    get index(): number;
    get AsEffect(): SelfRef<this, SpellEffect>;
    get TargetPosition(): SpellTargetPosition<this>;
    objectify(options?: ObjectifyOptions): {
        Type: string | number;
        Aura: string | number;
    };
}
