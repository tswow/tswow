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
import { float, mediumint, smallint, text } from '../../data/primitives'
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
export class points_of_interestRow extends SqlRow<points_of_interestCreator,points_of_interestQuery> {
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
    get PositionX() {return new SQLCell<float, this>(this, 'PositionX')}

    /**
     * No comment (yet!)
     */
    get PositionY() {return new SQLCell<float, this>(this, 'PositionY')}

    /**
     * No comment (yet!)
     */
    get Icon() {return new SQLCell<mediumint, this>(this, 'Icon')}

    /**
     * No comment (yet!)
     */
    get Flags() {return new SQLCell<mediumint, this>(this, 'Flags')}

    /**
     * No comment (yet!)
     */
    get Importance() {return new SQLCell<mediumint, this>(this, 'Importance')}

    /**
     * No comment (yet!)
     */
    get Name() {return new SQLCell<text, this>(this, 'Name')}

    /**
     * No comment (yet!)
     */
    get VerifiedBuild() {return new SQLCell<smallint, this>(this, 'VerifiedBuild')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(ID : mediumint, c? : points_of_interestCreator) : this {
        return this.cloneInternal([ID],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type points_of_interestCreator = {
    ID? : mediumint,
    PositionX? : float,
    PositionY? : float,
    Icon? : mediumint,
    Flags? : mediumint,
    Importance? : mediumint,
    Name? : text,
    VerifiedBuild? : smallint,
}

/**
 * Used for object queries (Don't comment these)
 */
export type points_of_interestQuery = {
    ID? : Relation<mediumint>,
    PositionX? : Relation<float>,
    PositionY? : Relation<float>,
    Icon? : Relation<mediumint>,
    Flags? : Relation<mediumint>,
    Importance? : Relation<mediumint>,
    Name? : Relation<text>,
    VerifiedBuild? : Relation<smallint>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class points_of_interestTable extends SqlTable<
    points_of_interestCreator,
    points_of_interestQuery,
    points_of_interestRow> {
    add(ID : mediumint, c? : points_of_interestCreator) : points_of_interestRow {
        const first = this.first();
        if(first) return first.clone(ID,c)
        else return this.rowCreator(this, {}).clone(ID,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_points_of_interest = new points_of_interestTable(
    'points_of_interest',
    (table, obj)=>new points_of_interestRow(table, obj))