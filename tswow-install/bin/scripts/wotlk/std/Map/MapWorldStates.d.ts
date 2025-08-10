import { MultiRowSystem } from "../../../data/cell/systems/MultiRowSystem";
import { WorldStateUI } from "../WorldState/WorldStateUI";
import { Map } from "./Map";
export declare class MapWorldStateUIs extends MultiRowSystem<WorldStateUI, Map> {
    protected getAllRows(): WorldStateUI[];
    protected isDeleted(value: WorldStateUI): boolean;
    addGet(areaId?: number): WorldStateUI;
    add(): Map;
    addMod(callback: (value: WorldStateUI) => void): Map;
}
