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
import { int } from '../../primitives'
import { Relation } from '../../query/Relations'
import { PrimaryKey } from '../../table/PrimaryKey'
import { DBCIntArrayCell, DBCKeyCell, DBCStringArrayCell } from '../DBCCell'
import { DBCFile } from '../DBCFile'
import { DBCRow } from '../DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class UnitBloodRow extends DBCRow<UnitBloodCreator,UnitBloodQuery> {
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
    get CombatBloodSpurtFront() { return new DBCIntArrayCell(this,2,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get CombatBloodSpurtBack() { return new DBCIntArrayCell(this,2,this.buffer,this.offset+12)}

    /**
     * No comment (yet!)
     */
    get GroundBlood() { return new DBCStringArrayCell(this,5,this.buffer,this.offset+20)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : UnitBloodCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type UnitBloodCreator = {
    CombatBloodSpurtFront?: int[]
    CombatBloodSpurtBack?: int[]
    GroundBlood?: string[]
}

/**
 * Used for queries (Don't comment these)
 */
export type UnitBloodQuery = {
    ID? : Relation<int>
    CombatBloodSpurtFront? : Relation<int>
    CombatBloodSpurtBack? : Relation<int>
    GroundBlood? : Relation<string>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class UnitBloodDBCFile extends DBCFile<
    UnitBloodCreator,
    UnitBloodQuery,
    UnitBloodRow> {
    constructor() {
        super('UnitBlood',(t,b,o)=>new UnitBloodRow(t,b,o))
    }
    /** Loads a new UnitBlood.dbc from a file. */
    static read(path: string): UnitBloodDBCFile {
        return new UnitBloodDBCFile().read(path);
    }
    add(ID : int, c? : UnitBloodCreator) : UnitBloodRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}