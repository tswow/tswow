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
export class CreatureDisplayInfoExtraRow extends DBCRow<CreatureDisplayInfoExtraCreator,CreatureDisplayInfoExtraQuery> {
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
    get DisplayRaceID() { return new DBCIntCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get DisplaySexID() { return new DBCIntCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get SkinID() { return new DBCIntCell(this,this.buffer,this.offset+12)}

    /**
     * No comment (yet!)
     */
    get FaceID() { return new DBCIntCell(this,this.buffer,this.offset+16)}

    /**
     * No comment (yet!)
     */
    get HairStyleID() { return new DBCIntCell(this,this.buffer,this.offset+20)}

    /**
     * No comment (yet!)
     */
    get HairColorID() { return new DBCIntCell(this,this.buffer,this.offset+24)}

    /**
     * No comment (yet!)
     */
    get FacialHairID() { return new DBCIntCell(this,this.buffer,this.offset+28)}

    /**
     * No comment (yet!)
     */
    get NPCItemDisplay() { return new DBCIntArrayCell(this,11,this.buffer,this.offset+32)}

    /**
     * No comment (yet!)
     */
    get Flags() { return new DBCIntCell(this,this.buffer,this.offset+76)}

    /**
     * No comment (yet!)
     */
    get BakeName() { return new DBCStringCell(this,this.buffer,this.offset+80)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : CreatureDisplayInfoExtraCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type CreatureDisplayInfoExtraCreator = {
    DisplayRaceID?: int
    DisplaySexID?: int
    SkinID?: int
    FaceID?: int
    HairStyleID?: int
    HairColorID?: int
    FacialHairID?: int
    NPCItemDisplay?: int[]
    Flags?: int
    BakeName?: string
}

/**
 * Used for queries (Don't comment these)
 */
export type CreatureDisplayInfoExtraQuery = {
    ID? : Relation<int>
    DisplayRaceID? : Relation<int>
    DisplaySexID? : Relation<int>
    SkinID? : Relation<int>
    FaceID? : Relation<int>
    HairStyleID? : Relation<int>
    HairColorID? : Relation<int>
    FacialHairID? : Relation<int>
    NPCItemDisplay? : Relation<int>
    Flags? : Relation<int>
    BakeName? : Relation<string>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class CreatureDisplayInfoExtraDBCFile extends DBCFile<
    CreatureDisplayInfoExtraCreator,
    CreatureDisplayInfoExtraQuery,
    CreatureDisplayInfoExtraRow> {
    constructor() {
        super('CreatureDisplayInfoExtra',(t,b,o)=>new CreatureDisplayInfoExtraRow(t,b,o))
    }
    /** Loads a new CreatureDisplayInfoExtra.dbc from a file. */
    static read(path: string): CreatureDisplayInfoExtraDBCFile {
        return new CreatureDisplayInfoExtraDBCFile().read(path);
    }
    add(ID : int, c? : CreatureDisplayInfoExtraCreator) : CreatureDisplayInfoExtraRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}