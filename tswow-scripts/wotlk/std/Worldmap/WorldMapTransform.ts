import { DBC } from "wotlkdata";
import { WorldMapTransformsQuery, WorldMapTransformsRow } from "wotlkdata/wotlkdata/dbc/types/WorldMapTransforms";
import { Table } from "wotlkdata/wotlkdata/table/Table";
import { MapRegistry } from "../Map/Maps";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator, Ids } from "../Misc/Ids";
import { MinMax2DCell } from "../Misc/LimitCells";
import { PositionXYCell } from "../Misc/PositionCell";
import { RegistryDynamic } from "../Refs/Registry";
import { DungeonMapRegistry } from "./DungeonMap";

export class WorldMapTransform extends MainEntity<WorldMapTransformsRow> {
    get ID() { return this.row.ID.get(); }
    get SourceMap() { return MapRegistry.ref(this, this.row.MapID); }
    get DestinationMap() { return MapRegistry.ref(this, this.row.NewMapID); }
    get Region() {
        return new MinMax2DCell(
              this
            , this.row.RegionMinX
            , this.row.RegionMinY
            , this.row.RegionMaxX
            , this.row.RegionMaxY
        )
    }

    get Offset() {
        return new PositionXYCell(
              this
            , this.row.RegionOffsetX
            , this.row.RegionOffsetY
        )
    }

    get DungeonFloor() {
        return DungeonMapRegistry.ref(this, this.row.NewDungeonMapID);
    }
}

export class WorldMapTransformRegistryClass
    extends RegistryDynamic<
          WorldMapTransform
        , WorldMapTransformsRow
        , WorldMapTransformsQuery
    >
{
    protected Table(): Table<any, WorldMapTransformsQuery, WorldMapTransformsRow> & { add: (id: number) => WorldMapTransformsRow; } {
        return DBC.WorldMapTransforms
    }
    protected ids(): DynamicIDGenerator {
        return Ids.WorldMapTransforms
    }
    Clear(entity: WorldMapTransform): void {
        entity.DestinationMap.set(0)
              .DungeonFloor.set(0)
              .Offset.setSpread(0,0)
              .Region.set(0,0,0,0)
              .SourceMap.set(0)
    }
    protected FindByID(id: number): WorldMapTransformsRow {
        return DBC.WorldMapTransforms.findById(id);
    }
    protected EmptyQuery(): WorldMapTransformsQuery {
        return {}
    }
    ID(e: WorldMapTransform): number {
        return e.ID
    }
    protected Entity(r: WorldMapTransformsRow): WorldMapTransform {
        return new WorldMapTransform(r);
    }
}

export const WorldMapTransformRegistry
    = new WorldMapTransformRegistryClass();