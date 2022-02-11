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
import { char, float, mediumint, smallint, tinyint } from '../../data/primitives'
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
export class battleground_templateRow extends SqlRow<battleground_templateCreator,battleground_templateQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get ID() {return new SQLCellReadOnly<mediumint, this>(this, 'ID')}

    /**
     * No comment (yet!)
     */
    get MinPlayersPerTeam() {return new SQLCell<smallint, this>(this, 'MinPlayersPerTeam')}

    /**
     * No comment (yet!)
     */
    get MaxPlayersPerTeam() {return new SQLCell<smallint, this>(this, 'MaxPlayersPerTeam')}

    /**
     * No comment (yet!)
     */
    get MinLvl() {return new SQLCell<tinyint, this>(this, 'MinLvl')}

    /**
     * No comment (yet!)
     */
    get MaxLvl() {return new SQLCell<tinyint, this>(this, 'MaxLvl')}

    /**
     * No comment (yet!)
     */
    get AllianceStartLoc() {return new SQLCell<mediumint, this>(this, 'AllianceStartLoc')}

    /**
     * No comment (yet!)
     */
    get AllianceStartO() {return new SQLCell<float, this>(this, 'AllianceStartO')}

    /**
     * No comment (yet!)
     */
    get HordeStartLoc() {return new SQLCell<mediumint, this>(this, 'HordeStartLoc')}

    /**
     * No comment (yet!)
     */
    get HordeStartO() {return new SQLCell<float, this>(this, 'HordeStartO')}

    /**
     * No comment (yet!)
     */
    get StartMaxDist() {return new SQLCell<float, this>(this, 'StartMaxDist')}

    /**
     * No comment (yet!)
     */
    get Weight() {return new SQLCell<tinyint, this>(this, 'Weight')}

    /**
     * No comment (yet!)
     */
    get ScriptName() {return new SQLCell<char, this>(this, 'ScriptName')}

    /**
     * No comment (yet!)
     */
    get Comment() {return new SQLCell<char, this>(this, 'Comment')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(ID : mediumint, c? : battleground_templateCreator) : this {
        return this.cloneInternal([ID],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type battleground_templateCreator = {
    ID? : mediumint,
    MinPlayersPerTeam? : smallint,
    MaxPlayersPerTeam? : smallint,
    MinLvl? : tinyint,
    MaxLvl? : tinyint,
    AllianceStartLoc? : mediumint,
    AllianceStartO? : float,
    HordeStartLoc? : mediumint,
    HordeStartO? : float,
    StartMaxDist? : float,
    Weight? : tinyint,
    ScriptName? : char,
    Comment? : char,
}

/**
 * Used for object queries (Don't comment these)
 */
export type battleground_templateQuery = {
    ID? : Relation<mediumint>,
    MinPlayersPerTeam? : Relation<smallint>,
    MaxPlayersPerTeam? : Relation<smallint>,
    MinLvl? : Relation<tinyint>,
    MaxLvl? : Relation<tinyint>,
    AllianceStartLoc? : Relation<mediumint>,
    AllianceStartO? : Relation<float>,
    HordeStartLoc? : Relation<mediumint>,
    HordeStartO? : Relation<float>,
    StartMaxDist? : Relation<float>,
    Weight? : Relation<tinyint>,
    ScriptName? : Relation<char>,
    Comment? : Relation<char>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class battleground_templateTable extends SqlTable<
    battleground_templateCreator,
    battleground_templateQuery,
    battleground_templateRow> {
    add(ID : mediumint, c? : battleground_templateCreator) : battleground_templateRow {
        const first = this.first();
        if(first) return first.clone(ID,c)
        else return this.rowCreator(this, {}).clone(ID,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_battleground_template = new battleground_templateTable(
    'battleground_template',
    (table, obj)=>new battleground_templateRow(table, obj))