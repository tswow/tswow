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

export enum AreaFlags {
    HAS_BREATH_PARTICLES      = 0x1,
    PARTICLES_OVERRIDE        = 0x2,
    UNK2                      = 0x4,
    IS_CAPITAL                = 0x8,
    UNK3                      = 0x10,
    IS_CAPITAL2               = 0x10,
    ALLOW_DUELS               = 0x20,
    ARENA                     = 0x40,
    IS_CAPITAL3               = 0x80,
    LINKED_CHAT_AREA          = 0x100,
    IS_OUTLAND_BATTLEGROUND   = 0x200,
    IS_SANCTUARY              = 0x400,
    NEEDS_FLYING              = 0x800,
    AMBIENT_ON_PLAYER         = 0x1000,
    IS_OUTLAND                = 0x2000,
    IS_PVP_OBJECTIVE         = 0x4000,
    IS_ARENA                  = 0x8000,
    UNUSED2                   = 0x10000,
    IS_CONTESTED              = 0x20000,
    UNK6                      = 0x40000,
    IS_STARTING_AREA          = 0x80000,
    IS_TOWN                   = 0x100000,
    UNK7                      = 0x200000,
    UNK8                      = 0x400000,
    /** Used by wintergrasp */
    USE_COMBAT_STATE          = 0x800000,
    IS_INSIDE                 = 0x1000000,
    IS_OUTSIDE                = 0x2000000,
    CAN_HEARTH_AND_RESURRECT  = 0x4000000,
    NO_FLYING                 = 0x8000000,
    USE_PARENT_FOR_VISIBILITY = 0x10000000,
}