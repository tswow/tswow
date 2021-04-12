import { LockRow } from "wotlkdata/dbc/types/Lock";
import { Enum, EnumField } from "wotlkdata/cell/systems/Enum";
import { SharedRef, SharedRefTable } from "../Refs/SharedRef";
import { AutoIdGenerator, Ids } from "../Base/Ids";
import { DBC } from "wotlkdata/dbc/DBCFiles";
import { BaseSystem } from "wotlkdata/cell/BaseSystem";

export class LockType<T extends BaseSystem> extends Enum<SimpleLock<T>> {
    @EnumField(0)
    setNone() { return this.set(0); }

    @EnumField(1)
    setItem() { return this.set(1); }

    @EnumField(2)
    setLockType() { return this.set(2); }
}

export class SimpleLock<T extends BaseSystem> extends SharedRef<T,LockRow>{
    table(): SharedRefTable<LockRow> {
        return DBC.Lock
    }
    ids(): AutoIdGenerator {
        return Ids.Lock;
    }
    clear(): this {
        this.Type.set(0)
        
        return this;
    }
    get ID() { return this.row.ID.get(); }
    get Type(): LockType<T> { return new LockType(this, this.wrapIndex(this.row.Type,0)); }
    get Skill() { return this.wrapIndex(this.row.Skill,0); }
    get Action() { return this.wrapIndex(this.row.Action,0); }
    get Index() { return this.wrapIndex(this.row.Index,0); }
}