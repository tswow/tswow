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

export enum NPCFlags {
    GOSSIP             = 0x1,
    QUEST_GIVER        = 0x2,
    TRAINER            = 0x10,
    CLASS_TRAINER      = 0x20,
    PROFESSION_TRAINER = 0x40,
    VENDOR             = 0x80,
    VENDOR_AMMO        = 0x100,
    VENDOR_FOOD        = 0x200,
    VENDOR_POISON      = 0x400,
    VENDOR_REAGENT     = 0x800,
    REPAIRER           = 0x1000,
    FLIGHT_MASTER      = 0x2000,
    SPIRIT_HEALER      = 0x4000,
    SPIRIT_GUIDE       = 0x8000,
    INNKEEPER          = 0x10000,
    BANKER             = 0x20000,
    PETITIONER         = 0x40000,
    TABARD_DESIGNER    = 0x80000,
    BATTLEMASTER       = 0x100000,
    AUCTIONEER         = 0x200000,
    STABLE_MASTER      = 0x400000,
    GUILD_BANKER       = 0x800000,
    SPELLCLICK         = 0x1000000,
    MAILBOX            = 0x4000000,

}