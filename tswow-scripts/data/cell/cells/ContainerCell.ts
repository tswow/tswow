/*
 * This file is part of tswow (https://github.com/tswow)
 *
 * Copyright (C) 2022 tswow <https://github.com/tswow/>
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
import { CellSystem } from "../systems/CellSystem";
import { Cell, CPrim } from "./Cell";

export class ContainerCell<T extends CPrim,O> extends Cell<T,O> {
    protected value: T;

    constructor(owner: O, value: T) {
        super(owner);
        this.value = value;
    }

    get(): T {
        return this.value;
    }
    set(value: T): O {
        this.value = value;
        return this.owner;
    }
}

export class ObjContainerCell<T,O> extends CellSystem<O> {
    protected value: T;

    constructor(owner: O, value: T) {
        super(owner);
        this.value = value;
    }

    get(): T {
        return this.value;
    }
    set(value: T): O {
        this.value = value;
        return this.owner;
    }

    mod(callback: (value: T)=>void) {
        callback(this.value);
        return this.owner;
    }
}