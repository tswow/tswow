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

export enum BagFamily {
    NONE                 = 0x1,
    ARROWS               = 0x2,
    BULLETS              = 0x4,
    SOUL_SHARDS          = 0x8,
    LEATHERWORKING       = 0x10,
    INSCRIPTION_SUPPLIES = 0x20,
    HERBS                = 0x40,
    ENCHANTING_SUPPLIES  = 0x80,
    ENGINEERING_SUPPLIES = 0x100,
    KEYS                 = 0x200,
    GEMS                 = 0x400,
    MINING_SUPPLIES      = 0x800,
    SOULBOUND_EQUIPMENT  = 0x1000,
    VANITY_PETS          = 0x2000,
    CURRENCY_TOKENS      = 0x4000,
    QUEST_ITEMS          = 0x8000,
}