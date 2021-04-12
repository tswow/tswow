import { Subsystem } from "wotlkdata/cell/Subsystem";
import { GameObjectDisplayInfoRow } from "wotlkdata/dbc/types/GameObjectDisplayInfo";
import { Ids, AutoIdGenerator } from "../Base/Ids";
import { BoundingBox } from "../Misc/BoundingBox";
import { CellIndexWrapper } from "wotlkdata/cell/Cell";
import { SoundEntry } from "../sound/SoundEntry";
import { BaseSystem } from "wotlkdata/cell/BaseSystem";
import { SharedRef, SharedRefTable } from "../Refs/SharedRef";
import { DBC } from "wotlkdata";

export class GameObjectSounds<T extends BaseSystem> extends Subsystem<GameObjectDisplay<T>> {
    get length(): number { return 10; }

    getId(index: number) {
        return this.owner.row.Sound.getIndex(index);
    }

    setId(index: number, id: number) {
        this.owner.row.Sound.setIndex(index,id);
        return this.owner;
    }

    freeIndex() {
        for(let i=0;i<this.length;++i) {
            if(this.owner.row.Sound.getIndex(i)===0) {
                return i;
            }
        }
        throw new Error(`No space for more SoundIDs`+
            `in GameObjectDisplay ${this.owner.ID}`)
    }

    addId(id: number) {
        let index = this.freeIndex();
        this.owner.row.Sound.setIndex(index,id);
        return this.owner;
    }

    get(index: number) {
        return new SoundEntry(this.owner, new CellIndexWrapper(this.owner, this.owner.row.Sound, index));
    }

    add() {
        return this.get(this.freeIndex());
    }

    clearAll() {
        for(let i=0;i<this.length;++i) {
            this.owner.row.Sound.setIndex(i,0);
        }
        return this.owner;
    }
}

export class GameObjectGeoBox<T extends BaseSystem> extends Subsystem<GameObjectDisplay<T>> {
    get MinX() { return this.ownerWrap(this.owner.row.GeoBoxMinX); }
    get MaxX() { return this.ownerWrap(this.owner.row.GeoBoxMaxX); }
    get MinY() { return this.ownerWrap(this.owner.row.GeoBoxMinY); }
    get MaxY() { return this.ownerWrap(this.owner.row.GeoBoxMaxY); }
    get MinZ() { return this.ownerWrap(this.owner.row.GeoBoxMinZ); }
    get MaxZ() { return this.ownerWrap(this.owner.row.GeoBoxMaxZ); }

    set(box: BoundingBox) {
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

export class GameObjectDisplay<T extends BaseSystem> extends SharedRef<T, GameObjectDisplayInfoRow> {
    table(): SharedRefTable<GameObjectDisplayInfoRow> {
        return DBC.GameObjectDisplayInfo;
    }
    ids(): AutoIdGenerator {
        return Ids.GameObjectDisplay;
    }
    zeroFill(): this {
        this.ModelName.set("")
            .Sound.clearAll()
            .ObjectEffectPackageID.set(0)
            .GeoBox.set(new BoundingBox(0,0,0,0,0,0))

        return this;
    }

    get ID() { return this.row.ID.get(); }
    get ModelName() { return this.wrap(this.row.ModelName); }
    get SoundID() { return this.wrapArray(this.row.Sound); }
    get Sound(): GameObjectSounds<T> { return new GameObjectSounds(this); }
    get ObjectEffectPackageID() { return this.wrap(this.row.ObjectEffectPackageID); }
    get GeoBox(): GameObjectGeoBox<GameObjectDisplay<T>> { return new GameObjectGeoBox<GameObjectDisplay<T>>(this as any); }

    clone() {
        let id = this.row.clone(Ids.GameObjectDisplay.id()).ID.get();
        this.cell.set(id);
        return new GameObjectDisplay(this.owner, [this.cell]);
    }
}