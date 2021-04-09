import { MainSystem } from "wotlkdata/cell/MainSystem";
import { LockRow } from "wotlkdata/dbc/types/Lock";
import { Enum, EnumField } from "wotlkdata/cell/systems/Enum";
import { AutoIdGenerator, Ids } from "../Base/Ids";
import { BaseSystem } from "wotlkdata/cell/BaseSystem";

export class LockType extends Enum<SimpleLock> {
    @EnumField(0)
    setNone() { return this.set(0); }

    @EnumField(1)
    setItem() { return this.set(1); }

    @EnumField(2)
    setLockType() { return this.set(2); }
}

export class SimpleLock extends MainSystem {
    readonly row: LockRow;

    constructor(row: LockRow) {
        super();
        this.row = row;
    }

    get ID() { return this.row.ID.get(); }
    get Type() { return new LockType(this, this.wrapIndex(this.row.Type,0)); }
    get Skill() { return this.wrapIndex(this.row.Skill,0); }
    get Action() { return this.wrapIndex(this.row.Action,0); }
    get Index() { return this.wrapIndex(this.row.Index,0); }
}