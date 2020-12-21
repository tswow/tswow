import { ArrayEntry, SystemArray } from "wotlkdata/cell/Systems/SystemArray";
import { Ids } from "../Base/Ids";
import { ClassType, makeClassmask } from "../Class/ClassType";
import { makeRacemask, RaceType } from "../Race/RaceType";
import { Faction } from "./Faction";

export class FactionReputation extends ArrayEntry<Faction> {
    get RaceMask() { return this.wrapIndex(this.owner.row.ReputationRaceMask, this.index); }
    get ClassMask() { return this.wrapIndex(this.owner.row.ReputationClassMask, this.index); }
    get BaseValue() { return this.wrapIndex(this.owner.row.ReputationBase, this.index); }

    clear(): Faction {
        this.RaceMask.set(0);
        this.ClassMask.set(0);
        this.BaseValue.set(0);
        return this.owner;
    }
    isClear(): boolean {
        return this.RaceMask.get()===0 && this.ClassMask.get()===0 && this.BaseValue.get()===0
    }
}

export class FactionReputations extends SystemArray<FactionReputation,Faction>{
    get length(): number {
        return 4;
    }

    get(index: number): FactionReputation {
        return new FactionReputation(this.owner, index);
    }

    enable(mod: string, id: string) {
        if(this.owner.row.ReputationIndex.get()==-1) {
            this.owner.row.ReputationIndex.set(Ids.ReputationIndex.id(mod, id));
        }
        return this.owner;
    }

    add(baseValue: number, races: RaceType[] = [], classes: ClassType[] = []) {
        this.getFree()
            .BaseValue.set(baseValue)
            .ClassMask.set(makeClassmask(classes))
            .RaceMask.set(makeRacemask(races))
        return this.owner;
    }
}