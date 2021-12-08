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

export enum CreatureTypeFlags {
    TAMEABLE                   = 0x1,
    GHOST                      = 0x2,
    BOSS                       = 0x4,
    NO_PARRY_ANIMATION         = 0x8,
    HIDE_FACTION_TOOLTIP       = 0x10,
    UNK6                       = 0x20,
    SPELL_ATTACKABLE           = 0x40,
    DEAD_INTERACT              = 0x80,
    HERB_LOOT                  = 0x100,
    MINING_LOOT                = 0x200,
    DONT_LOG_DEATH             = 0x400,
    MOUNTED_COMBAT             = 0x800,
    AID_PLAYERS                = 0x1000,
    IS_PET_BAR_USED            = 0x2000,
    MASK_UID                 = 0x4000,
    ENGINEER_LOOT              = 0x8000,
    EXOTIC_PET                 = 0x10000,
    USE_DEAFULT_COLLISION      = 0x20000,
    IS_SIEGE_WEAPON            = 0x40000,
    PROJECTILE_COLLISION       = 0x80000,
    HIDE_NAMEPLATE             = 0x100000,
    NO_MOUNTED_ANIMATIONS      = 0x200000,
    IS_LINK_ALL                = 0x400000,
    INTERACT_ONLY_WITH_CREATOR = 0x800000,
    FORCE_GOSSIP               = 0x1000000,
}