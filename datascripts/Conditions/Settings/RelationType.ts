import { EnumCellReadOnly } from "wotlkdata/cell/cells/EnumCell";

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
export enum RelationTypes {
      SELF         = 0
    , PARTY        = 1
    , OWNED_BY     = 2
    , PASSANGER_OF = 3
    , CREATED_BY   = 4
}

export type RelationType = keyof typeof RelationTypes;

export function resolveRelation(type: RelationType) {
    return RelationTypes[type];
}

export class RelationTypeEnumReadOnly<T> extends EnumCellReadOnly<T> {
    get Self()        { return this.value(RelationTypes.SELF); }
    get Party()       { return this.value(RelationTypes.PARTY); }
    get OwnedBy()     { return this.value(RelationTypes.OWNED_BY); }
    get PassangerOf() { return this.value(RelationTypes.PASSANGER_OF); }
    get CreatedBy()   { return this.value(RelationTypes.CREATED_BY); }
}