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
import { DBCIntArrayCell, DBCKeyCell } from '../DBCCell'
import { DBCFile } from '../DBCFile'
import { DBCRow } from '../DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class RandPropPointsRow extends DBCRow<RandPropPointsCreator,RandPropPointsQuery> {
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
    get Epic() { return new DBCIntArrayCell(this,5,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get Superior() { return new DBCIntArrayCell(this,5,this.buffer,this.offset+24)}

    /**
     * No comment (yet!)
     */
    get Good() { return new DBCIntArrayCell(this,5,this.buffer,this.offset+44)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : RandPropPointsCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type RandPropPointsCreator = {
    Epic?: int[]
    Superior?: int[]
    Good?: int[]
}

/**
 * Used for queries (Don't comment these)
 */
export type RandPropPointsQuery = {
    ID? : Relation<int>
    Epic? : Relation<int>
    Superior? : Relation<int>
    Good? : Relation<int>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class RandPropPointsDBCFile extends DBCFile<
    RandPropPointsCreator,
    RandPropPointsQuery,
    RandPropPointsRow> {
    constructor() {
        super('RandPropPoints',(t,b,o)=>new RandPropPointsRow(t,b,o))
    }
    /** Loads a new RandPropPoints.dbc from a file. */
    static read(path: string): RandPropPointsDBCFile {
        return new RandPropPointsDBCFile().read(path);
    }
    add(ID : int, c? : RandPropPointsCreator) : RandPropPointsRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}