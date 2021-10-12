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

export enum ProcType {
    KILLED                         = 0x1,
    KILL                           = 0x2,
    DONE_MELEE_AUTO_ATTACK         = 0x4,
    TAKEN_MELEE_AUTO_ATTACK        = 0x8,
    DONE_SPELL_MELEE_DMG           = 0x10,
    TAKEN_SPELL_MELEE_DMG          = 0x20,
    DONE_RANGED_AUTO_ATTACK        = 0x40,
    TAKEN_RANGED_AUTO_ATTACK       = 0x80,
    DONE_SPELL_RANGED_DMG          = 0x100,
    TAKEN_SPELL_RANGED_DMG         = 0x200,
    DONE_SPELL_NONE_DMG_CLASS_POS  = 0x400,
    TAKEN_SPELL_NONE_DMG_CLASS_POS = 0x800,
    DONE_SPELL_NONE_DMG_CLASS_NEG  = 0x1000,
    TAKEN_SPELL_NONE_DMG_CLASS_NEG = 0x2000,
    DONE_SPELL_MAGIC_POS           = 0x4000,
    TAKEN_SPELL_MAGIC_DMG_POS      = 0x8000,
    DONE_SPELL_MAGIC_DMG_NEG       = 0x10000,
    TAKEN_SPELL_MAGIC_DMG_NEG      = 0x20000,
    DONE_PERIODIC                  = 0x40000,
    TAKEN_PERIODIC                 = 0x80000,
    TAKEN_DAMAGE                   = 0x100000,
    TRAP_ACTIVATION                = 0x200000,
    MAINHAND_ATTACK                = 0x400000,
    OFFHAND_ATTACK                 = 0x800000,
    DEATH                          = 0x1000000,
}