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
import { int, loc_constructor } from '../../primitives'
import { Relation } from '../../query/Relations'
import { PrimaryKey } from '../../table/PrimaryKey'
import { DBCIntCell, DBCKeyCell, DBCLocCell } from '../DBCCell'
import { DBCFile } from '../DBCFile'
import { DBCRow } from '../DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class ItemSubClassRow extends DBCRow<ItemSubClassCreator,ItemSubClassQuery> {
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
    get SubClassID() { return new DBCKeyCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get PrerequisiteProficiency() { return new DBCIntCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get PostrequisiteProficiency() { return new DBCIntCell(this,this.buffer,this.offset+12)}

    /**
     * No comment (yet!)
     */
    get Flags() { return new DBCIntCell(this,this.buffer,this.offset+16)}

    /**
     * No comment (yet!)
     */
    get DisplayFlags() { return new DBCIntCell(this,this.buffer,this.offset+20)}

    /**
     * No comment (yet!)
     */
    get WeaponParrySeq() { return new DBCIntCell(this,this.buffer,this.offset+24)}

    /**
     * No comment (yet!)
     */
    get WeaponReadySeq() { return new DBCIntCell(this,this.buffer,this.offset+28)}

    /**
     * No comment (yet!)
     */
    get WeaponAttackSeq() { return new DBCIntCell(this,this.buffer,this.offset+32)}

    /**
     * No comment (yet!)
     */
    get WeaponSwingSize() { return new DBCIntCell(this,this.buffer,this.offset+36)}

    /**
     * No comment (yet!)
     */
    get DisplayName() { return new DBCLocCell(this,this.buffer,this.offset+40)}

    /**
     * No comment (yet!)
     */
    get VerboseName() { return new DBCLocCell(this,this.buffer,this.offset+108)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ClassID : int,SubClassID : int, c? : ItemSubClassCreator) : this {
        return this.cloneInternal([ClassID,SubClassID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type ItemSubClassCreator = {
    PrerequisiteProficiency?: int
    PostrequisiteProficiency?: int
    Flags?: int
    DisplayFlags?: int
    WeaponParrySeq?: int
    WeaponReadySeq?: int
    WeaponAttackSeq?: int
    WeaponSwingSize?: int
    DisplayName?: loc_constructor
    VerboseName?: loc_constructor
}

/**
 * Used for queries (Don't comment these)
 */
export type ItemSubClassQuery = {
    ClassID? : Relation<int>
    SubClassID? : Relation<int>
    PrerequisiteProficiency? : Relation<int>
    PostrequisiteProficiency? : Relation<int>
    Flags? : Relation<int>
    DisplayFlags? : Relation<int>
    WeaponParrySeq? : Relation<int>
    WeaponReadySeq? : Relation<int>
    WeaponAttackSeq? : Relation<int>
    WeaponSwingSize? : Relation<int>
    DisplayName? : Relation<string>
    VerboseName? : Relation<string>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class ItemSubClassDBCFile extends DBCFile<
    ItemSubClassCreator,
    ItemSubClassQuery,
    ItemSubClassRow> {
    constructor() {
        super('ItemSubClass',(t,b,o)=>new ItemSubClassRow(t,b,o))
    }
    /** Loads a new ItemSubClass.dbc from a file. */
    static read(path: string): ItemSubClassDBCFile {
        return new ItemSubClassDBCFile().read(path);
    }
    add(ClassID : int,SubClassID : int, c? : ItemSubClassCreator) : ItemSubClassRow {
        return this.makeRow(0).clone(ClassID,SubClassID,c)
    }
}