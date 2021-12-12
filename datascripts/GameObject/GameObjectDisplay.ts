import { CellIndexWrapper } from "wotlkdata/wotlkdata/cell/cells/CellArray";
import { GameObjectDisplayInfoRow } from "wotlkdata/wotlkdata/dbc/types/GameObjectDisplayInfo";
import { BoundingBox } from "../Misc/BoundingBox";
import { ChildEntity, MainEntity } from "../Misc/Entity";
import { SoundEntryRegistry } from "../Sound/SoundEntry";

export class GameObjectSounds extends ChildEntity<GameObjectDisplayInfoRow,GameObjectDisplay> {
    get length(): number { return 10; }

    getId(index: number) {
        return this.row.Sound.getIndex(index);
    }

    setId(index: number, id: number) {
        this.row.Sound.setIndex(index,id);
        return this.owner;
    }

    freeIndex() {
        for(let i=0;i<this.length;++i) {
            if(this.row.Sound.getIndex(i)===0) {
                return i;
            }
        }
        throw new Error(`No space for more SoundIDs`+
            `in GameObjectDisplay ${this.owner.ID}`)
    }

    addId(id: number) {
        let index = this.freeIndex();
        this.row.Sound.setIndex(index,id);
        return this.owner;
    }

    get(index: number) {
        return SoundEntryRegistry.ref(this.owner, new CellIndexWrapper(this.owner, this.row.Sound, index));
    }

    add() {
        return this.get(this.freeIndex());
    }

    clearAll() {
        for(let i=0;i<this.length;++i) {
            this.row.Sound.setIndex(i,0);
        }
        return this.owner;
    }
}

export class GameObjectGeoBox extends ChildEntity<GameObjectDisplayInfoRow,GameObjectDisplay> {
    get MinX() { return this.ownerWrap(this.row.GeoBoxMinX); }
    get MaxX() { return this.ownerWrap(this.row.GeoBoxMaxX); }
    get MinY() { return this.ownerWrap(this.row.GeoBoxMinY); }
    get MaxY() { return this.ownerWrap(this.row.GeoBoxMaxY); }
    get MinZ() { return this.ownerWrap(this.row.GeoBoxMinZ); }
    get MaxZ() { return this.ownerWrap(this.row.GeoBoxMaxZ); }

    set(box: BoundingBox|number): GameObjectDisplay {
        if(typeof(box) === 'number') {
            return this.set(
                {minX:-box,minY:-box,minZ:-box,maxX:box,maxY:box,maxZ:box}
            )
        }
        this.MinX.set(box.minX);
        this.MinY.set(box.minY);
        this.MinZ.set(box.minZ);
        this.MaxX.set(box.maxX);
        this.MaxY.set(box.maxY);
        this.MaxZ.set(box.maxZ);
        return this.owner;
    }

    ToBoundingBox() {
        return new BoundingBox(
            this.MinX.get(),
            this.MinY.get(),
            this.MinZ.get(),
            this.MaxX.get(),
            this.MaxY.get(),
            this.MaxZ.get());
    }

    scale(x: number, y: number, z: number) {
        this.MinX.set(this.MinX.get()*x);
        this.MinY.set(this.MinX.get()*y);
        this.MinZ.set(this.MinX.get()*z);

        this.MaxX.set(this.MaxX.get()*x);
        this.MaxY.set(this.MaxY.get()*y);
        this.MaxZ.set(this.MaxZ.get()*z);
        return this.owner;
    }
}

export function cleanGameObjectDisplayRow(row: GameObjectDisplayInfoRow) {
    row
        .GeoBoxMaxX.set(0)
        .GeoBoxMaxY.set(0)
        .GeoBoxMaxZ.set(0)
        .GeoBoxMinX.set(0)
        .GeoBoxMinY.set(0)
        .GeoBoxMinZ.set(0)
        .ModelName.set("")
        .ObjectEffectPackageID.set(0)
        .Sound.set([0,0,0,0,0,0,0,0,0,0])
}

export class GameObjectDisplay extends MainEntity<GameObjectDisplayInfoRow> {
    clear(): this {
        this.ModelName.set("")
            .Sound.clearAll()
            .ObjectEffectPackage.set(0)
            .GeoBox.set(new BoundingBox(0,0,0,0,0,0))
        return this;
    }
    get ID() { return this.row.ID.get(); }
    get ModelName() { return this.wrap(this.row.ModelName); }
    get Sound() {
        return new GameObjectSounds(this);
    }
    get ObjectEffectPackage() {
        return this.wrap(this.row.ObjectEffectPackageID);
    }
    get GeoBox(): GameObjectGeoBox {
        return new GameObjectGeoBox(this as any);
    }
}