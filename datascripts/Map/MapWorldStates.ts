import { MultiRowSystem } from "wotlkdata/wotlkdata/cell/systems/MultiRowSystem";
import { WorldStateUI, WorldStateUIRegistry } from "../WorldState/WorldStateUI";
import { Map } from "./Map";

export class MapWorldStateUIs extends MultiRowSystem<WorldStateUI,Map> {
    protected getAllRows(): WorldStateUI[] {
        return WorldStateUIRegistry.queryAll({MapID:this.owner.ID})
    }
    protected isDeleted(value: WorldStateUI): boolean {
        return value.row.isDeleted()
    }

    addGet(areaId = 0) {
        return WorldStateUIRegistry.create()
            .Location.set(this.owner.ID, areaId);
    }

    add() {
        this.addGet();
        return this.owner;
    }

    addMod(callback: (value: WorldStateUI)=>void) {
        callback(this.addGet());
        return this.owner;
    }
}