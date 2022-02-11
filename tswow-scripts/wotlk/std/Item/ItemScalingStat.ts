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
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { ItemTemplate } from "./ItemTemplate";

export class ItemScalingStat extends CellSystem<ItemTemplate> {
    get Distribution() { return this.owner.row.ScalingStatDistribution; }
    get Value() { return this.owner.row.ScalingStatValue; }

    set(distribution: number, value: number) {
        this.Distribution.set(distribution);
        this.Value.set(value);
        return this.owner;
    }
}