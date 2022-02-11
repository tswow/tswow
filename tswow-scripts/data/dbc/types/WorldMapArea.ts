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
import { float, int } from '../../primitives'
import { Relation } from '../../query/Relations'
import { PrimaryKey } from '../../table/PrimaryKey'
import { DBCFloatCell, DBCIntCell, DBCKeyCell, DBCStringCell } from '../DBCCell'
import { DBCFile } from '../DBCFile'
import { DBCRow } from '../DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class WorldMapAreaRow extends DBCRow<WorldMapAreaCreator,WorldMapAreaQuery> {
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
    get MapID() { return new DBCIntCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get AreaID() { return new DBCIntCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get AreaName() { return new DBCStringCell(this,this.buffer,this.offset+12)}

    /**
     * No comment (yet!)
     */
    get LocLeft() { return new DBCFloatCell(this,this.buffer,this.offset+16)}

    /**
     * No comment (yet!)
     */
    get LocRight() { return new DBCFloatCell(this,this.buffer,this.offset+20)}

    /**
     * No comment (yet!)
     */
    get LocTop() { return new DBCFloatCell(this,this.buffer,this.offset+24)}

    /**
     * No comment (yet!)
     */
    get LocBottom() { return new DBCFloatCell(this,this.buffer,this.offset+28)}

    /**
     * No comment (yet!)
     */
    get DisplayMapID() { return new DBCIntCell(this,this.buffer,this.offset+32)}

    /**
     * No comment (yet!)
     */
    get DefaultDungeonFloor() { return new DBCIntCell(this,this.buffer,this.offset+36)}

    /**
     * No comment (yet!)
     */
    get ParentWorldMapID() { return new DBCIntCell(this,this.buffer,this.offset+40)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : WorldMapAreaCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type WorldMapAreaCreator = {
    MapID?: int
    AreaID?: int
    AreaName?: string
    LocLeft?: float
    LocRight?: float
    LocTop?: float
    LocBottom?: float
    DisplayMapID?: int
    DefaultDungeonFloor?: int
    ParentWorldMapID?: int
}

/**
 * Used for queries (Don't comment these)
 */
export type WorldMapAreaQuery = {
    ID? : Relation<int>
    MapID? : Relation<int>
    AreaID? : Relation<int>
    AreaName? : Relation<string>
    LocLeft? : Relation<float>
    LocRight? : Relation<float>
    LocTop? : Relation<float>
    LocBottom? : Relation<float>
    DisplayMapID? : Relation<int>
    DefaultDungeonFloor? : Relation<int>
    ParentWorldMapID? : Relation<int>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class WorldMapAreaDBCFile extends DBCFile<
    WorldMapAreaCreator,
    WorldMapAreaQuery,
    WorldMapAreaRow> {
    constructor() {
        super('WorldMapArea',(t,b,o)=>new WorldMapAreaRow(t,b,o))
    }
    /** Loads a new WorldMapArea.dbc from a file. */
    static read(path: string): WorldMapAreaDBCFile {
        return new WorldMapAreaDBCFile().read(path);
    }
    add(ID : int, c? : WorldMapAreaCreator) : WorldMapAreaRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}