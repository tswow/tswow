import { CellSystem } from "../../../../data/cell/systems/CellSystem";
import { ClassRacePair } from "./ClassRaces";
export declare class ClassRaceRunes extends CellSystem<ClassRacePair> {
    set(enabled: boolean): void;
    get(): boolean;
}
