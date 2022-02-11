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
import { int } from '../../data/primitives'
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
export class quest_mail_senderRow extends SqlRow<quest_mail_senderCreator,quest_mail_senderQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get QuestId() {return new SQLCellReadOnly<int, this>(this, 'QuestId')}

    /**
     * No comment (yet!)
     */
    get RewardMailSenderEntry() {return new SQLCell<int, this>(this, 'RewardMailSenderEntry')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(QuestId : int, c? : quest_mail_senderCreator) : this {
        return this.cloneInternal([QuestId],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type quest_mail_senderCreator = {
    QuestId? : int,
    RewardMailSenderEntry? : int,
}

/**
 * Used for object queries (Don't comment these)
 */
export type quest_mail_senderQuery = {
    QuestId? : Relation<int>,
    RewardMailSenderEntry? : Relation<int>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class quest_mail_senderTable extends SqlTable<
    quest_mail_senderCreator,
    quest_mail_senderQuery,
    quest_mail_senderRow> {
    add(QuestId : int, c? : quest_mail_senderCreator) : quest_mail_senderRow {
        const first = this.first();
        if(first) return first.clone(QuestId,c)
        else return this.rowCreator(this, {}).clone(QuestId,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_quest_mail_sender = new quest_mail_senderTable(
    'quest_mail_sender',
    (table, obj)=>new quest_mail_senderRow(table, obj))