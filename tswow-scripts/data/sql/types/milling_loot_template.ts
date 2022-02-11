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
import { float, mediumint, smallint, tinyint, varchar } from '../../primitives'
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
export class milling_loot_templateRow extends SqlRow<milling_loot_templateCreator,milling_loot_templateQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get Entry() {return new SQLCellReadOnly<mediumint, this>(this, 'Entry')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get Item() {return new SQLCellReadOnly<mediumint, this>(this, 'Item')}

    /**
     * No comment (yet!)
     */
    get Reference() {return new SQLCell<mediumint, this>(this, 'Reference')}

    /**
     * No comment (yet!)
     */
    get Chance() {return new SQLCell<float, this>(this, 'Chance')}

    /**
     * No comment (yet!)
     */
    get QuestRequired() {return new SQLCell<tinyint, this>(this, 'QuestRequired')}

    /**
     * No comment (yet!)
     */
    get LootMode() {return new SQLCell<smallint, this>(this, 'LootMode')}

    /**
     * No comment (yet!)
     */
    get GroupId() {return new SQLCell<tinyint, this>(this, 'GroupId')}

    /**
     * No comment (yet!)
     */
    get MinCount() {return new SQLCell<tinyint, this>(this, 'MinCount')}

    /**
     * No comment (yet!)
     */
    get MaxCount() {return new SQLCell<tinyint, this>(this, 'MaxCount')}

    /**
     * No comment (yet!)
     */
    get Comment() {return new SQLCell<varchar, this>(this, 'Comment')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(Entry : mediumint,Item : mediumint, c? : milling_loot_templateCreator) : this {
        return this.cloneInternal([Entry,Item],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type milling_loot_templateCreator = {
    Entry? : mediumint,
    Item? : mediumint,
    Reference? : mediumint,
    Chance? : float,
    QuestRequired? : tinyint,
    LootMode? : smallint,
    GroupId? : tinyint,
    MinCount? : tinyint,
    MaxCount? : tinyint,
    Comment? : varchar,
}

/**
 * Used for object queries (Don't comment these)
 */
export type milling_loot_templateQuery = {
    Entry? : Relation<mediumint>,
    Item? : Relation<mediumint>,
    Reference? : Relation<mediumint>,
    Chance? : Relation<float>,
    QuestRequired? : Relation<tinyint>,
    LootMode? : Relation<smallint>,
    GroupId? : Relation<tinyint>,
    MinCount? : Relation<tinyint>,
    MaxCount? : Relation<tinyint>,
    Comment? : Relation<varchar>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class milling_loot_templateTable extends SqlTable<
    milling_loot_templateCreator,
    milling_loot_templateQuery,
    milling_loot_templateRow> {
    add(Entry : mediumint,Item : mediumint, c? : milling_loot_templateCreator) : milling_loot_templateRow {
        const first = this.first();
        if(first) return first.clone(Entry,Item,c)
        else return this.rowCreator(this, {}).clone(Entry,Item,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_milling_loot_template = new milling_loot_templateTable(
    'milling_loot_template',
    (table, obj)=>new milling_loot_templateRow(table, obj))