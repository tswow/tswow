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
import { mediumint, tinyint } from '../../primitives'
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
export class player_class_rolesRow extends SqlRow<player_class_rolesCreator,player_class_rolesQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get class() {return new SQLCellReadOnly<mediumint, this>(this, 'class')}

    /**
     * No comment (yet!)
     */
    get tank() {return new SQLCell<tinyint, this>(this, 'tank')}

    /**
     * No comment (yet!)
     */
    get healer() {return new SQLCell<tinyint, this>(this, 'healer')}

    /**
     * No comment (yet!)
     */
    get damage() {return new SQLCell<tinyint, this>(this, 'damage')}

    /**
     * No comment (yet!)
     */
    get leader() {return new SQLCell<tinyint, this>(this, 'leader')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(clazz: mediumint, c? : player_class_rolesCreator) : this {
        return this.cloneInternal([clazz],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type player_class_rolesCreator = {
    class?: mediumint
    tank?: tinyint
    damage?: tinyint
    healer?: tinyint
}

/**
 * Used for object queries (Don't comment these)
 */
export type player_class_rolesQuery = {
    class?: Relation<mediumint>,
    tank?: Relation<tinyint>,
    damage?: Relation<tinyint>,
    healer?: Relation<tinyint>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class player_class_rolesTable extends SqlTable<
    player_class_rolesCreator,
    player_class_rolesQuery,
    player_class_rolesRow> {
    add(clazz: tinyint, c? : player_class_rolesCreator) : player_class_rolesRow {
        const first = this.first();
        if(first) return first.clone(clazz,c)
        else return this.rowCreator(this, {}).clone(clazz,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_player_class_roles = new player_class_rolesTable(
    'player_class_roles',
    (table, obj)=>new player_class_rolesRow(table, obj))