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
import { float, int, loc_constructor } from '../../data/primitives'
import { Relation } from '../../data/query/Relations'
import { PrimaryKey } from '../../data/table/PrimaryKey'
import { DBCFloatCell, DBCIntCell, DBCKeyCell, DBCLocCell, DBCStringCell } from '../../data/dbc/DBCCell'
import { DBCFile } from '../../data/dbc/DBCFile'
import { DBCRow } from '../../data/dbc/DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class MapRow extends DBCRow<MapCreator,MapQuery> {
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
    get Directory() { return new DBCStringCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get InstanceType() { return new DBCIntCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get Flags() { return new DBCIntCell(this,this.buffer,this.offset+12)}

    /**
     * No comment (yet!)
     */
    get PVP() { return new DBCIntCell(this,this.buffer,this.offset+16)}

    /**
     * No comment (yet!)
     */
    get MapName() { return new DBCLocCell(this,this.buffer,this.offset+20)}

    /**
     * No comment (yet!)
     */
    get AreaTableID() { return new DBCIntCell(this,this.buffer,this.offset+88)}

    /**
     * No comment (yet!)
     */
    get MapDescription0() { return new DBCLocCell(this,this.buffer,this.offset+92)}

    /**
     * No comment (yet!)
     */
    get MapDescription1() { return new DBCLocCell(this,this.buffer,this.offset+160)}

    /**
     * No comment (yet!)
     */
    get LoadingScreenID() { return new DBCIntCell(this,this.buffer,this.offset+228)}

    /**
     * No comment (yet!)
     */
    get MinimapIconScale() { return new DBCFloatCell(this,this.buffer,this.offset+232)}

    /**
     * No comment (yet!)
     */
    get CorpseMapID() { return new DBCIntCell(this,this.buffer,this.offset+236)}

    /**
     * No comment (yet!)
     */
    get CorpseX() { return new DBCFloatCell(this,this.buffer,this.offset+240)}

    /**
     * No comment (yet!)
     */
    get CorpseY() { return new DBCFloatCell(this,this.buffer,this.offset+244)}

    /**
     * No comment (yet!)
     */
    get TimeOfDayOverride() { return new DBCIntCell(this,this.buffer,this.offset+248)}

    /**
     * No comment (yet!)
     */
    get ExpansionID() { return new DBCIntCell(this,this.buffer,this.offset+252)}

    /**
     * No comment (yet!)
     */
    get RaidOffset() { return new DBCIntCell(this,this.buffer,this.offset+256)}

    /**
     * No comment (yet!)
     */
    get MaxPlayers() { return new DBCIntCell(this,this.buffer,this.offset+260)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : MapCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type MapCreator = {
    Directory?: string
    InstanceType?: int
    Flags?: int
    PVP?: int
    MapName?: loc_constructor
    AreaTableID?: int
    MapDescription0?: loc_constructor
    MapDescription1?: loc_constructor
    LoadingScreenID?: int
    MinimapIconScale?: float
    CorpseMapID?: int
    CorpseX?: float
    CorpseY?: float
    TimeOfDayOverride?: int
    ExpansionID?: int
    RaidOffset?: int
    MaxPlayers?: int
}

/**
 * Used for queries (Don't comment these)
 */
export type MapQuery = {
    ID? : Relation<int>
    Directory? : Relation<string>
    InstanceType? : Relation<int>
    Flags? : Relation<int>
    PVP? : Relation<int>
    MapName? : Relation<string>
    AreaTableID? : Relation<int>
    MapDescription0? : Relation<string>
    MapDescription1? : Relation<string>
    LoadingScreenID? : Relation<int>
    MinimapIconScale? : Relation<float>
    CorpseMapID? : Relation<int>
    CorpseX? : Relation<float>
    CorpseY? : Relation<float>
    TimeOfDayOverride? : Relation<int>
    ExpansionID? : Relation<int>
    RaidOffset? : Relation<int>
    MaxPlayers? : Relation<int>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class MapDBCFile extends DBCFile<
    MapCreator,
    MapQuery,
    MapRow> {
    constructor() {
        super('Map',(t,b,o)=>new MapRow(t,b,o))
    }
    /** Loads a new Map.dbc from a file. */
    static read(path: string): MapDBCFile {
        return new MapDBCFile().read(path);
    }
    add(ID : int, c? : MapCreator) : MapRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}