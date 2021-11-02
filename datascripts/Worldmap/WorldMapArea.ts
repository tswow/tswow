import { DBC } from "wotlkdata";
import { MultiRowSystem } from "wotlkdata/wotlkdata/cell/systems/MultiRowSystem";
import { WorldMapAreaQuery, WorldMapAreaRow } from "wotlkdata/wotlkdata/dbc/types/WorldMapArea";
import { Table } from "wotlkdata/wotlkdata/table/Table";
import { AreaRegistry } from "../Area/Area";
import { MapRegistry } from "../Map/Maps";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator, Ids } from "../Misc/Ids";
import { Boundary } from "../Misc/LimitCells";
import { RegistryDynamic } from "../Refs/Registry";
import { DungeonMapRegistry } from "./DungeonMap";
import { ADTBounds, setMinimapCoords } from "./MinimapCoords";
import { WorldMapOverlay, WorldMapOverlayRegistry } from "./WorldMapOverlay";

export class WorldMapAreaOverlays extends MultiRowSystem<WorldMapOverlay,WorldMapArea> {
    protected getAllRows(): WorldMapOverlay[] {
        return WorldMapOverlayRegistry.queryAll({MapAreaID:this.owner.ID})
    }
    protected isDeleted(value: WorldMapOverlay): boolean {
        return value.row.isDeleted();
    }

    addGet() {
        return WorldMapOverlayRegistry.create()
            .MapArea.set(this.owner.ID)
    }

    addMod(callback: (overlay: WorldMapOverlay)=>void) {
        callback(this.addGet());
        return this.owner;
    }
}

export class WorldMapAreaBoundary extends Boundary<WorldMapArea> {

    /**
     * Specify the minimum and maximum adt tiles to automatically
     * convert between minimap and world coordinates.
     *
     * This allows you to easier layout your map files on a large minimap texture
     */
    setMinimapCoords(
          bounds: ADTBounds
        , minX: number
        , minY: number
        , maxX: number
        , maxY: number
    ) {
        const {worldMinX,worldMaxX,worldMinY,worldMaxY} = setMinimapCoords
            (
                bounds,minX,minY,maxX,maxY
            );
        return this.set(worldMinX,worldMinY,worldMaxX,worldMaxY);
    }
}

export class WorldMapArea extends MainEntity<WorldMapAreaRow> {
    get ID() { return this.row.ID.get(); }
    get Map() { return MapRegistry.ref(this, this.row.MapID); }
    get Area() { return AreaRegistry.ref(this, this.row.AreaID); }
    get Directory() { return this.wrap(this.row.AreaName); }
    get Boundary() {
        return new WorldMapAreaBoundary(
              this
            , this.row.LocLeft
            , this.row.LocTop
            , this.row.LocRight
            , this.row.LocBottom
        );
    }
    get DisplayMap() { return MapRegistry.ref(this, this.row.DisplayMapID); }
    get DefaultDungeonFloor() {
        return DungeonMapRegistry.ref(this, this.row.DefaultDungeonFloor);
    }
    get ParentWorldMap() { return this.wrap(this.row.ParentWorldMapID) }
    get Overlays() { return new WorldMapAreaOverlays(this); }
}

export class WorldMapAreaRegistryClass
    extends RegistryDynamic<WorldMapArea,WorldMapAreaRow,WorldMapAreaQuery>
{
    protected Table(): Table<any, WorldMapAreaQuery, WorldMapAreaRow> & { add: (id: number) => WorldMapAreaRow; } {
        return DBC.WorldMapArea
    }
    protected ids(): DynamicIDGenerator {
        return Ids.WorldMapArea
    }
    Clear(entity: WorldMapArea): void {
        entity
            .Area.set(0)
            .Boundary.set(0,0,0,0)
            .DefaultDungeonFloor.set(0)
            .DisplayMap.set(-1)
            .Map.set(-1)
            .Directory.set('')
            .ParentWorldMap.set(0)
    }
    protected FindByID(id: number): WorldMapAreaRow {
        return DBC.WorldMapArea.findById(id);
    }
    protected EmptyQuery(): WorldMapAreaQuery {
        return {}
    }
    ID(e: WorldMapArea): number {
        return e.ID
    }
    protected Entity(r: WorldMapAreaRow): WorldMapArea {
        return new WorldMapArea(r);
    }
}

export const WorldMapAreaRegistry = new WorldMapAreaRegistryClass();