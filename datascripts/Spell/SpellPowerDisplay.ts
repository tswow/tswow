import { EnumCell } from "wotlkdata/cell/cells/EnumCell";

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
export class SpellPowerDisplay<T> extends EnumCell<T> {
    /** Enum Value:                      0 */
    get None()       { return this.value(0) }
    /** Enum Value:                      1 */
    get AmmoSlot()   { return this.value(1) }
    /** Enum Value:                      41 */
    get Pyrite()     { return this.value(41) }
    /** Enum Value:                      61 */
    get Steam()      { return this.value(61) }
    /** Enum Value:                      101 */
    get Heat()       { return this.value(101) }
    /** Enum Value:                      121 */
    get Ooze()       { return this.value(121) }
    /** Enum Value:                      141 */
    get BloodPower() { return this.value(141) }
    /** Enum Value:                      142 */
    get Wrath()      { return this.value(142) }
}