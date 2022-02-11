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
export class spell_autolearnRow extends SqlRow<spell_autolearnCreator,spell_autolearnQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get spell() {return new SQLCellReadOnly<int, this>(this, 'spell')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get racemask() {return new SQLCellReadOnly<int, this>(this, 'racemask')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get classmask() {return new SQLCellReadOnly<int, this>(this, 'classmask')}

    /**
     * No comment (yet!)
     */
    get level() {return new SQLCell<int, this>(this, 'level')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(spell: int, racemask : int,clsmask : int, c? : spell_autolearnCreator) : this {
        return this.cloneInternal([spell,racemask,clsmask],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type spell_autolearnCreator = {
    spell?: int,
    racemask?: int,
    classmask?: int,
    level?: int,
}

/**
 * Used for object queries (Don't comment these)
 */
export type spell_autolearnQuery = {
    spell? : Relation<int>,
    racemask? : Relation<int>,
    classmask? : Relation<int>,
    level? : Relation<int>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class spell_autolearnTable extends SqlTable<
    spell_autolearnCreator,
    spell_autolearnQuery,
    spell_autolearnRow> {
    add(spell: int, racemask : int,clsmask : int, c? : spell_autolearnCreator) : spell_autolearnRow {
        const first = this.first();
        if(first) return first.clone(spell, racemask,clsmask,c)
        else return this.rowCreator(this, {}).clone(spell,racemask,clsmask,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_spell_autolearn = new spell_autolearnTable(
    'spell_autolearn',
    (table, obj)=>new spell_autolearnRow(table, obj))