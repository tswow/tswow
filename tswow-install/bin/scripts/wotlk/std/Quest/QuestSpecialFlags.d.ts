export declare enum QuestSpecialFlags {
    REPEATABLE = 1,
    /**
     * Makes quest only completable via some external event,
     *
     * For example:
     * - entry in areatrigger_involvedrelation
     * - entry in spell_script with command 7
     */
    CUSTOM_COMPLETE = 2,
    AUTO_ACCEPT = 4,
    DUNGEON_FINDER = 8,
    MONTHLY = 16,
    /**
     * usually involves killing invisible "bunny" npc with a spell
     */
    DUMMY_KILL_CREDIT = 32
}
