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

export enum MechanicImmunity {
    CHARM           = 0x1,
    DISORIENTED     = 0x2,
    DISARM          = 0x4,
    DISTRACT        = 0x8,
    FEAR            = 0x10,
    GRIP            = 0x20,
    ROOT            = 0x40,
    SLOW_ATTACK     = 0x80,
    SILENCE         = 0x100,
    SLEEP           = 0x200,
    SNARE           = 0x400,
    STUN            = 0x800,
    FREEZE          = 0x1000,
    KNOCKOUT        = 0x2000,
    BLEED           = 0x4000,
    BANDAGE         = 0x8000,
    POLYMORPH       = 0x10000,
    BANISH          = 0x20000,
    SHIELD          = 0x40000,
    SHACKLE         = 0x80000,
    MOUNT           = 0x100000,
    INFECTED        = 0x200000,
    TURN            = 0x400000,
    HORROR          = 0x800000,
    INVULNERABILITY = 0x1000000,
    INTERRUPT       = 0x2000000,
    DAZE            = 0x4000000,
    DISCOVERY       = 0x8000000,
    IMMUNE_SHILED   = 0x10000000,
    SAPPED          = 0x20000000,
    ENRAGED         = 0x40000000,
}