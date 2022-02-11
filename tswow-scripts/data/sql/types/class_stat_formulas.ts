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
import { mediumint } from '../../primitives'
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
export class class_stat_formulasRow extends SqlRow<class_stat_formulasCreator,class_stat_formulasQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get class() {return new SQLCellReadOnly<mediumint, this>(this, 'class')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get stat_type() {return new SQLCellReadOnly<mediumint, this>(this, 'stat_type')}

    /**
     * No comment (yet!)
     */
    get class_out() {return new SQLCell<mediumint, this>(this, 'class_out')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(cls: mediumint, stat_type: number, c? : class_stat_formulasCreator) : this {
        return this.cloneInternal([cls, stat_type],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type class_stat_formulasCreator = {
    class_out: mediumint,
}

/**
 * Used for object queries (Don't comment these)
 */
export type class_stat_formulasQuery = {
    class?: Relation<mediumint>,
    stat_type?: Relation<mediumint>,
    class_out?: Relation<mediumint>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class class_stat_formulaTable extends SqlTable<
    class_stat_formulasCreator,
    class_stat_formulasQuery,
    class_stat_formulasRow> {
    add(cls: mediumint, stat_type: number, c? : class_stat_formulasCreator) : class_stat_formulasRow {
        const first = this.first();
        if(first) return first.clone(cls, stat_type ,c)
        else return this.rowCreator(this, {}).clone(cls, stat_type, c);
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_class_stat_formulas = new class_stat_formulaTable(
    'class_stat_formulas',
    (table, obj)=>new class_stat_formulasRow(table, obj))