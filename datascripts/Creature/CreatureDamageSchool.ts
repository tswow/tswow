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
import { CreatureTemplate } from "./CreatureTemplate";

export class CreatureDamageSchool extends EnumCell<CreatureTemplate> {
    get Normal() { return this.value(0)}
    get Holy()   { return this.value(1)}
    get Fire()   { return this.value(2)}
    get Nature() { return this.value(3)}
    get Frost()  { return this.value(4)}
    get Shadow() { return this.value(5)}
    get Arcane() { return this.value(6)}
}
