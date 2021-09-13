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

import { Transient } from "wotlkdata/cell/serialization/Transient";
import { CellSystem, CellSystemTop } from "wotlkdata/cell/systems/CellSystem";

export class MainEntity<T> extends CellSystemTop {
    @Transient
    readonly row: T;

    constructor(row: T) {
        super();
        this.row = row;
    }
}

export class TwoRowMainEntity<DBC,SQL> extends CellSystemTop {
    @Transient
    readonly dbc_row: DBC;

    @Transient
    readonly sql_row: SQL;

    constructor(dbc: DBC, sql: SQL) {
        super();
        this.dbc_row = dbc;
        this.sql_row = sql;
    }
}


export class ChildEntity<R,T extends MainEntity<R>> extends CellSystem<T> {
    @Transient
    get row() { return this.owner.row; }
}