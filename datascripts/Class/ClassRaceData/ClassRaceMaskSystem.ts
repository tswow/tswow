import { makeMask, MaskCellWrite, MaskCon } from "wotlkdata/wotlkdata/cell/cells/MaskCell";
import { MultiRowSystem } from "wotlkdata/wotlkdata/cell/systems/MultiRowSystem";
import { IDeletable, MainEntity } from "../../Misc/Entity";
import { RaceMask } from "../../Race/RaceType";
import { ClassMask } from "../ClassRegistry";

export interface IClassRaceMaskEntry {
    readonly ClassMask: MaskCellWrite<this,typeof ClassMask>
    readonly RaceMask: MaskCellWrite<this,typeof RaceMask>
}

export abstract class ClassRaceMaskEntry<T extends IDeletable>
extends MainEntity<T>
implements IClassRaceMaskEntry
{
    abstract get ClassMask(): MaskCellWrite<this,typeof ClassMask>
    abstract get RaceMask(): MaskCellWrite<this,typeof RaceMask>
}

export abstract class ClassRaceMaskSystemBase<E extends IClassRaceMaskEntry,T>
    extends MultiRowSystem<E,T>
{
    clearClass(cls: MaskCon<keyof typeof ClassMask>) {
        this.forEach(v=>{
            v.ClassMask.set(cls,'NOT')
        })
        return this.owner;
    }

    clearRace(race: MaskCon<keyof typeof RaceMask>) {
        let rmask = makeMask(RaceMask,race);
        this.forEach(v=>{
            v.RaceMask.set(v.RaceMask.get()&(~rmask>>>0));
        })
        return this.owner;
    }

    clearPair(cls: MaskCon<keyof typeof ClassMask>, race: MaskCon<keyof typeof RaceMask>) {
        this.forEach(v=>{
            if(v.ClassMask.hasAll(cls) && v.RaceMask.hasAll(race)) {
                v.ClassMask.set(cls,'NOT');
                v.RaceMask.set(race,'NOT');
            }
        })
        return this.owner;
    }
}

export abstract class ClassRaceMaskSystem<E extends ClassRaceMaskEntry<R>,R extends IDeletable,T> extends ClassRaceMaskSystemBase<E,T> {
    protected abstract _addGet(classmask: number, racemask: number): E;
    addGet(classes: MaskCon<keyof typeof ClassMask>, races: MaskCon<keyof typeof RaceMask>) {
        return this._addGet(makeMask(ClassMask,classes),makeMask(RaceMask,races));
    }

    addMod(classes: MaskCon<keyof typeof ClassMask>, races: MaskCon<keyof typeof RaceMask>, callback: (entity: E)=>void) {
        callback(this.addGet(classes,races));
        return this.owner;
    }
}