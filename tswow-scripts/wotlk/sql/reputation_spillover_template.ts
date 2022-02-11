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
import { float, smallint, tinyint } from '../../data/primitives'
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
export class reputation_spillover_templateRow extends SqlRow<reputation_spillover_templateCreator,reputation_spillover_templateQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get faction() {return new SQLCellReadOnly<smallint, this>(this, 'faction')}

    /**
     * No comment (yet!)
     */
    get faction1() {return new SQLCell<smallint, this>(this, 'faction1')}

    /**
     * No comment (yet!)
     */
    get rate_1() {return new SQLCell<float, this>(this, 'rate_1')}

    /**
     * No comment (yet!)
     */
    get rank_1() {return new SQLCell<tinyint, this>(this, 'rank_1')}

    /**
     * No comment (yet!)
     */
    get faction2() {return new SQLCell<smallint, this>(this, 'faction2')}

    /**
     * No comment (yet!)
     */
    get rate_2() {return new SQLCell<float, this>(this, 'rate_2')}

    /**
     * No comment (yet!)
     */
    get rank_2() {return new SQLCell<tinyint, this>(this, 'rank_2')}

    /**
     * No comment (yet!)
     */
    get faction3() {return new SQLCell<smallint, this>(this, 'faction3')}

    /**
     * No comment (yet!)
     */
    get rate_3() {return new SQLCell<float, this>(this, 'rate_3')}

    /**
     * No comment (yet!)
     */
    get rank_3() {return new SQLCell<tinyint, this>(this, 'rank_3')}

    /**
     * No comment (yet!)
     */
    get faction4() {return new SQLCell<smallint, this>(this, 'faction4')}

    /**
     * No comment (yet!)
     */
    get rate_4() {return new SQLCell<float, this>(this, 'rate_4')}

    /**
     * No comment (yet!)
     */
    get rank_4() {return new SQLCell<tinyint, this>(this, 'rank_4')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(faction : smallint, c? : reputation_spillover_templateCreator) : this {
        return this.cloneInternal([faction],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type reputation_spillover_templateCreator = {
    faction? : smallint,
    faction1? : smallint,
    rate_1? : float,
    rank_1? : tinyint,
    faction2? : smallint,
    rate_2? : float,
    rank_2? : tinyint,
    faction3? : smallint,
    rate_3? : float,
    rank_3? : tinyint,
    faction4? : smallint,
    rate_4? : float,
    rank_4? : tinyint,
}

/**
 * Used for object queries (Don't comment these)
 */
export type reputation_spillover_templateQuery = {
    faction? : Relation<smallint>,
    faction1? : Relation<smallint>,
    rate_1? : Relation<float>,
    rank_1? : Relation<tinyint>,
    faction2? : Relation<smallint>,
    rate_2? : Relation<float>,
    rank_2? : Relation<tinyint>,
    faction3? : Relation<smallint>,
    rate_3? : Relation<float>,
    rank_3? : Relation<tinyint>,
    faction4? : Relation<smallint>,
    rate_4? : Relation<float>,
    rank_4? : Relation<tinyint>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class reputation_spillover_templateTable extends SqlTable<
    reputation_spillover_templateCreator,
    reputation_spillover_templateQuery,
    reputation_spillover_templateRow> {
    add(faction : smallint, c? : reputation_spillover_templateCreator) : reputation_spillover_templateRow {
        const first = this.first();
        if(first) return first.clone(faction,c)
        else return this.rowCreator(this, {}).clone(faction,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_reputation_spillover_template = new reputation_spillover_templateTable(
    'reputation_spillover_template',
    (table, obj)=>new reputation_spillover_templateRow(table, obj))