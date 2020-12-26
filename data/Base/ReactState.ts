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
export type ReactState = 'PASSIVE' | 'DEFENSIVE' | 'AGGRESSIVE';

export function resolveReactState(state: ReactState) {
    switch(state) {
        case 'PASSIVE': return 0;
        case 'DEFENSIVE': return 1;
        case 'AGGRESSIVE': return 2;
        default: throw new Error(`Invalid ReactState: ${state}`);
    }
}

export function getReactState(id: number) : ReactState {
    switch(id) {
        case 0: return 'PASSIVE'
        case 1: return 'DEFENSIVE'
        case 2: return 'AGGRESSIVE'
        default: throw new Error(`Invalid ReactState ID: ${id}`);
    }
}