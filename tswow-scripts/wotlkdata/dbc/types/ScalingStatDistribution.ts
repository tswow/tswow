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
import { DBCIntArrayCell, DBCIntCell, DBCKeyCell } from '../DBCCell'
import { DBCFile } from '../DBCFile'
import { DBCRow } from '../DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class ScalingStatDistributionRow extends DBCRow<ScalingStatDistributionCreator,ScalingStatDistributionQuery> {
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
    get StatID() { return new DBCIntArrayCell(this,10,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get Bonus() { return new DBCIntArrayCell(this,10,this.buffer,this.offset+44)}

    /**
     * No comment (yet!)
     */
    get Maxlevel() { return new DBCIntCell(this,this.buffer,this.offset+84)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : ScalingStatDistributionCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type ScalingStatDistributionCreator = {
    StatID?: int[]
    Bonus?: int[]
    Maxlevel?: int
}

/**
 * Used for queries (Don't comment these)
 */
export type ScalingStatDistributionQuery = {
    ID? : Relation<int>
    StatID? : Relation<int>
    Bonus? : Relation<int>
    Maxlevel? : Relation<int>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class ScalingStatDistributionDBCFile extends DBCFile<
    ScalingStatDistributionCreator,
    ScalingStatDistributionQuery,
    ScalingStatDistributionRow> {
    constructor() {
        super('ScalingStatDistribution',(t,b,o)=>new ScalingStatDistributionRow(t,b,o))
    }
    /** Loads a new ScalingStatDistribution.dbc from a file. */
    static read(path: string): ScalingStatDistributionDBCFile {
        return new ScalingStatDistributionDBCFile().read(path);
    }
    add(ID : int, c? : ScalingStatDistributionCreator) : ScalingStatDistributionRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}