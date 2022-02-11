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
import { DBCIntArrayCell, DBCIntCell, DBCKeyCell } from '../DBCCell'
import { DBCFile } from '../DBCFile'
import { DBCRow } from '../DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class ItemExtendedCostRow extends DBCRow<ItemExtendedCostCreator,ItemExtendedCostQuery> {
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
    get HonorPoints() { return new DBCIntCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get ArenaPoints() { return new DBCIntCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get ArenaBracket() { return new DBCIntCell(this,this.buffer,this.offset+12)}

    /**
     * No comment (yet!)
     */
    get ItemID() { return new DBCIntArrayCell(this,5,this.buffer,this.offset+16)}

    /**
     * No comment (yet!)
     */
    get ItemCount() { return new DBCIntArrayCell(this,5,this.buffer,this.offset+36)}

    /**
     * No comment (yet!)
     */
    get RequiredArenaRating() { return new DBCIntCell(this,this.buffer,this.offset+56)}

    /**
     * No comment (yet!)
     */
    get ItemPurchaseGroup() { return new DBCIntCell(this,this.buffer,this.offset+60)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : ItemExtendedCostCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type ItemExtendedCostCreator = {
    HonorPoints?: int
    ArenaPoints?: int
    ArenaBracket?: int
    ItemID?: int[]
    ItemCount?: int[]
    RequiredArenaRating?: int
    ItemPurchaseGroup?: int
}

/**
 * Used for queries (Don't comment these)
 */
export type ItemExtendedCostQuery = {
    ID? : Relation<int>
    HonorPoints? : Relation<int>
    ArenaPoints? : Relation<int>
    ArenaBracket? : Relation<int>
    ItemID? : Relation<int>
    ItemCount? : Relation<int>
    RequiredArenaRating? : Relation<int>
    ItemPurchaseGroup? : Relation<int>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class ItemExtendedCostDBCFile extends DBCFile<
    ItemExtendedCostCreator,
    ItemExtendedCostQuery,
    ItemExtendedCostRow> {
    constructor() {
        super('ItemExtendedCost',(t,b,o)=>new ItemExtendedCostRow(t,b,o))
    }
    /** Loads a new ItemExtendedCost.dbc from a file. */
    static read(path: string): ItemExtendedCostDBCFile {
        return new ItemExtendedCostDBCFile().read(path);
    }
    add(ID : int, c? : ItemExtendedCostCreator) : ItemExtendedCostRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}