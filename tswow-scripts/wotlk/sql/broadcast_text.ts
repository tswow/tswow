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
import { longtext, mediumint, smallint } from '../../data/primitives'
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
export class broadcast_textRow extends SqlRow<broadcast_textCreator,broadcast_textQuery> {
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
    get LanguageID() {return new SQLCell<mediumint, this>(this, 'LanguageID')}

    /**
     * No comment (yet!)
     */
    get Text() {return new SQLCell<longtext, this>(this, 'Text')}

    /**
     * No comment (yet!)
     */
    get Text1() {return new SQLCell<longtext, this>(this, 'Text1')}

    /**
     * No comment (yet!)
     */
    get EmoteID1() {return new SQLCell<mediumint, this>(this, 'EmoteID1')}

    /**
     * No comment (yet!)
     */
    get EmoteID2() {return new SQLCell<mediumint, this>(this, 'EmoteID2')}

    /**
     * No comment (yet!)
     */
    get EmoteID3() {return new SQLCell<mediumint, this>(this, 'EmoteID3')}

    /**
     * No comment (yet!)
     */
    get EmoteDelay1() {return new SQLCell<mediumint, this>(this, 'EmoteDelay1')}

    /**
     * No comment (yet!)
     */
    get EmoteDelay2() {return new SQLCell<mediumint, this>(this, 'EmoteDelay2')}

    /**
     * No comment (yet!)
     */
    get EmoteDelay3() {return new SQLCell<mediumint, this>(this, 'EmoteDelay3')}

    /**
     * No comment (yet!)
     */
    get SoundEntriesID() {return new SQLCell<mediumint, this>(this, 'SoundEntriesID')}

    /**
     * No comment (yet!)
     */
    get EmotesID() {return new SQLCell<mediumint, this>(this, 'EmotesID')}

    /**
     * No comment (yet!)
     */
    get Flags() {return new SQLCell<mediumint, this>(this, 'Flags')}

    /**
     * No comment (yet!)
     */
    get VerifiedBuild() {return new SQLCell<smallint, this>(this, 'VerifiedBuild')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(ID : mediumint, c? : broadcast_textCreator) : this {
        return this.cloneInternal([ID],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type broadcast_textCreator = {
    ID? : mediumint,
    LanguageID? : mediumint,
    Text? : longtext,
    Text1? : longtext,
    EmoteID1? : mediumint,
    EmoteID2? : mediumint,
    EmoteID3? : mediumint,
    EmoteDelay1? : mediumint,
    EmoteDelay2? : mediumint,
    EmoteDelay3? : mediumint,
    SoundEntriesID? : mediumint,
    EmotesID? : mediumint,
    Flags? : mediumint,
    VerifiedBuild? : smallint,
}

/**
 * Used for object queries (Don't comment these)
 */
export type broadcast_textQuery = {
    ID? : Relation<mediumint>,
    LanguageID? : Relation<mediumint>,
    Text? : Relation<longtext>,
    Text1? : Relation<longtext>,
    EmoteID1? : Relation<mediumint>,
    EmoteID2? : Relation<mediumint>,
    EmoteID3? : Relation<mediumint>,
    EmoteDelay1? : Relation<mediumint>,
    EmoteDelay2? : Relation<mediumint>,
    EmoteDelay3? : Relation<mediumint>,
    SoundEntriesID? : Relation<mediumint>,
    EmotesID? : Relation<mediumint>,
    Flags? : Relation<mediumint>,
    VerifiedBuild? : Relation<smallint>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class broadcast_textTable extends SqlTable<
    broadcast_textCreator,
    broadcast_textQuery,
    broadcast_textRow> {
    add(ID : mediumint, c? : broadcast_textCreator) : broadcast_textRow {
        const first = this.first();
        if(first) return first.clone(ID,c)
        else return this.rowCreator(this, {}).clone(ID,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_broadcast_text = new broadcast_textTable(
    'broadcast_text',
    (table, obj)=>new broadcast_textRow(table, obj))