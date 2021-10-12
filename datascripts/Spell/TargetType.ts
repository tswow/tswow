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

export enum SpellTargetType {
    UNUSED1          = 0x1,
    UNIT             = 0x2,
    UNIT_RAID        = 0x4,
    UNIT_PARTY       = 0x8,
    ITEM             = 0x10,
    SOURCE_LOCATION  = 0x20,
    DEST_LOCATION    = 0x40,
    UNIT_ENEMY       = 0x80,
    UNIT_ALLY        = 0x100,
    CORPSE_ENEMY     = 0x200,
    UNIT_DEAD        = 0x400,
    GAME_OBJECT      = 0x800,
    TRADE_ITEM       = 0x1000,
    STRING           = 0x2000,
    GAME_OBJECT_ITEM = 0x4000,
    CORPSE_ALLY      = 0x8000,
    UNIT_MINIPET     = 0x10000,
    GLYPH_SLOT       = 0x20000,
    DEST_TARGET      = 0x40000,
    UNUSED20         = 0x80000,
    UNIT_PASSENGER   = 0x100000,
}
