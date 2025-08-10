import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { Position } from "../Misc/Position";
import { CreatureInstance } from "./CreatureInstance";
export type PatrolPosition = Position & {
    delay?: number;
};
export declare class CreaturePatrolPath extends CellSystem<CreatureInstance> {
    add(movementType: 'WALK' | 'RUN' | 'FLY', pos: PatrolPosition | PatrolPosition[]): CreatureInstance;
}
