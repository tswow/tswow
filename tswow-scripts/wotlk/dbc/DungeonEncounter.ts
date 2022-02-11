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
import { int, loc_constructor } from '../../data/primitives'
import { Relation } from '../../data/query/Relations'
import { PrimaryKey } from '../../data/table/PrimaryKey'
import { DBCIntCell, DBCKeyCell, DBCLocCell } from '../../data/dbc/DBCCell'
import { DBCFile } from '../../data/dbc/DBCFile'
import { DBCRow } from '../../data/dbc/DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class DungeonEncounterRow extends DBCRow<DungeonEncounterCreator,DungeonEncounterQuery> {
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
    get MapID() { return new DBCIntCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get Difficulty() { return new DBCIntCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get OrderIndex() { return new DBCIntCell(this,this.buffer,this.offset+12)}

    /**
     * No comment (yet!)
     */
    get Bit() { return new DBCIntCell(this,this.buffer,this.offset+16)}

    /**
     * No comment (yet!)
     */
    get Name() { return new DBCLocCell(this,this.buffer,this.offset+20)}

    /**
     * No comment (yet!)
     */
    get SpellIconID() { return new DBCIntCell(this,this.buffer,this.offset+88)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : DungeonEncounterCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type DungeonEncounterCreator = {
    MapID?: int
    Difficulty?: int
    OrderIndex?: int
    Bit?: int
    Name?: loc_constructor
    SpellIconID?: int
}

/**
 * Used for queries (Don't comment these)
 */
export type DungeonEncounterQuery = {
    ID? : Relation<int>
    MapID? : Relation<int>
    Difficulty? : Relation<int>
    OrderIndex? : Relation<int>
    Bit? : Relation<int>
    Name? : Relation<string>
    SpellIconID? : Relation<int>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class DungeonEncounterDBCFile extends DBCFile<
    DungeonEncounterCreator,
    DungeonEncounterQuery,
    DungeonEncounterRow> {
    constructor() {
        super('DungeonEncounter',(t,b,o)=>new DungeonEncounterRow(t,b,o))
    }
    /** Loads a new DungeonEncounter.dbc from a file. */
    static read(path: string): DungeonEncounterDBCFile {
        return new DungeonEncounterDBCFile().read(path);
    }
    add(ID : int, c? : DungeonEncounterCreator) : DungeonEncounterRow {
        return this.makeRow(0).clone(ID,c)
    }
}