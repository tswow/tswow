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
import { tinyint , mediumint , int } from '../../primitives'
import { SqlRow } from '../SQLRow'
import { SqlTable } from '../SQLTable'
import { Relation } from '../../query/Relations'
import { SQLCell, SQLCellReadOnly } from '../SQLCell'
import { PrimaryKey } from '../../table/PrimaryKey'

 /** 
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class game_event_npcflagRow extends SqlRow<game_event_npcflagCreator,game_event_npcflagQuery> {
    /**
     * Primary Key
     * 
     * No comment (yet!)
     */
    @PrimaryKey()
    get eventEntry() {return new SQLCellReadOnly<tinyint, this>(this, 'eventEntry')}
    
    /**
     * Primary Key
     * 
     * No comment (yet!)
     */
    @PrimaryKey()
    get guid() {return new SQLCellReadOnly<mediumint, this>(this, 'guid')}
    
    /**
     * No comment (yet!)
     */
    get npcflag() {return new SQLCell<int, this>(this, 'npcflag')}
    
    /**
     * Creates a clone of this row with new primary keys.
     * 
     * Cloned rows are automatically added to the SQL table.
     */ 
    clone(guid : tinyint,eventEntry : mediumint, c? : game_event_npcflagCreator) : this {
        return this.cloneInternal([guid,eventEntry],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type game_event_npcflagCreator = {
    eventEntry? : tinyint,
    guid? : mediumint,
    npcflag? : int,
}

/**
 * Used for object queries (Don't comment these)
 */
export type game_event_npcflagQuery = {
    eventEntry? : Relation<tinyint>,
    guid? : Relation<mediumint>,
    npcflag? : Relation<int>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class game_event_npcflagTable extends SqlTable<
    game_event_npcflagCreator,
    game_event_npcflagQuery,
    game_event_npcflagRow> {
    add(guid : tinyint,eventEntry : mediumint, c? : game_event_npcflagCreator) : game_event_npcflagRow {
        const first = this.first();
        if(first) return first.clone(guid,eventEntry,c)
        else return this.rowCreator(this, {}).clone(guid,eventEntry,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_game_event_npcflag = new game_event_npcflagTable(
    'game_event_npcflag',
    (table, obj)=>new game_event_npcflagRow(table, obj))