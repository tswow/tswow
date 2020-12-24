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
import { Cell } from "wotlkdata/cell/Cell";
import { Subsystem } from "wotlkdata/cell/Subsystem";
import { Position } from "./Position";

export class PositionXYZCell<T> extends Subsystem<T> {
    readonly _map: Cell<number,any>;
    readonly _x: Cell<number,any>;
    readonly _y: Cell<number,any>;
    readonly _z: Cell<number,any>;

    constructor(owner: T,map: Cell<number,any>,x: Cell<number,any>, y: Cell<number,any>, z: Cell<number,any>) {
        super(owner);
        this._x = x;
        this._y = y;
        this._z = z;
        this._map = map;
    }

    get X() { return this.ownerWrap(this._x); }
    get Y() { return this.ownerWrap(this._y); }
    get Z() { return this.ownerWrap(this._z); }
    get Map() { return this.ownerWrap(this._map); }

    set(position: Position) {
        this.X.set(position.x);
        this.Y.set(position.y);
        this.Z.set(position.z);
        this.Map.set(position.map);
        return this.owner;
    }
}

export class PositionXYZOCell<T> extends PositionXYZCell<T> {
    readonly _o: Cell<number,any>;

    constructor(owner: T,map: Cell<number,any>,x: Cell<number,any>, y: Cell<number,any>, z: Cell<number,any>, o: Cell<number,any>) {
        super(owner,map,x,y,z);
        this._o = o;
    }

    get O() { return this.ownerWrap(this._o); }

    set(position: Position) {
        super.set(position);
        this.O.set(position.o);
        return this.owner;
    }
}