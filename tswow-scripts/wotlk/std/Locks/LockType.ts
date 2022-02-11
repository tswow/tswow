import { Transient } from "../../../data/cell/serialization/Transient";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { MultiRowSystem } from "../../../data/cell/systems/MultiRowSystem";
import { LockTypeRow } from "../../dbc/LockType";
import { MainEntity } from "../Misc/Entity";
import { Lock } from "./Lock";
import { LockRegistry } from "./Locks";

export type LockTypeCursorType = "FishingCursor"|"PickLock"|"GatherHerbs"|"Mine"|string
export class LockTypeCursor extends CellSystem<LockType> {
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

export class LockTypeLocks extends MultiRowSystem<Lock,LockType> {
    protected getAllRows(): Lock[] {
        return LockRegistry.filter(x=>x.Requirements.requiresType(this.owner.ID))
    }

    protected isDeleted(value: Lock): boolean {
        return value.row.isDeleted();
    }

    add(requiredSkill: number, requiredItems: number[] = []) {
        let locks = LockRegistry.create().Requirements
            .addMod(i=>i
                .Type.LOCK_TYPE.set()
                .LockType.set(this.owner.ID)
                .RequiredSkill.set(requiredSkill)
            )
        if(requiredItems.length >= locks.Requirements.length-1) {
            throw new Error(
                  `Adding too many item to lock (${requiredItems.length})`
                + `: can only add ${locks.Requirements.length-1}`
            )
        }
        requiredItems.forEach(x=>locks.Requirements.addGet()
            .Type.ITEM.set()
            .Item.set(x)
        )
        return locks;
    }
}

export class LockType extends MainEntity<LockTypeRow> {
    get ID() { return this.row.ID.get(); }
    get Name() { return this.wrapLoc(this.row.Name); }
    get ResourceName() { return this.wrapLoc(this.row.ResourceName); }
    get Verb() { return this.wrapLoc(this.row.Verb); }
    get Cursor() { return new LockTypeCursor(this); }
    @Transient
    get Locks() { return new LockTypeLocks(this); }
}