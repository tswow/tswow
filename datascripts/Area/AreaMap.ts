import { DBC } from "wotlkdata";
import { CellSystem } from "wotlkdata/cell/systems/CellSystem";
import { MultiRowSystem } from "wotlkdata/cell/systems/MultiRowSystem";
import { WorldMapAreaRow } from "wotlkdata/dbc/types/WorldMapArea";
import { MapContinent } from "../Map/MapContinent";
import { MapRegistry } from "../Map/Maps";
import { Ids } from "../Misc/Ids";
import { MaybeDBCEntity } from "../Misc/SQLDBCEntity";
import { WorldMapOverlay, WorldMapOverlayRegistry } from "../Worldmap/WorldMapOverlay";
import { Area } from "./Area";

export class WorldMapAreaOverlays extends MultiRowSystem<WorldMapOverlay,Area> {
    protected getAllRows(): WorldMapOverlay[] {
        if(!this.owner.WorldMap.exists()) {
            return []
        }
        return this.owner.WorldMap.GetDBC().
    }
    protected isDeleted(value: WorldMapOverlay): boolean {
        throw new Error("Method not implemented.");
    }
}

export class WorldMapAreaBoundary extends CellSystem<Area> {
    get Left() {
        return MaybeDBCEntity.wrapDBC(
            this.owner.WorldMap,0,(dbc: WorldMapAreaRow)=>dbc.LocLeft)
    }

    get Top() {
        return MaybeDBCEntity.wrapDBC(
            this.owner.WorldMap,0,(dbc: WorldMapAreaRow)=>dbc.LocTop)
    }

    get Right() {
        return MaybeDBCEntity.wrapDBC(
            this.owner.WorldMap,0,(dbc: WorldMapAreaRow)=>dbc.LocRight)
    }

    get Bottom() {
        return MaybeDBCEntity.wrapDBC(
            this.owner.WorldMap,0,(dbc: WorldMapAreaRow)=>dbc.LocBottom)
    }

    set(left: number, top: number, right: number, bottom: number) {
        this.Left.set(left);
        this.Top.set(top);
        this.Right.set(right);
        this.Bottom.set(bottom);
        return this.owner;
    }

    /**
     * Specify the minimum and maximum adt tiles to automatically
     * convert between minimap and world coordinates.
     *
     * This allows you to easier layout your map files on a large minimap texture
     */
    setMinimapCoords(
         bounds: [   minAdtX: number
                   , minAdtY: number
                   , maxAdtX: number
                   , maxAdtY: number
                 ] | MapContinent
        , minX: number
        , minY: number
        , maxX: number
        , maxY: number
    ) {
        let minAdtX,minAdtY,maxAdtX,maxAdtY: number;
        if(Array.isArray(bounds)) {
            minAdtX = bounds[0]
            minAdtY = bounds[1]
            maxAdtX = bounds[2]
            maxAdtY = bounds[3]
        } else {
            minAdtX = bounds.ADTBoundary.Left.get()
            minAdtY = bounds.ADTBoundary.Top.get()
            maxAdtX = bounds.ADTBoundary.Right.get()
            maxAdtY = bounds.ADTBoundary.Bottom.get()
        }

        let worldLeft   = (32-minAdtX) * 533.333333333;
        let worldTop    = (32-minAdtY) * 533.333333333;
        let worldRight  = (31-maxAdtX) * 533.333333333;
        let worldBot    = (31-maxAdtY) * 533.333333333;

        let worldSizeX = worldLeft-worldRight;
        let worldSizeY = worldTop-worldBot;

        let minimapSizeX = (maxAdtX-minAdtX+1)*256;
        let minimapSizeY = (maxAdtY-minAdtY+1)*256;

        // Note that, "minimum" points here will be LARGER than the maximum

        let worldMinX = worldLeft-(minX/minimapSizeX)*worldSizeX;
        let worldMinY = worldTop-(minY/minimapSizeY)*worldSizeY;

        let worldMaxX = worldLeft-(maxX/minimapSizeX)*worldSizeX;
        let worldMaxY = worldTop-(maxY/minimapSizeY)*worldSizeY;

        return this.set(worldMinX,worldMinY,worldMaxX,worldMaxY);
    }
}

export class AreaMap extends MaybeDBCEntity<Area,WorldMapAreaRow> {
    protected createDBC(): WorldMapAreaRow {
        return DBC.WorldMapArea.add(Ids.WorldMapArea.id())
            .AreaID.set(this.owner.ID)
            .MapID.set(this.owner.Map.get())
            .LocLeft.set(0)
            .LocRight.set(0)
            .LocTop.set(0)
            .LocBottom.set(0)
            .DisplayMapID.set(0)
            .AreaName.set('')
    }
    protected findDBC(): WorldMapAreaRow {
        return DBC.WorldMapArea.find({AreaID:this.owner.ID})
    }
    protected isValidDBC(dbc: WorldMapAreaRow): boolean {
        return dbc.AreaID.get() === this.owner.ID
    }

    get Directory() { return this.wrapDBC('',(dbc)=>dbc.AreaName); }
    get WorldMapID() { return this.exists() ? this.GetDBC().AreaID.get() : 0 }
    get Boudary() { return new WorldMapAreaBoundary(this.owner); }
    get ParentWorldMap() { return this.wrapDBC(0,dbc=>dbc.ParentWorldMapID); }
    get DefaultDungeonFloor() { return this.wrapDBC(0,dbc=>dbc.DefaultDungeonFloor)}
    get DisplayMap() { return MapRegistry.ref(this.owner, this.wrapDBC(0,dbc=>dbc.DisplayMapID))}
}