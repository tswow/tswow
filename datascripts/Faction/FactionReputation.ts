import { makeMask, makeMaskCell32, MaskCon } from "wotlkdata/wotlkdata/cell/cells/MaskCell";
import { ArrayEntry, ArraySystem } from "wotlkdata/wotlkdata/cell/systems/ArraySystem";
import { ClassMask } from "../Class/ClassRegistry";
import { RaceMask } from "../Race/RaceType";
import { Faction } from "./Faction";

export enum FactionReputationFlags {
    VISIBLE          = 0x1,
    AT_WAR           = 0x2,
    HIDDEN           = 0x4,
    INVISIBLE_FORCED = 0x8,
    PEACE_FORCED     = 0x10,
    INACTIVE         = 0x20,
    RIVAL            = 0x40,
    SPECIAL          = 0x80,
}

export class FactionReputation extends ArrayEntry<Faction> {
    get RaceMask() {
        return makeMaskCell32(RaceMask,this,this.wrapIndex(
              this.container.row.ReputationRaceMask
            , this.index
        ))
    }

    get ClassMask() {
        return makeMaskCell32(ClassMask,this,this.wrapIndex(
              this.container.row.ReputationClassMask
            , this.index
        ))
    }

    get StartReputation() {
        return this.wrapIndex(this.container.row.ReputationBase, this.index);
    }
    get Flags() {
        return makeMaskCell32(FactionReputationFlags,this, this.wrapIndex(this.container.row.ReputationFlags, this.index));
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

    addSimple(startReputation: number, races?: MaskCon<keyof typeof RaceMask>, classes?: MaskCon<keyof typeof ClassMask>, flags: MaskCon<keyof typeof FactionReputationFlags> = []) {
        this.addGet()
            .StartReputation.set(startReputation)
            .ClassMask.set(makeMask(ClassMask,classes))
            .RaceMask.set(makeMask(RaceMask,races))
            .Flags.set(makeMask(FactionReputationFlags,flags))
        return this.owner;
    }
}