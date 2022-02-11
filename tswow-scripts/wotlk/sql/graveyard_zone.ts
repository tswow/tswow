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
import { mediumint, smallint, text } from '../../data/primitives'
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
export class graveyard_zoneRow extends SqlRow<graveyard_zoneCreator,graveyard_zoneQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get ID() {return new SQLCellReadOnly<mediumint, this>(this, 'ID')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get GhostZone() {return new SQLCellReadOnly<mediumint, this>(this, 'GhostZone')}

    /**
     * No comment (yet!)
     */
    get Faction() {return new SQLCell<smallint, this>(this, 'Faction')}

    /**
     * No comment (yet!)
     */
    get Comment() {return new SQLCell<text, this>(this, 'Comment')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(ID : mediumint,GhostZone : mediumint, c? : graveyard_zoneCreator) : this {
        return this.cloneInternal([ID,GhostZone],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type graveyard_zoneCreator = {
    ID? : mediumint,
    GhostZone? : mediumint,
    Faction? : smallint,
    Comment? : text,
}

/**
 * Used for object queries (Don't comment these)
 */
export type graveyard_zoneQuery = {
    ID? : Relation<mediumint>,
    GhostZone? : Relation<mediumint>,
    Faction? : Relation<smallint>,
    Comment? : Relation<text>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class graveyard_zoneTable extends SqlTable<
    graveyard_zoneCreator,
    graveyard_zoneQuery,
    graveyard_zoneRow> {
    add(ID : mediumint,GhostZone : mediumint, c? : graveyard_zoneCreator) : graveyard_zoneRow {
        const first = this.first();
        if(first) return first.clone(ID,GhostZone,c)
        else return this.rowCreator(this, {}).clone(ID,GhostZone,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_graveyard_zone = new graveyard_zoneTable(
    'graveyard_zone',
    (table, obj)=>new graveyard_zoneRow(table, obj))