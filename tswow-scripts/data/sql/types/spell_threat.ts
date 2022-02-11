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
import { float, int, mediumint } from '../../primitives'
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
export class spell_threatRow extends SqlRow<spell_threatCreator,spell_threatQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get entry() {return new SQLCellReadOnly<mediumint, this>(this, 'entry')}

    /**
     * No comment (yet!)
     */
    get flatMod() {return new SQLCell<int, this>(this, 'flatMod')}

    /**
     * No comment (yet!)
     */
    get pctMod() {return new SQLCell<float, this>(this, 'pctMod')}

    /**
     * No comment (yet!)
     */
    get apPctMod() {return new SQLCell<float, this>(this, 'apPctMod')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(entry : mediumint, c? : spell_threatCreator) : this {
        return this.cloneInternal([entry],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type spell_threatCreator = {
    entry? : mediumint,
    flatMod? : int,
    pctMod? : float,
    apPctMod? : float,
}

/**
 * Used for object queries (Don't comment these)
 */
export type spell_threatQuery = {
    entry? : Relation<mediumint>,
    flatMod? : Relation<int>,
    pctMod? : Relation<float>,
    apPctMod? : Relation<float>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class spell_threatTable extends SqlTable<
    spell_threatCreator,
    spell_threatQuery,
    spell_threatRow> {
    add(entry : mediumint, c? : spell_threatCreator) : spell_threatRow {
        const first = this.first();
        if(first) return first.clone(entry,c)
        else return this.rowCreator(this, {}).clone(entry,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_spell_threat = new spell_threatTable(
    'spell_threat',
    (table, obj)=>new spell_threatRow(table, obj))