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
import { mediumint, smallint, tinyint } from '../../primitives'
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
export class creature_onkill_reputationRow extends SqlRow<creature_onkill_reputationCreator,creature_onkill_reputationQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get creature_id() {return new SQLCellReadOnly<mediumint, this>(this, 'creature_id')}

    /**
     * No comment (yet!)
     */
    get RewOnKillRepFaction1() {return new SQLCell<smallint, this>(this, 'RewOnKillRepFaction1')}

    /**
     * No comment (yet!)
     */
    get RewOnKillRepFaction2() {return new SQLCell<smallint, this>(this, 'RewOnKillRepFaction2')}

    /**
     * No comment (yet!)
     */
    get MaxStanding1() {return new SQLCell<tinyint, this>(this, 'MaxStanding1')}

    /**
     * No comment (yet!)
     */
    get IsTeamAward1() {return new SQLCell<tinyint, this>(this, 'IsTeamAward1')}

    /**
     * No comment (yet!)
     */
    get RewOnKillRepValue1() {return new SQLCell<mediumint, this>(this, 'RewOnKillRepValue1')}

    /**
     * No comment (yet!)
     */
    get MaxStanding2() {return new SQLCell<tinyint, this>(this, 'MaxStanding2')}

    /**
     * No comment (yet!)
     */
    get IsTeamAward2() {return new SQLCell<tinyint, this>(this, 'IsTeamAward2')}

    /**
     * No comment (yet!)
     */
    get RewOnKillRepValue2() {return new SQLCell<mediumint, this>(this, 'RewOnKillRepValue2')}

    /**
     * No comment (yet!)
     */
    get TeamDependent() {return new SQLCell<tinyint, this>(this, 'TeamDependent')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(creature_id : mediumint, c? : creature_onkill_reputationCreator) : this {
        return this.cloneInternal([creature_id],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type creature_onkill_reputationCreator = {
    creature_id? : mediumint,
    RewOnKillRepFaction1? : smallint,
    RewOnKillRepFaction2? : smallint,
    MaxStanding1? : tinyint,
    IsTeamAward1? : tinyint,
    RewOnKillRepValue1? : mediumint,
    MaxStanding2? : tinyint,
    IsTeamAward2? : tinyint,
    RewOnKillRepValue2? : mediumint,
    TeamDependent? : tinyint,
}

/**
 * Used for object queries (Don't comment these)
 */
export type creature_onkill_reputationQuery = {
    creature_id? : Relation<mediumint>,
    RewOnKillRepFaction1? : Relation<smallint>,
    RewOnKillRepFaction2? : Relation<smallint>,
    MaxStanding1? : Relation<tinyint>,
    IsTeamAward1? : Relation<tinyint>,
    RewOnKillRepValue1? : Relation<mediumint>,
    MaxStanding2? : Relation<tinyint>,
    IsTeamAward2? : Relation<tinyint>,
    RewOnKillRepValue2? : Relation<mediumint>,
    TeamDependent? : Relation<tinyint>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class creature_onkill_reputationTable extends SqlTable<
    creature_onkill_reputationCreator,
    creature_onkill_reputationQuery,
    creature_onkill_reputationRow> {
    add(creature_id : mediumint, c? : creature_onkill_reputationCreator) : creature_onkill_reputationRow {
        const first = this.first();
        if(first) return first.clone(creature_id,c)
        else return this.rowCreator(this, {}).clone(creature_id,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_creature_onkill_reputation = new creature_onkill_reputationTable(
    'creature_onkill_reputation',
    (table, obj)=>new creature_onkill_reputationRow(table, obj))