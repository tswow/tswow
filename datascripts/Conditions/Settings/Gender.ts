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

import { EnumCell, EnumCellReadOnly } from "wotlkdata/cell/cells/EnumCell";

export const Genders = [
      'MALE'
    , 'FEMALE'
] as const

export const GendersAllowNone = [
      'MALE'
    , 'FEMALE'
    , 'NONE'
] as const

export type Gender = typeof Genders[number]
export type GenderAllowNone = typeof GendersAllowNone[number]

export function resolveGender(gender: Gender) {
    let index = (typeof(gender) === 'string')
        ? Genders.indexOf(gender)
        : gender;
    if(index < 0 || index >= Genders.length) {
        throw new Error(`Invalid gender: ${gender}`);
    }
    return index;
}

export function resolveGenderAllowNone(gender: GenderAllowNone) {
    let index = (typeof(gender) === 'string')
        ? GendersAllowNone.indexOf(gender)
        : gender;
    if(index < 0 || index >= GendersAllowNone.length) {
        throw new Error(`Invalid gender: ${gender}`);
    }
    return index;
}

export class GenderReadOnly<T> extends EnumCellReadOnly<T> {
    get Male()   { return this.value(0); }
    get Female() { return this.value(1); }
}

export class GenderAllowNoneEnumReadOnly<T> extends EnumCellReadOnly<T> {
    get Male()   { return this.value(0); }
    get Female() { return this.value(1); }
    get None()   { return this.value(2); }
}

export class GenderEnum<T> extends EnumCell<T> {
    get Male()   { return this.value(0); }
    get Female() { return this.value(1); }
}

export class GenderAllowNoneEnum<T> extends EnumCell<T> {
    get Male()   { return this.value(0); }
    get Female() { return this.value(1); }
    get None()   { return this.value(2); }
}