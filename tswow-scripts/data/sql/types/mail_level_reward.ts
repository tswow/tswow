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
import { mediumint, tinyint } from '../../primitives'
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
export class mail_level_rewardRow extends SqlRow<mail_level_rewardCreator,mail_level_rewardQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get level() {return new SQLCellReadOnly<tinyint, this>(this, 'level')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get raceMask() {return new SQLCellReadOnly<mediumint, this>(this, 'raceMask')}

    /**
     * No comment (yet!)
     */
    get mailTemplateId() {return new SQLCell<mediumint, this>(this, 'mailTemplateId')}

    /**
     * No comment (yet!)
     */
    get senderEntry() {return new SQLCell<mediumint, this>(this, 'senderEntry')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(level : tinyint,raceMask : mediumint, c? : mail_level_rewardCreator) : this {
        return this.cloneInternal([level,raceMask],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type mail_level_rewardCreator = {
    level? : tinyint,
    raceMask? : mediumint,
    mailTemplateId? : mediumint,
    senderEntry? : mediumint,
}

/**
 * Used for object queries (Don't comment these)
 */
export type mail_level_rewardQuery = {
    level? : Relation<tinyint>,
    raceMask? : Relation<mediumint>,
    mailTemplateId? : Relation<mediumint>,
    senderEntry? : Relation<mediumint>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class mail_level_rewardTable extends SqlTable<
    mail_level_rewardCreator,
    mail_level_rewardQuery,
    mail_level_rewardRow> {
    add(level : tinyint,raceMask : mediumint, c? : mail_level_rewardCreator) : mail_level_rewardRow {
        const first = this.first();
        if(first) return first.clone(level,raceMask,c)
        else return this.rowCreator(this, {}).clone(level,raceMask,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_mail_level_reward = new mail_level_rewardTable(
    'mail_level_reward',
    (table, obj)=>new mail_level_rewardRow(table, obj))