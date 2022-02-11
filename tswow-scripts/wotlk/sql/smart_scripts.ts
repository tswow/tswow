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
import { float, int, smallint, text, tinyint } from '../../data/primitives'
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
export class smart_scriptsRow extends SqlRow<smart_scriptsCreator,smart_scriptsQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get entryorguid() {return new SQLCellReadOnly<int, this>(this, 'entryorguid')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get source_type() {return new SQLCellReadOnly<tinyint, this>(this, 'source_type')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get id() {return new SQLCellReadOnly<smallint, this>(this, 'id')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get link() {return new SQLCellReadOnly<smallint, this>(this, 'link')}

    /**
     * No comment (yet!)
     */
    get event_type() {return new SQLCell<tinyint, this>(this, 'event_type')}

    /**
     * No comment (yet!)
     */
    get event_phase_mask() {return new SQLCell<smallint, this>(this, 'event_phase_mask')}

    /**
     * No comment (yet!)
     */
    get event_chance() {return new SQLCell<tinyint, this>(this, 'event_chance')}

    /**
     * No comment (yet!)
     */
    get event_flags() {return new SQLCell<smallint, this>(this, 'event_flags')}

    /**
     * No comment (yet!)
     */
    get event_param1() {return new SQLCell<int, this>(this, 'event_param1')}

    /**
     * No comment (yet!)
     */
    get event_param2() {return new SQLCell<int, this>(this, 'event_param2')}

    /**
     * No comment (yet!)
     */
    get event_param3() {return new SQLCell<int, this>(this, 'event_param3')}

    /**
     * No comment (yet!)
     */
    get event_param4() {return new SQLCell<int, this>(this, 'event_param4')}

    /**
     * No comment (yet!)
     */
    get event_param5() {return new SQLCell<int, this>(this, 'event_param5')}

    /**
     * No comment (yet!)
     */
    get action_type() {return new SQLCell<tinyint, this>(this, 'action_type')}

    /**
     * No comment (yet!)
     */
    get action_param1() {return new SQLCell<int, this>(this, 'action_param1')}

    /**
     * No comment (yet!)
     */
    get action_param2() {return new SQLCell<int, this>(this, 'action_param2')}

    /**
     * No comment (yet!)
     */
    get action_param3() {return new SQLCell<int, this>(this, 'action_param3')}

    /**
     * No comment (yet!)
     */
    get action_param4() {return new SQLCell<int, this>(this, 'action_param4')}

    /**
     * No comment (yet!)
     */
    get action_param5() {return new SQLCell<int, this>(this, 'action_param5')}

    /**
     * No comment (yet!)
     */
    get action_param6() {return new SQLCell<int, this>(this, 'action_param6')}

    /**
     * No comment (yet!)
     */
    get target_type() {return new SQLCell<tinyint, this>(this, 'target_type')}

    /**
     * No comment (yet!)
     */
    get target_param1() {return new SQLCell<int, this>(this, 'target_param1')}

    /**
     * No comment (yet!)
     */
    get target_param2() {return new SQLCell<int, this>(this, 'target_param2')}

    /**
     * No comment (yet!)
     */
    get target_param3() {return new SQLCell<int, this>(this, 'target_param3')}

    /**
     * No comment (yet!)
     */
    get target_param4() {return new SQLCell<int, this>(this, 'target_param4')}

    /**
     * No comment (yet!)
     */
    get target_x() {return new SQLCell<float, this>(this, 'target_x')}

    /**
     * No comment (yet!)
     */
    get target_y() {return new SQLCell<float, this>(this, 'target_y')}

    /**
     * No comment (yet!)
     */
    get target_z() {return new SQLCell<float, this>(this, 'target_z')}

    /**
     * No comment (yet!)
     */
    get target_o() {return new SQLCell<float, this>(this, 'target_o')}

    /**
     * No comment (yet!)
     */
    get comment() {return new SQLCell<text, this>(this, 'comment')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(entryorguid : int,source_type : tinyint,id : smallint,link : smallint, c? : smart_scriptsCreator) : this {
        return this.cloneInternal([entryorguid,source_type,id,link],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type smart_scriptsCreator = {
    entryorguid? : int,
    source_type? : tinyint,
    id? : smallint,
    link? : smallint,
    event_type? : tinyint,
    event_phase_mask? : smallint,
    event_chance? : tinyint,
    event_flags? : smallint,
    event_param1? : int,
    event_param2? : int,
    event_param3? : int,
    event_param4? : int,
    event_param5? : int,
    action_type? : tinyint,
    action_param1? : int,
    action_param2? : int,
    action_param3? : int,
    action_param4? : int,
    action_param5? : int,
    action_param6? : int,
    target_type? : tinyint,
    target_param1? : int,
    target_param2? : int,
    target_param3? : int,
    target_param4? : int,
    target_x? : float,
    target_y? : float,
    target_z? : float,
    target_o? : float,
    comment? : text,
}

/**
 * Used for object queries (Don't comment these)
 */
export type smart_scriptsQuery = {
    entryorguid? : Relation<int>,
    source_type? : Relation<tinyint>,
    id? : Relation<smallint>,
    link? : Relation<smallint>,
    event_type? : Relation<tinyint>,
    event_phase_mask? : Relation<smallint>,
    event_chance? : Relation<tinyint>,
    event_flags? : Relation<smallint>,
    event_param1? : Relation<int>,
    event_param2? : Relation<int>,
    event_param3? : Relation<int>,
    event_param4? : Relation<int>,
    event_param5? : Relation<int>,
    action_type? : Relation<tinyint>,
    action_param1? : Relation<int>,
    action_param2? : Relation<int>,
    action_param3? : Relation<int>,
    action_param4? : Relation<int>,
    action_param5? : Relation<int>,
    action_param6? : Relation<int>,
    target_type? : Relation<tinyint>,
    target_param1? : Relation<int>,
    target_param2? : Relation<int>,
    target_param3? : Relation<int>,
    target_param4? : Relation<int>,
    target_x? : Relation<float>,
    target_y? : Relation<float>,
    target_z? : Relation<float>,
    target_o? : Relation<float>,
    comment? : Relation<text>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class smart_scriptsTable extends SqlTable<
    smart_scriptsCreator,
    smart_scriptsQuery,
    smart_scriptsRow> {
    add(entryorguid : int,source_type : tinyint,id : smallint,link : smallint, c? : smart_scriptsCreator) : smart_scriptsRow {
        const first = this.first();
        if(first) return first.clone(entryorguid,source_type,id,link,c)
        else return this.rowCreator(this, {}).clone(entryorguid,source_type,id,link,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_smart_scripts = new smart_scriptsTable(
    'smart_scripts',
    (table, obj)=>new smart_scriptsRow(table, obj))