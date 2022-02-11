
export enum ReputationRank {
    // (yes, the enum is also 0)
    HATED      = 0,
    HOSTILE    = 1,
    UNFRIENDLY = 2,
    NEUTRAL    = 3,
    FRIENDLY   = 4,
    HONORED    = 5,
    REVERED    = 6,
    EXALTED    = 7,
}

export enum ReputationRankMask {
    HATED      = 0x0,
    HOSTILE    = 0x1,
    UNFRIENDLY = 0x2,
    NEUTRAL    = 0x4,
    FRIENDLY   = 0x8,
    HONORED    = 0x10,
    REVERED    = 0x20,
    EXALTED    = 0x40,
}