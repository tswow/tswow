import { ArrayEntry, SystemArray } from "wotlkdata/cell/Systems/SystemArray";
import { Talent } from "./Talent";

export class TalentRequirement extends ArrayEntry<Talent> {

    clear(): Talent {
        this.owner.row.PrereqTalent.setIndex(this.index, 0);
        this.owner.row.PrereqRank.setIndex(this.index, 0);
        return this.owner;
    }

    isClear(): boolean {
        return this.owner.row.PrereqTalent.getIndex(this.index) !== 0;
    }

    get Talent() { return this.ownerWrapIndex(this.owner.row.PrereqTalent, this.index); }
    get Rank() { return this.ownerWrapIndex(this.owner.row.PrereqRank, this.index); }

    set(talent: number, rank: number) {
        this.Talent.set(talent);
        this.Rank.set(rank);
        return this.owner;
    }
}

export class TalentRequirements extends SystemArray<TalentRequirement, Talent> {
    get length(): number {
        return 3;
    }

    get(index: number): TalentRequirement {
        return new TalentRequirement(this.owner, index);
    }

    add(talent: number, rank: number) {
        this.getFree().set(talent, rank);
        return this.owner;
    }
}