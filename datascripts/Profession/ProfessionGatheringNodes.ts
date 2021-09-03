import { CellSystem } from "wotlkdata/cell/systems/CellSystem";
import { GameObjectTemplates } from "../GameObject/GameObjects";
import { GameObjectChest } from "../GameObject/GameObjectTemplate";
import { Locks } from "../Locks/Locks";
import { Profession } from "./Profession";

export class ProfessionGatheringNodes extends CellSystem<Profession> {
    // TODO: upgrade to real MultiRowSystem to find existing nodes

    add(mod: string, id: string, lockId: number, levelNeeded: number) {
        let lock = Locks.createTypeInstance(lockId,levelNeeded)
        return GameObjectTemplates.create(mod,id)
            .Type.setChest()
            .IsConsumable.set(1)
            .Lock.setRefID(lock.ID)
    }

    addMod(mod: string, id: string, lockId: number, levelNeeded: number, callback: (gobj: GameObjectChest)=>void) {
        callback(this.add(mod,id,lockId,levelNeeded));
        return this.owner;
    }
}