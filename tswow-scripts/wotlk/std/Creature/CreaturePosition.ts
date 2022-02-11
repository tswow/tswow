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
import { Pos, Position } from "../Misc/Position";
import { CreatureInstance } from "./CreatureInstance";

export class CreaturePosition extends CellSystem<CreatureInstance> {
    get Map() { return this.ownerWrap(this.owner.row.map); }
    get X() { return this.ownerWrap(this.owner.row.position_x); }
    get Y() { return this.ownerWrap(this.owner.row.position_y); }
    get Z() { return this.ownerWrap(this.owner.row.position_z); }
    get Orientation() { return this.ownerWrap(this.owner.row.orientation); }

    set(pos: Position) {
        this.Map.set(pos.map);
        this.X.set(pos.x);
        this.Y.set(pos.y);
        this.Z.set(pos.z);
        this.Orientation.set(pos.o);
        return this.owner;
    }

    setSplit(map: number, x: number, y: number, z: number, o: number) {
        this.set(Pos(map,x,y,z,o));
        return this.owner;
    }
}