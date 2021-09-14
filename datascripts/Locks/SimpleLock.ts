import { EnumCell } from "wotlkdata/cell/cells/EnumCell";
import { DBC } from "wotlkdata/dbc/DBCFiles";
import { LockRow } from "wotlkdata/dbc/types/Lock";
import { MainEntity } from "../Misc/Entity";
import { Ids } from "../Misc/Ids";
import { Ref } from "../Refs/Ref";

export class LockType extends EnumCell<SimpleLock> {
    /** Enum Value:                    0 */
    get None()     { return this.value(0) }
    /** Enum Value:                    1 */
    get Item()     { return this.value(1) }
    /** Enum Value:                    2 */
    get LockType() { return this.value(2) }
}

export class SimpleLock extends MainEntity<LockRow>{
    clear(): this {
        this.Type.set(0)
        return this;
    }
    get ID() { return this.row.ID.get(); }
    get Type(): LockType { return new LockType(this, this.wrapIndex(this.row.Type,0)); }
    get Skill() { return this.wrapIndex(this.row.Skill,0); }
    get Action() { return this.wrapIndex(this.row.Action,0); }
    get Index() { return this.wrapIndex(this.row.Index,0); }
}

export class SimpleLockPointer<T> extends Ref<T,SimpleLock> {
    exists(): boolean {
        return this.cell.get() > 0;
    }
    protected create(): SimpleLock {
        return new SimpleLock(DBC.Lock.add(Ids.Lock.id()))
    }
    protected clone(): SimpleLock {
        return new SimpleLock(this.resolve().row.clone(Ids.Lock.id()));
    }
    protected id(v: SimpleLock): number {
        return v.ID;
    }
    protected resolve(): SimpleLock {
        return new SimpleLock(DBC.Lock.findById(this.cell.get()));
    }
}