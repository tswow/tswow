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
import { DBCRow } from '../DBCRow'
import { DBCFile } from '../DBCFile'
import { Relation } from '../../query/Relations'
import { DBCKeyCell , DBCIntCell , DBCStringCell} from '../DBCCell'
import { int} from '../../primitives'
import { PrimaryKey } from '../../table/PrimaryKey'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class DeclinedWordCasesRow extends DBCRow<DeclinedWordCasesCreator,DeclinedWordCasesQuery> {
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
    get DeclinedWordID() { return new DBCIntCell(this,this.buffer,this.offset+4)}
    
    /**
     * No comment (yet!)
     */
    get CaseIndex() { return new DBCIntCell(this,this.buffer,this.offset+8)}
    
    /**
     * No comment (yet!)
     */
    get DeclinedWord() { return new DBCStringCell(this,this.buffer,this.offset+12)}
    
    /**
     * Creates a clone of this row with new primary keys.
     * 
     * Cloned rows are automatically added at the end of the DBC file.
     */ 
    clone(ID : int, c? : DeclinedWordCasesCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type DeclinedWordCasesCreator = {
    DeclinedWordID?: int
    CaseIndex?: int
    DeclinedWord?: string
}

/**
 * Used for queries (Don't comment these)
 */
export type DeclinedWordCasesQuery = {
    ID? : Relation<int>
    DeclinedWordID? : Relation<int>
    CaseIndex? : Relation<int>
    DeclinedWord? : Relation<string>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class DeclinedWordCasesDBCFile extends DBCFile<
    DeclinedWordCasesCreator,
    DeclinedWordCasesQuery,
    DeclinedWordCasesRow> {
    add(ID : int, c? : DeclinedWordCasesCreator) : DeclinedWordCasesRow {
        return this.makeRow(0).clone(ID,c)
    }
}

/**
 * Table singleton (Object used by 'DBC' namespace)
 * - Add file comments to DBCFiles.ts
 */
export const DBC_DeclinedWordCases = new DeclinedWordCasesDBCFile(
    'DeclinedWordCases',
    (table,buffer,offset)=>new DeclinedWordCasesRow(table,buffer,offset))
