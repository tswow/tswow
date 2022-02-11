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
import { float, longtext, mediumint, tinyint, varchar } from '../../data/primitives'
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
export class creature_textRow extends SqlRow<creature_textCreator,creature_textQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get CreatureID() {return new SQLCellReadOnly<mediumint, this>(this, 'CreatureID')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get GroupID() {return new SQLCellReadOnly<tinyint, this>(this, 'GroupID')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get ID() {return new SQLCellReadOnly<tinyint, this>(this, 'ID')}

    /**
     * No comment (yet!)
     */
    get Text() {return new SQLCell<longtext, this>(this, 'Text')}

    /**
     * No comment (yet!)
     */
    get Type() {return new SQLCell<tinyint, this>(this, 'Type')}

    /**
     * No comment (yet!)
     */
    get Language() {return new SQLCell<tinyint, this>(this, 'Language')}

    /**
     * No comment (yet!)
     */
    get Probability() {return new SQLCell<float, this>(this, 'Probability')}

    /**
     * No comment (yet!)
     */
    get Emote() {return new SQLCell<mediumint, this>(this, 'Emote')}

    /**
     * No comment (yet!)
     */
    get Duration() {return new SQLCell<mediumint, this>(this, 'Duration')}

    /**
     * No comment (yet!)
     */
    get Sound() {return new SQLCell<mediumint, this>(this, 'Sound')}

    /**
     * No comment (yet!)
     */
    get BroadcastTextId() {return new SQLCell<mediumint, this>(this, 'BroadcastTextId')}

    /**
     * No comment (yet!)
     */
    get TextRange() {return new SQLCell<tinyint, this>(this, 'TextRange')}

    /**
     * No comment (yet!)
     */
    get comment() {return new SQLCell<varchar, this>(this, 'comment')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(CreatureID : mediumint,GroupID : tinyint,ID : tinyint, c? : creature_textCreator) : this {
        return this.cloneInternal([CreatureID,GroupID,ID],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type creature_textCreator = {
    CreatureID? : mediumint,
    GroupID? : tinyint,
    ID? : tinyint,
    Text? : longtext,
    Type? : tinyint,
    Language? : tinyint,
    Probability? : float,
    Emote? : mediumint,
    Duration? : mediumint,
    Sound? : mediumint,
    BroadcastTextId? : mediumint,
    TextRange? : tinyint,
    comment? : varchar,
}

/**
 * Used for object queries (Don't comment these)
 */
export type creature_textQuery = {
    CreatureID? : Relation<mediumint>,
    GroupID? : Relation<tinyint>,
    ID? : Relation<tinyint>,
    Text? : Relation<longtext>,
    Type? : Relation<tinyint>,
    Language? : Relation<tinyint>,
    Probability? : Relation<float>,
    Emote? : Relation<mediumint>,
    Duration? : Relation<mediumint>,
    Sound? : Relation<mediumint>,
    BroadcastTextId? : Relation<mediumint>,
    TextRange? : Relation<tinyint>,
    comment? : Relation<varchar>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class creature_textTable extends SqlTable<
    creature_textCreator,
    creature_textQuery,
    creature_textRow> {
    add(CreatureID : mediumint,GroupID : tinyint,ID : tinyint, c? : creature_textCreator) : creature_textRow {
        const first = this.first();
        if(first) return first.clone(CreatureID,GroupID,ID,c)
        else return this.rowCreator(this, {}).clone(CreatureID,GroupID,ID,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_creature_text = new creature_textTable(
    'creature_text',
    (table, obj)=>new creature_textRow(table, obj))