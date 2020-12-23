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
export type Gender = 'MALE'|'FEMALE'
export type GenderAllowNone = Gender | 'NONE'

export function resolveGender(gender: GenderAllowNone) {
    switch(gender) {
        case 'MALE': return 0;
        case 'FEMALE': return 1;
        case 'NONE': return 2;
        default: throw new Error(`Invalid gender ${gender}`);
    }
}

export function resolveGenderMask(genders: Gender[]) {
    return genders.reduce((p,c)=>p|=resolveGender(c),0);
}

export function getGender(gender: number) {
    switch(gender) {
        case 0: return 'MALE';
        case 1: return 'FEMALE';
        case 2: return 'NONE';
        default: throw new Error(`Invalid gender ${gender}`);
    }
}