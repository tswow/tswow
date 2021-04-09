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
import { CPrim, Cell, CellIndexWrapper } from './Cell';
import { WrappedLoc } from './WrappedLoc';
import { LocSystem } from './LocSystem';
import { Objects } from './ObjectIteration';
import { CellArrayWrapper } from './CellArrayWrapper';
import { BaseSystem } from './BaseSystem';

export class MainSystem extends BaseSystem {
    protected get isSystem() { return true; }

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
                    MainSystem.cloneFrom(tarVal, srcVal);
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

    protected wrap<T extends CPrim>(cell: Cell<T, any>) {
        return new CellWrapper(this, cell);
    }

    protected wrapArray<W extends CPrim>(cell: CellArray<W, any>) {
        return new CellArrayWrapper(this, cell);
    }

    protected wrapLoc(loc: LocSystem<any>) : LocSystem<this> {
        return new WrappedLoc(this, loc);
    }

    protected wrapIndex<T extends CPrim>(cell: CellArray<T, any>, index: number) {
        return new CellIndexWrapper<T, this>(this, cell, index);
    }

    protected transientFields() : string[] {
        return [];
    }

    objectify(): any {
        return Objects.objectifyObj(this);
    }

    /**
     * Clones this system from another system
     * @param obj object to clone from, can be other MainSystem or plain object.
     */
    protected cloneFrom(obj: MainSystem | any) {
        MainSystem.cloneFrom(this, obj);
        return this;
    }
}
