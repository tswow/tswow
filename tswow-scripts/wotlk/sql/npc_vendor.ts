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
import { int, mediumint, smallint, tinyint } from '../../data/primitives'
import { Relation } from '../../data/query/Relations'
import { PrimaryKey } from '../../data/table/PrimaryKey'
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell'
import { SqlRow } from '../../data/sql/SQLRow'
import { SqlTable } from '../../data/sql/SQLTable'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class npc_vendorRow extends SqlRow<npc_vendorCreator,npc_vendorQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get entry() {return new SQLCellReadOnly<mediumint, this>(this, 'entry')}

    /**
     * No comment (yet!)
     */
    get slot() {return new SQLCell<smallint, this>(this, 'slot')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get item() {return new SQLCellReadOnly<mediumint, this>(this, 'item')}

    /**
     * No comment (yet!)
     */
    get maxcount() {return new SQLCell<tinyint, this>(this, 'maxcount')}

    /**
     * No comment (yet!)
     */
    get incrtime() {return new SQLCell<int, this>(this, 'incrtime')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get ExtendedCost() {return new SQLCellReadOnly<mediumint, this>(this, 'ExtendedCost')}

    /**
     * No comment (yet!)
     */
    get VerifiedBuild() {return new SQLCell<smallint, this>(this, 'VerifiedBuild')}

    /**
     * Custom tswow field
     */
    get raceMask() { return new SQLCell<int,this>(this, 'raceMask')}

    /**
     * Custom tswow field
     */
    get classMask() { return new SQLCell<int,this>(this, 'classMask')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(entry : mediumint,item : mediumint,ExtendedCost : mediumint, c? : npc_vendorCreator) : this {
        return this.cloneInternal([entry,item,ExtendedCost],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type npc_vendorCreator = {
    entry? : mediumint,
    slot? : smallint,
    item? : mediumint,
    maxcount? : tinyint,
    incrtime? : int,
    ExtendedCost? : mediumint,
    VerifiedBuild? : smallint,
    raceMask?: int,
    classMask?: int,
}

/**
 * Used for object queries (Don't comment these)
 */
export type npc_vendorQuery = {
    entry? : Relation<mediumint>,
    slot? : Relation<smallint>,
    item? : Relation<mediumint>,
    maxcount? : Relation<tinyint>,
    incrtime? : Relation<int>,
    ExtendedCost? : Relation<mediumint>,
    VerifiedBuild? : Relation<smallint>,
    raceMask? : Relation<int>,
    classMask? : Relation<int>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class npc_vendorTable extends SqlTable<
    npc_vendorCreator,
    npc_vendorQuery,
    npc_vendorRow> {
    add(entry : mediumint,item : mediumint,ExtendedCost : mediumint, c? : npc_vendorCreator) : npc_vendorRow {
        const first = this.first();
        if(first) return first.clone(entry,item,ExtendedCost,c)
        else return this.rowCreator(this, {}).clone(entry,item,ExtendedCost,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_npc_vendor = new npc_vendorTable(
    'npc_vendor',
    (table, obj)=>new npc_vendorRow(table, obj))