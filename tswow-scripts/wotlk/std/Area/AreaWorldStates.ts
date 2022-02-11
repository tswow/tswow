import { MultiRowSystem } from "wotlkdata/wotlkdata/cell/systems/MultiRowSystem";
import { DBC } from "wotlkdata/wotlkdata/dbc/DBCFiles";
import { WorldStateSound } from "../WorldState/WorldState";
import { WorldStateUI, WorldStateUIRegistry } from "../WorldState/WorldStateUI";
import { Area } from "./Area";

export class AreaWorldStateUIs extends MultiRowSystem<WorldStateUI,Area> {
    protected getAllRows(): WorldStateUI[] {
        return WorldStateUIRegistry.queryAll({AreaID:this.owner.ID})
    }

    protected isDeleted(value: WorldStateUI): boolean {
        return value.row.isDeleted()
    }

    addGet() {
        return WorldStateUIRegistry.create()
            .Location.set(-1,this.owner.ID);
    }

    add(mapId: number = -1) {
        this.addGet().Location.Map.set(mapId);
        return this.owner;
    }

    addMod(callback: (value: WorldStateUI)=>void) {
        callback(this.addGet());
        return this.owner;
    }
}

export class AreaWorldStateSounds extends MultiRowSystem<WorldStateSound,Area> {
    protected getAllRows(): WorldStateSound[] {
        return DBC.WorldStateZoneSounds
            .queryAll({AreaID:this.owner.ID})
            .map(x=>new WorldStateSound(x))
    }
    protected isDeleted(value: WorldStateSound): boolean {
        return value.row.isDeleted();
    }
}