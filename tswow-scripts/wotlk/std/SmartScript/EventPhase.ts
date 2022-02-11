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

export enum EventPhase {
    PHASE1 = 0x1,
    PHASE2 = 0x2,
    PHASE3 = 0x4,
    PHASE4 = 0x8,
    PHASE5 = 0x10,
    PHASE6 = 0x20,
    PHASE7 = 0x40,
    PHASE8 = 0x80,
    PHASE9 = 0x100,
}