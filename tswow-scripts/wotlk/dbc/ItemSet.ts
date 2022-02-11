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
import { DBCIntArrayCell, DBCIntCell, DBCKeyCell, DBCLocCell } from '../../data/dbc/DBCCell'
import { DBCFile } from '../../data/dbc/DBCFile'
import { DBCRow } from '../../data/dbc/DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class ItemSetRow extends DBCRow<ItemSetCreator,ItemSetQuery> {
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
    get ItemID() { return new DBCIntArrayCell(this,17,this.buffer,this.offset+72)}

    /**
     * No comment (yet!)
     */
    get SetSpellID() { return new DBCIntArrayCell(this,8,this.buffer,this.offset+140)}

    /**
     * No comment (yet!)
     */
    get SetThreshold() { return new DBCIntArrayCell(this,8,this.buffer,this.offset+172)}

    /**
     * No comment (yet!)
     */
    get RequiredSkill() { return new DBCIntCell(this,this.buffer,this.offset+204)}

    /**
     * No comment (yet!)
     */
    get RequiredSkillRank() { return new DBCIntCell(this,this.buffer,this.offset+208)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : ItemSetCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type ItemSetCreator = {
    Name?: loc_constructor
    ItemID?: int[]
    SetSpellID?: int[]
    SetThreshold?: int[]
    RequiredSkill?: int
    RequiredSkillRank?: int
}

/**
 * Used for queries (Don't comment these)
 */
export type ItemSetQuery = {
    ID? : Relation<int>
    Name? : Relation<string>
    ItemID? : Relation<int>
    SetSpellID? : Relation<int>
    SetThreshold? : Relation<int>
    RequiredSkill? : Relation<int>
    RequiredSkillRank? : Relation<int>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class ItemSetDBCFile extends DBCFile<
    ItemSetCreator,
    ItemSetQuery,
    ItemSetRow> {
    constructor() {
        super('ItemSet',(t,b,o)=>new ItemSetRow(t,b,o))
    }
    /** Loads a new ItemSet.dbc from a file. */
    static read(path: string): ItemSetDBCFile {
        return new ItemSetDBCFile().read(path);
    }
    add(ID : int, c? : ItemSetCreator) : ItemSetRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}