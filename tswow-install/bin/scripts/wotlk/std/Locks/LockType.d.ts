import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { MultiRowSystem } from "../../../data/cell/systems/MultiRowSystem";
import { LockTypeRow } from "../../dbc/LockType";
import { MainEntity } from "../Misc/Entity";
import { Lock } from "./Lock";
export type LockTypeCursorType = "FishingCursor" | "PickLock" | "GatherHerbs" | "Mine" | string;
export declare class LockTypeCursor extends CellSystem<LockType> {
    constructor(owner: LockType);
    get(): LockTypeCursorType;
    set(type: LockTypeCursorType): LockType;
    setFishing(): LockType;
    setPicklock(): LockType;
    setGatherHerbs(): LockType;
    setMine(): LockType;
}
export declare class LockTypeLocks extends MultiRowSystem<Lock, LockType> {
    protected getAllRows(): Lock[];
    protected isDeleted(value: Lock): boolean;
    add(mod: string, name: string, requiredSkill: number, requiredItems?: number[]): Lock;
}
export declare class LockType extends MainEntity<LockTypeRow> {
    get ID(): number;
    get Name(): import("../../../data/cell/systems/CellSystem").WrappedLoc<this>;
    get ResourceName(): import("../../../data/cell/systems/CellSystem").WrappedLoc<this>;
    get Verb(): import("../../../data/cell/systems/CellSystem").WrappedLoc<this>;
    get Cursor(): LockTypeCursor;
    get Locks(): LockTypeLocks;
}
