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
import { int, loc_constructor } from '../../data/primitives'
import { Relation } from '../../data/query/Relations'
import { PrimaryKey } from '../../data/table/PrimaryKey'
import { DBCIntCell, DBCKeyCell, DBCLocCell } from '../../data/dbc/DBCCell'
import { DBCFile } from '../../data/dbc/DBCFile'
import { DBCRow } from '../../data/dbc/DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class TotemCategoryRow extends DBCRow<TotemCategoryCreator,TotemCategoryQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get ID() { return new DBCKeyCell(this,this.buffer,this.offset+0)}

    /**
     * No comment (yet!)
     */
    get Name() { return new DBCLocCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get TotemCategoryType() { return new DBCIntCell(this,this.buffer,this.offset+72)}

    /**
     * No comment (yet!)
     */
    get TotemCategoryMask() { return new DBCIntCell(this,this.buffer,this.offset+76)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : TotemCategoryCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type TotemCategoryCreator = {
    Name?: loc_constructor
    TotemCategoryType?: int
    TotemCategoryMask?: int
}

/**
 * Used for queries (Don't comment these)
 */
export type TotemCategoryQuery = {
    ID? : Relation<int>
    Name? : Relation<string>
    TotemCategoryType? : Relation<int>
    TotemCategoryMask? : Relation<int>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class TotemCategoryDBCFile extends DBCFile<
    TotemCategoryCreator,
    TotemCategoryQuery,
    TotemCategoryRow> {
    constructor() {
        super('TotemCategory',(t,b,o)=>new TotemCategoryRow(t,b,o))
    }
    /** Loads a new TotemCategory.dbc from a file. */
    static read(path: string): TotemCategoryDBCFile {
        return new TotemCategoryDBCFile().read(path);
    }
    add(ID : int, c? : TotemCategoryCreator) : TotemCategoryRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}