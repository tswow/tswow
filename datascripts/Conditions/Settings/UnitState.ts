import { MaskCell32, MaskCell32ReadOnly } from "wotlkdata/cell/cells/MaskCell";

// TrinityCore copypaste
export enum UnitStates {
    UNIT_STATE_DIED                  = 0x00000001, // player has fake death aura
    UNIT_STATE_MELEE_ATTACKING       = 0x00000002, // player is melee attacking someone
    UNIT_STATE_CHARMED               = 0x00000004, // having any kind of charm aura on self
    UNIT_STATE_STUNNED               = 0x00000008,
    UNIT_STATE_ROAMING               = 0x00000010,
    UNIT_STATE_CHASE                 = 0x00000020,
    UNIT_STATE_FOCUSING              = 0x00000040,
    UNIT_STATE_FLEEING               = 0x00000080,
    UNIT_STATE_IN_FLIGHT             = 0x00000100, // player is in flight mode
    UNIT_STATE_FOLLOW                = 0x00000200,
    UNIT_STATE_ROOT                  = 0x00000400,
    UNIT_STATE_CONFUSED              = 0x00000800,
    UNIT_STATE_DISTRACTED            = 0x00001000,
    UNIT_STATE_ISOLATED              = 0x00002000, // area auras do not affect other players
    UNIT_STATE_ATTACK_PLAYER         = 0x00004000,
    UNIT_STATE_CASTING               = 0x00008000,
    UNIT_STATE_POSSESSED             = 0x00010000, // being possessed by another unit
    UNIT_STATE_CHARGING              = 0x00020000,
    UNIT_STATE_JUMPING               = 0x00040000,
    UNIT_STATE_FOLLOW_FORMATION      = 0x00080000,
    UNIT_STATE_MOVE                  = 0x00100000,
    UNIT_STATE_ROTATING              = 0x00200000,
    UNIT_STATE_EVADE                 = 0x00400000,
    UNIT_STATE_ROAMING_MOVE          = 0x00800000,
    UNIT_STATE_CONFUSED_MOVE         = 0x01000000,
    UNIT_STATE_FLEEING_MOVE          = 0x02000000,
    UNIT_STATE_CHASE_MOVE            = 0x04000000,
    UNIT_STATE_FOLLOW_MOVE           = 0x08000000,
    UNIT_STATE_IGNORE_PATHFINDING    = 0x10000000, // do not use pathfinding in any MovementGenerator
    UNIT_STATE_FOLLOW_FORMATION_MOVE = 0x20000000,

    UNIT_STATE_ALL_STATE_SUPPORTED = UNIT_STATE_DIED | UNIT_STATE_MELEE_ATTACKING | UNIT_STATE_CHARMED | UNIT_STATE_STUNNED | UNIT_STATE_ROAMING | UNIT_STATE_CHASE
                                   | UNIT_STATE_FOCUSING | UNIT_STATE_FLEEING | UNIT_STATE_IN_FLIGHT | UNIT_STATE_FOLLOW | UNIT_STATE_ROOT | UNIT_STATE_CONFUSED
                                   | UNIT_STATE_DISTRACTED | UNIT_STATE_ISOLATED | UNIT_STATE_ATTACK_PLAYER | UNIT_STATE_CASTING
                                   | UNIT_STATE_POSSESSED | UNIT_STATE_CHARGING | UNIT_STATE_JUMPING | UNIT_STATE_MOVE | UNIT_STATE_ROTATING
                                   | UNIT_STATE_EVADE | UNIT_STATE_ROAMING_MOVE | UNIT_STATE_CONFUSED_MOVE | UNIT_STATE_FLEEING_MOVE
                                   | UNIT_STATE_CHASE_MOVE | UNIT_STATE_FOLLOW_MOVE | UNIT_STATE_IGNORE_PATHFINDING | UNIT_STATE_FOLLOW_FORMATION_MOVE,

    UNIT_STATE_UNATTACKABLE        = UNIT_STATE_IN_FLIGHT,
    UNIT_STATE_MOVING              = UNIT_STATE_ROAMING_MOVE | UNIT_STATE_CONFUSED_MOVE | UNIT_STATE_FLEEING_MOVE | UNIT_STATE_CHASE_MOVE | UNIT_STATE_FOLLOW_MOVE | UNIT_STATE_FOLLOW_FORMATION_MOVE,
    UNIT_STATE_CONTROLLED          = UNIT_STATE_CONFUSED | UNIT_STATE_STUNNED | UNIT_STATE_FLEEING,
    UNIT_STATE_LOST_CONTROL        = UNIT_STATE_CONTROLLED | UNIT_STATE_POSSESSED | UNIT_STATE_JUMPING | UNIT_STATE_CHARGING,
    UNIT_STATE_CANNOT_AUTOATTACK   = UNIT_STATE_CONTROLLED | UNIT_STATE_CHARGING | UNIT_STATE_CASTING,
    UNIT_STATE_SIGHTLESS           = UNIT_STATE_LOST_CONTROL | UNIT_STATE_EVADE,
    UNIT_STATE_CANNOT_TURN         = UNIT_STATE_LOST_CONTROL | UNIT_STATE_ROTATING | UNIT_STATE_FOCUSING,
    UNIT_STATE_NOT_MOVE            = UNIT_STATE_ROOT | UNIT_STATE_STUNNED | UNIT_STATE_DIED | UNIT_STATE_DISTRACTED,

    UNIT_STATE_ALL_ERASABLE        = UNIT_STATE_ALL_STATE_SUPPORTED & ~(UNIT_STATE_IGNORE_PATHFINDING),
    UNIT_STATE_ALL_STATE           = 0xffffffff
}

export type UnitState = keyof typeof UnitStates

export class UnitStateMask<T> extends MaskCell32<T> {
    get Died()                { return this.extract_bit(UnitStates.UNIT_STATE_DIED); }
    get MeleeAttacking()      { return this.extract_bit(UnitStates.UNIT_STATE_MELEE_ATTACKING); }
    get Charmed()             { return this.extract_bit(UnitStates.UNIT_STATE_CHARMED); }
    get Stunned()             { return this.extract_bit(UnitStates.UNIT_STATE_STUNNED); }
    get Roaming()             { return this.extract_bit(UnitStates.UNIT_STATE_ROAMING); }
    get Chase()               { return this.extract_bit(UnitStates.UNIT_STATE_CHASE); }
    get Focusing()            { return this.extract_bit(UnitStates.UNIT_STATE_FOCUSING); }
    get Fleeing()             { return this.extract_bit(UnitStates.UNIT_STATE_FLEEING); }
    get InFlight()            { return this.extract_bit(UnitStates.UNIT_STATE_IN_FLIGHT); }
    get Follow()              { return this.extract_bit(UnitStates.UNIT_STATE_FOLLOW); }
    get Root()                { return this.extract_bit(UnitStates.UNIT_STATE_ROOT); }
    get Confused()            { return this.extract_bit(UnitStates.UNIT_STATE_CONFUSED); }
    get Distracted()          { return this.extract_bit(UnitStates.UNIT_STATE_DISTRACTED); }
    get Isolated()            { return this.extract_bit(UnitStates.UNIT_STATE_ISOLATED); }
    get AttackPlayer()        { return this.extract_bit(UnitStates.UNIT_STATE_ATTACK_PLAYER); }
    get Casting()             { return this.extract_bit(UnitStates.UNIT_STATE_CASTING); }
    get Possessed()           { return this.extract_bit(UnitStates.UNIT_STATE_POSSESSED); }
    get Charging()            { return this.extract_bit(UnitStates.UNIT_STATE_CHARGING); }
    get Jumping()             { return this.extract_bit(UnitStates.UNIT_STATE_JUMPING); }
    get FollowFormation()     { return this.extract_bit(UnitStates.UNIT_STATE_FOLLOW_FORMATION); }
    get Move()                { return this.extract_bit(UnitStates.UNIT_STATE_MOVE); }
    get Rotating()            { return this.extract_bit(UnitStates.UNIT_STATE_ROTATING); }
    get Evade()               { return this.extract_bit(UnitStates.UNIT_STATE_EVADE); }
    get RoamingMove()         { return this.extract_bit(UnitStates.UNIT_STATE_ROAMING_MOVE); }
    get ConfusedMove()        { return this.extract_bit(UnitStates.UNIT_STATE_CONFUSED_MOVE); }
    get FleeingMove()         { return this.extract_bit(UnitStates.UNIT_STATE_FLEEING_MOVE); }
    get ChaseMove()           { return this.extract_bit(UnitStates.UNIT_STATE_CHASE_MOVE); }
    get FollowMove()          { return this.extract_bit(UnitStates.UNIT_STATE_FOLLOW_MOVE); }
    get IgnorePathfinding()   { return this.extract_bit(UnitStates.UNIT_STATE_IGNORE_PATHFINDING); }
    get FollowFormationMove() { return this.extract_bit(UnitStates.UNIT_STATE_FOLLOW_FORMATION_MOVE); }

    get AllSupported()        { return this.extract_bits(UnitStates.UNIT_STATE_ALL_STATE_SUPPORTED) }
    get Unattackable()        { return this.extract_bits(UnitStates.UNIT_STATE_UNATTACKABLE) }
    get Moving()              { return this.extract_bits(UnitStates.UNIT_STATE_MOVING) }
    get Controlled()          { return this.extract_bits(UnitStates.UNIT_STATE_CONTROLLED) }
    get LostControl()         { return this.extract_bits(UnitStates.UNIT_STATE_LOST_CONTROL) }
    get CannotAutoattack()    { return this.extract_bits(UnitStates.UNIT_STATE_CANNOT_AUTOATTACK) }
    get Sightless()           { return this.extract_bits(UnitStates.UNIT_STATE_SIGHTLESS) }
    get NotMove()             { return this.extract_bits(UnitStates.UNIT_STATE_NOT_MOVE) }
    get AllErasable()         { return this.extract_bits(UnitStates.UNIT_STATE_ALL_ERASABLE) }
    get AllState()            { return this.extract_bits(UnitStates.UNIT_STATE_ALL_STATE) }
}

export class UnitStateMaskReadOnly<T> extends MaskCell32ReadOnly<T> {
    get Died()                { return this.extract_bit(UnitStates.UNIT_STATE_DIED); }
    get MeleeAttacking()      { return this.extract_bit(UnitStates.UNIT_STATE_MELEE_ATTACKING); }
    get Charmed()             { return this.extract_bit(UnitStates.UNIT_STATE_CHARMED); }
    get Stunned()             { return this.extract_bit(UnitStates.UNIT_STATE_STUNNED); }
    get Roaming()             { return this.extract_bit(UnitStates.UNIT_STATE_ROAMING); }
    get Chase()               { return this.extract_bit(UnitStates.UNIT_STATE_CHASE); }
    get Focusing()            { return this.extract_bit(UnitStates.UNIT_STATE_FOCUSING); }
    get Fleeing()             { return this.extract_bit(UnitStates.UNIT_STATE_FLEEING); }
    get InFlight()            { return this.extract_bit(UnitStates.UNIT_STATE_IN_FLIGHT); }
    get Follow()              { return this.extract_bit(UnitStates.UNIT_STATE_FOLLOW); }
    get Root()                { return this.extract_bit(UnitStates.UNIT_STATE_ROOT); }
    get Confused()            { return this.extract_bit(UnitStates.UNIT_STATE_CONFUSED); }
    get Distracted()          { return this.extract_bit(UnitStates.UNIT_STATE_DISTRACTED); }
    get Isolated()            { return this.extract_bit(UnitStates.UNIT_STATE_ISOLATED); }
    get AttackPlayer()        { return this.extract_bit(UnitStates.UNIT_STATE_ATTACK_PLAYER); }
    get Casting()             { return this.extract_bit(UnitStates.UNIT_STATE_CASTING); }
    get Possessed()           { return this.extract_bit(UnitStates.UNIT_STATE_POSSESSED); }
    get Charging()            { return this.extract_bit(UnitStates.UNIT_STATE_CHARGING); }
    get Jumping()             { return this.extract_bit(UnitStates.UNIT_STATE_JUMPING); }
    get FollowFormation()     { return this.extract_bit(UnitStates.UNIT_STATE_FOLLOW_FORMATION); }
    get Move()                { return this.extract_bit(UnitStates.UNIT_STATE_MOVE); }
    get Rotating()            { return this.extract_bit(UnitStates.UNIT_STATE_ROTATING); }
    get Evade()               { return this.extract_bit(UnitStates.UNIT_STATE_EVADE); }
    get RoamingMove()         { return this.extract_bit(UnitStates.UNIT_STATE_ROAMING_MOVE); }
    get ConfusedMove()        { return this.extract_bit(UnitStates.UNIT_STATE_CONFUSED_MOVE); }
    get FleeingMove()         { return this.extract_bit(UnitStates.UNIT_STATE_FLEEING_MOVE); }
    get ChaseMove()           { return this.extract_bit(UnitStates.UNIT_STATE_CHASE_MOVE); }
    get FollowMove()          { return this.extract_bit(UnitStates.UNIT_STATE_FOLLOW_MOVE); }
    get IgnorePathfinding()   { return this.extract_bit(UnitStates.UNIT_STATE_IGNORE_PATHFINDING); }
    get FollowFormationMove() { return this.extract_bit(UnitStates.UNIT_STATE_FOLLOW_FORMATION_MOVE); }

    get AllSupported()        { return this.extract_bits(UnitStates.UNIT_STATE_ALL_STATE_SUPPORTED) }
    get Unattackable()        { return this.extract_bits(UnitStates.UNIT_STATE_UNATTACKABLE) }
    get Moving()              { return this.extract_bits(UnitStates.UNIT_STATE_MOVING) }
    get Controlled()          { return this.extract_bits(UnitStates.UNIT_STATE_CONTROLLED) }
    get LostControl()         { return this.extract_bits(UnitStates.UNIT_STATE_LOST_CONTROL) }
    get CannotAutoattack()    { return this.extract_bits(UnitStates.UNIT_STATE_CANNOT_AUTOATTACK) }
    get Sightless()           { return this.extract_bits(UnitStates.UNIT_STATE_SIGHTLESS) }
    get NotMove()             { return this.extract_bits(UnitStates.UNIT_STATE_NOT_MOVE) }
    get AllErasable()         { return this.extract_bits(UnitStates.UNIT_STATE_ALL_ERASABLE) }
    get AllState()            { return this.extract_bits(UnitStates.UNIT_STATE_ALL_STATE) }
}


export function makeStateMask(states: UnitState[]) {
    return states.reduce((p,c)=>p|UnitStates[c],0);
}