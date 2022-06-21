import { Cell } from "../../../data/cell/cells/Cell";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { BoundingBox } from "./BoundingBox";

export class GeoBox<T> extends CellSystem<T> {
    private minx: Cell<number,any>;
    private maxx: Cell<number,any>;
    private miny: Cell<number,any>;
    private maxy: Cell<number,any>;
    private minz: Cell<number,any>;
    private maxz: Cell<number,any>;

    constructor(
        owner: T,
        minx: Cell<number,any>,
        maxx: Cell<number,any>,
        miny: Cell<number,any>,
        maxy: Cell<number,any>,
        minz: Cell<number,any>,
        maxz: Cell<number,any>,
    ) {
        super(owner);
        this.minx = minx;
        this.maxx = maxx;
        this.miny = miny;
        this.maxy = maxy;
        this.minz = minz;
        this.maxz = maxz;
    }

    get MinX() { return this.ownerWrap(this.minx); }
    get MaxX() { return this.ownerWrap(this.maxx); }
    get MinY() { return this.ownerWrap(this.miny); }
    get MaxY() { return this.ownerWrap(this.maxy); }
    get MinZ() { return this.ownerWrap(this.minz); }
    get MaxZ() { return this.ownerWrap(this.maxz); }

    set(box: BoundingBox|number): T {
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
