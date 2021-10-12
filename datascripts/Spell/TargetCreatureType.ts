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

export enum SpellCreatureTarget {
    BEAST          = 0x1,
    DRAGONKIN      = 0x2,
    DEMON          = 0x4,
    ELEMENTAL      = 0x8,
    GIANT          = 0x10,
    UNDEAD         = 0x20,
    HUMANOID       = 0x40,
    CRITTER        = 0x80,
    MECHANICAL     = 0x100,
    UNSPECIED      = 0x200,
    TOTEM          = 0x400,
    NON_COMBAT_PET = 0x800,
    GAS_CLOUD      = 0x1000,
}