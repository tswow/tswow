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
import { CreatureTemplate } from "./CreatureTemplate";

export class CreatureLevel extends CellSystem<CreatureTemplate> {
    set(min: number, max: number = min) {
        this.Min.set(min);
        this.Max.set(max);
        return this.owner;
    }

    get Min() { return this.ownerWrap(this.owner.row.minlevel); }
    get Max() { return this.ownerWrap(this.owner.row.maxlevel); }
}