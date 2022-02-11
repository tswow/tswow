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
import { DBCIntArrayCell, DBCIntCell, DBCKeyCell, DBCStringCell } from '../../data/dbc/DBCCell'
import { DBCFile } from '../../data/dbc/DBCFile'
import { DBCRow } from '../../data/dbc/DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class ScreenEffectRow extends DBCRow<ScreenEffectCreator,ScreenEffectQuery> {
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
    get Name() { return new DBCStringCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get Effect() { return new DBCIntCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get Param() { return new DBCIntArrayCell(this,4,this.buffer,this.offset+12)}

    /**
     * No comment (yet!)
     */
    get LightParamsID() { return new DBCIntCell(this,this.buffer,this.offset+28)}

    /**
     * No comment (yet!)
     */
    get SoundAmbienceID() { return new DBCIntCell(this,this.buffer,this.offset+32)}

    /**
     * No comment (yet!)
     */
    get ZoneMusicID() { return new DBCIntCell(this,this.buffer,this.offset+36)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : ScreenEffectCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type ScreenEffectCreator = {
    Name?: string
    Effect?: int
    Param?: int[]
    LightParamsID?: int
    SoundAmbienceID?: int
    ZoneMusicID?: int
}

/**
 * Used for queries (Don't comment these)
 */
export type ScreenEffectQuery = {
    ID? : Relation<int>
    Name? : Relation<string>
    Effect? : Relation<int>
    Param? : Relation<int>
    LightParamsID? : Relation<int>
    SoundAmbienceID? : Relation<int>
    ZoneMusicID? : Relation<int>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class ScreenEffectDBCFile extends DBCFile<
    ScreenEffectCreator,
    ScreenEffectQuery,
    ScreenEffectRow> {
    constructor() {
        super('ScreenEffect',(t,b,o)=>new ScreenEffectRow(t,b,o))
    }
    /** Loads a new ScreenEffect.dbc from a file. */
    static read(path: string): ScreenEffectDBCFile {
        return new ScreenEffectDBCFile().read(path);
    }
    add(ID : int, c? : ScreenEffectCreator) : ScreenEffectRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}