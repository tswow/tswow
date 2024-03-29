/**
 * Note that some flags may not be supported by the core
 * TODO: I read these from my phone screen, so they might be inaccurate.
 */
export enum QuestFlags {
    STAY_ALIVE               = 0x1,
    PARTY_ACCEPT             = 0x2,
    EXPLORATION              = 0x4,
    SHARABLE                 = 0x8,
    HAS_CONDITION            = 0x10,
    HIDE_REWARD_POI        = 0x20,
    RAID                     = 0x40,
    TBC                    = 0x80,
    NO_MONEY_FROM_XP        = 0x100,
    HIDDEN_REWARDS           = 0x200,
    TRACKING                 = 0x400,
    DEPRECATE_REPUTATION     = 0x800,
    DAILY                    = 0x1000,
    PVP                     = 0x2000,
    UNAVAILABLE              = 0x4000,
    WEEKLY                   = 0x8000,
    AUTOCOMPLETE             = 0x10000,
    SHOW_ITEM_IN_TRACKER     = 0x20000,
    OBJ_TEXT                 = 0x40000,
    AUTO_ACCEPT              = 0x80000,
    CAST_ON_ACCEPT           = 0x100000,
    CAST_ON_COMPLETE         = 0x200000,
    UPDATE_PHASE_SHIFT       = 0x400000,
    SOR_WHITELIST            = 0x800000,
    LAUNCH_GOSSIP_COMPLETE   = 0x1000000,
    REMOVE_EXTRA_GET_ITEMS   = 0x2000000,
    HIDE_UNTIL_DISCOVERED    = 0x4000000,
    PORTRAIT_IN_QUEST_LOG    = 0x8000000,
    SHOW_ITEM_WHEN_COMPLETED = 0x10000000,
    LAUNCH_GOSSIP_ACCEPT     = 0x20000000,
    ITEMS_GLOW_WHEN_DONE     = 0x40000000,
    FAIL_ON_LOGOUT           = 0x80000000,
}