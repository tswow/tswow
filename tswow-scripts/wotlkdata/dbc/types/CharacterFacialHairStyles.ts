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
export class CharacterFacialHairStylesRow extends DBCRow<CharacterFacialHairStylesCreator,CharacterFacialHairStylesQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get RaceID() { return new DBCKeyCell(this,this.buffer,this.offset+0)}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get SexID() { return new DBCKeyCell(this,this.buffer,this.offset+4)}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get VariationID() { return new DBCKeyCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get Geoset() { return new DBCIntArrayCell(this,5,this.buffer,this.offset+12)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(RaceID : int,SexID : int,VariationID : int, c? : CharacterFacialHairStylesCreator) : this {
        return this.cloneInternal([RaceID,SexID,VariationID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type CharacterFacialHairStylesCreator = {
    Geoset?: int[]
}

/**
 * Used for queries (Don't comment these)
 */
export type CharacterFacialHairStylesQuery = {
    RaceID? : Relation<int>
    SexID? : Relation<int>
    VariationID? : Relation<int>
    Geoset? : Relation<int>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class CharacterFacialHairStylesDBCFile extends DBCFile<
    CharacterFacialHairStylesCreator,
    CharacterFacialHairStylesQuery,
    CharacterFacialHairStylesRow> {
    constructor() {
        super('CharacterFacialHairStyles',(t,b,o)=>new CharacterFacialHairStylesRow(t,b,o))
    }
    /** Loads a new CharacterFacialHairStyles.dbc from a file. */
    static read(path: string): CharacterFacialHairStylesDBCFile {
        return new CharacterFacialHairStylesDBCFile().read(path);
    }
    add(RaceID : int,SexID : int,VariationID : int, c? : CharacterFacialHairStylesCreator) : CharacterFacialHairStylesRow {
        return this.makeRow(0).clone(RaceID,SexID,VariationID,c)
    }
}