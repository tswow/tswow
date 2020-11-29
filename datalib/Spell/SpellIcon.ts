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
import { Cell } from "wotlkdata/cell/Cell";
import { DummyCell } from "wotlkdata/cell/DummyCell";
import { DBC } from "wotlkdata/dbc/DBCFiles";
import { Ids } from "../Base/Ids";

export function pathToIcon(path: string) {
    let old = DBC.SpellIcon.find({TextureFilename:path})
    if(old===undefined) {
        return DBC.SpellIcon.add(Ids.SpellIcon.id(),{TextureFilename:path});
    }
    return old;
}

export function iconToPath(index: number) {
    if(index===0) return new DummyCell(undefined, ""); 
    return DBC.SpellIcon.findById(index).TextureFilename;
}

export class SpellIconCell<T> extends Cell<string, T> {
    protected id: Cell<number,any>;
    constructor(owner: T, id: Cell<number,any>) {
        super(owner);
        this.id = id;
    }

    get(): string {
        return iconToPath(this.id.get()).get();
    }

    set(value: string): T {
        this.id.set(pathToIcon(value).ID.get());
        return this.owner;
    }
}