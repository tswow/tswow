import { DBC } from "wotlkdata";
import { DungeonMapQuery, DungeonMapRow } from "wotlkdata/dbc/types/DungeonMap";
import { MapRef } from "../Map/Map";
import { MainEntity } from "../Misc/Entity";
import { Ids } from "../Misc/Ids";
import { MinMax2DCell } from "../Misc/LimitCells";
import { Ref } from "../Refs/Ref";

export class DungeonMap extends MainEntity<DungeonMapRow> {
    get ID() { return this.row.ID.get(); }

    get Map() { return new MapRef(this, this.row.MapID); }

    get FloorIndex() { return this.wrap(this.row.FloorIndex); }

    get Boundary() {
        return new MinMax2DCell(
              this
            , this.row.MinX
            , this.row.MinY
            , this.row.MaxX
            , this.row.MaxY
            )
    }

    get ParentWorldMap() { return this.wrap(this.row.ParentWorldMapID); }
}

export const DungeonMapRegistry = {
    create(parent?: number) {
        return new DungeonMap(
            parent
            ? DBC.DungeonMap
                .find({ID:parent}).clone(Ids.DungeonMap.id())
            : DBC.DungeonMap.add(Ids.DungeonMap.id())
        );
    },

    load(id: number) {
        return new DungeonMap(DBC.DungeonMap.find({ID:id}))
    },

    filter(query: DungeonMapQuery) {
        return DBC.DungeonMap
            .filter(query)
            .map(x=>new DungeonMap(x))
    },

    find(query: DungeonMapQuery) {
        return new DungeonMap(
            DBC.DungeonMap
            .find(query)
        )
    }
}

export class DungeonMapRef<T> extends Ref<T,DungeonMap> {
    protected create(): DungeonMap {
        return DungeonMapRegistry.create();
    }
    protected clone(): DungeonMap {
        return DungeonMapRegistry.create(this.cell.get())
    }
    exists(): boolean {
        return this.cell.get() > 0;
    }
    protected id(v: DungeonMap): number {
        return v.ID;
    }
    protected resolve(): DungeonMap {
        return DungeonMapRegistry.load(this.cell.get());
    }
}