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
import { CellArray, CellArrayWrapper, CellIndexWrapper } from '../cells/CellArray';
import { CPrim, Cell, CellWrapper } from '../cells/Cell';
import { LocSystem, WrappedLoc } from './LocSystem';
import { CellWrapperExists } from '../cells/PendingCell';
import { Objects } from '../misc/ObjectIteration';
import { Transient } from '../misc/Transient';

export class CellSystem<T> {
    static cloneFrom(tar: any, src: any) {
        if (src === undefined) {
            return;
        }

        Objects.getAllPropertyNames(src).forEach((key: any) => {
            if (src[key] !== undefined && src[key] !== null) {
                const srcVal = src[key];
                const tarVal = tar[key];
                if (!tarVal || typeof (tarVal) !== 'object') {
                    return;
                }

                if (tarVal.isSubsystem) {
                    CellSystem.cloneFrom(tarVal, srcVal);
                } else if (tarVal.isCell) {
                    // TODO: Separate check for arrays for performance?
                    if (typeof (srcVal) === 'object' && srcVal.isCell) {
                        tarVal.set(srcVal.get());
                    } else {
                        tarVal.set(srcVal);
                    }
                }
            }
        });
    }


    @Transient
    protected owner: T;

    @Transient
    protected uniqueRefs: boolean = true;

    constructor(owner: T) {
        this.owner = owner;
    }

    @Transient
    get end() { return this.owner; }

    @Transient
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

    protected ownerWrapLoc(loc: LocSystem<any>) : WrappedLoc<T> {
        return new WrappedLoc<T>(this.owner, loc);
    }

    protected wrapLoc(loc: LocSystem<any>) : WrappedLoc<this> {
        return new WrappedLoc<this>(this, loc);
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

    protected cloneFrom(obj: CellSystem<any> | any) {
        CellSystem.cloneFrom(this, obj);
        return this;
    }
}

export class CellSystemTop extends CellSystem<undefined> {
    constructor() {
        super(undefined);
    }
}