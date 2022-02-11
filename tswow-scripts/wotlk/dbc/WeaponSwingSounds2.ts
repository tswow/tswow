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
import { int } from '../../data/primitives'
import { Relation } from '../../data/query/Relations'
import { PrimaryKey } from '../../data/table/PrimaryKey'
import { DBCIntCell, DBCKeyCell } from '../../data/dbc/DBCCell'
import { DBCFile } from '../../data/dbc/DBCFile'
import { DBCRow } from '../../data/dbc/DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class WeaponSwingSounds2Row extends DBCRow<WeaponSwingSounds2Creator,WeaponSwingSounds2Query> {
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
    get SwingType() { return new DBCIntCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get Crit() { return new DBCIntCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get SoundID() { return new DBCIntCell(this,this.buffer,this.offset+12)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : WeaponSwingSounds2Creator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type WeaponSwingSounds2Creator = {
    SwingType?: int
    Crit?: int
    SoundID?: int
}

/**
 * Used for queries (Don't comment these)
 */
export type WeaponSwingSounds2Query = {
    ID? : Relation<int>
    SwingType? : Relation<int>
    Crit? : Relation<int>
    SoundID? : Relation<int>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class WeaponSwingSounds2DBCFile extends DBCFile<
    WeaponSwingSounds2Creator,
    WeaponSwingSounds2Query,
    WeaponSwingSounds2Row> {
    constructor() {
        super('WeaponSwingSounds2',(t,b,o)=>new WeaponSwingSounds2Row(t,b,o))
    }
    /** Loads a new WeaponSwingSounds2.dbc from a file. */
    static read(path: string): WeaponSwingSounds2DBCFile {
        return new WeaponSwingSounds2DBCFile().read(path);
    }
    add(ID : int, c? : WeaponSwingSounds2Creator) : WeaponSwingSounds2Row {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}