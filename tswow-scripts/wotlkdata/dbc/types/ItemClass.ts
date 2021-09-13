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
import { DBCRow } from '../DBCRow'
import { DBCFile } from '../DBCFile'
import { Relation } from '../../query/Relations'
import { DBCKeyCell , DBCIntCell , DBCLocCell} from '../DBCCell'
import { int , loc_constructor} from '../../primitives'
import { PrimaryKey } from '../../table/PrimaryKey'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class ItemClassRow extends DBCRow<ItemClassCreator,ItemClassQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get ClassID() { return new DBCKeyCell(this,this.buffer,this.offset+0)}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get SubclassMapID() { return new DBCKeyCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get Flags() { return new DBCIntCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get ClassName() { return new DBCLocCell(this,this.buffer,this.offset+12)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ClassID : int,SubclassMapID : int, c? : ItemClassCreator) : this {
        return this.cloneInternal([ClassID,SubclassMapID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type ItemClassCreator = {
    Flags?: int
    ClassName?: loc_constructor
}

/**
 * Used for queries (Don't comment these)
 */
export type ItemClassQuery = {
    ClassID? : Relation<int>
    SubclassMapID? : Relation<int>
    Flags? : Relation<int>
    ClassName? : Relation<string>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class ItemClassDBCFile extends DBCFile<
    ItemClassCreator,
    ItemClassQuery,
    ItemClassRow> {
    add(ClassID : int,SubclassMapID : int, c? : ItemClassCreator) : ItemClassRow {
        return this.makeRow(0).clone(ClassID,SubclassMapID,c)
    }
}

/**
 * Table singleton (Object used by 'DBC' namespace)
 * - Add file comments to DBCFiles.ts
 */
export const DBC_ItemClass = new ItemClassDBCFile(
    'ItemClass',
    (table,buffer,offset)=>new ItemClassRow(table,buffer,offset))
