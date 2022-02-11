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
import { float, int, loc_constructor } from '../../data/primitives'
import { Relation } from '../../data/query/Relations'
import { PrimaryKey } from '../../data/table/PrimaryKey'
import { DBCFloatCell, DBCIntArrayCell, DBCIntCell, DBCKeyCell, DBCLocCell } from '../../data/dbc/DBCCell'
import { DBCFile } from '../../data/dbc/DBCFile'
import { DBCRow } from '../../data/dbc/DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class TaxiNodesRow extends DBCRow<TaxiNodesCreator,TaxiNodesQuery> {
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
    get MapID() { return new DBCIntCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get X() { return new DBCFloatCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get Y() { return new DBCFloatCell(this,this.buffer,this.offset+12)}

    /**
     * No comment (yet!)
     */
    get Z() { return new DBCFloatCell(this,this.buffer,this.offset+16)}

    /**
     * No comment (yet!)
     */
    get Name() { return new DBCLocCell(this,this.buffer,this.offset+20)}

    /**
     * No comment (yet!)
     */
    get MountCreatureID() { return new DBCIntArrayCell(this,2,this.buffer,this.offset+88)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : TaxiNodesCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type TaxiNodesCreator = {
    MapID?: int
    X?: float
    Y?: float
    Z?: float
    Name?: loc_constructor
    MountCreatureID?: int[]
}

/**
 * Used for queries (Don't comment these)
 */
export type TaxiNodesQuery = {
    ID? : Relation<int>
    MapID? : Relation<int>
    X? : Relation<float>
    Y? : Relation<float>
    Z? : Relation<float>
    Name? : Relation<string>
    MountCreatureID? : Relation<int>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class TaxiNodesDBCFile extends DBCFile<
    TaxiNodesCreator,
    TaxiNodesQuery,
    TaxiNodesRow> {
    constructor() {
        super('TaxiNodes',(t,b,o)=>new TaxiNodesRow(t,b,o))
    }
    /** Loads a new TaxiNodes.dbc from a file. */
    static read(path: string): TaxiNodesDBCFile {
        return new TaxiNodesDBCFile().read(path);
    }
    add(ID : int, c? : TaxiNodesCreator) : TaxiNodesRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}