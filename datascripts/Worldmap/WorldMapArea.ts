import { WorldMapAreaQuery, WorldMapAreaRow } from "wotlkdata/dbc/types/WorldMapArea";
import { DBC } from "wotlkdata"
import { AreaRef } from "../Area/Area";
import { MapRef } from "../Map/Map";
import { MainEntity } from "../Misc/Entity";
import { Boundary } from "../Misc/LimitCells";
import { Ids } from "../Misc/Ids";
import { DungeonMapRef } from "./DungeonMap";
import { Ref } from "../Refs/Ref";

export class WorldMapArea extends MainEntity<WorldMapAreaRow> {
    get ID() { return this.row.ID.get(); }
    get Map() { return new MapRef(this, this.row.MapID); }
    get Area() { return new AreaRef(this, this.row.AreaID); }
    get Name() { return this.wrap(this.row.AreaName); }
    get Boundary() { 
        return new Boundary(
              this
            , this.row.LocLeft
            , this.row.LocTop
            , this.row.LocRight
            , this.row.LocBottom
        ); 
    }
    get DisplayMap() { return new MapRef(this, this.row.DisplayMapID); }
    get DefaultDungeonFloor() { 
        return new DungeonMapRef(this, this.row.DefaultDungeonFloor); 
    }
    get ParentWorldMap() { return this.wrap(this.row.ParentWorldMapID) }
}

export const WorldMapAreaRegistry = {
    create(parent?: number) {
        return new WorldMapArea(
            parent 
            ? DBC.WorldMapArea
                .findById(parent)
                .clone(Ids.WorldMapArea.id())
            : DBC.WorldMapArea.add(Ids.WorldMapArea.id())
        )
    },

    load(id: number) {
        return new WorldMapArea(DBC.WorldMapArea.findById(id))
    },

    filter(query: WorldMapAreaQuery) {
        return DBC.WorldMapArea
            .filter(query)
            .map(x=> new WorldMapArea(x))
    },

    find(query: WorldMapAreaQuery) {
        return new WorldMapArea(DBC.WorldMapArea.find(query));
    }
}

export class WorldMapAreaRef<T> extends Ref<T,WorldMapArea> {
    protected create(): WorldMapArea {
        return WorldMapAreaRegistry.create();
    }
    protected clone(): WorldMapArea {
        return WorldMapAreaRegistry.create(this.cell.get())
    }
    exists(): boolean {
        return this.cell.get() > 0;
    }
    protected id(v: WorldMapArea): number {
        return v.ID;
    }
    protected resolve(): WorldMapArea {
        return WorldMapAreaRegistry.load(this.cell.get());
    }
}