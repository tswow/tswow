import { DBC } from "wotlkdata";
import { WorldMapContinentQuery, WorldMapContinentRow } from "wotlkdata/dbc/types/WorldMapContinent";
import { MapRef } from "../Map/Map";
import { MainEntity } from "../Misc/Entity";
import { Ids } from "../Misc/Ids";
import { Boundary, MinMax2DCell } from "../Misc/LimitCells";
import { PositionXYCell } from "../Misc/PositionCell";
import { Ref } from "../Refs/Ref";

export class WorldMapContinent extends MainEntity<WorldMapContinentRow> {
    get Map() { return new MapRef(this, this.row.MapID); }

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

export const WorldMapContinentRegistry = {
    create(parent?: number) {
        return new WorldMapContinent(
            parent
            ? DBC.WorldMapContinent.findById(parent)
                .clone(Ids.WorldMapContinent.id())
            : DBC.WorldMapContinent.add(Ids.WorldMapContinent.id())
        )
    },

    load(id: number) {
        return new WorldMapContinent(DBC.WorldMapContinent.findById(id));
    },

    filter(query: WorldMapContinentQuery) {
        return DBC.WorldMapContinent
            .filter(query)
            .map(x=>new WorldMapContinent(x))
    },

    find(query: WorldMapContinentQuery) {
        return new WorldMapContinent(
            DBC.WorldMapContinent
            .find(query)
        )
    }
}

export class WorldMapContinentRef<T> extends Ref<T,WorldMapContinent> {
    protected create(): WorldMapContinent {
        return WorldMapContinentRegistry.create();
    }
    protected clone(): WorldMapContinent {
        return WorldMapContinentRegistry.create(this.cell.get());
    }
    exists(): boolean {
        return this.cell.get() > 0;
    }
    protected id(v: WorldMapContinent): number {
        return v.ID
    }
    protected resolve(): WorldMapContinent {
        return WorldMapContinentRegistry.load(this.cell.get());
    }
}