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
import { Spell } from "./Spell";

export class SpellDescriptionVariable extends Subsystem<Spell> {
    get row() { 
        if(this.owner.row.SpellDescriptionVariableID.get()===0) {
            const row = DBC.SpellDescriptionVariables.add(Ids.SpellDescriptionVariable.id())
            this.owner.row.SpellDescriptionVariableID.set(row.ID.get());
            return row;
        }
        return DBC.SpellDescriptionVariables.find({ID: this.owner.row.SpellDescriptionVariableID.get()})
    }

    makeUnique() {
        if(this.owner.row.SpellDescriptionVariableID.get()===0) {
            return;
        }
        const row = DBC.SpellDescriptionVariables.findById(this.owner.row.SpellDescriptionVariableID.get())
            .clone(Ids.SpellDescriptionVariable.id())
        this.owner.row.SpellDescriptionVariableID.set(row.ID.get());
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