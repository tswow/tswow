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

export class XYCell<T> extends Subsystem<T> {
    protected _x : Cell<number,any>;
    protected _y : Cell<number,any>;

    constructor(owner: T, x: Cell<number,any>, y: Cell<number,any>)  {
        super(owner);
        this._x = x;
        this._y = y;
    }

    get X() { return this.wrap(this._x); }
    get Y() { return this.wrap(this._y); }

    set(x: number, y: number) {
        this.X.set(x);
        this.Y.set(y);
    }
}