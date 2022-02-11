/*
  * Copyright (C) 2021 tswow <https://github.com/tswow/>
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
import { float, mediumint } from '../../data/primitives'
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
export class class_stat_valuesRow extends SqlRow<class_stat_valuesCreator,class_stat_valuesQuery> {
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
    get value() {return new SQLCell<float, this>(this, 'value')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(cls: mediumint, stat_type: number, c? : class_stat_valuesCreator) : this {
        return this.cloneInternal([cls, stat_type],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type class_stat_valuesCreator = {
    value: float,
}

/**
 * Used for object queries (Don't comment these)
 */
export type class_stat_valuesQuery = {
    class?: Relation<mediumint>,
    stat_type?: Relation<mediumint>,
    value?: Relation<float>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class class_stat_formulaTable extends SqlTable<
    class_stat_valuesCreator,
    class_stat_valuesQuery,
    class_stat_valuesRow> {
    add(cls: mediumint, stat_type: number, c? : class_stat_valuesCreator) : class_stat_valuesRow {
        const first = this.first();
        if(first) return first.clone(cls, stat_type ,c)
        else return this.rowCreator(this, {}).clone(cls, stat_type, c);
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_class_stat_values = new class_stat_formulaTable(
    'class_stat_values',
    (table, obj)=>new class_stat_valuesRow(table, obj))