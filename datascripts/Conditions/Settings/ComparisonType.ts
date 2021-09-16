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

export enum ComparisonTypes {
      EQUAL            = 0
    , GREATER          = 1
    , LESS             = 2
    , GREATER_OR_EQUAL = 3
    , LESS_OR_EQUAL    = 4
}

export type ComparisonType = keyof typeof ComparisonTypes;

export function resolveComparison(type: ComparisonType) {
    return ComparisonTypes[type];
}

export class ComparisonEnum<T> extends EnumCell<T> {
    get Equal()          { return this.value(ComparisonTypes.EQUAL); }
    get Greater()        { return this.value(ComparisonTypes.GREATER); }
    get Less()           { return this.value(ComparisonTypes.LESS); }
    get GreaterOrEqual() { return this.value(ComparisonTypes.GREATER_OR_EQUAL); }
    get LessOrEqual()    { return this.value(ComparisonTypes.LESS_OR_EQUAL); }
}

export class ComparisonEnumReadOnly<T> extends EnumCellReadOnly<T> {
    get Equal()          { return this.value(ComparisonTypes.EQUAL); }
    get Greater()        { return this.value(ComparisonTypes.GREATER); }
    get Less()           { return this.value(ComparisonTypes.LESS); }
    get GreaterOrEqual() { return this.value(ComparisonTypes.GREATER_OR_EQUAL); }
    get LessOrEqual()    { return this.value(ComparisonTypes.LESS_OR_EQUAL); }
}