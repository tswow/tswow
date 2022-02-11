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
import { DBCIntArrayCell, DBCKeyCell, DBCLocCell } from '../../data/dbc/DBCCell'
import { DBCFile } from '../../data/dbc/DBCFile'
import { DBCRow } from '../../data/dbc/DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class ItemPurchaseGroupRow extends DBCRow<ItemPurchaseGroupCreator,ItemPurchaseGroupQuery> {
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
    get ItemID() { return new DBCIntArrayCell(this,8,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get Name() { return new DBCLocCell(this,this.buffer,this.offset+36)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : ItemPurchaseGroupCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type ItemPurchaseGroupCreator = {
    ItemID?: int[]
    Name?: loc_constructor
}

/**
 * Used for queries (Don't comment these)
 */
export type ItemPurchaseGroupQuery = {
    ID? : Relation<int>
    ItemID? : Relation<int>
    Name? : Relation<string>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class ItemPurchaseGroupDBCFile extends DBCFile<
    ItemPurchaseGroupCreator,
    ItemPurchaseGroupQuery,
    ItemPurchaseGroupRow> {
    constructor() {
        super('ItemPurchaseGroup',(t,b,o)=>new ItemPurchaseGroupRow(t,b,o))
    }
    /** Loads a new ItemPurchaseGroup.dbc from a file. */
    static read(path: string): ItemPurchaseGroupDBCFile {
        return new ItemPurchaseGroupDBCFile().read(path);
    }
    add(ID : int, c? : ItemPurchaseGroupCreator) : ItemPurchaseGroupRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}