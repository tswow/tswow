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
export class LfgDungeonGroupRow extends DBCRow<LfgDungeonGroupCreator,LfgDungeonGroupQuery> {
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
    get Order_Index() { return new DBCIntCell(this,this.buffer,this.offset+72)}

    /**
     * No comment (yet!)
     */
    get Parent_Group_Id() { return new DBCIntCell(this,this.buffer,this.offset+76)}

    /**
     * No comment (yet!)
     */
    get Typeid() { return new DBCIntCell(this,this.buffer,this.offset+80)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : LfgDungeonGroupCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type LfgDungeonGroupCreator = {
    Name?: loc_constructor
    Order_Index?: int
    Parent_Group_Id?: int
    Typeid?: int
}

/**
 * Used for queries (Don't comment these)
 */
export type LfgDungeonGroupQuery = {
    ID? : Relation<int>
    Name? : Relation<string>
    Order_Index? : Relation<int>
    Parent_Group_Id? : Relation<int>
    Typeid? : Relation<int>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class LfgDungeonGroupDBCFile extends DBCFile<
    LfgDungeonGroupCreator,
    LfgDungeonGroupQuery,
    LfgDungeonGroupRow> {
    constructor() {
        super('LfgDungeonGroup',(t,b,o)=>new LfgDungeonGroupRow(t,b,o))
    }
    /** Loads a new LfgDungeonGroup.dbc from a file. */
    static read(path: string): LfgDungeonGroupDBCFile {
        return new LfgDungeonGroupDBCFile().read(path);
    }
    add(ID : int, c? : LfgDungeonGroupCreator) : LfgDungeonGroupRow {
        return this.makeRow(0).clone(ID,c)
    }
}