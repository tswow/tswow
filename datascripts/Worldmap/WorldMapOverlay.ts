import { DBC } from "wotlkdata";
import { CellSystem } from "wotlkdata/cell/systems/CellSystem";
import { WorldMapOverlayQuery, WorldMapOverlayRow } from "wotlkdata/dbc/types/WorldMapOverlay";
import { AreaRegistry } from "../Area/Area";
import { ArrayRefSystemStatic } from "../Misc/ArrayRefSystem";
import { MainEntity } from "../Misc/Entity";
import { Ids } from "../Misc/Ids";
import { Boundary } from "../Misc/LimitCells";
import { PositionXYCell } from "../Misc/PositionCell";
import { Ref } from "../Refs/RefOld";
import { WorldMapAreaRef } from "./WorldMapArea";

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
    get MapArea() { return new WorldMapAreaRef(this, this.row.MapAreaID); }
    // TODO: fixe
    get Areas() { return new ArrayRefSystemStatic(this, 0, 4,
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

export const WorldMapOverlayRegistry = {
    create(parent?: number) {
        return new WorldMapOverlay(
            parent
            ? DBC.WorldMapOverlay
                .findById(parent)
                .clone(Ids.WorldMapOverlay.id())
            : DBC.WorldMapOverlay
                .add(Ids.WorldMapOverlay.id())
        );
    },

    load(id: number) {
        return new WorldMapOverlay(DBC.WorldMapOverlay.findById(id))
    },

    filter(query: WorldMapOverlayQuery) {
        return DBC.WorldMapOverlay
            .filter(query)
            .map(x=>new WorldMapOverlay(x))
    },

    find(query: WorldMapOverlayQuery) {
        return new WorldMapOverlay(
            DBC.WorldMapOverlay
            .find(query)
        )
    }
}


export class WorldMapOverlayRef<T> extends Ref<T,WorldMapOverlay> {
    protected create(): WorldMapOverlay {
        return WorldMapOverlayRegistry.create();
    }
    protected clone(): WorldMapOverlay {
        return WorldMapOverlayRegistry.create(this.cell.get());
    }
    exists(): boolean {
        return this.cell.get() > 0;
    }
    protected id(v: WorldMapOverlay): number {
        return v.ID
    }
    protected resolve(): WorldMapOverlay {
        return WorldMapOverlayRegistry.load(this.cell.get());
    }
}