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
import { mediumint, smallint, text } from '../../primitives'
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
export class quest_request_itemsRow extends SqlRow<quest_request_itemsCreator,quest_request_itemsQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get ID() {return new SQLCellReadOnly<mediumint, this>(this, 'ID')}

    /**
     * No comment (yet!)
     */
    get EmoteOnComplete() {return new SQLCell<smallint, this>(this, 'EmoteOnComplete')}

    /**
     * No comment (yet!)
     */
    get EmoteOnIncomplete() {return new SQLCell<smallint, this>(this, 'EmoteOnIncomplete')}

    /**
     * No comment (yet!)
     */
    get CompletionText() {return new SQLCell<text, this>(this, 'CompletionText')}

    /**
     * No comment (yet!)
     */
    get VerifiedBuild() {return new SQLCell<smallint, this>(this, 'VerifiedBuild')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(ID : mediumint, c? : quest_request_itemsCreator) : this {
        return this.cloneInternal([ID],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type quest_request_itemsCreator = {
    ID? : mediumint,
    EmoteOnComplete? : smallint,
    EmoteOnIncomplete? : smallint,
    CompletionText? : text,
    VerifiedBuild? : smallint,
}

/**
 * Used for object queries (Don't comment these)
 */
export type quest_request_itemsQuery = {
    ID? : Relation<mediumint>,
    EmoteOnComplete? : Relation<smallint>,
    EmoteOnIncomplete? : Relation<smallint>,
    CompletionText? : Relation<text>,
    VerifiedBuild? : Relation<smallint>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class quest_request_itemsTable extends SqlTable<
    quest_request_itemsCreator,
    quest_request_itemsQuery,
    quest_request_itemsRow> {
    add(ID : mediumint, c? : quest_request_itemsCreator) : quest_request_itemsRow {
        const first = this.first();
        if(first) return first.clone(ID,c)
        else return this.rowCreator(this, {}).clone(ID,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_quest_request_items = new quest_request_itemsTable(
    'quest_request_items',
    (table, obj)=>new quest_request_itemsRow(table, obj))