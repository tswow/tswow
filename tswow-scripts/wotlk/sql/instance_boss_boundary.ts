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
import { float, mediumint, tinyint } from '../../data/primitives'
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
export class instance_boss_boundaryRow extends SqlRow<instance_boss_boundaryCreator,instance_boss_boundaryQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get map() {return new SQLCellReadOnly<mediumint, this>(this, 'map')}

    /**
     * No comment (yet!)
     */
    @PrimaryKey()
    get boss() {return new SQLCellReadOnly<mediumint, this>(this, 'boss')}

    /**
     * No comment (yet!)
     */
    @PrimaryKey()
    get index() {return new SQLCellReadOnly<mediumint, this>(this, 'index')}

    get unionGroup() { return new SQLCell<mediumint, this>(this, 'unionGroup') }
    get type() {return new SQLCell<mediumint, this>(this, 'type')}
    get inverted() {return new SQLCell<tinyint, this>(this, 'inverted')}
    get data0() {return new SQLCell<float, this>(this, 'data0')}
    get data1() {return new SQLCell<float, this>(this, 'data1')}
    get data2() {return new SQLCell<float, this>(this, 'data2')}
    get data3() {return new SQLCell<float, this>(this, 'data3')}
    get data4() {return new SQLCell<float, this>(this, 'data4')}
    get data5() {return new SQLCell<float, this>(this, 'data5')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(map: mediumint, boss: mediumint, index: mediumint, c? : instance_boss_boundaryCreator) : this {
        return this.cloneInternal([map,boss,index],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type instance_boss_boundaryCreator = {
    map?: mediumint,
    boss?: mediumint,
    index?: mediumint,
    unionGroup?: mediumint,
    type?: mediumint,
    inverted?: tinyint,
    data0?: float,
    data1?: float,
    data2?: float,
    data3?: float,
    data4?: float,
    data5?: float,
}

/**
 * Used for object queries (Don't comment these)
 */
export type instance_boss_boundaryQuery = {
    map?: Relation<mediumint>,
    boss?: Relation<mediumint>,
    index?: Relation<mediumint>,
    unionGroup?: Relation<mediumint>,
    type?: Relation<mediumint>,
    inverted?: Relation<tinyint>,
    data0?: Relation<float>,
    data1?: Relation<float>,
    data2?: Relation<float>,
    data3?: Relation<float>,
    data4?: Relation<float>,
    data5?: Relation<float>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class instance_boss_boundaryTable extends SqlTable<
    instance_boss_boundaryCreator,
    instance_boss_boundaryQuery,
    instance_boss_boundaryRow> {
    add(map: mediumint, boss: mediumint, index: mediumint, c? : instance_boss_boundaryCreator) : instance_boss_boundaryRow {
        const first = this.first();
        if(first) return first.clone(map,boss,index,c)
        else return this.rowCreator(this, {}).clone(map,boss,index,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_instance_boss_boundary = new instance_boss_boundaryTable(
    'instance_boss_boundary',
    (table, obj)=>new instance_boss_boundaryRow(table, obj))