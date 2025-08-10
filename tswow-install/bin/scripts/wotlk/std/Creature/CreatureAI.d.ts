import { ObjectifyOptions } from "../../../data/cell/serialization/ObjectIteration";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { CreatureTemplate } from "./CreatureTemplate";
export declare class CreatureAI extends CellSystem<CreatureTemplate> {
    set(value: string): CreatureTemplate;
    get(): string;
    NullAI(): CreatureTemplate;
    AggressorAI(): CreatureTemplate;
    ReactorAI(): CreatureTemplate;
    GuardAI(): CreatureTemplate;
    PetAI(): CreatureTemplate;
    TotemAI(): CreatureTemplate;
    EventAI(): CreatureTemplate;
    SmartAI(): CreatureTemplate;
    objectify(options?: ObjectifyOptions): string;
}
