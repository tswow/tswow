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
import { float, int } from '../../data/primitives'
import { Relation } from '../../data/query/Relations'
import { PrimaryKey } from '../../data/table/PrimaryKey'
import { DBCFloatCell, DBCIntCell, DBCKeyCell } from '../../data/dbc/DBCCell'
import { DBCFile } from '../../data/dbc/DBCFile'
import { DBCRow } from '../../data/dbc/DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class LightParamsRow extends DBCRow<LightParamsCreator,LightParamsQuery> {
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
    get HighlightSky() { return new DBCIntCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get LightSkyboxID() { return new DBCIntCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get CloudTypeID() { return new DBCIntCell(this,this.buffer,this.offset+12)}

    /**
     * No comment (yet!)
     */
    get Glow() { return new DBCFloatCell(this,this.buffer,this.offset+16)}

    /**
     * No comment (yet!)
     */
    get WaterShallowAlpha() { return new DBCFloatCell(this,this.buffer,this.offset+20)}

    /**
     * No comment (yet!)
     */
    get WaterDeepAlpha() { return new DBCFloatCell(this,this.buffer,this.offset+24)}

    /**
     * No comment (yet!)
     */
    get OceanShallowAlpha() { return new DBCFloatCell(this,this.buffer,this.offset+28)}

    /**
     * No comment (yet!)
     */
    get OceanDeepAlpha() { return new DBCFloatCell(this,this.buffer,this.offset+32)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : LightParamsCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type LightParamsCreator = {
    HighlightSky?: int
    LightSkyboxID?: int
    CloudTypeID?: int
    Glow?: float
    WaterShallowAlpha?: float
    WaterDeepAlpha?: float
    OceanShallowAlpha?: float
    OceanDeepAlpha?: float
}

/**
 * Used for queries (Don't comment these)
 */
export type LightParamsQuery = {
    ID? : Relation<int>
    HighlightSky? : Relation<int>
    LightSkyboxID? : Relation<int>
    CloudTypeID? : Relation<int>
    Glow? : Relation<float>
    WaterShallowAlpha? : Relation<float>
    WaterDeepAlpha? : Relation<float>
    OceanShallowAlpha? : Relation<float>
    OceanDeepAlpha? : Relation<float>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class LightParamsDBCFile extends DBCFile<
    LightParamsCreator,
    LightParamsQuery,
    LightParamsRow> {
    constructor() {
        super('LightParams',(t,b,o)=>new LightParamsRow(t,b,o))
    }
    /** Loads a new LightParams.dbc from a file. */
    static read(path: string): LightParamsDBCFile {
        return new LightParamsDBCFile().read(path);
    }
    add(ID : int, c? : LightParamsCreator) : LightParamsRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}