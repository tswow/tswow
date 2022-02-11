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
import { int, tinyint } from '../../data/primitives'
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
export class lfg_dungeon_rewardsRow extends SqlRow<lfg_dungeon_rewardsCreator,lfg_dungeon_rewardsQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get dungeonId() {return new SQLCellReadOnly<int, this>(this, 'dungeonId')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get maxLevel() {return new SQLCellReadOnly<tinyint, this>(this, 'maxLevel')}

    /**
     * No comment (yet!)
     */
    get firstQuestId() {return new SQLCell<int, this>(this, 'firstQuestId')}

    /**
     * No comment (yet!)
     */
    get otherQuestId() {return new SQLCell<int, this>(this, 'otherQuestId')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(dungeonId : int,maxLevel : tinyint, c? : lfg_dungeon_rewardsCreator) : this {
        return this.cloneInternal([dungeonId,maxLevel],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type lfg_dungeon_rewardsCreator = {
    dungeonId? : int,
    maxLevel? : tinyint,
    firstQuestId? : int,
    otherQuestId? : int,
}

/**
 * Used for object queries (Don't comment these)
 */
export type lfg_dungeon_rewardsQuery = {
    dungeonId? : Relation<int>,
    maxLevel? : Relation<tinyint>,
    firstQuestId? : Relation<int>,
    otherQuestId? : Relation<int>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class lfg_dungeon_rewardsTable extends SqlTable<
    lfg_dungeon_rewardsCreator,
    lfg_dungeon_rewardsQuery,
    lfg_dungeon_rewardsRow> {
    add(dungeonId : int,maxLevel : tinyint, c? : lfg_dungeon_rewardsCreator) : lfg_dungeon_rewardsRow {
        const first = this.first();
        if(first) return first.clone(dungeonId,maxLevel,c)
        else return this.rowCreator(this, {}).clone(dungeonId,maxLevel,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_lfg_dungeon_rewards = new lfg_dungeon_rewardsTable(
    'lfg_dungeon_rewards',
    (table, obj)=>new lfg_dungeon_rewardsRow(table, obj))