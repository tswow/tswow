export declare enum CreatureFlagsExtra {
    /** creature kill bind instance with killer and killer's group */
    INSTANCE_BIND = 1,
    /** not aggro (ignore faction/reputation hostility) */
    CIVILIAN = 2,
    /** creature can't parry */
    NO_PARRY = 4,
    /** creature can't counter-attack at parry */
    NO_PARRY_HASTEN = 8,
    /** creature can't block */
    NO_BLOCK = 16,
    /** creature can't do crush attacks */
    NO_CRUSHING_BLOWS = 32,
    /** creature kill does not provide XP */
    NO_XP = 64,
    /** trigger creature */
    TRIGGER = 128,
    /** creature is immune to taunt auras and 'attack me' effects */
    NO_TAUNT = 256,
    /** creature won't update movement flags */
    NO_MOVE_FLAGS_UPDATE = 512,
    /** creature will only be visible to dead players */
    GHOST_VISIBILITY = 1024,
    /** creature will use offhand attacks */
    USE_OFFHAND_ATTACK = 2048,
    /** players can't sell items to this vendor */
    NO_SELL_VENDOR = 4096,
    /** creature is not allowed to enter combat */
    CANNOT_ENTER_COMBAT = 8192,
    /** custom flag for world event creatures (left room for merging) */
    WORLDEVENT = 16384,
    /** Creature is guard */
    GUARD = 32768,
    /** creature ignores feign death */
    IGNORE_FEIGN_DEATH = 65536,
    /** creature can't do critical strikes */
    NO_CRIT = 131072,
    /** creature won't increase weapon skills */
    NO_SKILL_GAINS = 262144,
    /** Taunt is subject to diminishing returns on this creature */
    OBEYS_TAUNT_DIMINISHING_RETURNS = 524288,
    /** creature is subject to all diminishing returns as players are */
    ALL_DIMINISH = 1048576,
    /** creature does not need to take player damage for kill credit */
    NO_PLAYER_DAMAGE_REQ = 2097152,
    UNUSED_22 = 4194304,
    UNUSED_23 = 8388608,
    UNUSED_24 = 16777216,
    UNUSED_25 = 33554432,
    UNUSED_26 = 67108864,
    UNUSED_27 = 134217728,
    /** creature is a dungeon boss (SET DYNAMICALLY, DO NOT ADD IN DB) */
    DUNGEON_BOSS = 268435456,
    /** creature ignore pathfinding */
    IGNORE_PATHFINDING = 536870912,
    /** creature is immune to knockback effects */
    IMMUNITY_KNOCKBACK = 1073741824,
    UNUSED_31 = 2147483648,
    UNUSED = -1883242496,// SKIP
    DB_ALLOWED = 1614807039
}
