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
import { CellWrapperExists, PendingCell } from '../cells/PendingCell';
import { Objects } from '../serialization/ObjectIteration';
import { Transient } from '../serialization/Transient';
import { MulticastCell } from '../cells/MulticastCell';
import { loc_constructor } from '../../primitives';
import { Language, Languages } from '../../dbc/Localization';
import { CommonStruct } from '../serialization/CommonStruct';

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

    static isSystem(candidate: any) {
        if(!candidate ||  typeof(candidate) != 'object') return false;
        return (candidate as CellSystem<any>).isSubsystem || false;
    }

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

    protected wrapMulticast<D extends CPrim>(cells: Cell<D,any>[]) {
        return this.wrap(new MulticastCell(this,cells));
    }

    protected deserialize(json: any) {
        let _this = this as any;
        for(let key in json) {
            let v = _this[key];
            if(!v) {
                throw new Error(`Invalid field deserialized: ${key}`);
            }
            v.deserialize(json[key]);
        }
    }

    protected serialize(obj: any, key: string) {
        obj[key] = this.objectify();
    }

    objectify(): any {
        return Objects.objectifyObj(this);
    }
}

export class CellSystemTop extends CellSystem<undefined> {
    constructor() {
        super(undefined);
    }
}

@CommonStruct('localization')
export abstract class LocSystem<T> extends CellSystem<T> {
    abstract lang(lang: Language): Cell<string, T> & PendingCell;
    abstract get mask(): Cell<number, T>;
    abstract set(con: loc_constructor): T;

    get isLocalization() { return true; }

    get enGB() { return this.lang('enGB'); }
    get koKR() { return this.lang('koKR'); }
    get frFR() { return this.lang('frFR'); }
    get deDE() { return this.lang('deDE'); }
    get enCN() { return this.lang('enCN'); }
    get zhCN() { return this.lang('zhCN'); }
    get enTW() { return this.lang('enTW'); }
    get zhTW() { return this.lang('zhTW'); }
    get esES() { return this.lang('esES'); }
    get esMX() { return this.lang('esMX'); }
    get ruRU() { return this.lang('ruRU'); }
    get ptPT() { return this.lang('ptPT'); }
    get ptBR() { return this.lang('ptBR'); }
    get itIT() { return this.lang('itIT'); }
    get Unk() { return this.lang('Unk'); }

    clear() {
        Languages.forEach(x=>{
            let c = this.lang(x);
            if(c && c.get() && c.get().length>0) {
                c.set('')
            }
        });
    }
}

export class WrappedLoc<T> extends LocSystem<T> {
    @Transient
    private wrapped: LocSystem<T>;

    constructor(owner: T, wrapped: LocSystem<T>) {
        super(owner);
        this.wrapped = wrapped;
    }

    lang(lang: Language): Cell<string, T> & PendingCell {
        return this.ownerWrapExists(this.wrapped.lang(lang));
    }

    get mask(): Cell<number, T> {
        return this.ownerWrap(this.wrapped.mask);
    }

    set(con: loc_constructor): T {
        this.wrapped.set(con);
        return this.owner;
    }

    objectify() {
        return this.wrapped.objectify();
    }
}