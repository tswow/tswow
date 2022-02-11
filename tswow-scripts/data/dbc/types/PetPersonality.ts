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
import { float, int, loc_constructor } from '../../primitives'
import { Relation } from '../../query/Relations'
import { PrimaryKey } from '../../table/PrimaryKey'
import { DBCFloatArrayCell, DBCIntArrayCell, DBCKeyCell, DBCLocCell } from '../DBCCell'
import { DBCFile } from '../DBCFile'
import { DBCRow } from '../DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class PetPersonalityRow extends DBCRow<PetPersonalityCreator,PetPersonalityQuery> {
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
    get Name() { return new DBCLocCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get HappinessThreshold() { return new DBCIntArrayCell(this,3,this.buffer,this.offset+72)}

    /**
     * No comment (yet!)
     */
    get HappinessDamage() { return new DBCFloatArrayCell(this,3,this.buffer,this.offset+84)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : PetPersonalityCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type PetPersonalityCreator = {
    Name?: loc_constructor
    HappinessThreshold?: int[]
    HappinessDamage?: float[]
}

/**
 * Used for queries (Don't comment these)
 */
export type PetPersonalityQuery = {
    ID? : Relation<int>
    Name? : Relation<string>
    HappinessThreshold? : Relation<int>
    HappinessDamage? : Relation<float>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class PetPersonalityDBCFile extends DBCFile<
    PetPersonalityCreator,
    PetPersonalityQuery,
    PetPersonalityRow> {
    constructor() {
        super('PetPersonality',(t,b,o)=>new PetPersonalityRow(t,b,o))
    }
    /** Loads a new PetPersonality.dbc from a file. */
    static read(path: string): PetPersonalityDBCFile {
        return new PetPersonalityDBCFile().read(path);
    }
    add(ID : int, c? : PetPersonalityCreator) : PetPersonalityRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}