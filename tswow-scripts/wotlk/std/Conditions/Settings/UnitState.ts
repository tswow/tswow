
// TrinityCore copypaste
export enum UnitStates {
    /** player has fake death aura */
    DIED                  = 0x00000001,
    /** player is melee attacking someone */
    MELEE_ATTACKING       = 0x00000002,
    /** having any kind of charm aura on self */
    CHARMED               = 0x00000004,
    STUNNED               = 0x00000008,
    ROAMING               = 0x00000010,
    CHASE                 = 0x00000020,
    FOCUSING              = 0x00000040,
    FLEEING               = 0x00000080,
    /** player is in flight mode */
    IN_FLIGHT             = 0x00000100,
    FOLLOW                = 0x00000200,
    ROOT                  = 0x00000400,
    CONFUSED              = 0x00000800,
    DISTRACTED            = 0x00001000,
    /** area auras do not affect other players */
    ISOLATED              = 0x00002000,
    ATTACK_PLAYER         = 0x00004000,
    CASTING               = 0x00008000,
    /** being possessed by another unit */
    POSSESSED             = 0x00010000,
    CHARGING              = 0x00020000,
    JUMPING               = 0x00040000,
    FOLLOW_FORMATION      = 0x00080000,
    MOVE                  = 0x00100000,
    ROTATING              = 0x00200000,
    EVADE                 = 0x00400000,
    ROAMING_MOVE          = 0x00800000,
    CONFUSED_MOVE         = 0x01000000,
    FLEEING_MOVE          = 0x02000000,
    CHASE_MOVE            = 0x04000000,
    FOLLOW_MOVE           = 0x08000000,
    /** do not use pathfinding in any MovementGenerator */
    IGNORE_PATHFINDING    = 0x10000000,
    FOLLOW_FORMATION_MOVE = 0x20000000,

    ALL_STATE_SUPPORTED = DIED | MELEE_ATTACKING | CHARMED | STUNNED | ROAMING | CHASE
                                   | FOCUSING | FLEEING | IN_FLIGHT | FOLLOW | ROOT | CONFUSED
                                   | DISTRACTED | ISOLATED | ATTACK_PLAYER | CASTING
                                   | POSSESSED | CHARGING | JUMPING | MOVE | ROTATING
                                   | EVADE | ROAMING_MOVE | CONFUSED_MOVE | FLEEING_MOVE
                                   | CHASE_MOVE | FOLLOW_MOVE | IGNORE_PATHFINDING | FOLLOW_FORMATION_MOVE,

    UNATTACKABLE        = IN_FLIGHT,
    MOVING              = ROAMING_MOVE | CONFUSED_MOVE | FLEEING_MOVE | CHASE_MOVE | FOLLOW_MOVE | FOLLOW_FORMATION_MOVE,
    CONTROLLED          = CONFUSED | STUNNED | FLEEING,
    LOST_CONTROL        = CONTROLLED | POSSESSED | JUMPING | CHARGING,
    CANNOT_AUTOATTACK   = CONTROLLED | CHARGING | CASTING,
    SIGHTLESS           = LOST_CONTROL | EVADE,
    CANNOT_TURN         = LOST_CONTROL | ROTATING | FOCUSING,
    NOT_MOVE            = ROOT | STUNNED | DIED | DISTRACTED,

    ALL_ERASABLE        = ALL_STATE_SUPPORTED & ~(IGNORE_PATHFINDING),
    ALL_STATE           = 0xffffffff
}