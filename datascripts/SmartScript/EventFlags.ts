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

export enum EventFlags {
    NON_REPEATABLE = 0x1,
    NORMAL_DUNGEON = 0x2,
    HEROIC_DUNGEON = 0x4,
    NORMAL_RAID    = 0x8,
    HEROIC_RAID    = 0x10,
    DEBUG_ONLY     = 0x20,
    DONT_RESET     = 0x40,
    WORKS_CHARMED  = 0x80,
}