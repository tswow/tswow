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
import { CellArray } from './CellArray';
import { CellWrapper } from './CellWrapper';
import { CellWrapperExists } from './CellWrapperExists';
import { CPrim, Cell, CellIndexWrapper } from './Cell';
import { WrappedLoc } from './WrappedLoc';
import { LocSystem } from './LocSystem';
import { Objects } from './ObjectIteration';
import { CellArrayWrapper } from './CellArrayWrapper';

export class Subsystem<T> {
    protected owner: T;
    constructor(owner: T) {
        this.owner = owner;
    }

    up() {
        return this.owner;
    }

    protected get isSubsystem() { return true; }

    protected wrap<W extends CPrim>(cell: Cell<W, any>) {
        return new CellWrapper(this, cell);
    }

    protected wrapArray<W extends CPrim>(cell: CellArray<W, any>) {
        return new CellArrayWrapper(this, cell);
    }

    protected ownerWrapArray<W extends CPrim>(cell: CellArray<W, any>) {
        return new CellArrayWrapper(this.owner, cell);
    }

    protected ownerWrap<G extends CPrim>(cell: Cell<G, any>) {
        return new CellWrapper<G, T>(this.owner, cell);
    }

    protected ownerWrapExists<G extends CPrim>(cell: Cell<G, any>) {
        return new CellWrapperExists<G, T>(this.owner, cell);
    }

    protected ownerWrapLoc(loc: LocSystem<any>) {
        return new WrappedLoc(this.owner, loc);
    }

    protected wrapLoc(loc: LocSystem<any>) {
        return new WrappedLoc(this, loc);
    }

    protected wrapIndex<W extends CPrim>(cell: CellArray<W, any>, index: number) {
        return new CellIndexWrapper(this, cell, index);
    }

    protected ownerWrapIndex<D extends CPrim>(cell: CellArray<D, any>, index: number) {
        return new CellIndexWrapper<D, T>(this.owner, cell, index);
    }

    protected wrapExists<D extends CPrim>(cell: Cell<D, any>) {
        return new CellWrapperExists<D, this>(this, cell);
    }

    objectify(): any {
        return Objects.objectifyObj(this);
    }
}
