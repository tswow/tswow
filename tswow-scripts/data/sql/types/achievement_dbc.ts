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
import { SQLCell, SQLCellReadOnly } from '../SQLCell'
import { SqlRow } from '../SQLRow'
import { SqlTable } from '../SQLTable'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class achievement_dbcRow extends SqlRow<achievement_dbcCreator,achievement_dbcQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get ID() {return new SQLCellReadOnly<int, this>(this, 'ID')}

    /**
     * No comment (yet!)
     */
    get requiredFaction() {return new SQLCell<int, this>(this, 'requiredFaction')}

    /**
     * No comment (yet!)
     */
    get mapID() {return new SQLCell<int, this>(this, 'mapID')}

    /**
     * No comment (yet!)
     */
    get points() {return new SQLCell<int, this>(this, 'points')}

    /**
     * No comment (yet!)
     */
    get flags() {return new SQLCell<int, this>(this, 'flags')}

    /**
     * No comment (yet!)
     */
    get count() {return new SQLCell<int, this>(this, 'count')}

    /**
     * No comment (yet!)
     */
    get refAchievement() {return new SQLCell<int, this>(this, 'refAchievement')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(ID : int, c? : achievement_dbcCreator) : this {
        return this.cloneInternal([ID],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type achievement_dbcCreator = {
    ID? : int,
    requiredFaction? : int,
    mapID? : int,
    points? : int,
    flags? : int,
    count? : int,
    refAchievement? : int,
}

/**
 * Used for object queries (Don't comment these)
 */
export type achievement_dbcQuery = {
    ID? : Relation<int>,
    requiredFaction? : Relation<int>,
    mapID? : Relation<int>,
    points? : Relation<int>,
    flags? : Relation<int>,
    count? : Relation<int>,
    refAchievement? : Relation<int>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class achievement_dbcTable extends SqlTable<
    achievement_dbcCreator,
    achievement_dbcQuery,
    achievement_dbcRow> {
    add(ID : int, c? : achievement_dbcCreator) : achievement_dbcRow {
        const first = this.first();
        if(first) return first.clone(ID,c)
        else return this.rowCreator(this, {}).clone(ID,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_achievement_dbc = new achievement_dbcTable(
    'achievement_dbc',
    (table, obj)=>new achievement_dbcRow(table, obj))