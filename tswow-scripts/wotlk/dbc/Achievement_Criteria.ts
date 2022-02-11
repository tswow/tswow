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
import { int, loc_constructor, uint } from '../../data/primitives'
import { Relation } from '../../data/query/Relations'
import { PrimaryKey } from '../../data/table/PrimaryKey'
import { DBCEnumCell, DBCFlagCell, DBCIntCell, DBCKeyCell, DBCLocCell, DBCPointerCell } from '../../data/dbc/DBCCell'
import { DBCFile } from '../../data/dbc/DBCFile'
import { DBCRow } from '../../data/dbc/DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class Achievement_CriteriaRow extends DBCRow<Achievement_CriteriaCreator,Achievement_CriteriaQuery> {
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
    get Achievement_Id() { return new DBCPointerCell(this,this.buffer,this.offset+4)}

    /**
     * What kind of Achievement this is. Defines the rows below.
     */
    get Type() { return new DBCEnumCell(this,this.buffer,this.offset+8)}

    /**
     * Main requirement id, such as creature or type.
     */
    get Asset_Id() { return new DBCIntCell(this,this.buffer,this.offset+12)}

    /**
     * Main requirement count
     */
    get Quantity() { return new DBCIntCell(this,this.buffer,this.offset+16)}

    /**
     * Additional requirement 1 type
     */
    get Start_Event() { return new DBCIntCell(this,this.buffer,this.offset+20)}

    /**
     * Additional requirement 1 value
     */
    get Start_Asset() { return new DBCIntCell(this,this.buffer,this.offset+24)}

    /**
     * Additional requirement 2 type
     */
    get Fail_Event() { return new DBCIntCell(this,this.buffer,this.offset+28)}

    /**
     * Additional requirement 2 value
     */
    get Fail_Asset() { return new DBCIntCell(this,this.buffer,this.offset+32)}

    /**
     * Displayed description
     */
    get Description() { return new DBCLocCell(this,this.buffer,this.offset+36)}

    /**
     * 1 means it shows a progress bar.
     */
    get Flags() { return new DBCFlagCell(this,this.buffer,this.offset+104)}

    /**
     * No comment (yet!)
     */
    get Timer_Start_Event() { return new DBCIntCell(this,this.buffer,this.offset+108)}

    /**
     * No comment (yet!)
     */
    get Timer_Asset_Id() { return new DBCIntCell(this,this.buffer,this.offset+112)}

    /**
     * For complete quest in %i seconds type of events
     */
    get Timer_Time() { return new DBCIntCell(this,this.buffer,this.offset+116)}

    /**
     * Sort order in achievement row. Lower means higher up.
     */
    get Ui_Order() { return new DBCIntCell(this,this.buffer,this.offset+120)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : Achievement_CriteriaCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type Achievement_CriteriaCreator = {
    Achievement_Id?: uint
    Type?: uint
    Asset_Id?: int
    Quantity?: int
    Start_Event?: int
    Start_Asset?: int
    Fail_Event?: int
    Fail_Asset?: int
    Description?: loc_constructor
    Flags?: uint
    Timer_Start_Event?: int
    Timer_Asset_Id?: int
    Timer_Time?: int
    Ui_Order?: int
}

/**
 * Used for queries (Don't comment these)
 */
export type Achievement_CriteriaQuery = {
    ID? : Relation<int>
    Achievement_Id? : Relation<number>
    Type? : Relation<number>
    Asset_Id? : Relation<int>
    Quantity? : Relation<int>
    Start_Event? : Relation<int>
    Start_Asset? : Relation<int>
    Fail_Event? : Relation<int>
    Fail_Asset? : Relation<int>
    Description? : Relation<string>
    Flags? : Relation<number>
    Timer_Start_Event? : Relation<int>
    Timer_Asset_Id? : Relation<int>
    Timer_Time? : Relation<int>
    Ui_Order? : Relation<int>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class Achievement_CriteriaDBCFile extends DBCFile<
    Achievement_CriteriaCreator,
    Achievement_CriteriaQuery,
    Achievement_CriteriaRow> {
    constructor() {
        super('Achievement_Criteria',(t,b,o)=>new Achievement_CriteriaRow(t,b,o))
    }
    /** Loads a new Achievement_Criteria.dbc from a file. */
    static read(path: string): Achievement_CriteriaDBCFile {
        return new Achievement_CriteriaDBCFile().read(path);
    }
    add(ID : int, c? : Achievement_CriteriaCreator) : Achievement_CriteriaRow {
        return this.makeRow(0).clone(ID,c)
    }
}