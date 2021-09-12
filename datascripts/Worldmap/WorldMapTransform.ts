import { WorldMapTransformsQuery, WorldMapTransformsRow } from "wotlkdata/dbc/types/WorldMapTransforms";
import { DBC } from "wotlkdata"
import { MapRef } from "../Map/Map";
import { MainEntity } from "../Misc/Entity";
import { Ids } from "../Misc/Ids";
import { MinMax2DCell } from "../Misc/LimitCells";
import { PositionXYCell } from "../Misc/PositionCell";
import { Ref } from "../Refs/Ref";
import { DungeonMapRef } from "./DungeonMap";

export class WorldMapTransform extends MainEntity<WorldMapTransformsRow> {
    get ID() { return this.row.ID.get(); }
    get SourceMap() { return new MapRef(this, this.row.MapID); }
    get DestinationMap() { return new MapRef(this, this.row.NewMapID); }
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
        return new DungeonMapRef(this, this.row.NewDungeonMapID);
    }
}

export const WorldMapTransformRegistry = {
    create(parent?: number) {
        return new WorldMapTransform(
            parent
            ? DBC.WorldMapTransforms
                .findById(parent)
                .clone(Ids.WorldMapTransforms.id())
            : DBC.WorldMapTransforms
                .add(Ids.WorldMapTransforms.id())
        );
    },

    load(id: number) {
        return new WorldMapTransform(DBC.WorldMapTransforms.findById(id))
    },

    filter(query: WorldMapTransformsQuery) {
        return DBC.WorldMapTransforms
            .filter(query)
            .map(x=>new WorldMapTransform(x))
    },

    find(query: WorldMapTransformsQuery) {
        return new WorldMapTransform(
            DBC.WorldMapTransforms
            .find(query)
        )
    }
}

export class WorldMapTransformRef<T> extends Ref<T,WorldMapTransform> {
    protected create(): WorldMapTransform {
        return WorldMapTransformRegistry.create();
    }
    protected clone(): WorldMapTransform {
        return WorldMapTransformRegistry.create(this.cell.get());
    }
    exists(): boolean {
        return this.cell.get() > 0;
    }
    protected id(v: WorldMapTransform): number {
        return v.ID
    }
    protected resolve(): WorldMapTransform {
        return WorldMapTransformRegistry.load(this.cell.get());
    }
}