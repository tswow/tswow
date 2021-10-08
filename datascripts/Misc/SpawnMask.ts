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
import { MaskCell32 } from "wotlkdata/cell/cells/MaskCell";

export const SPAWN_MASKS = {
      CONTINENT       : 0
    , NORMAL_5        : 0
    , HEROIC_5        : 1
    , NORMAL_10       : 0
    , NORMAL_25       : 1
    , HEROIC_10       : 2
    , HEROIC_25       : 3
}

export type SpawnMaskType = keyof typeof SPAWN_MASKS

export function resolveSpawnMask(mask: SpawnMaskType[]) {
    return mask.reduce((p,c)=>(1<<SPAWN_MASKS[c])|p,0)
}

export class SpawnMask<T> extends MaskCell32<T> {
    get Continent()   { return this.bit(SPAWN_MASKS.CONTINENT); }
    get Normal5Man()  { return this.bit(SPAWN_MASKS.NORMAL_5); }
    get Heroic5Man()  { return this.bit(SPAWN_MASKS.HEROIC_5); }
    get Normal10Man() { return this.bit(SPAWN_MASKS.NORMAL_10); }
    get Normal25Man() { return this.bit(SPAWN_MASKS.NORMAL_25); }
    get Heroic10Man() { return this.bit(SPAWN_MASKS.HEROIC_10); }
    get Heroic25Man() { return this.bit(SPAWN_MASKS.HEROIC_25); }
}