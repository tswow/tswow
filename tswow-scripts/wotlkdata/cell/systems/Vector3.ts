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
import { Cell } from '../Cell';
import { Subsystem } from '../Subsystem';

export class Vector3<T> extends Subsystem<T> {
    readonly x: Cell<number, any>;
    readonly y: Cell<number, any>;
    readonly z: Cell<number, any>;

    constructor(
        owner: T,
        x: Cell<number, any>,
        y: Cell<number, any>,
        z: Cell<number, any>) {
            super(owner);
            this.x = x;
            this.y = y;
            this.z = z;
    }

    set(x: number, y: number, z: number) {
        this.x.set(x);
        this.y.set(y);
        this.z.set(z);
        return this.owner;
    }

    add(x: number, y = 0, z = 0) {
        this.x.set(this.x.get() + x);
        this.y.set(this.y.get() + y);
        this.z.set(this.z.get() + z);
    }
}
