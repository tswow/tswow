import { DBC } from "../../DBCFiles";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { WorldMapOverlayQuery, WorldMapOverlayRow } from "../../dbc/WorldMapOverlay";
import { Table } from "../../../data/table/Table";
import { AreaRegistry } from "../Area/Area";
import { ArrayRefSystemNoCreate } from "../Misc/ArrayRefSystem";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator, Ids } from "../Misc/Ids";
import { Boundary } from "../Misc/LimitCells";
import { PositionXYCell } from "../Misc/PositionCell";
import { RegistryDynamic } from "../Refs/Registry";
import { WorldMapAreaRegistry } from "./WorldMapArea";

export class WorldMapTexture extends CellSystem<WorldMapOverlay>{
    get Name() { return this.ownerWrap(this.owner.row.TextureName); }
    get Width() { return this.ownerWrap(this.owner.row.TextureWidth); }
    get Height() { return this.ownerWrap(this.owner.row.TextureHeight); }

    set(name: string, width: number, height: number) {
        this.Name.set(name);
        this.Width.set(width);
        this.Height.set(height);
        return this.owner;
    }
}

export class WorldMapOverlay extends MainEntity<WorldMapOverlayRow> {
    get ID() { return this.row.ID.get(); }
    get MapArea() { return WorldMapAreaRegistry.ref(this, this.row.MapAreaID); }
    // TODO: fixe
    get Areas() { return new ArrayRefSystemNoCreate(this, 0, 4,
        (index)=>AreaRegistry.ref(this, this.wrapIndex(this.row.AreaID,index)))
    }
    get Texture() { return new WorldMapTexture(this); }

    get Offset() {
        return new PositionXYCell(
              this
            , this.row.OffsetX
            , this.row.OffsetY
        );
    }

    get MapPoint() {
        return new PositionXYCell(
              this
            , this.row.MapPointX
            , this.row.MapPointY
        )
    }

    get HitRect() {
        return new Boundary(
              this
            , this.row.HitRectLeft
            , this.row.HitRectTop
            , this.row.HitRectRight
            , this.row.HitRectBottom
        )
    }
}

export class WorldMapOverlayRegistryClass
    extends RegistryDynamic<WorldMapOverlay,WorldMapOverlayRow,WorldMapOverlayQuery>
{
    protected Table(): Table<any, WorldMapOverlayQuery, WorldMapOverlayRow> & { add: (id: number) => WorldMapOverlayRow; } {
        return DBC.WorldMapOverlay
    }
    protected ids(): DynamicIDGenerator {
        return Ids.WorldMapOverlay
    }
    Clear(entity: WorldMapOverlay): void {
        entity
            .Areas.clearAll()
            .HitRect.set(0,0,0,0)
            .MapArea.set(0)
            .MapPoint.setSpread(0,0)
            .Offset.setSpread(0,0)
            .Texture.set('',0,0)
    }
    protected FindByID(id: number): WorldMapOverlayRow {
        return DBC.WorldMapOverlay.findById(id);
    }
    protected EmptyQuery(): WorldMapOverlayQuery {
        return {}
    }
    ID(e: WorldMapOverlay): number {
        return e.ID
    }
    protected Entity(r: WorldMapOverlayRow): WorldMapOverlay {
        return new WorldMapOverlay(r);
    }
}

export const WorldMapOverlayRegistry = new WorldMapOverlayRegistryClass();