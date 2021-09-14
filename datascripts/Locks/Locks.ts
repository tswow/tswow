import { DBC } from "wotlkdata";
import { LockTypeQuery } from "wotlkdata/dbc/types/LockType";
import { Ids } from "../Misc/Ids";
import { LockType } from "./LockType";
import { SimpleLock } from "./SimpleLock";

function makeLock() {
    let lock = DBC.Lock.add(Ids.Lock.id());
    for(let i=0;i<6;++i) {
        lock.Action.setIndex(i,0);
        lock.Index.setIndex(i,0);
        lock.Skill.setIndex(i,0);
        lock.Type.setIndex(i,0);
    }
    return lock;
}

export const LockTypes = {
    filter(query: LockTypeQuery) {
        return DBC.LockType.filter(query).map(row=>new LockType(row));
    },

    load(id: number) {
        return new LockType(DBC.LockType.findById(id));
    },

    create() {
        return new LockType(DBC.LockType.add(Ids.LockType.id()))
    }
}

export const Locks = {
    loadLock(id: number) {
        return new SimpleLock(DBC.Lock.findById(id));
    },

    loadType(id: number) {
        return new LockType(DBC.LockType.findById(id));
    },

    createItem(item: number) {
        let lock = makeLock();
        return new SimpleLock(lock)
            .Type.Item.set()
            .Index.set(item)
    },

    createEmpty() {
        return new SimpleLock(makeLock())
    },

    createTypeInstance(type: number, skill: number = 0) {
        return new SimpleLock(makeLock())
            .Type.LockType.set()
            .Index.set(type)
            .Skill.set(skill)
    },
}