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
import { int, mediumint, varchar } from '../../primitives'
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
export class playercreateinfo_spell_customRow extends SqlRow<playercreateinfo_spell_customCreator,playercreateinfo_spell_customQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get racemask() {return new SQLCellReadOnly<int, this>(this, 'racemask')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get classmask() {return new SQLCellReadOnly<int, this>(this, 'classmask')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get Spell() {return new SQLCellReadOnly<mediumint, this>(this, 'Spell')}

    /**
     * No comment (yet!)
     */
    get Note() {return new SQLCell<varchar, this>(this, 'Note')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(racemask : int,clsmask : int,Spell : mediumint, c? : playercreateinfo_spell_customCreator) : this {
        return this.cloneInternal([racemask,clsmask,Spell],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type playercreateinfo_spell_customCreator = {
    racemask? : int,
    classmask? : int,
    Spell? : mediumint,
    Note? : varchar,
}

/**
 * Used for object queries (Don't comment these)
 */
export type playercreateinfo_spell_customQuery = {
    racemask? : Relation<int>,
    classmask? : Relation<int>,
    Spell? : Relation<mediumint>,
    Note? : Relation<varchar>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class playercreateinfo_spell_customTable extends SqlTable<
    playercreateinfo_spell_customCreator,
    playercreateinfo_spell_customQuery,
    playercreateinfo_spell_customRow> {
    add(racemask : int,clsmask : int,Spell : mediumint, c? : playercreateinfo_spell_customCreator) : playercreateinfo_spell_customRow {
        const first = this.first();
        if(first) return first.clone(racemask,clsmask,Spell,c)
        else return this.rowCreator(this, {}).clone(racemask,clsmask,Spell,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_playercreateinfo_spell_custom = new playercreateinfo_spell_customTable(
    'playercreateinfo_spell_custom',
    (table, obj)=>new playercreateinfo_spell_customRow(table, obj))