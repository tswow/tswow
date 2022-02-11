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
import { mediumint, smallint, text, varchar } from '../../data/primitives'
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
export class quest_template_localeRow extends SqlRow<quest_template_localeCreator,quest_template_localeQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get ID() {return new SQLCellReadOnly<mediumint, this>(this, 'ID')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get locale() {return new SQLCellReadOnly<varchar, this>(this, 'locale')}

    /**
     * No comment (yet!)
     */
    get Title() {return new SQLCell<text, this>(this, 'Title')}

    /**
     * No comment (yet!)
     */
    get Details() {return new SQLCell<text, this>(this, 'Details')}

    /**
     * No comment (yet!)
     */
    get Objectives() {return new SQLCell<text, this>(this, 'Objectives')}

    /**
     * No comment (yet!)
     */
    get EndText() {return new SQLCell<text, this>(this, 'EndText')}

    /**
     * No comment (yet!)
     */
    get CompletedText() {return new SQLCell<text, this>(this, 'CompletedText')}

    /**
     * No comment (yet!)
     */
    get ObjectiveText1() {return new SQLCell<text, this>(this, 'ObjectiveText1')}

    /**
     * No comment (yet!)
     */
    get ObjectiveText2() {return new SQLCell<text, this>(this, 'ObjectiveText2')}

    /**
     * No comment (yet!)
     */
    get ObjectiveText3() {return new SQLCell<text, this>(this, 'ObjectiveText3')}

    /**
     * No comment (yet!)
     */
    get ObjectiveText4() {return new SQLCell<text, this>(this, 'ObjectiveText4')}

    /**
     * No comment (yet!)
     */
    get VerifiedBuild() {return new SQLCell<smallint, this>(this, 'VerifiedBuild')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(ID : mediumint,locale : varchar, c? : quest_template_localeCreator) : this {
        return this.cloneInternal([ID,locale],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type quest_template_localeCreator = {
    ID? : mediumint,
    locale? : varchar,
    Title? : text,
    Details? : text,
    Objectives? : text,
    EndText? : text,
    CompletedText? : text,
    ObjectiveText1? : text,
    ObjectiveText2? : text,
    ObjectiveText3? : text,
    ObjectiveText4? : text,
    VerifiedBuild? : smallint,
}

/**
 * Used for object queries (Don't comment these)
 */
export type quest_template_localeQuery = {
    ID? : Relation<mediumint>,
    locale? : Relation<varchar>,
    Title? : Relation<text>,
    Details? : Relation<text>,
    Objectives? : Relation<text>,
    EndText? : Relation<text>,
    CompletedText? : Relation<text>,
    ObjectiveText1? : Relation<text>,
    ObjectiveText2? : Relation<text>,
    ObjectiveText3? : Relation<text>,
    ObjectiveText4? : Relation<text>,
    VerifiedBuild? : Relation<smallint>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class quest_template_localeTable extends SqlTable<
    quest_template_localeCreator,
    quest_template_localeQuery,
    quest_template_localeRow> {
    add(ID : mediumint,locale : varchar, c? : quest_template_localeCreator) : quest_template_localeRow {
        const first = this.first();
        if(first) return first.clone(ID,locale,c)
        else return this.rowCreator(this, {}).clone(ID,locale,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_quest_template_locale = new quest_template_localeTable(
    'quest_template_locale',
    (table, obj)=>new quest_template_localeRow(table, obj))