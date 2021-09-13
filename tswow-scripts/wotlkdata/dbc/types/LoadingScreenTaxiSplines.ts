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
import { DBCKeyCell , DBCIntCell , DBCFloatArrayCell} from '../DBCCell'
import { int , float} from '../../primitives'
import { PrimaryKey } from '../../table/PrimaryKey'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class LoadingScreenTaxiSplinesRow extends DBCRow<LoadingScreenTaxiSplinesCreator,LoadingScreenTaxiSplinesQuery> {
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
    get PathID() { return new DBCIntCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get Locx() { return new DBCFloatArrayCell(this,8,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get Locy() { return new DBCFloatArrayCell(this,8,this.buffer,this.offset+40)}

    /**
     * No comment (yet!)
     */
    get LegIndex() { return new DBCIntCell(this,this.buffer,this.offset+72)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : LoadingScreenTaxiSplinesCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type LoadingScreenTaxiSplinesCreator = {
    PathID?: int
    Locx?: float
    Locy?: float
    LegIndex?: int
}

/**
 * Used for queries (Don't comment these)
 */
export type LoadingScreenTaxiSplinesQuery = {
    ID? : Relation<int>
    PathID? : Relation<int>
    Locx? : Relation<float>
    Locy? : Relation<float>
    LegIndex? : Relation<int>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class LoadingScreenTaxiSplinesDBCFile extends DBCFile<
    LoadingScreenTaxiSplinesCreator,
    LoadingScreenTaxiSplinesQuery,
    LoadingScreenTaxiSplinesRow> {
    add(ID : int, c? : LoadingScreenTaxiSplinesCreator) : LoadingScreenTaxiSplinesRow {
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
export const DBC_LoadingScreenTaxiSplines = new LoadingScreenTaxiSplinesDBCFile(
    'LoadingScreenTaxiSplines',
    (table,buffer,offset)=>new LoadingScreenTaxiSplinesRow(table,buffer,offset))
