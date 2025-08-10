import { MaskCon } from "../../../data/cell/cells/MaskCell";
import { MultiRowSystem } from "../../../data/cell/systems/MultiRowSystem";
import { RaceMask } from "../Race/RaceType";
import { TalentTree } from "../Talents/TalentTree";
import { Class } from "./Class";
export declare class ClassTalents extends MultiRowSystem<TalentTree, Class> {
    protected getAllRows(): TalentTree[];
    protected isDeleted(value: TalentTree): boolean;
    addGet(mod: string, id: string, tabIndex: number, races?: MaskCon<keyof typeof RaceMask>): TalentTree;
    addMod(mod: string, id: string, tabIndex: number, callback?: (tree: TalentTree) => void): Class;
}
