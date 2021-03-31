import { Subsystem } from "wotlkdata/cell/Subsystem";
import { ArrayEntry, SystemArray } from "wotlkdata/cell/systems/SystemArray";
import { GameObjectDisplayInfoRow } from "wotlkdata/dbc/types/GameObjectDisplayInfo";
import { Ids } from "../Base/Ids";
import { MainEntity } from "../Base/MainEntity";
import { BoundingBox } from "../Misc/BoundingBox";

export class GameObjectSound extends ArrayEntry<GameObjectDisplay> {
    get Sound() { return this.wrapIndex(this.owner.row.Sound,this.index)}

    clear(): GameObjectDisplay {
        this.Sound.set(0);
        return this.owner;
    }
    isClear(): boolean {
        return this.Sound.get()===0;
    }
}

export class GameObjectSounds extends SystemArray<GameObjectSound,GameObjectDisplay> {
    get length(): number { return 10; }
    get(index: number): GameObjectSound {
        return new GameObjectSound(this.owner, index); 
    }
}

export class GameObjectGeoBox extends Subsystem<GameObjectDisplay> {
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

export class GameObjectDisplay extends MainEntity<GameObjectDisplayInfoRow> {
    get ModelName() { return this.wrap(this.row.ModelName); }
    get Sound() { return new GameObjectSounds(this); }
    get ObjectEffectPackageID() { return this.wrap(this.row.ObjectEffectPackageID); }
    get GeoBox() { return new GameObjectGeoBox(this); }

    clone() {
        return new GameObjectDisplay(this.row.clone(Ids.GameObjectDisplay.id()));
    }
}