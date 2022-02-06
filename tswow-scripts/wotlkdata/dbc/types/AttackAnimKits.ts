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
import { int } from '../../primitives'
import { Relation } from '../../query/Relations'
import { PrimaryKey } from '../../table/PrimaryKey'
import { DBCIntCell, DBCKeyCell } from '../DBCCell'
import { DBCFile } from '../DBCFile'
import { DBCRow } from '../DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class AttackAnimKitsRow extends DBCRow<AttackAnimKitsCreator,AttackAnimKitsQuery> {
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
    get Animation() { return new DBCIntCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get Type() { return new DBCIntCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get Flags() { return new DBCIntCell(this,this.buffer,this.offset+12)}

    /**
     * No comment (yet!)
     */
    get Field04() { return new DBCIntCell(this,this.buffer,this.offset+16)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : AttackAnimKitsCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type AttackAnimKitsCreator = {
    Animation?: int
    Type?: int
    Flags?: int
    Field04?: int
}

/**
 * Used for queries (Don't comment these)
 */
export type AttackAnimKitsQuery = {
    ID? : Relation<int>
    Animation? : Relation<int>
    Type? : Relation<int>
    Flags? : Relation<int>
    Field04? : Relation<int>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class AttackAnimKitsDBCFile extends DBCFile<
    AttackAnimKitsCreator,
    AttackAnimKitsQuery,
    AttackAnimKitsRow> {
    constructor() {
        super('AttackAnimKits',(t,b,o)=>new AttackAnimKitsRow(t,b,o))
    }
    /** Loads a new AttackAnimKits.dbc from a file. */
    static read(path: string): AttackAnimKitsDBCFile {
        return new AttackAnimKitsDBCFile().read(path);
    }
    add(ID : int, c? : AttackAnimKitsCreator) : AttackAnimKitsRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}