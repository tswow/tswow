import { DBC } from "wotlkdata";
import { LockQuery } from "wotlkdata/dbc/types/Lock";
import { LockTypeQuery } from "wotlkdata/dbc/types/LockType";
import { Ids } from "../Misc/Ids";
import { Lock } from "./Lock";
import { LockType } from "./LockType";

export const LockTypes = {
    filter(query: LockTypeQuery) {
        return DBC.LockType.filter(query).map(row=>new LockType(row));
    },

    load(id: number) {
        return new LockType(DBC.LockType.findById(id));
    },

    create(parent = 0) {
        return new LockType(
            parent > 0
            ? DBC.LockType.findById(parent).clone(Ids.LockType.id())
            : DBC.LockType.add(Ids.LockType.id())
        )
    }
}

export const Locks = {
    load(id: number) {
        let v = DBC.Lock.findById(id);
        return (v ? new Lock(v) : undefined) as Lock;
    },

    create(parent = 0) {
        return new Lock(
            parent > 0
            ? DBC.Lock.findById(parent).clone(Ids.Lock.id())
            : DBC.Lock.add(Ids.Lock.id())
        );
    },

    filter(query: LockQuery) {
        return DBC.Lock
            .filter(query)
            .map(x=>new Lock(x));
    },

    find(query: LockQuery) {
        let v = DBC.Lock.find(query);
        return (v ? new Lock(v) : undefined) as Lock;
    },

    forEach(callback: (lock: Lock)=>void) {
        this.filter({}).forEach(callback);
    },

    filterCb(callback: (lock: Lock)=>void) {
        return this.filter({}).filter(callback);
    },
}