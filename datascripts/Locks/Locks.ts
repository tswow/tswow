import { LockType } from "./LockType"
import { DBC } from "wotlkdata"
import { Ids } from "../Base/Ids"
import { SimpleLock } from "./SimpleLock"

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

export const Locks = {
    createType() {
        return new LockType(DBC.LockType.add(Ids.LockType.id()))
    },

    createItem(item: number) {
        return new SimpleLock(makeLock())
            .Type.setItem()
            .Index.set(item)
    },
    
    createTypeInstance(type: number, skill: number = 0) {
        return new SimpleLock(makeLock())
            .Type.setLockType()
            .Index.set(type)
            .Skill.set(skill)
    },
}