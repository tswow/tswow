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
export class SummonPropertiesRow extends DBCRow<SummonPropertiesCreator,SummonPropertiesQuery> {
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
    get Control() { return new DBCIntCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get Faction() { return new DBCIntCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get Title() { return new DBCIntCell(this,this.buffer,this.offset+12)}

    /**
     * No comment (yet!)
     */
    get Slot() { return new DBCIntCell(this,this.buffer,this.offset+16)}

    /**
     * No comment (yet!)
     */
    get Flags() { return new DBCIntCell(this,this.buffer,this.offset+20)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : SummonPropertiesCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type SummonPropertiesCreator = {
    Control?: int
    Faction?: int
    Title?: int
    Slot?: int
    Flags?: int
}

/**
 * Used for queries (Don't comment these)
 */
export type SummonPropertiesQuery = {
    ID? : Relation<int>
    Control? : Relation<int>
    Faction? : Relation<int>
    Title? : Relation<int>
    Slot? : Relation<int>
    Flags? : Relation<int>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class SummonPropertiesDBCFile extends DBCFile<
    SummonPropertiesCreator,
    SummonPropertiesQuery,
    SummonPropertiesRow> {
    constructor() {
        super('SummonProperties',(t,b,o)=>new SummonPropertiesRow(t,b,o))
    }
    /** Loads a new SummonProperties.dbc from a file. */
    static read(path: string): SummonPropertiesDBCFile {
        return new SummonPropertiesDBCFile().read(path);
    }
    add(ID : int, c? : SummonPropertiesCreator) : SummonPropertiesRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}