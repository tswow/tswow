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
import { int, loc_constructor, uint } from '../../primitives'
import { Relation } from '../../query/Relations'
import { PrimaryKey } from '../../table/PrimaryKey'
import { DBCIntCell, DBCKeyCell, DBCLocCell, DBCPointerCell } from '../DBCCell'
import { DBCFile } from '../DBCFile'
import { DBCRow } from '../DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class Achievement_CategoryRow extends DBCRow<Achievement_CategoryCreator,Achievement_CategoryQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get ID() { return new DBCKeyCell(this,this.buffer,this.offset+0)}

    /**
     * -1 if none.
     */
    get Parent() { return new DBCPointerCell(this,this.buffer,this.offset+4)}

    /**
     * Display name
     */
    get Name() { return new DBCLocCell(this,this.buffer,this.offset+8)}

    /**
     * Sort order in achievement category pane. Lower means higher up.
     */
    get Ui_Order() { return new DBCIntCell(this,this.buffer,this.offset+76)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : Achievement_CategoryCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type Achievement_CategoryCreator = {
    Parent?: uint
    Name?: loc_constructor
    Ui_Order?: int
}

/**
 * Used for queries (Don't comment these)
 */
export type Achievement_CategoryQuery = {
    ID? : Relation<int>
    Parent? : Relation<number>
    Name? : Relation<string>
    Ui_Order? : Relation<int>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class Achievement_CategoryDBCFile extends DBCFile<
    Achievement_CategoryCreator,
    Achievement_CategoryQuery,
    Achievement_CategoryRow> {
    constructor() {
        super('Achievement_Category',(t,b,o)=>new Achievement_CategoryRow(t,b,o))
    }
    /** Loads a new Achievement_Category.dbc from a file. */
    static read(path: string): Achievement_CategoryDBCFile {
        return new Achievement_CategoryDBCFile().read(path);
    }
    add(ID : int, c? : Achievement_CategoryCreator) : Achievement_CategoryRow {
        return this.makeRow(0).clone(ID,c)
    }
}