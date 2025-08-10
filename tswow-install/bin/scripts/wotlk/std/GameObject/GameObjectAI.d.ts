import { ObjectifyOptions } from "../../../data/cell/serialization/ObjectIteration";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { GameObjectTemplate } from "./GameObjectTemplate";
export declare class GameObjectAI extends CellSystem<GameObjectTemplate> {
    set(value: string): GameObjectTemplate;
    get(): string;
    SmartAI(): GameObjectTemplate;
    objectify(options?: ObjectifyOptions): string;
}
