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
import { DBCIntArrayCell, DBCIntCell, DBCKeyCell, DBCStringCell } from '../DBCCell'
import { DBCFile } from '../DBCFile'
import { DBCRow } from '../DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class WorldMapOverlayRow extends DBCRow<WorldMapOverlayCreator,WorldMapOverlayQuery> {
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
    get MapAreaID() { return new DBCIntCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get AreaID() { return new DBCIntArrayCell(this,4,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get MapPointX() { return new DBCIntCell(this,this.buffer,this.offset+24)}

    /**
     * No comment (yet!)
     */
    get MapPointY() { return new DBCIntCell(this,this.buffer,this.offset+28)}

    /**
     * No comment (yet!)
     */
    get TextureName() { return new DBCStringCell(this,this.buffer,this.offset+32)}

    /**
     * No comment (yet!)
     */
    get TextureWidth() { return new DBCIntCell(this,this.buffer,this.offset+36)}

    /**
     * No comment (yet!)
     */
    get TextureHeight() { return new DBCIntCell(this,this.buffer,this.offset+40)}

    /**
     * No comment (yet!)
     */
    get OffsetX() { return new DBCIntCell(this,this.buffer,this.offset+44)}

    /**
     * No comment (yet!)
     */
    get OffsetY() { return new DBCIntCell(this,this.buffer,this.offset+48)}

    /**
     * No comment (yet!)
     */
    get HitRectTop() { return new DBCIntCell(this,this.buffer,this.offset+52)}

    /**
     * No comment (yet!)
     */
    get HitRectLeft() { return new DBCIntCell(this,this.buffer,this.offset+56)}

    /**
     * No comment (yet!)
     */
    get HitRectBottom() { return new DBCIntCell(this,this.buffer,this.offset+60)}

    /**
     * No comment (yet!)
     */
    get HitRectRight() { return new DBCIntCell(this,this.buffer,this.offset+64)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : WorldMapOverlayCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type WorldMapOverlayCreator = {
    MapAreaID?: int[]
    AreaID?: int
    MapPointX?: int
    MapPointY?: int
    TextureName?: string
    TextureWidth?: int
    TextureHeight?: int
    OffsetX?: int
    OffsetY?: int
    HitRectTop?: int
    HitRectLeft?: int
    HitRectBottom?: int
    HitRectRight?: int
}

/**
 * Used for queries (Don't comment these)
 */
export type WorldMapOverlayQuery = {
    ID? : Relation<int>
    MapAreaID? : Relation<int>
    AreaID? : Relation<int>
    MapPointX? : Relation<int>
    MapPointY? : Relation<int>
    TextureName? : Relation<string>
    TextureWidth? : Relation<int>
    TextureHeight? : Relation<int>
    OffsetX? : Relation<int>
    OffsetY? : Relation<int>
    HitRectTop? : Relation<int>
    HitRectLeft? : Relation<int>
    HitRectBottom? : Relation<int>
    HitRectRight? : Relation<int>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class WorldMapOverlayDBCFile extends DBCFile<
    WorldMapOverlayCreator,
    WorldMapOverlayQuery,
    WorldMapOverlayRow> {
    constructor() {
        super('WorldMapOverlay',(t,b,o)=>new WorldMapOverlayRow(t,b,o))
    }
    /** Loads a new WorldMapOverlay.dbc from a file. */
    static read(path: string): WorldMapOverlayDBCFile {
        return new WorldMapOverlayDBCFile().read(path);
    }
    add(ID : int, c? : WorldMapOverlayCreator) : WorldMapOverlayRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}