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
import { DBCFloatCell, DBCIntArrayCell, DBCIntCell, DBCKeyCell, DBCStringCell } from '../../data/dbc/DBCCell'
import { DBCFile } from '../../data/dbc/DBCFile'
import { DBCRow } from '../../data/dbc/DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class GameObjectDisplayInfoRow extends DBCRow<GameObjectDisplayInfoCreator,GameObjectDisplayInfoQuery> {
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
    get ModelName() { return new DBCStringCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get Sound() { return new DBCIntArrayCell(this,10,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get GeoBoxMinX() { return new DBCFloatCell(this,this.buffer,this.offset+48)}

    /**
     * No comment (yet!)
     */
    get GeoBoxMinY() { return new DBCFloatCell(this,this.buffer,this.offset+52)}

    /**
     * No comment (yet!)
     */
    get GeoBoxMinZ() { return new DBCFloatCell(this,this.buffer,this.offset+56)}

    /**
     * No comment (yet!)
     */
    get GeoBoxMaxX() { return new DBCFloatCell(this,this.buffer,this.offset+60)}

    /**
     * No comment (yet!)
     */
    get GeoBoxMaxY() { return new DBCFloatCell(this,this.buffer,this.offset+64)}

    /**
     * No comment (yet!)
     */
    get GeoBoxMaxZ() { return new DBCFloatCell(this,this.buffer,this.offset+68)}

    /**
     * No comment (yet!)
     */
    get ObjectEffectPackageID() { return new DBCIntCell(this,this.buffer,this.offset+72)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : GameObjectDisplayInfoCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type GameObjectDisplayInfoCreator = {
    ModelName?: string
    Sound?: int[]
    GeoBoxMinX?: float
    GeoBoxMinY?: float
    GeoBoxMinZ?: float
    GeoBoxMaxX?: float
    GeoBoxMaxY?: float
    GeoBoxMaxZ?: float
    ObjectEffectPackageID?: int
}

/**
 * Used for queries (Don't comment these)
 */
export type GameObjectDisplayInfoQuery = {
    ID? : Relation<int>
    ModelName? : Relation<string>
    Sound? : Relation<int>
    GeoBoxMinX? : Relation<float>
    GeoBoxMinY? : Relation<float>
    GeoBoxMinZ? : Relation<float>
    GeoBoxMaxX? : Relation<float>
    GeoBoxMaxY? : Relation<float>
    GeoBoxMaxZ? : Relation<float>
    ObjectEffectPackageID? : Relation<int>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class GameObjectDisplayInfoDBCFile extends DBCFile<
    GameObjectDisplayInfoCreator,
    GameObjectDisplayInfoQuery,
    GameObjectDisplayInfoRow> {
    constructor() {
        super('GameObjectDisplayInfo',(t,b,o)=>new GameObjectDisplayInfoRow(t,b,o))
    }
    /** Loads a new GameObjectDisplayInfo.dbc from a file. */
    static read(path: string): GameObjectDisplayInfoDBCFile {
        return new GameObjectDisplayInfoDBCFile().read(path);
    }
    add(ID : int, c? : GameObjectDisplayInfoCreator) : GameObjectDisplayInfoRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}