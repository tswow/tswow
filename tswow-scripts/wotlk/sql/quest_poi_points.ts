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
import { int, smallint } from '../../data/primitives'
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
export class quest_poi_pointsRow extends SqlRow<quest_poi_pointsCreator,quest_poi_pointsQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get QuestID() {return new SQLCellReadOnly<int, this>(this, 'QuestID')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get Idx1() {return new SQLCellReadOnly<int, this>(this, 'Idx1')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get Idx2() {return new SQLCellReadOnly<int, this>(this, 'Idx2')}

    /**
     * No comment (yet!)
     */
    get X() {return new SQLCell<int, this>(this, 'X')}

    /**
     * No comment (yet!)
     */
    get Y() {return new SQLCell<int, this>(this, 'Y')}

    /**
     * No comment (yet!)
     */
    get VerifiedBuild() {return new SQLCell<smallint, this>(this, 'VerifiedBuild')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(QuestID : int,Idx1 : int,Idx2 : int, c? : quest_poi_pointsCreator) : this {
        return this.cloneInternal([QuestID,Idx1,Idx2],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type quest_poi_pointsCreator = {
    QuestID? : int,
    Idx1? : int,
    Idx2? : int,
    X? : int,
    Y? : int,
    VerifiedBuild? : smallint,
}

/**
 * Used for object queries (Don't comment these)
 */
export type quest_poi_pointsQuery = {
    QuestID? : Relation<int>,
    Idx1? : Relation<int>,
    Idx2? : Relation<int>,
    X? : Relation<int>,
    Y? : Relation<int>,
    VerifiedBuild? : Relation<smallint>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class quest_poi_pointsTable extends SqlTable<
    quest_poi_pointsCreator,
    quest_poi_pointsQuery,
    quest_poi_pointsRow> {
    add(QuestID : int,Idx1 : int,Idx2 : int, c? : quest_poi_pointsCreator) : quest_poi_pointsRow {
        const first = this.first();
        if(first) return first.clone(QuestID,Idx1,Idx2,c)
        else return this.rowCreator(this, {}).clone(QuestID,Idx1,Idx2,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_quest_poi_points = new quest_poi_pointsTable(
    'quest_poi_points',
    (table, obj)=>new quest_poi_pointsRow(table, obj))