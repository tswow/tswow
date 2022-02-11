import { CellWrapper } from "../../../data/cell/cells/Cell";
import { DungeonMap } from "./Map";

// also defined in TrinityCore/src/server/game/Scripting/ScriptMgr.h
export const CUSTOM_SCRIPT_NAME = 'custom_script'

export class MapInstanceScriptCell extends CellWrapper<string,DungeonMap> {
    get(): string {
        return this.cell.get();
    }

    set(value: string) {
        this.cell.set(value);
        return this.owner;
    }

    /**
     * Enables the default 'custom instance' for this dungeon
     */
    setCustom() {
        return this.set(CUSTOM_SCRIPT_NAME)
    }
}