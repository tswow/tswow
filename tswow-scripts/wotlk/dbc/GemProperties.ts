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
import { int } from '../../data/primitives'
import { Relation } from '../../data/query/Relations'
import { PrimaryKey } from '../../data/table/PrimaryKey'
import { DBCIntCell, DBCKeyCell } from '../../data/dbc/DBCCell'
import { DBCFile } from '../../data/dbc/DBCFile'
import { DBCRow } from '../../data/dbc/DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class GemPropertiesRow extends DBCRow<GemPropertiesCreator,GemPropertiesQuery> {
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
    get Enchant_Id() { return new DBCIntCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get Maxcount_Inv() { return new DBCIntCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get Maxcount_Item() { return new DBCIntCell(this,this.buffer,this.offset+12)}

    /**
     * No comment (yet!)
     */
    get Type() { return new DBCIntCell(this,this.buffer,this.offset+16)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : GemPropertiesCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type GemPropertiesCreator = {
    Enchant_Id?: int
    Maxcount_Inv?: int
    Maxcount_Item?: int
    Type?: int
}

/**
 * Used for queries (Don't comment these)
 */
export type GemPropertiesQuery = {
    ID? : Relation<int>
    Enchant_Id? : Relation<int>
    Maxcount_Inv? : Relation<int>
    Maxcount_Item? : Relation<int>
    Type? : Relation<int>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class GemPropertiesDBCFile extends DBCFile<
    GemPropertiesCreator,
    GemPropertiesQuery,
    GemPropertiesRow> {
    constructor() {
        super('GemProperties',(t,b,o)=>new GemPropertiesRow(t,b,o))
    }
    /** Loads a new GemProperties.dbc from a file. */
    static read(path: string): GemPropertiesDBCFile {
        return new GemPropertiesDBCFile().read(path);
    }
    add(ID : int, c? : GemPropertiesCreator) : GemPropertiesRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}