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
import { float, int, loc_constructor } from '../../primitives'
import { Relation } from '../../query/Relations'
import { PrimaryKey } from '../../table/PrimaryKey'
import { DBCFloatCell, DBCIntCell, DBCKeyCell, DBCLocCell } from '../DBCCell'
import { DBCFile } from '../DBCFile'
import { DBCRow } from '../DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class BarberShopStyleRow extends DBCRow<BarberShopStyleCreator,BarberShopStyleQuery> {
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
    get Type() { return new DBCIntCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get DisplayName() { return new DBCLocCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get Description() { return new DBCLocCell(this,this.buffer,this.offset+76)}

    /**
     * No comment (yet!)
     */
    get Cost_Modifier() { return new DBCFloatCell(this,this.buffer,this.offset+144)}

    /**
     * No comment (yet!)
     */
    get Race() { return new DBCIntCell(this,this.buffer,this.offset+148)}

    /**
     * No comment (yet!)
     */
    get Sex() { return new DBCIntCell(this,this.buffer,this.offset+152)}

    /**
     * No comment (yet!)
     */
    get Data() { return new DBCIntCell(this,this.buffer,this.offset+156)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : BarberShopStyleCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type BarberShopStyleCreator = {
    Type?: int
    DisplayName?: loc_constructor
    Description?: loc_constructor
    Cost_Modifier?: float
    Race?: int
    Sex?: int
    Data?: int
}

/**
 * Used for queries (Don't comment these)
 */
export type BarberShopStyleQuery = {
    ID? : Relation<int>
    Type? : Relation<int>
    DisplayName? : Relation<string>
    Description? : Relation<string>
    Cost_Modifier? : Relation<float>
    Race? : Relation<int>
    Sex? : Relation<int>
    Data? : Relation<int>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class BarberShopStyleDBCFile extends DBCFile<
    BarberShopStyleCreator,
    BarberShopStyleQuery,
    BarberShopStyleRow> {
    constructor() {
        super('BarberShopStyle',(t,b,o)=>new BarberShopStyleRow(t,b,o))
    }
    /** Loads a new BarberShopStyle.dbc from a file. */
    static read(path: string): BarberShopStyleDBCFile {
        return new BarberShopStyleDBCFile().read(path);
    }
    add(ID : int, c? : BarberShopStyleCreator) : BarberShopStyleRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}