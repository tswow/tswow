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
import { DBCIntCell, DBCKeyCell, DBCStringCell } from '../../data/dbc/DBCCell'
import { DBCFile } from '../../data/dbc/DBCFile'
import { DBCRow } from '../../data/dbc/DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class SpellVisualKitAreaModelRow extends DBCRow<SpellVisualKitAreaModelCreator,SpellVisualKitAreaModelQuery> {
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
    get Name() { return new DBCStringCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get EnumID() { return new DBCIntCell(this,this.buffer,this.offset+8)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : SpellVisualKitAreaModelCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type SpellVisualKitAreaModelCreator = {
    Name?: string
    EnumID?: int
}

/**
 * Used for queries (Don't comment these)
 */
export type SpellVisualKitAreaModelQuery = {
    ID? : Relation<int>
    Name? : Relation<string>
    EnumID? : Relation<int>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class SpellVisualKitAreaModelDBCFile extends DBCFile<
    SpellVisualKitAreaModelCreator,
    SpellVisualKitAreaModelQuery,
    SpellVisualKitAreaModelRow> {
    constructor() {
        super('SpellVisualKitAreaModel',(t,b,o)=>new SpellVisualKitAreaModelRow(t,b,o))
    }
    /** Loads a new SpellVisualKitAreaModel.dbc from a file. */
    static read(path: string): SpellVisualKitAreaModelDBCFile {
        return new SpellVisualKitAreaModelDBCFile().read(path);
    }
    add(ID : int, c? : SpellVisualKitAreaModelCreator) : SpellVisualKitAreaModelRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}