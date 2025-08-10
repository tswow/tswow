import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { TrainerPlain } from "../Trainer/Trainer";
import { CreatureTemplate } from "./CreatureTemplate";
export declare class CreatureTrainerRef extends CellSystem<CreatureTemplate> {
    getRef(): TrainerPlain;
    modRef(callback: (trainer: TrainerPlain) => void): CreatureTemplate;
}
