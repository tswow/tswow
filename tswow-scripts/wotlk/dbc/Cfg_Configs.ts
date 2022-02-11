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
import { int } from '../../data/primitives'
import { Relation } from '../../data/query/Relations'
import { PrimaryKey } from '../../data/table/PrimaryKey'
import { DBCIntCell, DBCKeyCell } from '../../data/dbc/DBCCell'
import { DBCFile } from '../../data/dbc/DBCFile'
import { DBCRow } from '../../data/dbc/DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class Cfg_ConfigsRow extends DBCRow<Cfg_ConfigsCreator,Cfg_ConfigsQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get Id() { return new DBCKeyCell(this,this.buffer,this.offset+0)}

    /**
     * No comment (yet!)
     */
    get RealmType() { return new DBCIntCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get PlayerKillingAllowed() { return new DBCIntCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get Roleplaying() { return new DBCIntCell(this,this.buffer,this.offset+12)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(Id : int, c? : Cfg_ConfigsCreator) : this {
        return this.cloneInternal([Id],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type Cfg_ConfigsCreator = {
    RealmType?: int
    PlayerKillingAllowed?: int
    Roleplaying?: int
}

/**
 * Used for queries (Don't comment these)
 */
export type Cfg_ConfigsQuery = {
    Id? : Relation<int>
    RealmType? : Relation<int>
    PlayerKillingAllowed? : Relation<int>
    Roleplaying? : Relation<int>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class Cfg_ConfigsDBCFile extends DBCFile<
    Cfg_ConfigsCreator,
    Cfg_ConfigsQuery,
    Cfg_ConfigsRow> {
    constructor() {
        super('Cfg_Configs',(t,b,o)=>new Cfg_ConfigsRow(t,b,o))
    }
    /** Loads a new Cfg_Configs.dbc from a file. */
    static read(path: string): Cfg_ConfigsDBCFile {
        return new Cfg_ConfigsDBCFile().read(path);
    }
    add(Id : int, c? : Cfg_ConfigsCreator) : Cfg_ConfigsRow {
        return this.makeRow(0).clone(Id,c)
    }
}