import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { CreatureTemplate } from "./CreatureTemplate";
export declare class CreatureQuestgiver extends CellSystem<CreatureTemplate> {
    addBoth(questId: number): CreatureTemplate;
    addStarter(questId: number): CreatureTemplate;
    addEnder(questId: number): CreatureTemplate;
}
