/*
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

/* tslint:disable */
import { int } from '../../primitives'
import { Relation } from '../../query/Relations'
import { PrimaryKey } from '../../table/PrimaryKey'
import { DBCIntCell, DBCKeyCell } from '../DBCCell'
import { DBCFile } from '../DBCFile'
import { DBCRow } from '../DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class GameTablesRow extends DBCRow<GameTablesCreator,GameTablesQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get Name() { return new DBCKeyCell(this,this.buffer,this.offset+0)}

    /**
     * No comment (yet!)
     */
    get NumRows() { return new DBCIntCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get NumColumns() { return new DBCIntCell(this,this.buffer,this.offset+8)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(Name : string, c? : GameTablesCreator) : this {
        return this.cloneInternal([Name],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type GameTablesCreator = {
    NumRows?: int
    NumColumns?: int
}

/**
 * Used for queries (Don't comment these)
 */
export type GameTablesQuery = {
    Name? : Relation<string>
    NumRows? : Relation<int>
    NumColumns? : Relation<int>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class GameTablesDBCFile extends DBCFile<
    GameTablesCreator,
    GameTablesQuery,
    GameTablesRow> {
    constructor() {
        super('GameTables',(t,b,o)=>new GameTablesRow(t,b,o))
    }
    /** Loads a new GameTables.dbc from a file. */
    static read(path: string): GameTablesDBCFile {
        return new GameTablesDBCFile().read(path);
    }
    add(Name : string, c? : GameTablesCreator) : GameTablesRow {
        return this.makeRow(0).clone(Name,c)
    }
}