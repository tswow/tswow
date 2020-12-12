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
import { Objects } from '../ObjectIteration';
import { Subsystem } from '../Subsystem';

export class MaskBit2<T> {
    protected owner: MaskBase<T>;
    protected bit: number;
    constructor(owner: MaskBase<T>, bit: number) {
        this.owner = owner;
        this.bit = bit;
    }

    protected get isBit() { return true; }

    check() { return this.owner.check(this.bit); }
    mark() { return this.owner.mark(this.bit); }
    clear() { return this.owner.clear(this.bit); }
}

export abstract class MaskBase<T> extends Subsystem<T> {
    protected bit(no: number): MaskBit2<T> {
        return new MaskBit2(this, no);
    }
    abstract mark(no: number): T;
    abstract clear(no: number): T;
    abstract check(no: number): boolean;
    abstract clearAll(): T;
    abstract toString(): string;

    objectify() {
        return Object.keys(Objects.mapObject(this, ['object'],
            (k, v) => {
                return v.isBit && v.check();
            },
            (k, v) => {
                return k;
            }
        ));
    }
}

export class MaskCell<T> extends MaskBase<T> {
    protected cell: Cell<number, any>;

    constructor(owner: T, cell: Cell<number, any>) {
        super(owner);
        this.cell = cell;
    }

    toString() {
        return this.cell.get().toString(2);
    }

    clearAll() {
        this.cell.set(0);
        return this.owner;
    }

    mark(no: number): T {
        this.cell.set(this.cell.get() | 1 << no);
        return this.owner;
    }

    clear(no: number): T {
        this.cell.set(this.cell.get() & ~(1 << no));
        return this.owner;
    }

    check(no: number): boolean {
        return (this.cell.get() & (1 << no)) !== 0;
    }

    get() : number {
        return this.cell.get();
    }

    set(value: number) {
        this.cell.set(value);
        return this.owner;
    }

    protected bit(no: number): MaskBit2<T> { return new MaskBit2(this, no); }
}
