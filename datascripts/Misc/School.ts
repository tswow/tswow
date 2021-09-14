import { EnumCell } from "wotlkdata/cell/cells/EnumCell";
import { MaskCell32 } from "wotlkdata/cell/cells/MaskCell";

/*
 * This file is part of tswow (https://github.com/tswow)
 *
 * Copyright (C) 2021 tswow <https://github.com/tswow/>
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
export class SchoolMask<T> extends MaskCell32<T> {
    get Physical() {return this.bit(0); }
    get Holy() {return this.bit(1); }
    get Fire() {return this.bit(2); }
    get Nature() {return this.bit(3); }
    get Frost() {return this.bit(4); }
    get Shadow() {return this.bit(5); }
    get Arcane() {return this.bit(6); }
}

export class SchoolEnum<T> extends EnumCell<T> {
    /** Enum Value:                    0 */
    get Physical() { return this.value(0) }
    /** Enum Value:                    1 */
    get Holy()     { return this.value(1) }
    /** Enum Value:                    2 */
    get Fire()     { return this.value(2) }
    /** Enum Value:                    3 */
    get Nature()   { return this.value(3) }
    /** Enum Value:                    4 */
    get Frost()    { return this.value(4) }
    /** Enum Value:                    5 */
    get Shadow()   { return this.value(5) }
    /** Enum Value:                    6 */
    get Arcane()   { return this.value(6) }
}