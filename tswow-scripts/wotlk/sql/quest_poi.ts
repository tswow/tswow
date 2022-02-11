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
export class quest_poiRow extends SqlRow<quest_poiCreator,quest_poiQuery> {
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
    get id() {return new SQLCellReadOnly<int, this>(this, 'id')}

    /**
     * No comment (yet!)
     */
    get ObjectiveIndex() {return new SQLCell<int, this>(this, 'ObjectiveIndex')}

    /**
     * No comment (yet!)
     */
    get MapID() {return new SQLCell<int, this>(this, 'MapID')}

    /**
     * No comment (yet!)
     */
    get WorldMapAreaId() {return new SQLCell<int, this>(this, 'WorldMapAreaId')}

    /**
     * No comment (yet!)
     */
    get Floor() {return new SQLCell<int, this>(this, 'Floor')}

    /**
     * No comment (yet!)
     */
    get Priority() {return new SQLCell<int, this>(this, 'Priority')}

    /**
     * No comment (yet!)
     */
    get Flags() {return new SQLCell<int, this>(this, 'Flags')}

    /**
     * No comment (yet!)
     */
    get VerifiedBuild() {return new SQLCell<smallint, this>(this, 'VerifiedBuild')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(QuestID : int,id : int, c? : quest_poiCreator) : this {
        return this.cloneInternal([QuestID,id],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type quest_poiCreator = {
    QuestID? : int,
    id? : int,
    ObjectiveIndex? : int,
    MapID? : int,
    WorldMapAreaId? : int,
    Floor? : int,
    Priority? : int,
    Flags? : int,
    VerifiedBuild? : smallint,
}

/**
 * Used for object queries (Don't comment these)
 */
export type quest_poiQuery = {
    QuestID? : Relation<int>,
    id? : Relation<int>,
    ObjectiveIndex? : Relation<int>,
    MapID? : Relation<int>,
    WorldMapAreaId? : Relation<int>,
    Floor? : Relation<int>,
    Priority? : Relation<int>,
    Flags? : Relation<int>,
    VerifiedBuild? : Relation<smallint>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class quest_poiTable extends SqlTable<
    quest_poiCreator,
    quest_poiQuery,
    quest_poiRow> {
    add(QuestID : int,id : int, c? : quest_poiCreator) : quest_poiRow {
        const first = this.first();
        if(first) return first.clone(QuestID,id,c)
        else return this.rowCreator(this, {}).clone(QuestID,id,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_quest_poi = new quest_poiTable(
    'quest_poi',
    (table, obj)=>new quest_poiRow(table, obj))