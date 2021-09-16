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

import { EnumCellReadOnly } from "wotlkdata/cell/cells/EnumCell";
import { MaskCell32ReadOnly } from "wotlkdata/cell/cells/MaskCell";

export enum WorldObjectTypesEnum {
      UNIT          = 3
    , PLAYER        = 4
    , GAMEOBJECT    = 5
    , PLAYER_CORPSE = 7
}

export type WorldObjectTypeEnum = keyof typeof WorldObjectTypesEnum

export function resolveWorldObjectTypeEnum(type: WorldObjectTypeEnum) {
    return WorldObjectTypesEnum[type];
}

export class WorldObjectTypeEnumReadOnly<T> extends EnumCellReadOnly<T> {
    get Unit()         { return this.value(WorldObjectTypesEnum.UNIT); }
    get Player()       { return this.value(WorldObjectTypesEnum.PLAYER); }
    get GameObject()   { return this.value(WorldObjectTypesEnum.GAMEOBJECT); }
    get PlayerCorpse() { return this.value(WorldObjectTypesEnum.PLAYER_CORPSE); }
}

export enum WorldObjectTypesMask {
      UNIT          = 0x8
    , PLAYER        = 0x10
    , GAMEOBJECT    = 0x20
    , PLAYER_CORPSE = 0x80
}

export type WorldObjectTypeMask = keyof typeof WorldObjectTypesMask

export function resolveWorldObjectTypeMask(type: WorldObjectTypeMask) {
    return WorldObjectTypesMask[type];
}

export class WorldObjectTypeMaskReadOnly<T> extends MaskCell32ReadOnly<T> {
    get Unit()         { return this.extract_bit(WorldObjectTypesMask.UNIT); }
    get Player()       { return this.extract_bit(WorldObjectTypesMask.PLAYER); }
    get GameObject()   { return this.extract_bit(WorldObjectTypesMask.GAMEOBJECT); }
    get PlayerCorpse() { return this.extract_bit(WorldObjectTypesMask.PLAYER_CORPSE); }
}