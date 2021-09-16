import { MaskCell32, MaskCell32ReadOnly } from "wotlkdata/cell/cells/MaskCell";

export const ReputationRanks = [
      'HATED'
    , 'HOSTILE'
    , 'UNFRIENDLY'
    , 'NEUTRAL'
    , 'FRIENDLY'
    , 'HONORED'
    , 'REVERED'
    , 'EXALTED'
] as const

export type ReputationRank = typeof ReputationRanks[number]

export function makeReputationRankMask(ranks: (ReputationRank|number)[]) {
    return ranks.reduce<number>((p,c)=>
          p|(1<<(typeof(c) === 'number'
            ? c
            : ReputationRanks.indexOf(c)))
        , 0)
}

export class ReputationRankMask<T> extends MaskCell32<T> {
    get Hated() { return this.bit(0); }
    get Hostile() { return this.bit(1); }
    get Unfriendly() { return this.bit(2); }
    get Neutral() { return this.bit(3); }
    get Friendly() { return this.bit(4); }
    get Honored() { return this.bit(5); }
    get Revered() { return this.bit(6); }
    get Exalted() { return this.bit(7); }
}

export class ReputationRankMaskReadOnly<T> extends MaskCell32ReadOnly<T> {
    get Hated() { return this.bit(0); }
    get Hostile() { return this.bit(1); }
    get Unfriendly() { return this.bit(2); }
    get Neutral() { return this.bit(3); }
    get Friendly() { return this.bit(4); }
    get Honored() { return this.bit(5); }
    get Revered() { return this.bit(6); }
    get Exalted() { return this.bit(7); }
}