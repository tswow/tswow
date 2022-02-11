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

export enum SpawnMask {
    CONTINENT    = 0x1,
    NORMAL5_MAN  = 0x1,
    HEROIC5_MAN  = 0x2,
    NORMAL10_MAN = 0x1,
    NORMAL25_MAN = 0x2,
    HEROIC10_MAN = 0x4,
    HEROIC25_MAN = 0x8,
}