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
import { Cell } from "wotlkdata/cell/cells/Cell";
import { CellSystem } from "wotlkdata/cell/systems/CellSystem";
import { Transient } from "wotlkdata/cell/serialization/Transient";
import { Position } from "./Position";

export class PositionXYZCell<T> extends CellSystem<T> {
    @Transient
    readonly _x: Cell<number,any>;
    @Transient
    readonly _y: Cell<number,any>;
    @Transient
    readonly _z: Cell<number,any>;
    constructor(owner: T,x: Cell<number,any>, y: Cell<number,any>, z: Cell<number,any>) {
        super(owner);
        this._x = x;
        this._y = y;
        this._z = z;
    }

    get X() { return this.ownerWrap(this._x) }
    get Y() { return this.ownerWrap(this._y) }
    get Z() { return this.ownerWrap(this._z) }

    set(pos: Position) {
        this.X.set(pos.x)
        this.Y.set(pos.y)
        this.Z.set(pos.z)
        return this.owner;
    }
}

export class PositionMapXYZCell<T> extends CellSystem<T> {
    @Transient
    readonly _map: Cell<number,any>;
    @Transient
    readonly _x: Cell<number,any>;
    @Transient
    readonly _y: Cell<number,any>;
    @Transient
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

    toPosition(): Position {
        return {
              x: this.X.get()
            , y: this.Y.get()
            , z: this.Z.get()
            , map: this._map.get()
            , o: 0
        }
    }
}

export class PositionXYZOCell<T> extends PositionMapXYZCell<T> {
    @Transient
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

    toPosition(): Position {
        return Object.assign(super.toPosition(),{o:this.O.get()});
    }
}