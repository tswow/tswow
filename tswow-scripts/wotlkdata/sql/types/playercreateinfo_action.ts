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
import { int, smallint, tinyint } from '../../primitives'
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
export class playercreateinfo_actionRow extends SqlRow<playercreateinfo_actionCreator,playercreateinfo_actionQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get race() {return new SQLCellReadOnly<tinyint, this>(this, 'race')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get class() {return new SQLCellReadOnly<tinyint, this>(this, 'class')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get button() {return new SQLCellReadOnly<smallint, this>(this, 'button')}

    /**
     * No comment (yet!)
     */
    get action() {return new SQLCell<int, this>(this, 'action')}

    /**
     * No comment (yet!)
     */
    get type() {return new SQLCell<smallint, this>(this, 'type')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(race : tinyint,cls : tinyint,button : smallint, c? : playercreateinfo_actionCreator) : this {
        return this.cloneInternal([race,cls,button],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type playercreateinfo_actionCreator = {
    race? : tinyint,
    class? : tinyint,
    button? : smallint,
    action? : int,
    type? : smallint,
}

/**
 * Used for object queries (Don't comment these)
 */
export type playercreateinfo_actionQuery = {
    race? : Relation<tinyint>,
    class? : Relation<tinyint>,
    button? : Relation<smallint>,
    action? : Relation<int>,
    type? : Relation<smallint>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class playercreateinfo_actionTable extends SqlTable<
    playercreateinfo_actionCreator,
    playercreateinfo_actionQuery,
    playercreateinfo_actionRow> {
    add(race : tinyint,cls : tinyint,button : smallint, c? : playercreateinfo_actionCreator) : playercreateinfo_actionRow {
        const first = this.first();
        if(first) return first.clone(race,cls,button,c)
        else return this.rowCreator(this, {}).clone(race,cls,button,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_playercreateinfo_action = new playercreateinfo_actionTable(
    'playercreateinfo_action',
    (table, obj)=>new playercreateinfo_actionRow(table, obj))