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
import { DBCKeyCell, DBCUIntCell } from '../../data/dbc/DBCCell'
import { CDBCFile } from './CDBCFile'
import { DBCRow } from '../../data/dbc/DBCRow'

/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export class SpellAdditionalAttributesRow extends DBCRow<SpellAdditionalAttributesCreator,SpellAdditionalAttributesQuery> {
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
    get CustomAttribute0() { return new DBCUIntCell(this,this.buffer,this.offset+4) }

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(SpellID : int, c? : SpellAdditionalAttributesCreator) : this {
        return this.cloneInternal([SpellID],c);
    }
}

 /**
 * Used for object creation (Don't comment these)
 */
 export type SpellAdditionalAttributesCreator = {
    CustomAttribute0?: uint
}

/**
 * Used for queries (Don't comment these)
 */
export type SpellAdditionalAttributesQuery = {
    SpellID? : Relation<int>
    CustomAttribute0? : Relation<uint>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */

export class SpellAdditionalAttributesCDBCFile extends CDBCFile<
    SpellAdditionalAttributesCreator,
    SpellAdditionalAttributesQuery,
    SpellAdditionalAttributesRow> {
    protected defaultRow = [2, 4294967295];

    constructor() {
        super('SpellAdditionalAttributes',(t,b,o)=> new SpellAdditionalAttributesRow(t,b,o))
    }
    /** Loads a new SpellAdditionalAttributes.dbc from a file. */
    static read(path: string): SpellAdditionalAttributesCDBCFile {
        return new SpellAdditionalAttributesCDBCFile().read(path)
    }
    add(SpellID : int, c? : SpellAdditionalAttributesCreator) : SpellAdditionalAttributesRow {
        return this.makeRow(0).clone(SpellID,c)
    }
    findByID(id : number) {
        return this.fastSearch(id);
    }
}
