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
import { mediumint, smallint, text, tinyint } from '../../primitives'
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
export class access_requirementRow extends SqlRow<access_requirementCreator,access_requirementQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get mapId() {return new SQLCellReadOnly<mediumint, this>(this, 'mapId')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get difficulty() {return new SQLCellReadOnly<tinyint, this>(this, 'difficulty')}

    /**
     * No comment (yet!)
     */
    get level_min() {return new SQLCell<tinyint, this>(this, 'level_min')}

    /**
     * No comment (yet!)
     */
    get level_max() {return new SQLCell<tinyint, this>(this, 'level_max')}

    /**
     * No comment (yet!)
     */
    get item_level() {return new SQLCell<smallint, this>(this, 'item_level')}

    /**
     * No comment (yet!)
     */
    get item() {return new SQLCell<mediumint, this>(this, 'item')}

    /**
     * No comment (yet!)
     */
    get item2() {return new SQLCell<mediumint, this>(this, 'item2')}

    /**
     * No comment (yet!)
     */
    get quest_done_A() {return new SQLCell<mediumint, this>(this, 'quest_done_A')}

    /**
     * No comment (yet!)
     */
    get quest_done_H() {return new SQLCell<mediumint, this>(this, 'quest_done_H')}

    /**
     * No comment (yet!)
     */
    get completed_achievement() {return new SQLCell<mediumint, this>(this, 'completed_achievement')}

    /**
     * No comment (yet!)
     */
    get quest_failed_text() {return new SQLCell<text, this>(this, 'quest_failed_text')}

    /**
     * No comment (yet!)
     */
    get comment() {return new SQLCell<text, this>(this, 'comment')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(mapId : mediumint,difficulty : tinyint, c? : access_requirementCreator) : this {
        return this.cloneInternal([mapId,difficulty],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type access_requirementCreator = {
    mapId? : mediumint,
    difficulty? : tinyint,
    level_min? : tinyint,
    level_max? : tinyint,
    item_level? : smallint,
    item? : mediumint,
    item2? : mediumint,
    quest_done_A? : mediumint,
    quest_done_H? : mediumint,
    completed_achievement? : mediumint,
    quest_failed_text? : text,
    comment? : text,
}

/**
 * Used for object queries (Don't comment these)
 */
export type access_requirementQuery = {
    mapId? : Relation<mediumint>,
    difficulty? : Relation<tinyint>,
    level_min? : Relation<tinyint>,
    level_max? : Relation<tinyint>,
    item_level? : Relation<smallint>,
    item? : Relation<mediumint>,
    item2? : Relation<mediumint>,
    quest_done_A? : Relation<mediumint>,
    quest_done_H? : Relation<mediumint>,
    completed_achievement? : Relation<mediumint>,
    quest_failed_text? : Relation<text>,
    comment? : Relation<text>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class access_requirementTable extends SqlTable<
    access_requirementCreator,
    access_requirementQuery,
    access_requirementRow> {
    add(mapId : mediumint,difficulty : tinyint, c? : access_requirementCreator) : access_requirementRow {
        const first = this.first();
        if(first) return first.clone(mapId,difficulty,c)
        else return this.rowCreator(this, {}).clone(mapId,difficulty,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_access_requirement = new access_requirementTable(
    'access_requirement',
    (table, obj)=>new access_requirementRow(table, obj))