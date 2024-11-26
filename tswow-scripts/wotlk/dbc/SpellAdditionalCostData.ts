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
import { DBCKeyCell, DBCStringCell, DBCUIntCell } from '../../data/dbc/DBCCell'
import { DBCFile } from '../../data/dbc/DBCFile'
import { DBCRow } from '../../data/dbc/DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class SpellAdditionalCostDataRow extends DBCRow<SpellAdditionalCostDataCreator,SpellAdditionalCostDataQuery> {
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
    get ResourceName() { return new DBCStringCell(this,this.buffer,this.offset+4) }

    /**
     * Cost, uint, setting it to 0 causes it to not display in spell tooltip even if id is added to this dbc
     */
    get Cost() { return new DBCUIntCell(this,this.buffer,this.offset+8) }

    /**
     * Flags, 0 or 1, if 1, allows tooltip to display plural name if cost is != 1
     */
    get Flags() { return new DBCUIntCell(this,this.buffer,this.offset+12) }

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(SpellID : int, c? : SpellAdditionalCostDataCreator) : this {
        return this.cloneInternal([SpellID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type SpellAdditionalCostDataCreator = {
    ResourceName?: string
    Cost?: uint
    Flags?: uint
}

/**
 * Used for queries (Don't comment these)
 */
export type SpellAdditionalCostDataQuery = {
    SpellID? : Relation<int>
    ResourceName? : Relation<string>
    Cost? : Relation<uint>
    Flags? : Relation<uint>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class SpellAdditionalCostDataDBCFile extends DBCFile<
    SpellAdditionalCostDataCreator,
    SpellAdditionalCostDataQuery,
    SpellAdditionalCostDataRow> {
    constructor() {
        super('SpellAdditionalCostData',(t,b,o)=> new SpellAdditionalCostDataRow(t,b,o))
    }
    /** Loads a new SpellAdditionalCostData.dbc from a file. */
    static read(path: string): SpellAdditionalCostDataDBCFile {
        return new SpellAdditionalCostDataDBCFile().read(path)
    }
    add(SpellID : int, c? : SpellAdditionalCostDataCreator) : SpellAdditionalCostDataRow {
        return this.makeRow(0).clone(SpellID,c)
    }
    findByID(id : number) {
        return this.fastSearch(id);
    }
}
