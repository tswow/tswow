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
import { Cell } from "../../../data/cell/cells/Cell";
import { Transient } from "../../../data/cell/serialization/Transient";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { MapRegistry } from "../Map/Maps";
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

    setSpread(x: number, y: number, z: number) {
        this.X.set(x)
        this.Y.set(y)
        this.Z.set(z)
        return this.owner;
    }

    set(obj: {x: number, y: number, z: number}) {
        return this.setSpread(obj.x,obj.y,obj.z);
    }

    toPosition(map: number, o: number = 0) {
        return {
              x: this.X.get()
            , y: this.Y.get()
            , z: this.Z.get()
            , map
            , o
        }
    }
}

export class PositionMapXYZCell<T> extends CellSystem<T> {
    @Transient
    protected readonly _map: Cell<number,any>;
    @Transient
    protected readonly _x: Cell<number,any>;
    @Transient
    protected readonly _y: Cell<number,any>;
    @Transient
    protected readonly _z: Cell<number,any>;

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
    get Map() { return MapRegistry.ref(this.owner, this._map); }

    setSpread(map: number, x: number, y: number, z: number) {
        this.X.set(x);
        this.Y.set(y);
        this.Z.set(z);
        this.Map.set(map);
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

    set(position: {x:number,y:number,z:number,map:number, o?:number}) {
        if(position.x) this.X.set(position.x);
        if(position.y) this.Y.set(position.y);
        if(position.z) this.Z.set(position.z);
        if(position.map) this.Map.set(position.map);
        return this.owner;
    }
}

export class PositionXYZOCell<T> extends CellSystem<T>{
    @Transient
    protected readonly _x: Cell<number,any>;
    @Transient
    protected readonly _y: Cell<number,any>;
    @Transient
    protected readonly _z: Cell<number,any>;
    @Transient
    protected readonly _o: Cell<number,any>;

    constructor(owner: T,x: Cell<number,any>, y: Cell<number,any>, z: Cell<number,any>, o: Cell<number,any>) {
        super(owner);
        this._x = x;
        this._y = y;
        this._z = z;
        this._o = o;
    }

    get X() { return this.ownerWrap(this._x); }
    get Y() { return this.ownerWrap(this._y); }
    get Z() { return this.ownerWrap(this._z); }
    get O() { return this.ownerWrap(this._o); }

    setSpread(x: number,y: number, z: number, o: number) {
        this.X.set(x)
        this.Y.set(y)
        this.Z.set(z)
        this.O.set(o);
        return this.owner;
    }

    set(obj: {x:number,y:number,z:number,o:number,map?: number}) {
        this.setSpread(obj.x,obj.y,obj.z,obj.o);
        return this.owner;
    }

    toPosition(map: number): Position {
        return {
            map
            , x: this.X.get()
            , y: this.Y.get()
            , z: this.Z.get()
            , o: this.O.get()
        }
    }
}

export class PositionMapXYZOCell<T> extends CellSystem<T>{
    @Transient
    protected readonly _map: Cell<number,any>;
    @Transient
    protected readonly _x: Cell<number,any>;
    @Transient
    protected readonly _y: Cell<number,any>;
    @Transient
    protected readonly _z: Cell<number,any>;
    @Transient
    protected readonly _o: Cell<number,any>;

    constructor(owner: T, map: Cell<number,any>,x: Cell<number,any>, y: Cell<number,any>, z: Cell<number,any>, o: Cell<number,any>) {
        super(owner);
        this._map = map;
        this._x = x;
        this._y = y;
        this._z = z;
        this._o = o;
    }

    get X()   { return this.ownerWrap(this._x); }
    get Y()   { return this.ownerWrap(this._y); }
    get Z()   { return this.ownerWrap(this._z); }
    get O()   { return this.ownerWrap(this._o); }
    get Map() { return MapRegistry.ref(this.owner, this._map); }

    setSpread(map: number, x: number,y: number, z: number, o: number) {
        this.Map.set(map);
        this.X.set(x)
        this.Y.set(y)
        this.Z.set(z)
        this.O.set(o);
        return this.owner;
    }

    set(obj: {map:number,x:number,y:number,z:number,o:number}) {
        this.setSpread(obj.map,obj.x,obj.y,obj.z,obj.o);
        return this.owner;
    }

    toPosition(): Position {
        return {
              map: this.Map.get()
            , x: this.X.get()
            , y: this.Y.get()
            , z: this.Z.get()
            , o: this.O.get()
        }
    }
}

export class QuaternionCell<T> extends CellSystem<T> {
    @Transient
    protected readonly _x: Cell<number,any>;
    @Transient
    protected readonly _y: Cell<number,any>;
    @Transient
    protected readonly _z: Cell<number,any>;
    @Transient
    protected readonly _w: Cell<number,any>;

    constructor(owner: T, x: Cell<number,any>, y: Cell<number,any>, z: Cell<number,any>, w: Cell<number,any>) {
        super(owner);
        this._x = x;
        this._y = y;
        this._z = z;
        this._w = w;
    }
    get X() { return this.ownerWrap(this._x); }
    get Y() { return this.ownerWrap(this._y); }
    get Z() { return this.ownerWrap(this._z); }
    get W() { return this.ownerWrap(this._w); }

    set(obj: {x: number, y: number, z: number, w: number}) {
        this.setSpread(obj.x,obj.y,obj.z,obj.w);
        return this.owner;
    }

    setSpread(x: number, y: number, z: number, w: number) {
        this.X.set(x);
        this.Y.set(y);
        this.Z.set(z);
        this.W.set(w);
        return this.owner;
    }
}

export class PositionXYCell<T> extends CellSystem<T> {
    protected x: Cell<number,any>
    protected y: Cell<number,any>

    constructor(owner: T,x: Cell<number,any>, y: Cell<number,any>) {
        super(owner);
        this.x = x;
        this.y = y;
    }

    get X() { return this.ownerWrap(this.x); }
    get Y() { return this.ownerWrap(this.y); }

    setSpread(x: number, y: number) {
        this.X.set(x);
        this.Y.set(y);
        return this.owner;
    }

    set(obj: {x: number, y: number}) {
        return this.setSpread(obj.x,obj.y);
    }
}