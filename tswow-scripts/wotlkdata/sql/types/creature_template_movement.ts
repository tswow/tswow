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
import { int, tinyint } from '../../primitives'
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
export class creature_template_movementRow extends SqlRow<creature_template_movementCreator,creature_template_movementQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get CreatureId() {return new SQLCellReadOnly<int, this>(this, 'CreatureId')}

    /**
     * No comment (yet!)
     */
    get Ground() {return new SQLCell<tinyint, this>(this, 'Ground')}

    /**
     * No comment (yet!)
     */
    get Swim() {return new SQLCell<tinyint, this>(this, 'Swim')}

    /**
     * No comment (yet!)
     */
    get Flight() {return new SQLCell<tinyint, this>(this, 'Flight')}

    /**
     * No comment (yet!)
     */
    get Rooted() {return new SQLCell<tinyint, this>(this, 'Rooted')}

    /**
     * No comment (yet!)
     */
    get Chase() {return new SQLCell<tinyint, this>(this, 'Chase')}

    /**
     * No comment (yet!)
     */
    get Random() {return new SQLCell<tinyint, this>(this, 'Random')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(CreatureId : int, c? : creature_template_movementCreator) : this {
        return this.cloneInternal([CreatureId],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type creature_template_movementCreator = {
    CreatureId? : int,
    Ground? : tinyint,
    Swim? : tinyint,
    Flight? : tinyint,
    Rooted? : tinyint,
    Chase? : tinyint,
    Random? : tinyint,
}

/**
 * Used for object queries (Don't comment these)
 */
export type creature_template_movementQuery = {
    CreatureId? : Relation<int>,
    Ground? : Relation<tinyint>,
    Swim? : Relation<tinyint>,
    Flight? : Relation<tinyint>,
    Rooted? : Relation<tinyint>,
    Chase? : Relation<tinyint>,
    Random? : Relation<tinyint>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class creature_template_movementTable extends SqlTable<
    creature_template_movementCreator,
    creature_template_movementQuery,
    creature_template_movementRow> {
    add(CreatureId : int, c? : creature_template_movementCreator) : creature_template_movementRow {
        const first = this.first();
        if(first) return first.clone(CreatureId,c)
        else return this.rowCreator(this, {}).clone(CreatureId,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_creature_template_movement = new creature_template_movementTable(
    'creature_template_movement',
    (table, obj)=>new creature_template_movementRow(table, obj))