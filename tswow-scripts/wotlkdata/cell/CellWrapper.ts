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
import { CPrim, Cell } from './Cell';

export class CellWrapper<D extends CPrim, T> extends Cell<D, T> {

    constructor(owner: T, cell: Cell<D, any>) {
        super(owner);
        this.cell = cell;
    }
    protected cell: Cell<D, any>;
    get(): D {
        return this.cell.get();
    }

    set(value: D): T {
        this.cell.set(value);
        return this.owner;
    }

    protected objectify(): any {
        return this.cell.get();
    }
}
