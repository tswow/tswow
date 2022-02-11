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
export class creature_default_trainerRow extends SqlRow<creature_default_trainerCreator,creature_default_trainerQuery> {
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
    get TrainerId() {return new SQLCell<int, this>(this, 'TrainerId')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(CreatureId : int, c? : creature_default_trainerCreator) : this {
        return this.cloneInternal([CreatureId],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type creature_default_trainerCreator = {
    CreatureId? : int,
    TrainerId? : int,
}

/**
 * Used for object queries (Don't comment these)
 */
export type creature_default_trainerQuery = {
    CreatureId? : Relation<int>,
    TrainerId? : Relation<int>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class creature_default_trainerTable extends SqlTable<
    creature_default_trainerCreator,
    creature_default_trainerQuery,
    creature_default_trainerRow> {
    add(CreatureId : int, c? : creature_default_trainerCreator) : creature_default_trainerRow {
        const first = this.first();
        if(first) return first.clone(CreatureId,c)
        else return this.rowCreator(this, {}).clone(CreatureId,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_creature_default_trainer = new creature_default_trainerTable(
    'creature_default_trainer',
    (table, obj)=>new creature_default_trainerRow(table, obj))