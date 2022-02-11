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
import { Transient } from "wotlkdata/wotlkdata/cell/serialization/Transient";
import { CellSystem } from "wotlkdata/wotlkdata/cell/systems/CellSystem";
import { ItemTemplate } from "./ItemTemplate";

export class ItemResistance extends CellSystem<ItemTemplate> {
    @Transient
    protected get row() { return this.owner.row; }
    get Holy() { return this.ownerWrap(this.owner.row.holy_res); }
    get Fire() { return this.ownerWrap(this.row.fire_res); }
    get Nature() { return this.ownerWrap(this.row.nature_res); }
    get Frost() { return this.ownerWrap(this.row.frost_res); }
    get Shadow() { return this.ownerWrap(this.row.shadow_res); }
    get Arcane() { return this.ownerWrap(this.row.arcane_res); }

    set(holy: number, fire: number, nature: number, frost: number, shadow: number, arcane: number) {
        this.Holy.set(holy)
        this.Fire.set(fire)
        this.Nature.set(nature)
        this.Frost.set(frost)
        this.Shadow.set(shadow)
        this.Arcane.set(arcane)
        return this.owner;
    }

    clearAll() {
        this.set(0,0,0,0,0,0);
        return this.owner;
    }
}