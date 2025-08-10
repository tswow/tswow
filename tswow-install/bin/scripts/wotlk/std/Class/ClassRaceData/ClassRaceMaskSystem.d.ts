import { MaskCellWrite, MaskCon } from "../../../../data/cell/cells/MaskCell";
import { MultiRowSystem } from "../../../../data/cell/systems/MultiRowSystem";
import { IDeletable, MainEntity } from "../../Misc/Entity";
import { RaceMask } from "../../Race/RaceType";
import { ClassMask } from "../ClassRegistry";
export interface IClassRaceMaskEntry {
    readonly ClassMask: MaskCellWrite<this, typeof ClassMask>;
    readonly RaceMask: MaskCellWrite<this, typeof RaceMask>;
}
export declare abstract class ClassRaceMaskEntry<T extends IDeletable> extends MainEntity<T> implements IClassRaceMaskEntry {
    abstract get ClassMask(): MaskCellWrite<this, typeof ClassMask>;
    abstract get RaceMask(): MaskCellWrite<this, typeof RaceMask>;
}
export declare abstract class ClassRaceMaskSystemBase<E extends IClassRaceMaskEntry, T> extends MultiRowSystem<E, T> {
    clearClass(cls: MaskCon<keyof typeof ClassMask>): T;
    clearRace(race: MaskCon<keyof typeof RaceMask>): T;
    clearPair(cls: MaskCon<keyof typeof ClassMask>, race: MaskCon<keyof typeof RaceMask>): T;
}
export declare abstract class ClassRaceMaskSystem<E extends ClassRaceMaskEntry<R>, R extends IDeletable, T> extends ClassRaceMaskSystemBase<E, T> {
    protected abstract _addGet(classmask: number, racemask: number): E;
    addGet(classes: MaskCon<keyof typeof ClassMask>, races: MaskCon<keyof typeof RaceMask>): E;
    addMod(classes: MaskCon<keyof typeof ClassMask>, races: MaskCon<keyof typeof RaceMask>, callback: (entity: E) => void): T;
}
