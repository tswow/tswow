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

export enum RaceIDs {
      HUMAN    = 1
    , ORC      = 2
    , DWARF    = 3
    , NIGHTELF = 4
    , UNDEAD   = 5
    , TAUREN   = 6
    , GNOME    = 7
    , TROLL    = 8
    //
    , BLOODELF = 10
    , DRAENEI  = 11
}

export enum RaceMask {
      HUMAN    = 0x1
    , ORC      = 0x2
    , DWARF    = 0x4
    , NIGHTELF = 0x8
    , UNDEAD   = 0x10
    , TAUREN   = 0x20
    , GNOME    = 0x40
    , TROLL    = 0x80
    //
    , BLOODELF = 0x200
    , DRAENEI  = 0x400
}