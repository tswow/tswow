import { DBC } from "wotlkdata";
import { WorldMapContinentQuery, WorldMapContinentRow } from "wotlkdata/wotlkdata/dbc/types/WorldMapContinent";
import { Table } from "wotlkdata/wotlkdata/table/Table";
import { MapRegistry } from "../Map/Maps";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator, Ids } from "../Misc/Ids";
import { Boundary, MinMax2DCell } from "../Misc/LimitCells";
import { PositionXYCell } from "../Misc/PositionCell";
import { RegistryRowBase } from "../Refs/Registry";
import { ADTBounds, setMinimapCoords } from "./MinimapCoords";
import { WorldMapAreaRegistry } from "./WorldMapArea";

export class MapTaxiBoundary extends MinMax2DCell<WorldMapContinent> {
    setMinimapCoords(
          map: ADTBounds
        , minX: number
        , minY: number
        , maxX: number
        , maxY: number
    ) {
        const {worldMinX,worldMaxX,worldMinY,worldMaxY} = setMinimapCoords
        (
              map
            , minX, minY, maxX, maxY
        );
        // taxi boundaries go from low->high, opposite from most measurements
        return this.set(worldMaxX,worldMaxY,worldMinX,worldMinY);
    }

    /**
     * Sets the taxi boundary to match the adt boundary.
     *
     * You should set ADT boundary before using this function.
     *
     * @param padding how many yards to pad the resulting image
     * @returns
     */
    matchADTBoundary(padding: number = 0) {
        const boundary = this.owner.ADTBoundary
        this.MaxX.set(((32-boundary.Left.get())*533.3333333)   -padding)
        this.MaxY.set(((32-boundary.Top.get())*533.3333333)    -padding)
        this.MinX.set(((31-boundary.Right.get())*533.3333333)  +padding)
        this.MinY.set(((31-boundary.Bottom.get())*533.3333333) +padding)
        return this.owner;
    }
}

export class WorldMapContinentAreaBoundary extends Boundary<WorldMapContinent> {
    setMinimapCoords(map: ADTBounds, minX: number, minY: number, maxX: number, maxY: number) {
        const {worldMinX,worldMaxX,worldMinY,worldMaxY} = setMinimapCoords
        (
              map
            , minX, minY, maxX, maxY
        );
        return this.set(worldMinX,worldMinY,worldMaxX,worldMaxY);
    }

    matchADTBoundary(padding: number = 0) {
        const boundary = this.owner.ADTBoundary
        this.Left.set(((32-boundary.Left.get())*533.3333333)     -padding)
        this.Top.set(((32-boundary.Top.get())*533.3333333)       -padding)
        this.Right.set(((31-boundary.Right.get())*533.3333333)   +padding)
        this.Bottom.set(((31-boundary.Bottom.get())*533.3333333) +padding)
        return this.owner;
    }
}

export class WorldMapContinent extends MainEntity<WorldMapContinentRow> {
    get Map() { return MapRegistry.ref(this, this.row.MapID); }

    /** 0 for outland, 1 for azeroth */
    get World() { return this.wrap(this.row.WorldMapID); }

    get ADTBoundary() {
        return new Boundary(
              this
            , this.row.LeftBoundary
            , this.row.TopBoundary
            , this.row.RightBoundary
            , this.row.BottomBoundary
        );
    }

    get ContinentOffset() { return new PositionXYCell(
        this, this.row.ContinentOffsetX, this.row.ContinentOffsetY)
    }

    get Scale() { return this.wrap(this.row.Scale); }

    get TaxiBoundary() { return new MapTaxiBoundary(
          this
        , this.row.TaxiMinX
        , this.row.TaxiMinY
        , this.row.TaxiMaxX
        , this.row.TaxiMaxY
        )}

    get Directory() {
        return this.wrap(this.Area().Directory);
    }

    protected Area() {
        let wmas = WorldMapAreaRegistry.queryAll({AreaID:0,MapID:this.Map.get()})
        if(wmas.length === 0) {
            throw new Error(
                  `No WorldMapArea matches continent ${this.ID},`
                + ` this suggests something is wrong, please create a`
                + ` WorldMapArea with MapID ${this.Map.get()}`
                + ` and AreaID 0 manually`
            )
        }
        if(wmas.length > 1) {
            throw new Error(
                  `Multiple WorldMapAreas match continent ${this.ID}`
                + ` (map id ${this.Map.get()})`
            )
        }
        return wmas[0]
    }

    get DisplayBoundary() {
        const wma = this.Area();
        return new WorldMapContinentAreaBoundary(
              this
            , wma.Boundary.Left
            , wma.Boundary.Top
            , wma.Boundary.Right
            , wma.Boundary.Bottom
        )
    }
    get ID() { return this.row.ID.get(); }
}

export class WorldMapContinentRegistryClass
    extends RegistryRowBase<
          WorldMapContinent
        , WorldMapContinentRow
        , WorldMapContinentQuery
    >
{
    protected Table(): Table<any, WorldMapContinentQuery, WorldMapContinentRow> & { add: (id: number) => WorldMapContinentRow; } {
        return DBC.WorldMapContinent
    }
    protected ids(): DynamicIDGenerator {
        return Ids.WorldMapContinent
    }
    Clear(entity: WorldMapContinent): void {
        entity
            .ADTBoundary.set(0,0,0,0)
            .ContinentOffset.setSpread(0,0)
            .Map.set(0)
            .Scale.set(0)
            .TaxiBoundary.set(0,0,0,0)
            .World.set(0)

        WorldMapAreaRegistry.create()
    }
    protected FindByID(id: number): WorldMapContinentRow {
        return DBC.WorldMapContinent.findById(id);
    }
    protected EmptyQuery(): WorldMapContinentQuery {
        return {}
    }
    ID(e: WorldMapContinent): number {
        return e.ID
    }
    protected Entity(r: WorldMapContinentRow): WorldMapContinent {
        return new WorldMapContinent(r);
    }

    create(map: number) {
        const dbc = DBC.WorldMapContinent.add(Ids.WorldMapContinent.id())
        let wmc = new WorldMapContinent(dbc)
            .ADTBoundary.set(0,0,0,0)
            .ContinentOffset.setSpread(0,0)
            .Map.set(map)
            .Scale.set(0.7)
            .TaxiBoundary.set(0,0,0,0)
            .World.set(1)

        WorldMapAreaRegistry.create()
            .Map.set(map)
            .Area.set(0)
        return wmc;
    }
}

export const WorldMapContinentRegistry = new WorldMapContinentRegistryClass();