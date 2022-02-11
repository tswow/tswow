import { Cell } from "../../../data/cell/cells/Cell";
import { Transient } from "../../../data/cell/serialization/Transient";
import { CellSystem } from "../../../data/cell/systems/CellSystem";

export class MinMaxCell<T> extends CellSystem<T> {
    @Transient
    protected minCell: Cell<number,any>;

    @Transient
    protected maxCell: Cell<number,any>;


    constructor(owner: T,minCell: Cell<number,any>, maxCell: Cell<number,any>) {
        super(owner);
        this.minCell = minCell;
        this.maxCell = maxCell;
    }

    get Min() { return this.ownerWrap(this.minCell); }
    get Max() { return this.ownerWrap(this.maxCell); }

    is(min: number, max: number) {
        return this.Min.get() === min && this.Max.get() === max;
    }

    isWithin(lowerMin: number, upperMax: number) {
        return this.isAbove(lowerMin) && this.isBelow(upperMax);
    }

    isAbove(lowerMin: number) {
        return this.Min.get() >= lowerMin
    }

    isBelow(upperMax: number) {
        return this.Max.get() <= upperMax;
    }

    set(min: number, max: number) {
        this.Min.set(min);
        this.Max.set(max);
        return this.owner;
    }
}

export class MinMaxTargetCell<T> extends CellSystem<T> {
    @Transient
    protected minCell: Cell<number,any>;

    @Transient
    protected targetCell: Cell<number,any>;

    @Transient
    protected maxCell: Cell<number,any>;


    constructor(owner: T,minCell: Cell<number,any>, targetCell: Cell<number,any>, maxCell: Cell<number,any>) {
        super(owner);
        this.minCell = minCell;
        this.targetCell = targetCell;
        this.maxCell = maxCell;
    }

    get Min() { return this.ownerWrap(this.minCell); }
    get Target() { return this.ownerWrap(this.targetCell); }
    get Max() { return this.ownerWrap(this.maxCell); }

    isWithin(lowerMin: number, upperMax: number) {
        return this.isAbove(lowerMin) && this.isBelow(upperMax);
    }

    isAbove(lowerMin: number) {
        return this.Min.get() >= lowerMin
    }

    isBelow(upperMax: number) {
        return this.Max.get() <= upperMax;
    }

    set(min: number, target: number, max: number) {
        this.Min.set(min);
        this.Target.set(target);
        this.Max.set(max);
        return this.owner;
    }
}

export class MinMax2DCell<T> extends CellSystem<T> {
    @Transient
    protected minX: Cell<number,any>
    @Transient
    protected minY: Cell<number,any>

    @Transient
    protected maxX: Cell<number,any>
    @Transient
    protected maxY: Cell<number,any>

    constructor(
          owner: T
        , minX: Cell<number,any>
        , minY: Cell<number,any>
        , maxX: Cell<number,any>
        , maxY: Cell<number,any>
    ) {
        super(owner);
        this.minX = minX;
        this.minY = minY;
        this.maxX = maxX;
        this.maxY = maxY;
    }

    get MinX() { return this.ownerWrap(this.minX); }
    get MinY() { return this.ownerWrap(this.minY); }
    get MaxX() { return this.ownerWrap(this.maxX); }
    get MaxY() { return this.ownerWrap(this.maxY); }

    set(minX: number, minY: number, maxX: number, maxY: number) {
        this.MinX.set(minX);
        this.MinY.set(minY);
        this.MaxX.set(maxX)
        this.MaxY.set(maxY)
        return this.owner;
    }
}

export class Boundary<T> extends CellSystem<T> {
    @Transient
    protected left: Cell<number,any>
    @Transient
    protected top: Cell<number,any>
    @Transient
    protected right: Cell<number,any>
    @Transient
    protected bottom: Cell<number,any>

    constructor(
        owner: T
        , left: Cell<number,any>
        , top: Cell<number,any>
        , right: Cell<number,any>
        , bottom: Cell<number,any>
    )
    {
        super(owner);
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
    }

    GetMiddle() {
        return {
              x : Math.max(this.Left.get(),this.Right.get())
              -   Math.min(this.Left.get(),this.Right.get())
            , y : Math.max(this.Bottom.get(),this.Top.get())
              -   Math.min(this.bottom.get(),this.Top.get())
        }
    }

    get Left() { return this.ownerWrap(this.left) }
    get Top() { return this.ownerWrap(this.top); }
    get Right() { return this.ownerWrap(this.right); }
    get Bottom() { return this.ownerWrap(this.bottom); }

    set(left: number, top: number, right: number, bottom: number) {
        this.Left.set(left);
        this.Top.set(top);
        this.Right.set(right);
        this.Bottom.set(bottom);
        return this.owner;
    }
}

export class HorizontalBoundary<T> extends CellSystem<T> {
    @Transient
    protected left: Cell<number,any>

    @Transient
    protected right: Cell<number,any>

    constructor(
        owner: T
        , left: Cell<number,any>
        , right: Cell<number,any>
    )
    {
        super(owner);
        this.left = left;
        this.right = right;
    }

    GetMiddle() {
        return  Math.max(this.Left.get(),this.Right.get())
              - Math.min(this.Left.get(),this.Right.get())
    }

    get Left() { return this.ownerWrap(this.left) }
    get Right() { return this.ownerWrap(this.right); }

    set(left: number, right: number) {
        this.Left.set(left);
        this.Right.set(right);
        return this.owner;
    }
}