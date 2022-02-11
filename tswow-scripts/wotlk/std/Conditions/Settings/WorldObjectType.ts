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

export enum WorldObjectTypes {
      UNIT          = 3
    , PLAYER        = 4
    , GAMEOBJECT    = 5
    , PLAYER_CORPSE = 7
}

export enum WorldObjectTypesMask {
      UNIT          = 0x8
    , PLAYER        = 0x10
    , GAMEOBJECT    = 0x20
    , PLAYER_CORPSE = 0x80
}