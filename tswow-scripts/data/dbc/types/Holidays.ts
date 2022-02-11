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
import { DBCIntArrayCell, DBCIntCell, DBCKeyCell, DBCStringCell } from '../DBCCell'
import { DBCFile } from '../DBCFile'
import { DBCRow } from '../DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class HolidaysRow extends DBCRow<HolidaysCreator,HolidaysQuery> {
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
    get Duration() { return new DBCIntArrayCell(this,10,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get Date() { return new DBCIntArrayCell(this,26,this.buffer,this.offset+44)}

    /**
     * No comment (yet!)
     */
    get Region() { return new DBCIntCell(this,this.buffer,this.offset+148)}

    /**
     * No comment (yet!)
     */
    get Looping() { return new DBCIntCell(this,this.buffer,this.offset+152)}

    /**
     * No comment (yet!)
     */
    get CalendarFlags() { return new DBCIntArrayCell(this,10,this.buffer,this.offset+156)}

    /**
     * No comment (yet!)
     */
    get HolidayNameID() { return new DBCIntCell(this,this.buffer,this.offset+196)}

    /**
     * No comment (yet!)
     */
    get HolidayDescriptionID() { return new DBCIntCell(this,this.buffer,this.offset+200)}

    /**
     * No comment (yet!)
     */
    get TextureFilename() { return new DBCStringCell(this,this.buffer,this.offset+204)}

    /**
     * No comment (yet!)
     */
    get Priority() { return new DBCIntCell(this,this.buffer,this.offset+208)}

    /**
     * No comment (yet!)
     */
    get CalendarFilterType() { return new DBCIntCell(this,this.buffer,this.offset+212)}

    /**
     * No comment (yet!)
     */
    get Flags() { return new DBCIntCell(this,this.buffer,this.offset+216)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : HolidaysCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type HolidaysCreator = {
    Duration?: int[]
    Date?: int[]
    Region?: int
    Looping?: int
    CalendarFlags?: int[]
    HolidayNameID?: int
    HolidayDescriptionID?: int
    TextureFilename?: string
    Priority?: int
    CalendarFilterType?: int
    Flags?: int
}

/**
 * Used for queries (Don't comment these)
 */
export type HolidaysQuery = {
    ID? : Relation<int>
    Duration? : Relation<int>
    Date? : Relation<int>
    Region? : Relation<int>
    Looping? : Relation<int>
    CalendarFlags? : Relation<int>
    HolidayNameID? : Relation<int>
    HolidayDescriptionID? : Relation<int>
    TextureFilename? : Relation<string>
    Priority? : Relation<int>
    CalendarFilterType? : Relation<int>
    Flags? : Relation<int>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class HolidaysDBCFile extends DBCFile<
    HolidaysCreator,
    HolidaysQuery,
    HolidaysRow> {
    constructor() {
        super('Holidays',(t,b,o)=>new HolidaysRow(t,b,o))
    }
    /** Loads a new Holidays.dbc from a file. */
    static read(path: string): HolidaysDBCFile {
        return new HolidaysDBCFile().read(path);
    }
    add(ID : int, c? : HolidaysCreator) : HolidaysRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}