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
import { float, int } from '../../primitives'
import { Relation } from '../../query/Relations'
import { PrimaryKey } from '../../table/PrimaryKey'
import { DBCFloatCell, DBCIntCell, DBCKeyCell } from '../DBCCell'
import { DBCFile } from '../DBCFile'
import { DBCRow } from '../DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class SpellMissileRow extends DBCRow<SpellMissileCreator,SpellMissileQuery> {
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
    get Flags() { return new DBCIntCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get DefaultPitchMin() { return new DBCFloatCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get DefaultPitchMax() { return new DBCFloatCell(this,this.buffer,this.offset+12)}

    /**
     * No comment (yet!)
     */
    get DefaultSpeedMin() { return new DBCFloatCell(this,this.buffer,this.offset+16)}

    /**
     * No comment (yet!)
     */
    get DefaultSpeedMax() { return new DBCFloatCell(this,this.buffer,this.offset+20)}

    /**
     * No comment (yet!)
     */
    get RandomizeFacingMin() { return new DBCFloatCell(this,this.buffer,this.offset+24)}

    /**
     * No comment (yet!)
     */
    get RandomizeFacingMax() { return new DBCFloatCell(this,this.buffer,this.offset+28)}

    /**
     * No comment (yet!)
     */
    get RandomizePitchMin() { return new DBCFloatCell(this,this.buffer,this.offset+32)}

    /**
     * No comment (yet!)
     */
    get RandomizePitchMax() { return new DBCFloatCell(this,this.buffer,this.offset+36)}

    /**
     * No comment (yet!)
     */
    get RandomizeSpeedMin() { return new DBCFloatCell(this,this.buffer,this.offset+40)}

    /**
     * No comment (yet!)
     */
    get RandomizeSpeedMax() { return new DBCFloatCell(this,this.buffer,this.offset+44)}

    /**
     * No comment (yet!)
     */
    get Gravity() { return new DBCFloatCell(this,this.buffer,this.offset+48)}

    /**
     * No comment (yet!)
     */
    get MaxDuration() { return new DBCFloatCell(this,this.buffer,this.offset+52)}

    /**
     * No comment (yet!)
     */
    get CollisionRadius() { return new DBCFloatCell(this,this.buffer,this.offset+56)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : SpellMissileCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type SpellMissileCreator = {
    Flags?: int
    DefaultPitchMin?: float
    DefaultPitchMax?: float
    DefaultSpeedMin?: float
    DefaultSpeedMax?: float
    RandomizeFacingMin?: float
    RandomizeFacingMax?: float
    RandomizePitchMin?: float
    RandomizePitchMax?: float
    RandomizeSpeedMin?: float
    RandomizeSpeedMax?: float
    Gravity?: float
    MaxDuration?: float
    CollisionRadius?: float
}

/**
 * Used for queries (Don't comment these)
 */
export type SpellMissileQuery = {
    ID? : Relation<int>
    Flags? : Relation<int>
    DefaultPitchMin? : Relation<float>
    DefaultPitchMax? : Relation<float>
    DefaultSpeedMin? : Relation<float>
    DefaultSpeedMax? : Relation<float>
    RandomizeFacingMin? : Relation<float>
    RandomizeFacingMax? : Relation<float>
    RandomizePitchMin? : Relation<float>
    RandomizePitchMax? : Relation<float>
    RandomizeSpeedMin? : Relation<float>
    RandomizeSpeedMax? : Relation<float>
    Gravity? : Relation<float>
    MaxDuration? : Relation<float>
    CollisionRadius? : Relation<float>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class SpellMissileDBCFile extends DBCFile<
    SpellMissileCreator,
    SpellMissileQuery,
    SpellMissileRow> {
    constructor() {
        super('SpellMissile',(t,b,o)=>new SpellMissileRow(t,b,o))
    }
    /** Loads a new SpellMissile.dbc from a file. */
    static read(path: string): SpellMissileDBCFile {
        return new SpellMissileDBCFile().read(path);
    }
    add(ID : int, c? : SpellMissileCreator) : SpellMissileRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}