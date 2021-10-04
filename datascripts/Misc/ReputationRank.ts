import { EnumCell } from "wotlkdata/cell/cells/EnumCell";
import { MaskCell32, MaskCell32ReadOnly } from "wotlkdata/cell/cells/MaskCell";

export const REP_RANKS = {
    // (yes, the enum is also 0)
      'HATED'      : 0
    , 'HOSTILE'    : 1
    , 'UNFRIENDLY' : 2
    , 'NEUTRAL'    : 3
    , 'FRIENDLY'   : 4
    , 'HONORED'    : 5
    , 'REVERED'    : 6
    , 'EXALTED'    : 7
} as const

export type ReputationRank = keyof typeof REP_RANKS

export function makeReputationRankMask(ranks: (ReputationRank|number)[]) {
    return ranks.reduce<number>((p,c)=>
          p|(1<<(typeof(c) === 'number'
            ? c
            : REP_RANKS[c]))
        , 0)
}

export class ReputationRankEnum<T> extends EnumCell<T> {
    get Hated()      { return this.value(REP_RANKS.HATED); }
    get Hostile()    { return this.value(REP_RANKS.HOSTILE); }
    get Unfriendly() { return this.value(REP_RANKS.UNFRIENDLY); }
    get Friendly()   { return this.value(REP_RANKS.FRIENDLY); }
    get Honored()    { return this.value(REP_RANKS.HONORED); }
    get Revered()    { return this.value(REP_RANKS.REVERED); }
    get Exalted()    { return this.value(REP_RANKS.EXALTED); }
}

export class ReputationRankMask<T> extends MaskCell32<T> {
    get Hated()      { return this.bit(REP_RANKS.HATED); }
    get Hostile()    { return this.bit(REP_RANKS.HOSTILE); }
    get Unfriendly() { return this.bit(REP_RANKS.UNFRIENDLY); }
    get Neutral()    { return this.bit(REP_RANKS.NEUTRAL); }
    get Friendly()   { return this.bit(REP_RANKS.FRIENDLY); }
    get Honored()    { return this.bit(REP_RANKS.UNFRIENDLY); }
    get Revered()    { return this.bit(REP_RANKS.REVERED); }
    get Exalted()    { return this.bit(REP_RANKS.EXALTED); }
}

export class ReputationRankMaskReadOnly<T> extends MaskCell32ReadOnly<T> {
    get Hated()      { return this.bit(REP_RANKS.HATED); }
    get Hostile()    { return this.bit(REP_RANKS.HOSTILE); }
    get Unfriendly() { return this.bit(REP_RANKS.UNFRIENDLY); }
    get Neutral()    { return this.bit(REP_RANKS.NEUTRAL); }
    get Friendly()   { return this.bit(REP_RANKS.FRIENDLY); }
    get Honored()    { return this.bit(REP_RANKS.HONORED); }
    get Revered()    { return this.bit(REP_RANKS.REVERED); }
    get Exalted()    { return this.bit(REP_RANKS.EXALTED); }
}