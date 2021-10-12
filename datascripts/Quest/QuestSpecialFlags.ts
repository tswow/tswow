export enum QuestSpecialFlags {
    REPEATABLE        = 0x1,
    /**
     * Makes quest only completable via some external event,
     *
     * For example:
     * - entry in areatrigger_involvedrelation
     * - entry in spell_script with command 7
     */
    CUSTOM_COMPLETE   = 0x2,
    AUTO_ACCEPT       = 0x4,
    DUNGEON_FINDER    = 0x8,
    MONTHLY           = 0x10,
    /**
     * usually involves killing invisible "bunny" npc with a spell
     */
    DUMMY_KILL_CREDIT = 0x20,
}