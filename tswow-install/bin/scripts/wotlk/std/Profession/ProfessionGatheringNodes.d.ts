import { MultiRowSystem } from "../../../data/cell/systems/MultiRowSystem";
import { GameObjectChest } from "../GameObject/GameObjectTemplate";
import { Profession } from "./Profession";
export declare class ProfessionGatheringNodes extends MultiRowSystem<GameObjectChest, Profession> {
    protected getAllRows(): GameObjectChest[];
    protected isDeleted(value: GameObjectChest): boolean;
    add(mod: string, id: string, lockType: number, levelNeeded: number, itemsNeeded: number[], displayid: number): Profession;
    addGet(mod: string, id: string, lockType: number, level: number): GameObjectChest;
    addMod(mod: string, id: string, lockType: number, level: number, callback: (chest: GameObjectChest) => void): Profession;
}
