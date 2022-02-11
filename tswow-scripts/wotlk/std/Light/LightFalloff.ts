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
import { Light } from "./Light";

export class LightFalloff extends CellSystem<Light> {
    get Start() { return this.ownerWrap(this.owner.row.FalloffStart); }
    get End() { return this.ownerWrap(this.owner.row.FalloffEnd); }

    set(start: number, end: number) {
        this.Start.set(start);
        this.End.set(end);
        return this.owner;
    }
}