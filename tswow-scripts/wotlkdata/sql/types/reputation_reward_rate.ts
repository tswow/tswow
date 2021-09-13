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
import { float, mediumint } from '../../primitives'
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
export class reputation_reward_rateRow extends SqlRow<reputation_reward_rateCreator,reputation_reward_rateQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get faction() {return new SQLCellReadOnly<mediumint, this>(this, 'faction')}

    /**
     * No comment (yet!)
     */
    get quest_rate() {return new SQLCell<float, this>(this, 'quest_rate')}

    /**
     * No comment (yet!)
     */
    get quest_daily_rate() {return new SQLCell<float, this>(this, 'quest_daily_rate')}

    /**
     * No comment (yet!)
     */
    get quest_weekly_rate() {return new SQLCell<float, this>(this, 'quest_weekly_rate')}

    /**
     * No comment (yet!)
     */
    get quest_monthly_rate() {return new SQLCell<float, this>(this, 'quest_monthly_rate')}

    /**
     * No comment (yet!)
     */
    get quest_repeatable_rate() {return new SQLCell<float, this>(this, 'quest_repeatable_rate')}

    /**
     * No comment (yet!)
     */
    get creature_rate() {return new SQLCell<float, this>(this, 'creature_rate')}

    /**
     * No comment (yet!)
     */
    get spell_rate() {return new SQLCell<float, this>(this, 'spell_rate')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(faction : mediumint, c? : reputation_reward_rateCreator) : this {
        return this.cloneInternal([faction],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type reputation_reward_rateCreator = {
    faction? : mediumint,
    quest_rate? : float,
    quest_daily_rate? : float,
    quest_weekly_rate? : float,
    quest_monthly_rate? : float,
    quest_repeatable_rate? : float,
    creature_rate? : float,
    spell_rate? : float,
}

/**
 * Used for object queries (Don't comment these)
 */
export type reputation_reward_rateQuery = {
    faction? : Relation<mediumint>,
    quest_rate? : Relation<float>,
    quest_daily_rate? : Relation<float>,
    quest_weekly_rate? : Relation<float>,
    quest_monthly_rate? : Relation<float>,
    quest_repeatable_rate? : Relation<float>,
    creature_rate? : Relation<float>,
    spell_rate? : Relation<float>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class reputation_reward_rateTable extends SqlTable<
    reputation_reward_rateCreator,
    reputation_reward_rateQuery,
    reputation_reward_rateRow> {
    add(faction : mediumint, c? : reputation_reward_rateCreator) : reputation_reward_rateRow {
        const first = this.first();
        if(first) return first.clone(faction,c)
        else return this.rowCreator(this, {}).clone(faction,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_reputation_reward_rate = new reputation_reward_rateTable(
    'reputation_reward_rate',
    (table, obj)=>new reputation_reward_rateRow(table, obj))