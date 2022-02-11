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

export enum DynFlags {
    NONE                      = 0x00,
    LOOTABLE                  = 0x01,
    TRACK_UNIT                = 0x02,
    TAPPED                    = 0x04,
    TAPPED_BY_PLAYER          = 0x08,
    SPECIAL_INFO              = 0x10,
    DEAD                      = 0x20,
    REFER_A_FRIEND            = 0x40,
    TAPPED_BY_ALL_THREAT_LIST = 0x80,

}