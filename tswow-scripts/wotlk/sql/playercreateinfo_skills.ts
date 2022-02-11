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
import { int, smallint, varchar } from '../../data/primitives'
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
export class playercreateinfo_skillsRow extends SqlRow<playercreateinfo_skillsCreator,playercreateinfo_skillsQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get raceMask() {return new SQLCellReadOnly<int, this>(this, 'raceMask')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get classMask() {return new SQLCellReadOnly<int, this>(this, 'classMask')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get skill() {return new SQLCellReadOnly<smallint, this>(this, 'skill')}

    /**
     * No comment (yet!)
     */
    get rank() {return new SQLCell<smallint, this>(this, 'rank')}

    /**
     * No comment (yet!)
     */
    get comment() {return new SQLCell<varchar, this>(this, 'comment')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(raceMask : int,clsMask : int,skill : smallint, c? : playercreateinfo_skillsCreator) : this {
        return this.cloneInternal([raceMask,clsMask,skill],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type playercreateinfo_skillsCreator = {
    raceMask? : int,
    classMask? : int,
    skill? : smallint,
    rank? : smallint,
    comment? : varchar,
}

/**
 * Used for object queries (Don't comment these)
 */
export type playercreateinfo_skillsQuery = {
    raceMask? : Relation<int>,
    classMask? : Relation<int>,
    skill? : Relation<smallint>,
    rank? : Relation<smallint>,
    comment? : Relation<varchar>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class playercreateinfo_skillsTable extends SqlTable<
    playercreateinfo_skillsCreator,
    playercreateinfo_skillsQuery,
    playercreateinfo_skillsRow> {
    add(raceMask : int,clsMask : int,skill : smallint, c? : playercreateinfo_skillsCreator) : playercreateinfo_skillsRow {
        const first = this.first();
        if(first) return first.clone(raceMask,clsMask,skill,c)
        else return this.rowCreator(this, {}).clone(raceMask,clsMask,skill,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_playercreateinfo_skills = new playercreateinfo_skillsTable(
    'playercreateinfo_skills',
    (table, obj)=>new playercreateinfo_skillsRow(table, obj))