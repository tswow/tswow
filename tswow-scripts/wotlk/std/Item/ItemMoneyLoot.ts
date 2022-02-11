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
import { CellSystem } from "wotlkdata/wotlkdata/cell/systems/CellSystem";
import { ItemTemplate } from "./ItemTemplate";

export class ItemMoneyLoot extends CellSystem<ItemTemplate> {
    get Min() { return this.ownerWrap(this.owner.row.minMoneyLoot); }
    get Max() { return this.ownerWrap(this.owner.row.maxMoneyLoot); }

    set(min: number, max: number) {
        this.Min.set(min);
        this.Max.set(max);
        return this.owner;
    }
}