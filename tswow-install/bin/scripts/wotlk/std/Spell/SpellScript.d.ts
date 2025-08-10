import { ObjectifyOptions } from "../../../data/cell/serialization/ObjectIteration";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { Spell } from "./Spell";
export declare class SpellScript extends CellSystem<Spell> {
    get(): string | undefined;
    objectify(options?: ObjectifyOptions): string;
}
