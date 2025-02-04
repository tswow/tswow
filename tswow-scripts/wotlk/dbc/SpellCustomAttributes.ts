/*
 * Copyright (C) 2024 tswow <https://github.com/tswow/>
 * and Duskhaven <https://github.com/orgs/Duskhaven-Reforged>
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
import { int, uint } from '../../data/primitives'
import { Relation } from '../../data/query/Relations'
import { PrimaryKey } from '../../data/table/PrimaryKey'
import { DBCKeyCell, DBCULongCell } from '../../data/dbc/DBCCell'
import { DBCFile } from '../../data/dbc/DBCFile'
import { DBCRow } from '../../data/dbc/DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
 export class SpellCustomAttributesRow extends DBCRow<SpellCustomAttributesCreator,SpellCustomAttributesQuery> {
    /**
     * Primary Key
     *
     * Spell id, from to Spell.dbc
     */
    @PrimaryKey()
    get SpellID() { return new DBCKeyCell(this,this.buffer,this.offset+0) }

    /**
     * Resource name, this is what's showing in spell tooltip in cost row
     */
    get CustomAttribute0() { return new DBCULongCell(this,this.buffer,this.offset+4) }

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(SpellID : int, c? : SpellCustomAttributesCreator) : this {
        return this.cloneInternal([SpellID],c);
    }
 }

 /**
 * Used for object creation (Don't comment these)
 */
export type SpellCustomAttributesCreator = {
    CustomAttribute0?: uint64
}

/**
 * Used for queries (Don't comment these)
 */
export type SpellCustomAttributesQuery = {
    SpellID? : Relation<int>
    ResourceName? : Relation<uint64>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */

export class SpellCustomAttributesDBCFile extends DBCFile<
    SpellCustomAttributesCreator,
    SpellCustomAttributesQuery,
    SpellCustomAttributesRow> {
    constructor() {
        super('SpellCustomAttributes',(t,b,o)=> new SpellCustomAttributesRow(t,b,o))
    }
    /** Loads a new SpellAdditionalCostData.dbc from a file. */
    static read(path: string): SpellCustomAttributesDBCFile {
        return new SpellCustomAttributesDBCFile().read(path)
    }
    add(SpellID : int, c? : SpellCustomAttributesCreator) : SpellCustomAttributesRow {
        return this.makeRow(0).clone(SpellID,c)
    }
    findByID(id : number) {
        return this.fastSearch(id);
    }
}
