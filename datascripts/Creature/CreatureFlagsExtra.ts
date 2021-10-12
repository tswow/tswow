/*
 * This file is part of tswow (https://github.com/tswow)
 *
 * Copyright (C) 2020 tswow <https://github.com/tswow/>
 * This program is free software: you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */

export enum CreatureFlagsExtra
{
    /** creature kill bind instance with killer and killer's group */
    INSTANCE_BIND        = 0x00000001,
    /** not aggro (ignore faction/reputation hostility) */
    CIVILIAN             = 0x00000002,
    /** creature can't parry */
    NO_PARRY             = 0x00000004,
    /** creature can't counter-attack at parry */
    NO_PARRY_HASTEN      = 0x00000008,
    /** creature can't block */
    NO_BLOCK             = 0x00000010,
    /** creature can't do crush attacks */
    NO_CRUSHING_BLOWS    = 0x00000020,
    /** creature kill does not provide XP */
    NO_XP                = 0x00000040,
    /** trigger creature */
    TRIGGER              = 0x00000080,
    /** creature is immune to taunt auras and 'attack me' effects */
    NO_TAUNT             = 0x00000100,
    /** creature won't update movement flags */
    NO_MOVE_FLAGS_UPDATE = 0x00000200,
    /** creature will only be visible to dead players */
    GHOST_VISIBILITY     = 0x00000400,
    /** creature will use offhand attacks */
    USE_OFFHAND_ATTACK   = 0x00000800,
    /** players can't sell items to this vendor */
    NO_SELL_VENDOR       = 0x00001000,
    /** creature is not allowed to enter combat */
    CANNOT_ENTER_COMBAT  = 0x00002000,
    /** custom flag for world event creatures (left room for merging) */
    WORLDEVENT           = 0x00004000,
    /** Creature is guard */
    GUARD                = 0x00008000,
    /** creature ignores feign death */
    IGNORE_FEIGN_DEATH   = 0x00010000,
    /** creature can't do critical strikes */
    NO_CRIT              = 0x00020000,
    /** creature won't increase weapon skills */
    NO_SKILL_GAINS       = 0x00040000,
    /** Taunt is subject to diminishing returns on this creature */
    OBEYS_TAUNT_DIMINISHING_RETURNS = 0x00080000,
    /** creature is subject to all diminishing returns as players are */
    ALL_DIMINISH         = 0x00100000,
    /** creature does not need to take player damage for kill credit */
    NO_PLAYER_DAMAGE_REQ = 0x00200000,
    UNUSED_22            = 0x00400000,
    UNUSED_23            = 0x00800000,
    UNUSED_24            = 0x01000000,
    UNUSED_25            = 0x02000000,
    UNUSED_26            = 0x04000000,
    UNUSED_27            = 0x08000000,
    /** creature is a dungeon boss (SET DYNAMICALLY, DO NOT ADD IN DB) */
    DUNGEON_BOSS         = 0x10000000,
    /** creature ignore pathfinding */
    IGNORE_PATHFINDING   = 0x20000000,
    /** creature is immune to knockback effects */
    IMMUNITY_KNOCKBACK   = 0x40000000,
    UNUSED_31            = 0x80000000,
    UNUSED               = (UNUSED_22 |
                                                UNUSED_23 | UNUSED_24 | UNUSED_25 |
                                                UNUSED_26 | UNUSED_27 | UNUSED_31), // SKIP

    DB_ALLOWED           = (0xFFFFFFFF & ~(UNUSED | DUNGEON_BOSS)) // SKIP
};
