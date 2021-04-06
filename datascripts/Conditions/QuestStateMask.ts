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
export type QuestStateMask = 'NOT_TAKEN' | 'COMPLETED' | 'IN_PROGRESS' | 'FAILED' | 'REWARDED'

export function resolveQuestState(state: QuestStateMask) {
    switch(state) {
        case 'NOT_TAKEN': return 1;
        case 'COMPLETED': return 2;
        case 'IN_PROGRESS': return 8;
        case 'FAILED': return 32;
        case 'REWARDED': return 64;
        default: throw new Error(`Invalid QuestState: ${state}`);
    }
}

export function resolveQuestStates(states: QuestStateMask[]) {
    return states.reduce((p,c)=>p|resolveQuestState(c),0);
}

export function getQuestStates(mask: number) : QuestStateMask[] {
    const states: QuestStateMask[] = [];
    if(mask&1) { states.push('NOT_TAKEN'); }
    if(mask&2) { states.push('COMPLETED'); }
    if(mask&8) { states.push('IN_PROGRESS'); }
    if(mask&32) { states.push('FAILED'); }
    if(mask&64) { states.push('REWARDED'); }
    return states;
}