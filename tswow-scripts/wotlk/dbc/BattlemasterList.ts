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
import { DBCIntArrayCell, DBCIntCell, DBCKeyCell, DBCLocCell } from '../../data/dbc/DBCCell'
import { DBCFile } from '../../data/dbc/DBCFile'
import { DBCRow } from '../../data/dbc/DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class BattlemasterListRow extends DBCRow<BattlemasterListCreator,BattlemasterListQuery> {
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
    get MapID() { return new DBCIntArrayCell(this,8,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get InstanceType() { return new DBCIntCell(this,this.buffer,this.offset+36)}

    /**
     * No comment (yet!)
     */
    get GroupsAllowed() { return new DBCIntCell(this,this.buffer,this.offset+40)}

    /**
     * No comment (yet!)
     */
    get Name() { return new DBCLocCell(this,this.buffer,this.offset+44)}

    /**
     * No comment (yet!)
     */
    get MaxGroupSize() { return new DBCIntCell(this,this.buffer,this.offset+112)}

    /**
     * No comment (yet!)
     */
    get HolidayWorldState() { return new DBCIntCell(this,this.buffer,this.offset+116)}

    /**
     * No comment (yet!)
     */
    get Minlevel() { return new DBCIntCell(this,this.buffer,this.offset+120)}

    /**
     * No comment (yet!)
     */
    get Maxlevel() { return new DBCIntCell(this,this.buffer,this.offset+124)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : BattlemasterListCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type BattlemasterListCreator = {
    MapID?: int[]
    InstanceType?: int
    GroupsAllowed?: int
    Name?: loc_constructor
    MaxGroupSize?: int
    HolidayWorldState?: int
    Minlevel?: int
    Maxlevel?: int
}

/**
 * Used for queries (Don't comment these)
 */
export type BattlemasterListQuery = {
    ID? : Relation<int>
    MapID? : Relation<int>
    InstanceType? : Relation<int>
    GroupsAllowed? : Relation<int>
    Name? : Relation<string>
    MaxGroupSize? : Relation<int>
    HolidayWorldState? : Relation<int>
    Minlevel? : Relation<int>
    Maxlevel? : Relation<int>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class BattlemasterListDBCFile extends DBCFile<
    BattlemasterListCreator,
    BattlemasterListQuery,
    BattlemasterListRow> {
    constructor() {
        super('BattlemasterList',(t,b,o)=>new BattlemasterListRow(t,b,o))
    }
    /** Loads a new BattlemasterList.dbc from a file. */
    static read(path: string): BattlemasterListDBCFile {
        return new BattlemasterListDBCFile().read(path);
    }
    add(ID : int, c? : BattlemasterListCreator) : BattlemasterListRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}