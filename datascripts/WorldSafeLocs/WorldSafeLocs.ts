import { DBC } from "wotlkdata";
import { WorldSafelocsQuery, WorldSafelocsRow } from "wotlkdata/dbc/types/WorldSafelocs";
import { MainEntity } from "../Misc/Entity";
import { Ids } from "../Misc/Ids";
import { PositionMapXYZCell } from "../Misc/PositionCell";
import { Ref } from "../Refs/Ref";

export class WorldSafeLoc extends MainEntity<WorldSafelocsRow> {
    get ID() { return this.row.ID.get(); }
    get Position() { return new PositionMapXYZCell(this, this.row.Continent, this.row.LocX, this.row.LocY, this.row.LocZ); }
    get Name() { return this.wrapLoc(this.row.AreaName); }
}

export const WorldSafeLocRegistry = {
    create(parent: number = 0) {
        if(parent > 0) {
            return new WorldSafeLoc(DBC.WorldSafelocs
                .findById(parent)
                .clone(Ids.WorldSafelocs.id())
            )
        } else {
            return new WorldSafeLoc(DBC.WorldSafelocs.add(Ids.WorldSafelocs.id()))
                .Position.setSpread(0,0,0,0)
                .Name.clear()
        }
    },

    load(id: number) {
        return new WorldSafeLoc(DBC.WorldSafelocs.findById(id));
    },

    filter(query: WorldSafelocsQuery) {
        return DBC.WorldSafelocs
            .filter(query)
            .map(x=>new WorldSafeLoc(x))
    },

    find(query: WorldSafelocsQuery) {
        return new WorldSafeLoc(DBC.WorldSafelocs.find(query))
    }
}

export class WorldSafeLocRef<T> extends Ref<T,WorldSafeLoc> {
    protected create(): WorldSafeLoc {
        return WorldSafeLocRegistry.create();
    }
    protected clone(): WorldSafeLoc {
        return WorldSafeLocRegistry.create(this.cell.get());
    }
    exists(): boolean {
        return this.cell.get() > 0;
    }
    protected id(v: WorldSafeLoc): number {
        return v.ID;
    }
    protected resolve(): WorldSafeLoc {
        return WorldSafeLocRegistry.load(this.cell.get());
    }

    setSimple(map: number, x: number, y: number, z: number) {
        this.getRefCopy()
            .Position.setSpread(map,x,y,z)
        return this.owner;
    }
}