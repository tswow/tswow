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
import { Ids } from "../Misc/Ids";
import { SpellDescriptionVariablesRow } from "wotlkdata/dbc/types/SpellDescriptionVariables";
import { MainEntity } from "../Misc/Entity";
import { Pointer } from "../Refs/Pointer";

export class SpellDescriptionVariable extends MainEntity<SpellDescriptionVariablesRow> {
    clear(): this {
        this.set("");
        return this;
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

    get ID() {
        return this.row.ID.get();
    }
}

export class SpellDescriptionVariablePointer<T> extends Pointer<T,SpellDescriptionVariable> {
    protected exists(): boolean {
        return this.cell.get() > 0;
    }
    protected create(): SpellDescriptionVariable {
        return new SpellDescriptionVariable(DBC.SpellDescriptionVariables.add(Ids.SpellDescriptionVariable.id()));
    }
    protected clone(): SpellDescriptionVariable {
        return new SpellDescriptionVariable(this.resolve().row.clone(Ids.SpellDescriptionVariable.id()))
    }
    protected id(v: SpellDescriptionVariable): number {
        return v.ID;
    }
    protected resolve(): SpellDescriptionVariable {
        return new SpellDescriptionVariable(DBC.SpellDescriptionVariables.findById(this.cell.get()));
    }
}