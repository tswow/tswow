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
export type DrunkState = 'SOBER'|'TIPSY'|'DRUNK'|'SMASHED'

export function resolveDrunkState(state: DrunkState) {
    switch(state) {
        case 'SOBER': return 0;
        case 'TIPSY': return 1;
        case 'DRUNK': return 2;
        case 'SMASHED': return 3;
        default: throw new Error(`Invalid drunk state ${state}`);
    }
}

export function idToDrunkState(id: number) : DrunkState {
    switch(id) {
        case 0: return 'SOBER'
        case 1: return 'TIPSY'
        case 2: return 'DRUNK'
        case 3: return 'SMASHED'
        default: throw new Error(`Invalid drunk state ${id}`)
    }
}