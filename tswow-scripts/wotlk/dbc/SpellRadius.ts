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
import { float, int } from '../../data/primitives'
import { Relation } from '../../data/query/Relations'
import { PrimaryKey } from '../../data/table/PrimaryKey'
import { DBCFloatCell, DBCKeyCell } from '../../data/dbc/DBCCell'
import { DBCFile } from '../../data/dbc/DBCFile'
import { DBCRow } from '../../data/dbc/DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class SpellRadiusRow extends DBCRow<SpellRadiusCreator,SpellRadiusQuery> {
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
    get Radius() { return new DBCFloatCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get RadiusPerLevel() { return new DBCFloatCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get RadiusMax() { return new DBCFloatCell(this,this.buffer,this.offset+12)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : SpellRadiusCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type SpellRadiusCreator = {
    Radius?: float
    RadiusPerLevel?: float
    RadiusMax?: float
}

/**
 * Used for queries (Don't comment these)
 */
export type SpellRadiusQuery = {
    ID? : Relation<int>
    Radius? : Relation<float>
    RadiusPerLevel? : Relation<float>
    RadiusMax? : Relation<float>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class SpellRadiusDBCFile extends DBCFile<
    SpellRadiusCreator,
    SpellRadiusQuery,
    SpellRadiusRow> {
    constructor() {
        super('SpellRadius',(t,b,o)=>new SpellRadiusRow(t,b,o))
    }
    /** Loads a new SpellRadius.dbc from a file. */
    static read(path: string): SpellRadiusDBCFile {
        return new SpellRadiusDBCFile().read(path);
    }
    add(ID : int, c? : SpellRadiusCreator) : SpellRadiusRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}