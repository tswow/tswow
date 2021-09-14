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

export class ItemFoodType extends EnumCell<ItemTemplate> {
    /** Enum Value:                   1 */
    get Meat()    { return this.value(1) }
    /** Enum Value:                   2 */
    get Fish()    { return this.value(2) }
    /** Enum Value:                   3 */
    get Cheese()  { return this.value(3) }
    /** Enum Value:                   4 */
    get Bread()   { return this.value(4) }
    /** Enum Value:                   5 */
    get Fungus()  { return this.value(5) }
    /** Enum Value:                   6 */
    get Fruit()   { return this.value(6) }
    /** Enum Value:                   7 */
    get RawMeat() { return this.value(7) }
    /** Enum Value:                   8 */
    get RawFish() { return this.value(8) }
}