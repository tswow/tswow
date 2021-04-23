import { Subsystem } from "wotlkdata/cell/Subsystem";
import { Cell } from "wotlkdata/cell/Cell";

export class Vec3<T> extends Subsystem<T> {
    protected x: Cell<number,any>;
    protected y: Cell<number,any>;
    protected z: Cell<number,any>;

    constructor(owner: T, x: Cell<number,any>, y: Cell<number,any>, z: Cell<number,any>) {
        super(owner);
        this.x = x;
        this.y = y;
        this.z = z;
    }

    get X() { return this.ownerWrap(this.x); }
    get Y() { return this.ownerWrap(this.y); }
    get Z() { return this.ownerWrap(this.z); }

    set(x: number, y: number, z: number) {
        this.x.set(x);
        this.y.set(y);
        this.z.set(z);
        return this.owner;
    }
}