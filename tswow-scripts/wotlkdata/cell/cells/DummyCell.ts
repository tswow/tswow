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
import { Cell, CPrim } from './Cell';

export class DummyCell<D extends CPrim, T> extends Cell<D, T> {
    protected value: D;
    constructor(owner: T, value: D) {
        super(owner);
        this.value = value;
    }

    get(): D {
        return this.value;
    }

    set(value: D): T {
        this.value = value;
        return this.owner;
    }
}