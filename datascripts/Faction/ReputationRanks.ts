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
export type ReputationRanks =
    'HATED' | 'HOSTILE' | 'UNFRIENDLY' | 'NEUTRAL' | 'FRIENDLY' | 'HONORED' | 'REVERED' | 'EXALTED'

export function reputationRankToMask(rank: ReputationRanks) {
    switch(rank) {
        case 'HATED':
            return 1;
        case 'HOSTILE':
            return 2;
        case 'UNFRIENDLY':
            return 4;
        case 'NEUTRAL':
            return 8;
        case 'FRIENDLY':
            return 16;
        case 'HONORED':
            return 32;
        case 'REVERED':
            return 64;
        case 'EXALTED':
            return 128;
    }
}

export function reputationRanksToMask(ranks: ReputationRanks[]) {
    let num = 0;
    for(const rank of ranks) {
        num+=reputationRankToMask(rank);
    }
    return num;
}

export function getRanks(mask: number) {
    const ranks : ReputationRanks[] = [];
    if(mask&1) ranks.push('HATED');
    if(mask&2) ranks.push('HOSTILE');
    if(mask&4) ranks.push('UNFRIENDLY')
    if(mask&8) ranks.push('NEUTRAL')
    if(mask&16) ranks.push('FRIENDLY')
    if(mask&32) ranks.push('HONORED')
    if(mask&64) ranks.push('REVERED')
    if(mask&128) ranks.push('EXALTED')
    return ranks;
}