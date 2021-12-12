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

export enum ItemFlags {
    NO_PICKUP            = 0x1,
    CONJURED             = 0x2,
    OPENABLE             = 0x4,
    HEROIC               = 0x8,
    DEPRECATED           = 0x10,
    CANT_DESTROY         = 0x20,
    PLAYER_CAST          = 0x40,
    NO_EQUIP_COOLDOWN    = 0x80,
    MULTI_LOOT_QUEST     = 0x100,
    WRAPS_ITEMS          = 0x200,
    USES_RESOURCES       = 0x400,
    PARTY_LOOT           = 0x800,
    REFUNDABLE           = 0x1000,
    PETITION             = 0x2000,
    HAS_TEXT             = 0x4000,
    NO_DISENCHANT        = 0x8000,
    REAL_DURATION        = 0x10000,
    NO_CREATOR           = 0x20000,
    CAN_BE_PROSPECTED    = 0x40000,
    UNIQUE_EQUIPPED      = 0x80000,
    IGNORE_FOR_AURAS     = 0x100000,
    ARENA_ENABLED        = 0x200000,
    NO_DURABILITY_LOSS   = 0x400000,
    USABLE_IN_SHAPESHIFT = 0x800000,
    HAS_QUEST_GLOW       = 0x1000000,
    PROFESSION_RECIPE    = 0x2000000,
    ARENA_DISABLED       = 0x4000000,
    /** Also requires quality = 7 */
    BIND_TO_ACCOUNT      = 0x8000000,
    IGNORE_REAGENTS      = 0x10000000,
    MILLABLE             = 0x20000000,
    REPORT_TO_GUILD_CHAT = 0x40000000,
    NO_PROGRESSIVE_LOOT  = 0x80000000,

}