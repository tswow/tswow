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
import { float, int, smallint } from '../../primitives'
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
export class creature_formationsRow extends SqlRow<creature_formationsCreator,creature_formationsQuery> {
    /**
     * No comment (yet!)
     */
    get leaderGUID() {return new SQLCell<int, this>(this, 'leaderGUID')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get memberGUID() {return new SQLCellReadOnly<int, this>(this, 'memberGUID')}

    /**
     * No comment (yet!)
     */
    get dist() {return new SQLCell<float, this>(this, 'dist')}

    /**
     * No comment (yet!)
     */
    get angle() {return new SQLCell<float, this>(this, 'angle')}

    /**
     * No comment (yet!)
     */
    get groupAI() {return new SQLCell<int, this>(this, 'groupAI')}

    /**
     * No comment (yet!)
     */
    get point_1() {return new SQLCell<smallint, this>(this, 'point_1')}

    /**
     * No comment (yet!)
     */
    get point_2() {return new SQLCell<smallint, this>(this, 'point_2')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(memberGUID : int, c? : creature_formationsCreator) : this {
        return this.cloneInternal([memberGUID],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type creature_formationsCreator = {
    leaderGUID? : int,
    memberGUID? : int,
    dist? : float,
    angle? : float,
    groupAI? : int,
    point_1? : smallint,
    point_2? : smallint,
}

/**
 * Used for object queries (Don't comment these)
 */
export type creature_formationsQuery = {
    leaderGUID? : Relation<int>,
    memberGUID? : Relation<int>,
    dist? : Relation<float>,
    angle? : Relation<float>,
    groupAI? : Relation<int>,
    point_1? : Relation<smallint>,
    point_2? : Relation<smallint>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class creature_formationsTable extends SqlTable<
    creature_formationsCreator,
    creature_formationsQuery,
    creature_formationsRow> {
    add(memberGUID : int, c? : creature_formationsCreator) : creature_formationsRow {
        const first = this.first();
        if(first) return first.clone(memberGUID,c)
        else return this.rowCreator(this, {}).clone(memberGUID,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_creature_formations = new creature_formationsTable(
    'creature_formations',
    (table, obj)=>new creature_formationsRow(table, obj))