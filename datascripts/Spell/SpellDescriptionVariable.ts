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
import { DBC } from "wotlkdata";
import { Subsystem } from "wotlkdata/cell/Subsystem";
import { Ids } from "../Base/Ids";
import { Cell } from "wotlkdata/cell/Cell";

export class SpellDescriptionVariable<T> extends Subsystem<T> {
    protected cell: Cell<number,any>;

    constructor(owner: T, cell: Cell<number,any>) {
        super(owner);
        this.cell = cell;
    }

    transientFields() {
        return ['cell'];
    }

    get row() { 
        if(this.cell.get()===0) {
            const row = DBC.SpellDescriptionVariables.add(Ids.SpellDescriptionVariable.id())
            this.cell.set(row.ID.get());
            return row;
        }
        return DBC.SpellDescriptionVariables.find({ID: this.cell.get()})
    }

    makeUnique() {
        if(this.cell.get()===0) {
            return;
        }
        const row = DBC.SpellDescriptionVariables.findById(this.cell.get())
            .clone(Ids.SpellDescriptionVariable.id())
        this.cell.set(row.ID.get());
        return this.owner;
    }

    objectify() { 
        return this.row.Variables.get();
    }

    get() {
        return this.row.Variables.get();
    }

    set(value: string) {
        this.row.Variables.set(value);
        return this.owner;
    }
}