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
import { char, int, mediumint, tinyint, varchar } from '../../primitives'
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
export class conditionsRow extends SqlRow<conditionsCreator,conditionsQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get SourceTypeOrReferenceId() {return new SQLCellReadOnly<mediumint, this>(this, 'SourceTypeOrReferenceId')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get SourceGroup() {return new SQLCellReadOnly<mediumint, this>(this, 'SourceGroup')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get SourceEntry() {return new SQLCellReadOnly<mediumint, this>(this, 'SourceEntry')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get SourceId() {return new SQLCellReadOnly<int, this>(this, 'SourceId')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get ElseGroup() {return new SQLCellReadOnly<mediumint, this>(this, 'ElseGroup')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get ConditionTypeOrReference() {return new SQLCellReadOnly<mediumint, this>(this, 'ConditionTypeOrReference')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get ConditionTarget() {return new SQLCellReadOnly<tinyint, this>(this, 'ConditionTarget')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get ConditionValue1() {return new SQLCellReadOnly<mediumint, this>(this, 'ConditionValue1')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get ConditionValue2() {return new SQLCellReadOnly<mediumint, this>(this, 'ConditionValue2')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get ConditionValue3() {return new SQLCellReadOnly<mediumint, this>(this, 'ConditionValue3')}

    /**
     * No comment (yet!)
     */
    get NegativeCondition() {return new SQLCell<tinyint, this>(this, 'NegativeCondition')}

    /**
     * No comment (yet!)
     */
    get ErrorType() {return new SQLCell<mediumint, this>(this, 'ErrorType')}

    /**
     * No comment (yet!)
     */
    get ErrorTextId() {return new SQLCell<mediumint, this>(this, 'ErrorTextId')}

    /**
     * No comment (yet!)
     */
    get ScriptName() {return new SQLCell<char, this>(this, 'ScriptName')}

    /**
     * No comment (yet!)
     */
    get Comment() {return new SQLCell<varchar, this>(this, 'Comment')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(SourceTypeOrReferenceId : mediumint,SourceGroup : mediumint,SourceEntry : mediumint,SourceId : int,ElseGroup : mediumint,ConditionTypeOrReference : mediumint,ConditionTarget : tinyint,ConditionValue1 : mediumint,ConditionValue2 : mediumint,ConditionValue3 : mediumint, c? : conditionsCreator) : this {
        return this.cloneInternal([SourceTypeOrReferenceId,SourceGroup,SourceEntry,SourceId,ElseGroup,ConditionTypeOrReference,ConditionTarget,ConditionValue1,ConditionValue2,ConditionValue3],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type conditionsCreator = {
    SourceTypeOrReferenceId? : mediumint,
    SourceGroup? : mediumint,
    SourceEntry? : mediumint,
    SourceId? : int,
    ElseGroup? : mediumint,
    ConditionTypeOrReference? : mediumint,
    ConditionTarget? : tinyint,
    ConditionValue1? : mediumint,
    ConditionValue2? : mediumint,
    ConditionValue3? : mediumint,
    NegativeCondition? : tinyint,
    ErrorType? : mediumint,
    ErrorTextId? : mediumint,
    ScriptName? : char,
    Comment? : varchar,
}

/**
 * Used for object queries (Don't comment these)
 */
export type conditionsQuery = {
    SourceTypeOrReferenceId? : Relation<mediumint>,
    SourceGroup? : Relation<mediumint>,
    SourceEntry? : Relation<mediumint>,
    SourceId? : Relation<int>,
    ElseGroup? : Relation<mediumint>,
    ConditionTypeOrReference? : Relation<mediumint>,
    ConditionTarget? : Relation<tinyint>,
    ConditionValue1? : Relation<mediumint>,
    ConditionValue2? : Relation<mediumint>,
    ConditionValue3? : Relation<mediumint>,
    NegativeCondition? : Relation<tinyint>,
    ErrorType? : Relation<mediumint>,
    ErrorTextId? : Relation<mediumint>,
    ScriptName? : Relation<char>,
    Comment? : Relation<varchar>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class conditionsTable extends SqlTable<
    conditionsCreator,
    conditionsQuery,
    conditionsRow> {
    add(SourceTypeOrReferenceId : mediumint,SourceGroup : mediumint,SourceEntry : mediumint,SourceId : int,ElseGroup : mediumint,ConditionTypeOrReference : mediumint,ConditionTarget : tinyint,ConditionValue1 : mediumint,ConditionValue2 : mediumint,ConditionValue3 : mediumint, c? : conditionsCreator) : conditionsRow {
        const first = this.first();
        if(first) return first.clone(SourceTypeOrReferenceId,SourceGroup,SourceEntry,SourceId,ElseGroup,ConditionTypeOrReference,ConditionTarget,ConditionValue1,ConditionValue2,ConditionValue3,c)
        else return this.rowCreator(this, {}).clone(SourceTypeOrReferenceId,SourceGroup,SourceEntry,SourceId,ElseGroup,ConditionTypeOrReference,ConditionTarget,ConditionValue1,ConditionValue2,ConditionValue3,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_conditions = new conditionsTable(
    'conditions',
    (table, obj)=>new conditionsRow(table, obj))