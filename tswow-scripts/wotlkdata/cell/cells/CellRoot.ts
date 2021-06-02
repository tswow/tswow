import { Transient } from "../serialization/Transient";

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
export abstract class CellRoot<T> {
    constructor(owner: T) {
        this.owner = owner;
    }

    protected get isCell() { return true; }
    protected owner: T;

    static owner<T>(cell: CellRoot<T>) {
        return cell.owner;
    }

    static isCell(candidate: any) {
        if(!candidate || typeof(candidate)!='object') return false;
        return (candidate as CellRoot<any>).isCell || undefined;
    }

    protected abstract objectify(): any;
    protected abstract deserialize(value: any): void;

    protected serialize(obj: any, key: string) {
        obj[key] = this.objectify();
    }

    @Transient
    get end() {
        return this.owner;
    }
}
