import { ArrayEntry, ArraySystem } from "wotlkdata/cell/systems/ArraySystem";
import { Ids } from "../Misc/Ids";
import { ClassType, makeClassmask } from "../Class/ClassType";
import { makeRacemask, RaceType } from "../Race/RaceType";
import { Faction } from "./Faction";
import { MaskCell32 } from "wotlkdata/cell/cells/MaskCell";

export class FactionReputationFlags extends MaskCell32<FactionReputation> {
    get Visible() { return this.bit(0); }
    get AtWar() { return this.bit(1); }
    get Hidden() { return this.bit(2); }
    get InvisibleForced() { return this.bit(3); }
    get PeaceForced() { return this.bit(4); }
    get Inactive() { return this.bit(5); }
    get Rival() { return this.bit(6); }
    get Special() { return this.bit(7); }
}

type ReputationFlag = 'Visible'|'AtWar'|'Hidden'|'InvisibleForced'|'PeaceForced'|'Inactive'|'Rival'|'Special'

export class FactionReputation extends ArrayEntry<Faction> {
    get RaceMask() { return this.wrapIndex(this.container.row.ReputationRaceMask, this.index); }
    get ClassMask() { return this.wrapIndex(this.container.row.ReputationClassMask, this.index); }
    get StartReputation() { return this.wrapIndex(this.container.row.ReputationBase, this.index); }
    get Flags() { return new FactionReputationFlags(this, this.wrapIndex(this.container.row.ReputationFlags, this.index)); }

    removeRaces(races: RaceType[]) {
        this.RaceMask.set(this.RaceMask.get()&(~makeRacemask(races)));
        return this;
    }

    removeClasses(classes: ClassType[]) {
        this.ClassMask.set(this.ClassMask.get()&(~makeClassmask(classes)));
        return this;
    }

    addRaces(race: RaceType[]) {
        this.RaceMask.set(this.RaceMask.get()|makeRacemask(race));
        return this;
    }

    addClasses(classes: ClassType[]) {
        this.ClassMask.set(this.ClassMask.get()|makeClassmask(classes));
        return this;
    }

    clear() {
        this.RaceMask.set(0);
        this.ClassMask.set(0);
        this.StartReputation.set(0);
        return this;
    }

    isClear(): boolean {
        return this.RaceMask.get()===0 && this.ClassMask.get()===0 && this.StartReputation.get()===0
    }
}

export class FactionReputations extends ArraySystem<FactionReputation,Faction>{
    get length(): number {
        return 4;
    }

    get(index: number): FactionReputation {
        return new FactionReputation(this.owner, index);
    }

    assignID(mod: string, id: string) {
        if(this.owner.row.ReputationIndex.get() !== -1) {
            throw new Error(`Faction ${this.owner.ID} already has a reputation ID`)
        }

        this.owner.row.ReputationIndex.set(Ids.ReputationIndex.id(mod, id));

        return this.owner;
    }

    getFree() {
        return super.getFree();
    }

    modFree(callback: (reputation: FactionReputation)=>void = ()=>{}) {
        callback(this.getFree());
        return this.owner;
    }

    addSimple(startReputation: number, races: RaceType[] = [], classes: ClassType[] = [], flags: ReputationFlag[] = []) {
        if(this.owner.row.ReputationIndex.get() == -1) {
            throw new Error(
                  `Reputation is not enabled for faction ${this.owner.row.ID.get()}`
                + `, use Faction.Reputation.assignID`
                )
        }

        let rep = this.getFree()
            .StartReputation.set(startReputation)
            .addClasses(classes)
            .addRaces(races)

        flags.forEach(x=>{
            switch(x) {
                case 'AtWar':
                    rep.Flags.AtWar.mark()
                    break;
                case 'Hidden':
                    rep.Flags.Hidden.mark()
                    break;
                case 'Inactive':
                    rep.Flags.Inactive.mark()
                    break;
                case 'InvisibleForced':
                    rep.Flags.InvisibleForced.mark()
                    break;
                case 'PeaceForced':
                    rep.Flags.PeaceForced.mark()
                    break;
                case 'Rival':
                    rep.Flags.Rival.mark()
                    break;
                case 'Special':
                    rep.Flags.Special.mark()
                    break;
                case 'Visible':
                    rep.Flags.Visible.mark()
                    break;
            }
        })
        return this.owner;
    }
}