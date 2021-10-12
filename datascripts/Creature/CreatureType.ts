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

export enum CreatureType {
    NONE           = 0,
    BEAST          = 1,
    DRAGONKIN      = 2,
    DEMON          = 3,
    ELEMENTAL      = 4,
    GIANT          = 5,
    UNDEAD         = 6,
    HUMANOID       = 7,
    CRITTER        = 8,
    MECHANICAL     = 9,
    NOT_SPECIFIED  = 10,
    TOTEM          = 11,
    NON_COMBAT_PET = 12,
    GAS_CLOUD      = 13,
    WILD_PET       = 14,
    ABERRATION     = 15,

}

export enum CreatureTypeMask {
    NONE           = 0x1,
    BEAST          = 0x2,
    DRAGONKIN      = 0x4,
    DEMON          = 0x8,
    ELEMENTAL      = 0x10,
    GIANT          = 0x20,
    UNDEAD         = 0x40,
    HUMANOID       = 0x80,
    CRITTER        = 0x100,
    MECHANICAL     = 0x200,
    NOT_SPECIFIED  = 0x400,
    TOTEM          = 0x800,
    NON_COMBAT_PET = 0x1000,
    GAS_CLOUD      = 0x2000,
    WILD_PET       = 0x4000,
    ABERRATION     = 0x8000,
}