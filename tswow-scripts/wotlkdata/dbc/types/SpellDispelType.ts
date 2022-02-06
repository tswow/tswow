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
export class SpellDispelTypeRow extends DBCRow<SpellDispelTypeCreator,SpellDispelTypeQuery> {
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
    get flag() { return new DBCIntCell(this,this.buffer,this.offset+72)}

    /**
     * No comment (yet!)
     */
    get ImmunityPossible() { return new DBCIntCell(this,this.buffer,this.offset+76)}

    /**
     * No comment (yet!)
     */
    get InternalName() { return new DBCStringCell(this,this.buffer,this.offset+80)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : SpellDispelTypeCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type SpellDispelTypeCreator = {
    Name?: loc_constructor
    flag?: int
    ImmunityPossible?: int
    InternalName?: string
}

/**
 * Used for queries (Don't comment these)
 */
export type SpellDispelTypeQuery = {
    ID? : Relation<int>
    Name? : Relation<string>
    flag? : Relation<int>
    ImmunityPossible? : Relation<int>
    InternalName? : Relation<string>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class SpellDispelTypeDBCFile extends DBCFile<
    SpellDispelTypeCreator,
    SpellDispelTypeQuery,
    SpellDispelTypeRow> {
    constructor() {
        super('SpellDispelType',(t,b,o)=>new SpellDispelTypeRow(t,b,o))
    }
    /** Loads a new SpellDispelType.dbc from a file. */
    static read(path: string): SpellDispelTypeDBCFile {
        return new SpellDispelTypeDBCFile().read(path);
    }
    add(ID : int, c? : SpellDispelTypeCreator) : SpellDispelTypeRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}