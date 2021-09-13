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
import { smallint, tinyint, varchar } from '../../primitives'
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
export class instance_templateRow extends SqlRow<instance_templateCreator,instance_templateQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get map() {return new SQLCellReadOnly<smallint, this>(this, 'map')}

    /**
     * No comment (yet!)
     */
    get parent() {return new SQLCell<smallint, this>(this, 'parent')}

    /**
     * No comment (yet!)
     */
    get script() {return new SQLCell<varchar, this>(this, 'script')}

    /**
     * No comment (yet!)
     */
    get allowMount() {return new SQLCell<tinyint, this>(this, 'allowMount')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(map : smallint, c? : instance_templateCreator) : this {
        return this.cloneInternal([map],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type instance_templateCreator = {
    map? : smallint,
    parent? : smallint,
    script? : varchar,
    allowMount? : tinyint,
}

/**
 * Used for object queries (Don't comment these)
 */
export type instance_templateQuery = {
    map? : Relation<smallint>,
    parent? : Relation<smallint>,
    script? : Relation<varchar>,
    allowMount? : Relation<tinyint>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class instance_templateTable extends SqlTable<
    instance_templateCreator,
    instance_templateQuery,
    instance_templateRow> {
    add(map : smallint, c? : instance_templateCreator) : instance_templateRow {
        const first = this.first();
        if(first) return first.clone(map,c)
        else return this.rowCreator(this, {}).clone(map,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_instance_template = new instance_templateTable(
    'instance_template',
    (table, obj)=>new instance_templateRow(table, obj))