import { LockType } from "./LockType"
import { DBC } from "wotlkdata"
import { Ids } from "../Misc/Ids"
import { SimpleLock } from "./SimpleLock"
import { TopCell } from "../Refs/SharedRef";

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

    

    loadLock(id: number) {
        return new SimpleLock(DBC.Lock.findById(id),[new TopCell(id)]);
    },

    loadType(id: number) {
        return new LockType(DBC.LockType.findById(id));
    },

    createType() {
        return new LockType(DBC.LockType.add(Ids.LockType.id()))
    },

    createItem(item: number) {
        let lock = makeLock();
        return new SimpleLock(lock,[new TopCell(lock.ID.get())])
            .Type.setItem()
            .Index.set(item)
    },

    createEmpty() {
        let lock = makeLock();
        return new SimpleLock(lock,[new TopCell(lock.ID.get())])
    },
    
    createTypeInstance(type: number, skill: number = 0) {
        let lock = makeLock();
        return new SimpleLock(lock,[new TopCell(lock.ID.get())])
            .Type.setLockType()
            .Index.set(type)
            .Skill.set(skill)
    },
}