import { LockTypeRow } from "wotlkdata/dbc/types/LockType";
import { MainSystem } from "wotlkdata/cell/MainSystem";
import { Subsystem } from "wotlkdata/cell/Subsystem";

export type LockTypeCursorType = "FishingCursor"|"PickLock"|"GatherHerbs"|"Mine"|string
export class LockTypeCursor extends Subsystem<LockType> {
    constructor(owner: LockType) {
        super(owner);
    }

    get(): LockTypeCursorType {
        return this.owner.row.CursorName.get();
    }

    set(type: LockTypeCursorType) {
        this.owner.row.CursorName.set(type);
        return this.owner;
    }

    setFishing() {
        return this.set('FishingCursor');
    }

    setPicklock() {
        return this.set('PickLock');
    }

    setGatherHerbs() {
        return this.set('GatherHerbs')
    }

    setMine() {
        return this.set('Mine');
    }
}

export class LockType extends MainSystem {
    readonly row: LockTypeRow;
    constructor(row: LockTypeRow) {
        super();
        this.row = row;
    }

    get ID() { return this.row.ID.get(); }
    get Name() { return this.wrapLoc(this.row.Name); }
    get ResourceName() { return this.wrapLoc(this.row.ResourceName); }
    get Verb() { return this.wrapLoc(this.row.Verb); }
    get Cursor() { return new LockTypeCursor(this); }
}