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
import { DBCIntCell, DBCKeyCell } from '../DBCCell'
import { DBCFile } from '../DBCFile'
import { DBCRow } from '../DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class DestructibleModelDataRow extends DBCRow<DestructibleModelDataCreator,DestructibleModelDataQuery> {
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
    get State0Wmo() { return new DBCIntCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get State0DestructionDoodadSet() { return new DBCIntCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get State0ImpactEffectDoodadSet() { return new DBCIntCell(this,this.buffer,this.offset+12)}

    /**
     * No comment (yet!)
     */
    get State0AmbientDoodadSet() { return new DBCIntCell(this,this.buffer,this.offset+16)}

    /**
     * No comment (yet!)
     */
    get State1Wmo() { return new DBCIntCell(this,this.buffer,this.offset+20)}

    /**
     * No comment (yet!)
     */
    get State1DestructionDoodadSet() { return new DBCIntCell(this,this.buffer,this.offset+24)}

    /**
     * No comment (yet!)
     */
    get State1ImpactEffectDoodadSet() { return new DBCIntCell(this,this.buffer,this.offset+28)}

    /**
     * No comment (yet!)
     */
    get State1AmbientDoodadSet() { return new DBCIntCell(this,this.buffer,this.offset+32)}

    /**
     * No comment (yet!)
     */
    get State2Wmo() { return new DBCIntCell(this,this.buffer,this.offset+36)}

    /**
     * No comment (yet!)
     */
    get State2DestructionDoodadSet() { return new DBCIntCell(this,this.buffer,this.offset+40)}

    /**
     * No comment (yet!)
     */
    get State2ImpactEffectDoodadSet() { return new DBCIntCell(this,this.buffer,this.offset+44)}

    /**
     * No comment (yet!)
     */
    get State2AmbientDoodadSet() { return new DBCIntCell(this,this.buffer,this.offset+48)}

    /**
     * No comment (yet!)
     */
    get State3Wmo() { return new DBCIntCell(this,this.buffer,this.offset+52)}

    /**
     * No comment (yet!)
     */
    get State3DestructionDoodadSet() { return new DBCIntCell(this,this.buffer,this.offset+56)}

    /**
     * No comment (yet!)
     */
    get State3ImpactEffectDoodadSet() { return new DBCIntCell(this,this.buffer,this.offset+60)}

    /**
     * No comment (yet!)
     */
    get State3AmbientDoodadSet() { return new DBCIntCell(this,this.buffer,this.offset+64)}

    /**
     * No comment (yet!)
     */
    get Field17() { return new DBCIntCell(this,this.buffer,this.offset+68)}

    /**
     * No comment (yet!)
     */
    get Field18() { return new DBCIntCell(this,this.buffer,this.offset+72)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : DestructibleModelDataCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type DestructibleModelDataCreator = {
    State0Wmo?: int
    State0DestructionDoodadSet?: int
    State0ImpactEffectDoodadSet?: int
    State0AmbientDoodadSet?: int
    State1Wmo?: int
    State1DestructionDoodadSet?: int
    State1ImpactEffectDoodadSet?: int
    State1AmbientDoodadSet?: int
    State2Wmo?: int
    State2DestructionDoodadSet?: int
    State2ImpactEffectDoodadSet?: int
    State2AmbientDoodadSet?: int
    State3Wmo?: int
    State3DestructionDoodadSet?: int
    State3ImpactEffectDoodadSet?: int
    State3AmbientDoodadSet?: int
    Field17?: int
    Field18?: int
}

/**
 * Used for queries (Don't comment these)
 */
export type DestructibleModelDataQuery = {
    ID? : Relation<int>
    State0Wmo? : Relation<int>
    State0DestructionDoodadSet? : Relation<int>
    State0ImpactEffectDoodadSet? : Relation<int>
    State0AmbientDoodadSet? : Relation<int>
    State1Wmo? : Relation<int>
    State1DestructionDoodadSet? : Relation<int>
    State1ImpactEffectDoodadSet? : Relation<int>
    State1AmbientDoodadSet? : Relation<int>
    State2Wmo? : Relation<int>
    State2DestructionDoodadSet? : Relation<int>
    State2ImpactEffectDoodadSet? : Relation<int>
    State2AmbientDoodadSet? : Relation<int>
    State3Wmo? : Relation<int>
    State3DestructionDoodadSet? : Relation<int>
    State3ImpactEffectDoodadSet? : Relation<int>
    State3AmbientDoodadSet? : Relation<int>
    Field17? : Relation<int>
    Field18? : Relation<int>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class DestructibleModelDataDBCFile extends DBCFile<
    DestructibleModelDataCreator,
    DestructibleModelDataQuery,
    DestructibleModelDataRow> {
    constructor() {
        super('DestructibleModelData',(t,b,o)=>new DestructibleModelDataRow(t,b,o))
    }
    /** Loads a new DestructibleModelData.dbc from a file. */
    static read(path: string): DestructibleModelDataDBCFile {
        return new DestructibleModelDataDBCFile().read(path);
    }
    add(ID : int, c? : DestructibleModelDataCreator) : DestructibleModelDataRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}