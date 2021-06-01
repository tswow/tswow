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
import { Ids, AutoIdGenerator } from "../Misc/Ids";
import { SpellDescriptionVariablesRow } from "wotlkdata/dbc/types/SpellDescriptionVariables";
import { SharedRef, SharedRefTable } from "../Refs/SharedRef";

export class SpellDescriptionVariable<T> extends SharedRef<T, SpellDescriptionVariablesRow> {
    table(): SharedRefTable<SpellDescriptionVariablesRow> {
        return DBC.SpellDescriptionVariables;
    }
    ids(): AutoIdGenerator {
        return Ids.SpellDescriptionVariable;
    }

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
}