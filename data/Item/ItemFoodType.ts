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
import { EnumBase } from "wotlkdata/cell/Systems/Enum";
import { ItemBase } from "./Item";

export class ItemFoodType extends EnumBase<ItemBase> {
    get(): number {
        return this.owner.row.FoodType.get();
    }
    set(value: number): ItemBase {
        this.owner.row.FoodType.set(value);
        return this.owner;
    }

    setMeat() { return this.set(1); }
    setFish() { return this.set(2); }
    setCheese() { return this.set(3); }
    setBread() { return this.set(4); }
    setFungus() { return this.set(5); }
    setFruit() { return this.set(6); }
    setRawMeat() { return this.set(7); }
    setRawFish() { return this.set(8); }
}