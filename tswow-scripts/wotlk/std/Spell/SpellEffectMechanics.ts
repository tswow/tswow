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

export enum SpellEffectMechanic {
    NONE          = 0,
    CHARMED       = 1,
    DISORIENTED   = 2,
    DISARMED      = 3,
    DISTRACTED    = 4,
    FLEEING       = 5,
    GRIPPED       = 6,
    ROOTED        = 7,
    SLOWED        = 8,
    SILENCED      = 9,
    ASLEEP        = 10,
    SNARED        = 11,
    STUNNED       = 12,
    FROZEN        = 13,
    INCAPACITATED = 14,
    BLEEDING      = 15,
    HEALING       = 16,
    POLYMORPHED   = 17,
    BANISHED      = 18,
    SHIELDED      = 19,
    SHACKLED      = 20,
    MOUNTED       = 21,
    INFECTED      = 22,
    TURNED        = 23,
    HORRIFIED     = 24,
    INVULNERABLE  = 25,
    INTERRUPTED   = 26,
    DAZED         = 27,
    DISCOVERY     = 28,
    INVULNERABLE2 = 29,
    SAPPED        = 30,
    ENRAGED       = 31,
}

export enum SpellEffectMechanicMask {
    NONE          = 0x1,
    CHARMED       = 0x2,
    DISORIENTED   = 0x4,
    DISARMED      = 0x8,
    DISTRACTED    = 0x10,
    FLEEING       = 0x20,
    GRIPPED       = 0x40,
    ROOTED        = 0x80,
    SLOWED        = 0x100,
    SILENCED      = 0x200,
    ASLEEP        = 0x400,
    SNARED        = 0x800,
    STUNNED       = 0x1000,
    FROZEN        = 0x2000,
    INCAPACITATED = 0x4000,
    BLEEDING      = 0x8000,
    HEALING       = 0x10000,
    POLYMORPHED   = 0x20000,
    BANISHED      = 0x40000,
    SHIELDED      = 0x80000,
    SHACKLED      = 0x100000,
    MOUNTED       = 0x200000,
    INFECTED      = 0x400000,
    TURNED        = 0x800000,
    HORRIFIED     = 0x1000000,
    INVULNERABLE  = 0x2000000,
    INTERRUPTED   = 0x4000000,
    DAZED         = 0x8000000,
    DISCOVERY     = 0x10000000,
    INVULNERABLE2 = 0x20000000,
    SAPPED        = 0x40000000,
    ENRAGED       = 0x80000000,
}