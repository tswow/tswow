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
import { int, loc_constructor } from '../../primitives'
import { Relation } from '../../query/Relations'
import { PrimaryKey } from '../../table/PrimaryKey'
import { DBCIntCell, DBCKeyCell, DBCLocCell } from '../DBCCell'
import { DBCFile } from '../DBCFile'
import { DBCRow } from '../DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class GMSurveyAnswersRow extends DBCRow<GMSurveyAnswersCreator,GMSurveyAnswersQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get ID() { return new DBCKeyCell(this,this.buffer,this.offset+0)}

    /**
     * No comment (yet!)
     */
    get Sort_Index() { return new DBCIntCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get GMSurveyQuestionID() { return new DBCIntCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get Answer() { return new DBCLocCell(this,this.buffer,this.offset+12)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : GMSurveyAnswersCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type GMSurveyAnswersCreator = {
    Sort_Index?: int
    GMSurveyQuestionID?: int
    Answer?: loc_constructor
}

/**
 * Used for queries (Don't comment these)
 */
export type GMSurveyAnswersQuery = {
    ID? : Relation<int>
    Sort_Index? : Relation<int>
    GMSurveyQuestionID? : Relation<int>
    Answer? : Relation<string>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class GMSurveyAnswersDBCFile extends DBCFile<
    GMSurveyAnswersCreator,
    GMSurveyAnswersQuery,
    GMSurveyAnswersRow> {
    constructor() {
        super('GMSurveyAnswers',(t,b,o)=>new GMSurveyAnswersRow(t,b,o))
    }
    /** Loads a new GMSurveyAnswers.dbc from a file. */
    static read(path: string): GMSurveyAnswersDBCFile {
        return new GMSurveyAnswersDBCFile().read(path);
    }
    add(ID : int, c? : GMSurveyAnswersCreator) : GMSurveyAnswersRow {
        return this.makeRow(0).clone(ID,c)
    }
}