import { MultiRowSystem } from "wotlkdata/cell/systems/MultiRowSystem";
import { ClassMask } from "../../Misc/ClassMask";
import { MainEntity } from "../../Misc/Entity";
import { RaceMask } from "../../Misc/RaceMask";
import { makeRacemask, RaceMaskCon, RaceType } from "../../Race/RaceType";
import { ClassMaskCon, ClassType, makeClassmask } from "../ClassType";

export interface IClassRaceMaskEntry {
    readonly ClassMask: ClassMask<this>
    readonly RaceMask: RaceMask<this>
}

export abstract class ClassRaceMaskEntry<T>
extends MainEntity<T>
implements IClassRaceMaskEntry
{
    abstract get ClassMask(): ClassMask<this>
    abstract get RaceMask(): RaceMask<this>
}

export abstract class ClassRaceMaskSystemBase<E extends IClassRaceMaskEntry,T>
    extends MultiRowSystem<E,T>
{
    clearClass(cls: ClassMaskCon) {
        let cmask = makeClassmask(cls);
        this.forEach(v=>{
            v.ClassMask.set(v.ClassMask.get()&(~cmask>>>0));
        })
        return this.owner;
    }

    clearRace(race: RaceMaskCon) {
        let rmask = makeRacemask(race);
        this.forEach(v=>{
            v.RaceMask.set(v.RaceMask.get()&(~rmask>>>0));
        })
        return this.owner;
    }

    clearPair(cls: ClassType, race: RaceType) {
        this.forEach(v=>{
            if(v.ClassMask.getClass(cls) && v.RaceMask.getRace(race)) {
                v.ClassMask.setClass(cls,false);
                v.RaceMask.setRace(race,false);
            }
        })
        return this.owner;
    }
}

export abstract class ClassRaceMaskSystem<E extends ClassRaceMaskEntry<R>,R,T> extends ClassRaceMaskSystemBase<E,T> {
    protected abstract _addGet(classmask: number, racemask: number): E;
    addGet(classes: ClassMaskCon, races: RaceMaskCon) {
        return this._addGet(makeClassmask(classes),makeRacemask(races));
    }

    addMod(classes: ClassMaskCon, races: RaceMaskCon, callback: (entity: E)=>void) {
        callback(this.addGet(classes,races));
        return this.owner;
    }
}