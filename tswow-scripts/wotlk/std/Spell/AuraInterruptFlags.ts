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

export enum AuraInterruptFlags {
    HIT_BY_SPELL             = 0x1,
    TAKE_DAMAGE              = 0x2,
    CAST                     = 0x4,
    MOVE                     = 0x8,
    TURNING                  = 0x10,
    JUMP                     = 0x20,
    NOT_MOUNTED              = 0x40,
    NOT_ABOVEWATER           = 0x80,
    NOT_UNDERWATER           = 0x100,
    NOT_SHEATHED             = 0x200,
    TALK                     = 0x400,
    LOOTING                  = 0x800,
    MELEE_ATTACK             = 0x1000,
    SPELL_ATTACK             = 0x2000,
    //UNK14                    = 0x4000,
    TRANSFORM                = 0x8000,
    //UNK16                    = 0x10000,
    MOUNT                    = 0x20000,
    NOT_SEATED               = 0x40000,
    CHANGE_MAP               = 0x80000,
    IMMUNE_OR_LOST_SELECTION = 0x100000,
    //UNK21                    = 0x200000,
    TELEPORTED               = 0x400000,
    ENTER_PVP_COMBAT         = 0x800000,
    DIRECT_DAMAGE            = 0x1000000,
    LANDING                  = 0x2000000,
    LEAVE_COMBAT             = 0x4000000
}