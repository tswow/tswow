
/*
 * This file is part of tswow (https://github.com/tswow)
 *
 * Copyright (C) 2021 tswow <https://github.com/tswow/>
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

export enum SchoolTypes {
    PHYSICAL = 0,
    HOLY     = 1,
    FIRE     = 2,
    NATURE   = 3,
    FROST    = 4,
    SHADOW   = 5,
    ARCANE   = 6,
}

export enum SchoolMask {
    PHYSICAL = 0x0,
    HOLY     = 0x2,
    FIRE     = 0x4,
    NATURE   = 0x8,
    FROST    = 0x10,
    SHADOW   = 0x20,
    ARCANE   = 0x40,
}