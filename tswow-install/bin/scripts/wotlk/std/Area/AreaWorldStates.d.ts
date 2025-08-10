import { MultiRowSystem } from "../../../data/cell/systems/MultiRowSystem";
import { WorldStateSound } from "../WorldState/WorldState";
import { WorldStateUI } from "../WorldState/WorldStateUI";
import { Area } from "./Area";
export declare class AreaWorldStateUIs extends MultiRowSystem<WorldStateUI, Area> {
    protected getAllRows(): WorldStateUI[];
    protected isDeleted(value: WorldStateUI): boolean;
    addGet(): WorldStateUI;
    add(mapId?: number): Area;
    addMod(callback: (value: WorldStateUI) => void): Area;
}
export declare class AreaWorldStateSounds extends MultiRowSystem<WorldStateSound, Area> {
    protected getAllRows(): WorldStateSound[];
    protected isDeleted(value: WorldStateSound): boolean;
}
