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
import { DBCIntArrayCell, DBCIntCell, DBCKeyCell } from '../../data/dbc/DBCCell'
import { DBCFile } from '../../data/dbc/DBCFile'
import { DBCRow } from '../../data/dbc/DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class FactionTemplateRow extends DBCRow<FactionTemplateCreator,FactionTemplateQuery> {
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
    get Faction() { return new DBCIntCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get Flags() { return new DBCIntCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get FactionGroup() { return new DBCIntCell(this,this.buffer,this.offset+12)}

    /**
     * No comment (yet!)
     */
    get FriendGroup() { return new DBCIntCell(this,this.buffer,this.offset+16)}

    /**
     * No comment (yet!)
     */
    get EnemyGroup() { return new DBCIntCell(this,this.buffer,this.offset+20)}

    /**
     * No comment (yet!)
     */
    get Enemies() { return new DBCIntArrayCell(this,4,this.buffer,this.offset+24)}

    /**
     * No comment (yet!)
     */
    get Friend() { return new DBCIntArrayCell(this,4,this.buffer,this.offset+40)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : FactionTemplateCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type FactionTemplateCreator = {
    Faction?: int
    Flags?: int
    FactionGroup?: int
    FriendGroup?: int
    EnemyGroup?: int
    Enemies?: int[]
    Friend?: int[]
}

/**
 * Used for queries (Don't comment these)
 */
export type FactionTemplateQuery = {
    ID? : Relation<int>
    Faction? : Relation<int>
    Flags? : Relation<int>
    FactionGroup? : Relation<int>
    FriendGroup? : Relation<int>
    EnemyGroup? : Relation<int>
    Enemies? : Relation<int>
    Friend? : Relation<int>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class FactionTemplateDBCFile extends DBCFile<
    FactionTemplateCreator,
    FactionTemplateQuery,
    FactionTemplateRow> {
    constructor() {
        super('FactionTemplate',(t,b,o)=>new FactionTemplateRow(t,b,o))
    }
    /** Loads a new FactionTemplate.dbc from a file. */
    static read(path: string): FactionTemplateDBCFile {
        return new FactionTemplateDBCFile().read(path);
    }
    add(ID : int, c? : FactionTemplateCreator) : FactionTemplateRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}