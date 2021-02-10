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
import { MaskCell } from "wotlkdata/cell/systems/Mask";

export class SchoolMask<T> extends MaskCell<T> {
    get Physical() {return this.bit(0); }
    get Holy() {return this.bit(1); }
    get Fire() {return this.bit(2); }
    get Nature() {return this.bit(3); }
    get Frost() {return this.bit(4); }
    get Shadow() {return this.bit(5); }
    get Arcane() {return this.bit(6); }
}