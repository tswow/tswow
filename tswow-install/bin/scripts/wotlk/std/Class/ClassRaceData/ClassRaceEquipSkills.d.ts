import { CellSystem } from "../../../../data/cell/systems/CellSystem";
import { ClassRacePair } from "./ClassRaces";
export declare class SkillAutolearn extends CellSystem<ClassRacePair> {
    protected skill: number;
    constructor(owner: ClassRacePair, skill: number);
    remove(): ClassRacePair;
    set(rank: number): ClassRacePair;
    get(): number;
}
export declare class ClassRaceEquipSkill extends CellSystem<ClassRacePair> {
    protected skill: number;
    constructor(owner: ClassRacePair, skill: number);
    get Autolearn(): SkillAutolearn;
}
