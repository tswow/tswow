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
import { int, loc_constructor } from '../../primitives'
import { Relation } from '../../query/Relations'
import { PrimaryKey } from '../../table/PrimaryKey'
import { DBCIntCell, DBCKeyCell, DBCLocCell, DBCStringCell } from '../DBCCell'
import { DBCFile } from '../DBCFile'
import { DBCRow } from '../DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class MapDifficultyRow extends DBCRow<MapDifficultyCreator,MapDifficultyQuery> {
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
    get Difficulty() { return new DBCIntCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get Message() { return new DBCLocCell(this,this.buffer,this.offset+12)}

    /**
     * No comment (yet!)
     */
    get RaidDuration() { return new DBCIntCell(this,this.buffer,this.offset+80)}

    /**
     * No comment (yet!)
     */
    get MaxPlayers() { return new DBCIntCell(this,this.buffer,this.offset+84)}

    /**
     * No comment (yet!)
     */
    get Difficultystring() { return new DBCStringCell(this,this.buffer,this.offset+88)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : MapDifficultyCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type MapDifficultyCreator = {
    MapID?: int
    Difficulty?: int
    Message?: loc_constructor
    RaidDuration?: int
    MaxPlayers?: int
    Difficultystring?: string
}

/**
 * Used for queries (Don't comment these)
 */
export type MapDifficultyQuery = {
    ID? : Relation<int>
    MapID? : Relation<int>
    Difficulty? : Relation<int>
    Message? : Relation<string>
    RaidDuration? : Relation<int>
    MaxPlayers? : Relation<int>
    Difficultystring? : Relation<string>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class MapDifficultyDBCFile extends DBCFile<
    MapDifficultyCreator,
    MapDifficultyQuery,
    MapDifficultyRow> {
    constructor() {
        super('MapDifficulty',(t,b,o)=>new MapDifficultyRow(t,b,o))
    }
    /** Loads a new MapDifficulty.dbc from a file. */
    static read(path: string): MapDifficultyDBCFile {
        return new MapDifficultyDBCFile().read(path);
    }
    add(ID : int, c? : MapDifficultyCreator) : MapDifficultyRow {
        return this.makeRow(0).clone(ID,c)
    }
}