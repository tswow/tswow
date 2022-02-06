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
import { DBCIntCell, DBCKeyCell, DBCStringCell } from '../DBCCell'
import { DBCFile } from '../DBCFile'
import { DBCRow } from '../DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class TerraintypeRow extends DBCRow<TerraintypeCreator,TerraintypeQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get TerrainID() { return new DBCKeyCell(this,this.buffer,this.offset+0)}

    /**
     * No comment (yet!)
     */
    get TerrainDesc() { return new DBCStringCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get FootstepSprayRun() { return new DBCIntCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get FootstepSprayWalk() { return new DBCIntCell(this,this.buffer,this.offset+12)}

    /**
     * No comment (yet!)
     */
    get SoundID() { return new DBCIntCell(this,this.buffer,this.offset+16)}

    /**
     * No comment (yet!)
     */
    get Flags() { return new DBCIntCell(this,this.buffer,this.offset+20)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(TerrainID : int, c? : TerraintypeCreator) : this {
        return this.cloneInternal([TerrainID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type TerraintypeCreator = {
    TerrainDesc?: string
    FootstepSprayRun?: int
    FootstepSprayWalk?: int
    SoundID?: int
    Flags?: int
}

/**
 * Used for queries (Don't comment these)
 */
export type TerraintypeQuery = {
    TerrainID? : Relation<int>
    TerrainDesc? : Relation<string>
    FootstepSprayRun? : Relation<int>
    FootstepSprayWalk? : Relation<int>
    SoundID? : Relation<int>
    Flags? : Relation<int>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class TerraintypeDBCFile extends DBCFile<
    TerraintypeCreator,
    TerraintypeQuery,
    TerraintypeRow> {
    constructor() {
        super('Terraintype',(t,b,o)=>new TerraintypeRow(t,b,o))
    }
    /** Loads a new Terraintype.dbc from a file. */
    static read(path: string): TerraintypeDBCFile {
        return new TerraintypeDBCFile().read(path);
    }
    add(TerrainID : int, c? : TerraintypeCreator) : TerraintypeRow {
        return this.makeRow(0).clone(TerrainID,c)
    }
}