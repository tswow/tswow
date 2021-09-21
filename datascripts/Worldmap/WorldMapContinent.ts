import { DBC } from "wotlkdata";
import { WorldMapContinentQuery, WorldMapContinentRow } from "wotlkdata/dbc/types/WorldMapContinent";
import { Table } from "wotlkdata/table/Table";
import { MapRegistry } from "../Map/Maps";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator, Ids } from "../Misc/Ids";
import { Boundary, MinMax2DCell } from "../Misc/LimitCells";
import { PositionXYCell } from "../Misc/PositionCell";
import { RegistryDynamic } from "../Refs/Registry";

export class WorldMapContinent extends MainEntity<WorldMapContinentRow> {
    get Map() { return MapRegistry.ref(this, this.row.MapID); }

    /** 0 for outland, 1 for azeroth */
    get World() { return this.wrap(this.row.WorldMapID); }

    get Boundary() {
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

    get Taxi() { return new MinMax2DCell(
          this
        , this.row.TaxiMinX
        , this.row.TaxiMinY
        , this.row.TaxiMaxX
        , this.row.TaxiMaxY
        )}

    get ID() { return this.row.ID.get(); }
}

export class WorldMapContinentRegistryClass
    extends RegistryDynamic<
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
            .Boundary.set(0,0,0,0)
            .ContinentOffset.setSpread(0,0)
            .Map.set(0)
            .Scale.set(0)
            .Taxi.set(0,0,0,0)
            .World.set(0)
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
}

export const WorldMapContinentRegistry = new WorldMapContinentRegistryClass();