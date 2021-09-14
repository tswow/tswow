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
import { Map } from "./Map";

export class MapInstanceType extends EnumCell<Map>{
    /** Enum Value:                 0 */
    get None()  { return this.value(0) }
    /** Enum Value:                 1 */
    get Party() { return this.value(1) }
    /** Enum Value:                 2 */
    get Raid()  { return this.value(2) }
    /** Enum Value:                 3 */
    get PVP()   { return this.value(3) }
    /** Enum Value:                 4 */
    get Arena() { return this.value(4) }
}