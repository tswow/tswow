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

export enum ItemFlagsExtra {
    HORDE_ONLY              = 0x1,
    ALLIANCE_ONLY           = 0x2,
    GOLD_WITH_EXTENDED_COST = 0x4,
    NO_NEED_ROLLS           = 0x100,
    NEED_ROLLS_DISABLED     = 0x200,
    HAS_NORMAL_PRICE        = 0x4000,
}