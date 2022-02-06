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
import { byte, int } from '../../primitives'
import { Relation } from '../../query/Relations'
import { PrimaryKey } from '../../table/PrimaryKey'
import { DBCByteCell, DBCIntArrayCell, DBCKeyCell } from '../DBCCell'
import { DBCFile } from '../DBCFile'
import { DBCRow } from '../DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class CharStartOutfitRow extends DBCRow<CharStartOutfitCreator,CharStartOutfitQuery> {
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
    get RaceID() { return new DBCByteCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get ClassID() { return new DBCByteCell(this,this.buffer,this.offset+5)}

    /**
     * No comment (yet!)
     */
    get SexID() { return new DBCByteCell(this,this.buffer,this.offset+6)}

    /**
     * No comment (yet!)
     */
    get OutfitID() { return new DBCByteCell(this,this.buffer,this.offset+7)}

    /**
     * No comment (yet!)
     */
    get ItemID() { return new DBCIntArrayCell(this,24,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get DisplayItemID() { return new DBCIntArrayCell(this,24,this.buffer,this.offset+104)}

    /**
     * No comment (yet!)
     */
    get InventoryType() { return new DBCIntArrayCell(this,24,this.buffer,this.offset+200)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : CharStartOutfitCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type CharStartOutfitCreator = {
    RaceID?: byte
    ClassID?: byte
    SexID?: byte
    OutfitID?: byte
    ItemID?: int[]
    DisplayItemID?: int[]
    InventoryType?: int[]
}

/**
 * Used for queries (Don't comment these)
 */
export type CharStartOutfitQuery = {
    ID? : Relation<int>
    RaceID? : Relation<byte>
    ClassID? : Relation<byte>
    SexID? : Relation<byte>
    OutfitID? : Relation<byte>
    ItemID? : Relation<int>
    DisplayItemID? : Relation<int>
    InventoryType? : Relation<int>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class CharStartOutfitDBCFile extends DBCFile<
    CharStartOutfitCreator,
    CharStartOutfitQuery,
    CharStartOutfitRow> {
    constructor() {
        super('CharStartOutfit',(t,b,o)=>new CharStartOutfitRow(t,b,o))
    }
    /** Loads a new CharStartOutfit.dbc from a file. */
    static read(path: string): CharStartOutfitDBCFile {
        return new CharStartOutfitDBCFile().read(path);
    }
    add(ID : int, c? : CharStartOutfitCreator) : CharStartOutfitRow {
        return this.makeRow(0).clone(ID,c)
    }
}