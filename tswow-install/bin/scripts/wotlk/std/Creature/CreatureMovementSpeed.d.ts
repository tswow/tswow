import { ObjectifyOptions } from "../../../data/cell/serialization/ObjectIteration";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { CreatureTemplate } from "./CreatureTemplate";
export declare class CreatureMovementSpeed extends CellSystem<CreatureTemplate> {
    set(walk: number, run?: number): CreatureTemplate;
    getWalk(): number;
    getRun(): number;
    objectify(options?: ObjectifyOptions): {
        walk: number;
        run: number;
    };
}
