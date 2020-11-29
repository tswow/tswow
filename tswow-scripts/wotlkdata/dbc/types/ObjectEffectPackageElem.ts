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
import { DBCKeyCell , DBCIntCell} from '../DBCCell'
import { int} from '../../primitives'
import { PrimaryKey } from '../../table/PrimaryKey'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class ObjectEffectPackageElemRow extends DBCRow<ObjectEffectPackageElemCreator,ObjectEffectPackageElemQuery> {
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
    get ObjectEffectPackageID() { return new DBCIntCell(this,this.buffer,this.offset+4)}
    
    /**
     * No comment (yet!)
     */
    get ObjectEffectGroupID() { return new DBCIntCell(this,this.buffer,this.offset+8)}
    
    /**
     * No comment (yet!)
     */
    get StateType() { return new DBCIntCell(this,this.buffer,this.offset+12)}
    
    /**
     * Creates a clone of this row with new primary keys.
     * 
     * Cloned rows are automatically added at the end of the DBC file.
     */ 
    clone(ID : int, c? : ObjectEffectPackageElemCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type ObjectEffectPackageElemCreator = {
    ObjectEffectPackageID?: int
    ObjectEffectGroupID?: int
    StateType?: int
}

/**
 * Used for queries (Don't comment these)
 */
export type ObjectEffectPackageElemQuery = {
    ID? : Relation<int>
    ObjectEffectPackageID? : Relation<int>
    ObjectEffectGroupID? : Relation<int>
    StateType? : Relation<int>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class ObjectEffectPackageElemDBCFile extends DBCFile<
    ObjectEffectPackageElemCreator,
    ObjectEffectPackageElemQuery,
    ObjectEffectPackageElemRow> {
    add(ID : int, c? : ObjectEffectPackageElemCreator) : ObjectEffectPackageElemRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}

/**
 * Table singleton (Object used by 'DBC' namespace)
 * - Add file comments to DBCFiles.ts
 */
export const DBC_ObjectEffectPackageElem = new ObjectEffectPackageElemDBCFile(
    'ObjectEffectPackageElem',
    (table,buffer,offset)=>new ObjectEffectPackageElemRow(table,buffer,offset))
