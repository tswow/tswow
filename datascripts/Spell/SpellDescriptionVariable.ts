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
import { Cell } from "wotlkdata/wotlkdata/cell/cells/Cell";
import { SpellDescriptionVariablesQuery, SpellDescriptionVariablesRow } from "wotlkdata/wotlkdata/dbc/types/SpellDescriptionVariables";
import { Table } from "wotlkdata/wotlkdata/table/Table";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator, Ids } from "../Misc/Ids";
import { RefDynamic } from "../Refs/Ref";
import { RegistryDynamic } from "../Refs/Registry";

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

export class SpellDescriptionVariableRef<T>
    extends RefDynamic<T,SpellDescriptionVariable>
{
    setSimple(variables: string) {
        this.getRefCopy()
            .row.Variables.set(variables)
        return this.owner;
    }
}

export class SpellDescriptionVariableRegistryClass
    extends RegistryDynamic<
          SpellDescriptionVariable
        , SpellDescriptionVariablesRow
        , SpellDescriptionVariablesQuery
    >
{
    ref<T>(owner: T, cell: Cell<number,any>) {
        return new SpellDescriptionVariableRef(owner, cell, this);
    }
    protected Table(): Table<any, SpellDescriptionVariablesQuery, SpellDescriptionVariablesRow> & { add: (id: number) => SpellDescriptionVariablesRow; } {
        return DBC.SpellDescriptionVariables
    }
    protected ids(): DynamicIDGenerator {
        return Ids.SpellDescriptionVariable
    }
    Clear(entity: SpellDescriptionVariable): void {
        entity.row.Variables.set('')
    }
    protected FindByID(id: number): SpellDescriptionVariablesRow {
        return DBC.SpellDescriptionVariables.findById(id);
    }
    protected EmptyQuery(): SpellDescriptionVariablesQuery {
        return {}
    }
    ID(e: SpellDescriptionVariable): number {
        return e.ID
    }
    protected Entity(r: SpellDescriptionVariablesRow): SpellDescriptionVariable {
        return new SpellDescriptionVariable(r);
    }
}

export const SpellDescriptionVariableRegistry =
    new SpellDescriptionVariableRegistryClass();