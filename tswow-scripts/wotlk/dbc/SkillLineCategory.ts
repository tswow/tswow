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
export class SkillLineCategoryRow extends DBCRow<SkillLineCategoryCreator,SkillLineCategoryQuery> {
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
    get SortIndex() { return new DBCIntCell(this,this.buffer,this.offset+72)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : SkillLineCategoryCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type SkillLineCategoryCreator = {
    Name?: loc_constructor
    SortIndex?: int
}

/**
 * Used for queries (Don't comment these)
 */
export type SkillLineCategoryQuery = {
    ID? : Relation<int>
    Name? : Relation<string>
    SortIndex? : Relation<int>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class SkillLineCategoryDBCFile extends DBCFile<
    SkillLineCategoryCreator,
    SkillLineCategoryQuery,
    SkillLineCategoryRow> {
    constructor() {
        super('SkillLineCategory',(t,b,o)=>new SkillLineCategoryRow(t,b,o))
    }
    /** Loads a new SkillLineCategory.dbc from a file. */
    static read(path: string): SkillLineCategoryDBCFile {
        return new SkillLineCategoryDBCFile().read(path);
    }
    add(ID : int, c? : SkillLineCategoryCreator) : SkillLineCategoryRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}