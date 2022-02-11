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
import { mediumint, smallint, tinyint } from '../../primitives'
import { Relation } from '../../query/Relations'
import { PrimaryKey } from '../../table/PrimaryKey'
import { SQLCell, SQLCellReadOnly } from '../SQLCell'
import { SqlRow } from '../SQLRow'
import { SqlTable } from '../SQLTable'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class creature_equip_templateRow extends SqlRow<creature_equip_templateCreator,creature_equip_templateQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get CreatureID() {return new SQLCellReadOnly<mediumint, this>(this, 'CreatureID')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get ID() {return new SQLCellReadOnly<tinyint, this>(this, 'ID')}

    /**
     * No comment (yet!)
     */
    get ItemID1() {return new SQLCell<mediumint, this>(this, 'ItemID1')}

    /**
     * No comment (yet!)
     */
    get ItemID2() {return new SQLCell<mediumint, this>(this, 'ItemID2')}

    /**
     * No comment (yet!)
     */
    get ItemID3() {return new SQLCell<mediumint, this>(this, 'ItemID3')}

    /**
     * No comment (yet!)
     */
    get VerifiedBuild() {return new SQLCell<smallint, this>(this, 'VerifiedBuild')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(CreatureID : mediumint,ID : tinyint, c? : creature_equip_templateCreator) : this {
        return this.cloneInternal([CreatureID,ID],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type creature_equip_templateCreator = {
    CreatureID? : mediumint,
    ID? : tinyint,
    ItemID1? : mediumint,
    ItemID2? : mediumint,
    ItemID3? : mediumint,
    VerifiedBuild? : smallint,
}

/**
 * Used for object queries (Don't comment these)
 */
export type creature_equip_templateQuery = {
    CreatureID? : Relation<mediumint>,
    ID? : Relation<tinyint>,
    ItemID1? : Relation<mediumint>,
    ItemID2? : Relation<mediumint>,
    ItemID3? : Relation<mediumint>,
    VerifiedBuild? : Relation<smallint>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class creature_equip_templateTable extends SqlTable<
    creature_equip_templateCreator,
    creature_equip_templateQuery,
    creature_equip_templateRow> {
    add(CreatureID : mediumint,ID : tinyint, c? : creature_equip_templateCreator) : creature_equip_templateRow {
        const first = this.first();
        if(first) return first.clone(CreatureID,ID,c)
        else return this.rowCreator(this, {}).clone(CreatureID,ID,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_creature_equip_template = new creature_equip_templateTable(
    'creature_equip_template',
    (table, obj)=>new creature_equip_templateRow(table, obj))