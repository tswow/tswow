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
import { CPrim } from './Cell';
import { CellArray } from './CellArray';

export class CellArrayWrapper<D extends CPrim, T> extends CellArray<D, T> {
    protected cell: CellArray<D, any>;

    constructor(owner: T, cell: CellArray<D, any>) {
        super(owner, cell.length);
        this.cell = cell;
    }

    setIndex(index: number, value: D): T {
        this.cell.setIndex(index, value);
        return this.owner;
    }

    getIndex(index: number): D {
        return this.cell.getIndex(index);
    }

    protected objectify(): any {
        return this.cell.get();
    }
}
