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
import { Subsystem } from "wotlkdata/cell/Subsystem";
import { ItemBase } from "./Item";

export class ItemResistance extends Subsystem<ItemBase> {
    protected get row() { return this.owner.sqlRow; }
    get holy() { return this.ownerWrap(this.owner.sqlRow.holy_res); }
    get fire() { return this.ownerWrap(this.row.fire_res); }
    get nature() { return this.ownerWrap(this.row.nature_res); }
    get frost() { return this.ownerWrap(this.row.frost_res); }
    get shadow() { return this.ownerWrap(this.row.shadow_res); }
    get arcane() { return this.ownerWrap(this.row.arcane_res); }
}