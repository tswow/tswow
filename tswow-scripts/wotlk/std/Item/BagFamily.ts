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
    NONE                 = 0,
    ARROWS               = 1,
    BULLETS              = 2,
    SOUL_SHARDS          = 4,
    LEATHERWORKING       = 8,
    INSCRIPTION_SUPPLIES = 16,
    HERBS                = 32,
    ENCHANTING_SUPPLIES  = 64,
    ENGINEERING_SUPPLIES = 128,
    KEYS                 = 256,
    GEMS                 = 512,
    MINING_SUPPLIES      = 1024,
    SOULBOUND_EQUIPMENT  = 2048,
    VANITY_PETS          = 4096,
    CURRENCY_TOKENS      = 8192,
    QUEST_ITEMS          = 16384,
}