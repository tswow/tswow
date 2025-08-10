import { CellWrapper } from "../../../data/cell/cells/Cell";
import { DungeonMap } from "./Map";
export declare const CUSTOM_SCRIPT_NAME = "custom_script";
export declare class MapInstanceScriptCell extends CellWrapper<string, DungeonMap> {
    get(): string;
    set(value: string): DungeonMap;
    /**
     * Enables the default 'custom instance' for this dungeon
     */
    setCustom(): DungeonMap;
}
