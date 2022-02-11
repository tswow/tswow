import { MultiRowSystem } from "wotlkdata/wotlkdata/cell/systems/MultiRowSystem";
import { GORegistry } from "../GameObject/GameObjectRegistries";
import { GameObjectChest } from "../GameObject/GameObjectTemplate";
import { Lock } from "../Locks/Lock";
import { LockRegistry } from "../Locks/Locks";
import { Profession } from "./Profession";

export class ProfessionGatheringNodes extends MultiRowSystem<GameObjectChest, Profession> {
    protected getAllRows(): GameObjectChest[] {
        return this.owner.GatheringSpells.get()
            .map(x=>x.Effects.findType(y=>y.OPEN_LOCK))
            .map(x=>x.LockType.getRef())
            .reduce<Lock[]>((p,c)=>p.concat(c?.Locks.get()),[])
            .reduce<GameObjectChest[]>((p,c)=>p.concat(c.References.Chests.get()),[])
    }
    protected isDeleted(value: GameObjectChest): boolean {
        return value.row.isDeleted();
    }

    add(mod: string, id: string, lockType: number, levelNeeded: number,itemsNeeded: number[], displayid: number) {
        let lock = LockRegistry.create().Requirements
            .addMod(i=>i
                .Type.LOCK_TYPE.set()
                .LockType.set(lockType)
                .RequiredSkill.set(levelNeeded)
            )
        if(itemsNeeded.length >= lock.Requirements.length-1) {
            throw new Error(
                  `Too many items needed:`
                + ` can only have ${lock.Requirements.length-1}`
                )
        }
        itemsNeeded.forEach(item=>{
            lock.Requirements.addMod(lock=>{
                lock.Type.ITEM.set()
                    .Item.set(item)
            })
        })
        GORegistry.Chests.create(mod,id)
            .IsConsumable.set(1)
            .Lock.set(lock.ID)
            .Display.set(displayid)
            .Size.set(1)
        return this.owner;
    }

    addGet(mod: string, id: string, lockType: number, level: number) {
        let lock = LockRegistry
            .create().Requirements
            .addMod(x=>x.Type.LOCK_TYPE.set()
                .LockType.set(lockType)
                .RequiredSkill.set(level)
            )
        let chest = GORegistry.Chests.create(mod,id)
            .IsConsumable.set(1)
            .Lock.set(lock.ID)
            .Size.set(1)
        return chest
    }

    addMod(mod: string, id: string, lockType: number, level: number, callback: (chest: GameObjectChest)=>void) {
        let chest = this.addGet(mod,id,lockType,level);
        callback(chest);
        return this.owner;
    }
}