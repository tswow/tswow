export declare enum UnitStates {
    /** player has fake death aura */
    DIED = 1,
    /** player is melee attacking someone */
    MELEE_ATTACKING = 2,
    /** having any kind of charm aura on self */
    CHARMED = 4,
    STUNNED = 8,
    ROAMING = 16,
    CHASE = 32,
    FOCUSING = 64,
    FLEEING = 128,
    /** player is in flight mode */
    IN_FLIGHT = 256,
    FOLLOW = 512,
    ROOT = 1024,
    CONFUSED = 2048,
    DISTRACTED = 4096,
    /** area auras do not affect other players */
    ISOLATED = 8192,
    ATTACK_PLAYER = 16384,
    CASTING = 32768,
    /** being possessed by another unit */
    POSSESSED = 65536,
    CHARGING = 131072,
    JUMPING = 262144,
    FOLLOW_FORMATION = 524288,
    MOVE = 1048576,
    ROTATING = 2097152,
    EVADE = 4194304,
    ROAMING_MOVE = 8388608,
    CONFUSED_MOVE = 16777216,
    FLEEING_MOVE = 33554432,
    CHASE_MOVE = 67108864,
    FOLLOW_MOVE = 134217728,
    /** do not use pathfinding in any MovementGenerator */
    IGNORE_PATHFINDING = 268435456,
    FOLLOW_FORMATION_MOVE = 536870912,
    ALL_STATE_SUPPORTED = 1073217535,
    UNATTACKABLE = 256,
    MOVING = 796917760,
    CONTROLLED = 2184,
    LOST_CONTROL = 460936,
    CANNOT_AUTOATTACK = 166024,
    SIGHTLESS = 4655240,
    CANNOT_TURN = 2558152,
    NOT_MOVE = 5129,
    ALL_ERASABLE = 804782079,
    ALL_STATE = 4294967295
}
