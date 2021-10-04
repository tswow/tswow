import { MaskCell32 } from "wotlkdata/cell/cells/MaskCell";
import { ArrayEntry, ArraySystem } from "wotlkdata/cell/systems/ArraySystem";
import { ClassMaskCon, makeClassmask } from "../Class/ClassType";
import { ClassMask } from "../Misc/ClassMask";
import { RaceMask } from "../Misc/RaceMask";
import { makeRacemask, RaceMaskCon } from "../Race/RaceType";
import { Faction } from "./Faction";

export const REPUTATION_BITS = {
      VISIBLE          : 0
    , AT_WAR           : 1
    , HIDDEN           : 2
    , INVISIBLE_FORCED : 3
    , PEACE_FORCED     : 4
    , INACTIVE         : 5
    , RIVAL            : 6
    , SPECIAL          : 7
} as const

export type ReputationFlag = keyof typeof REPUTATION_BITS

export function makeReputationFlag(flags: ReputationFlag|ReputationFlag[]) {
    if(!Array.isArray(flags)) flags = [flags];
    return flags.reduce((p,c)=>p|(1<<REPUTATION_BITS[c]),0)
}

export class FactionReputationFlags extends MaskCell32<FactionReputation> {
    get Visible()         { return this.bit(REPUTATION_BITS.VISIBLE); }
    get AtWar()           { return this.bit(REPUTATION_BITS.AT_WAR); }
    get Hidden()          { return this.bit(REPUTATION_BITS.HIDDEN); }
    get InvisibleForced() { return this.bit(REPUTATION_BITS.INVISIBLE_FORCED); }
    get PeaceForced()     { return this.bit(REPUTATION_BITS.PEACE_FORCED); }
    get Inactive()        { return this.bit(REPUTATION_BITS.INACTIVE); }
    get Rival()           { return this.bit(REPUTATION_BITS.RIVAL); }
    get Special()         { return this.bit(REPUTATION_BITS.SPECIAL); }
}

export class FactionReputation extends ArrayEntry<Faction> {
    get RaceMask() {
        return new RaceMask(this,this.wrapIndex(
              this.container.row.ReputationRaceMask
            , this.index
        ))
    }

    get ClassMask() {
        return new ClassMask(this,this.wrapIndex(
              this.container.row.ReputationClassMask
            , this.index
        ))
    }

    get StartReputation() {
        return this.wrapIndex(this.container.row.ReputationBase, this.index);
    }
    get Flags() {
        return new FactionReputationFlags(this, this.wrapIndex(this.container.row.ReputationFlags, this.index));
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

    addGet() {
        if(!this.owner.ReputationIndex.exists()) {
            throw new Error(
                  `Reputation is not enabled for faction`
                + ` ${this.owner.ID}.`
                + ` Please use Faction.ReputationIndex.assign`
            )
        }
        return super.addGet();
    }

    addMod(callback: (reputation: FactionReputation)=>void = ()=>{}) {
        callback(this.addGet());
        return this.owner;
    }

    addSimple(startReputation: number, races?: RaceMaskCon, classes?: ClassMaskCon, flags: ReputationFlag[] = []) {
        this.addGet()
            .StartReputation.set(startReputation)
            .ClassMask.set(makeClassmask(classes))
            .RaceMask.set(makeRacemask(races))
            .Flags.set(makeReputationFlag(flags))

        return this.owner;
    }
}