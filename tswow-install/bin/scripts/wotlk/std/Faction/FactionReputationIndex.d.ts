import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { Faction } from "./Faction";
export declare class FactionReputationIndex extends CellSystem<Faction> {
    exists(): boolean;
    assign(mod: string, id: string): Faction;
    get(): number;
}
