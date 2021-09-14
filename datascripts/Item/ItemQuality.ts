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
import { EnumCell } from "wotlkdata/cell/cells/EnumCell";
import { ItemTemplate } from "./ItemTemplate";

export class ItemQuality extends EnumCell<ItemTemplate> {
    constructor(owner: ItemTemplate) {
        super(owner, owner.row.Quality);
    }

    /** Enum Value:                    0 */
    get Gray()     { return this.value(0) }
    /** Enum Value:                    1 */
    get White()    { return this.value(1) }
    /** Enum Value:                    2 */
    get Green()    { return this.value(2) }
    /** Enum Value:                    3 */
    get Blue()     { return this.value(3) }
    /** Enum Value:                    4 */
    get Purple()   { return this.value(4) }
    /** Enum Value:                    5 */
    get Orange()   { return this.value(5) }
    /** Enum Value:                    6 */
    get Heirloom() { return this.value(6) }
}