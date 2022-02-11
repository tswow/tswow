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
import { DBCIntArrayCell, DBCIntCell, DBCKeyCell, DBCStringArrayCell } from '../../data/dbc/DBCCell'
import { DBCFile } from '../../data/dbc/DBCFile'
import { DBCRow } from '../../data/dbc/DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class ItemDisplayInfoRow extends DBCRow<ItemDisplayInfoCreator,ItemDisplayInfoQuery> {
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
    get ModelName() { return new DBCStringArrayCell(this,2,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get ModelTexture() { return new DBCStringArrayCell(this,2,this.buffer,this.offset+12)}

    /**
     * No comment (yet!)
     */
    get InventoryIcon() { return new DBCStringArrayCell(this,2,this.buffer,this.offset+20)}

    /**
     * No comment (yet!)
     */
    get GeosetGroup() { return new DBCIntArrayCell(this,3,this.buffer,this.offset+28)}

    /**
     * No comment (yet!)
     */
    get Flags() { return new DBCIntCell(this,this.buffer,this.offset+40)}

    /**
     * No comment (yet!)
     */
    get SpellVisualID() { return new DBCIntCell(this,this.buffer,this.offset+44)}

    /**
     * No comment (yet!)
     */
    get GroupSoundIndex() { return new DBCIntCell(this,this.buffer,this.offset+48)}

    /**
     * No comment (yet!)
     */
    get HelmetGeosetVis() { return new DBCIntArrayCell(this,2,this.buffer,this.offset+52)}

    /**
     * No comment (yet!)
     */
    get Texture() { return new DBCStringArrayCell(this,8,this.buffer,this.offset+60)}

    /**
     * No comment (yet!)
     */
    get ItemVisual() { return new DBCIntCell(this,this.buffer,this.offset+92)}

    /**
     * No comment (yet!)
     */
    get ParticleColorID() { return new DBCIntCell(this,this.buffer,this.offset+96)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : ItemDisplayInfoCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type ItemDisplayInfoCreator = {
    ModelName?: string[]
    ModelTexture?: string[][]
    InventoryIcon?: string[]
    GeosetGroup?: int[]
    Flags?: int
    SpellVisualID?: int
    GroupSoundIndex?: int
    HelmetGeosetVis?: int[]
    Texture?: string
    ItemVisual?: int
    ParticleColorID?: int
}

/**
 * Used for queries (Don't comment these)
 */
export type ItemDisplayInfoQuery = {
    ID? : Relation<int>
    ModelName? : Relation<string>
    ModelTexture? : Relation<string>
    InventoryIcon? : Relation<string>
    GeosetGroup? : Relation<int>
    Flags? : Relation<int>
    SpellVisualID? : Relation<int>
    GroupSoundIndex? : Relation<int>
    HelmetGeosetVis? : Relation<int>
    Texture? : Relation<string>
    ItemVisual? : Relation<int>
    ParticleColorID? : Relation<int>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class ItemDisplayInfoDBCFile extends DBCFile<
    ItemDisplayInfoCreator,
    ItemDisplayInfoQuery,
    ItemDisplayInfoRow> {
    constructor() {
        super('ItemDisplayInfo',(t,b,o)=>new ItemDisplayInfoRow(t,b,o))
    }
    /** Loads a new ItemDisplayInfo.dbc from a file. */
    static read(path: string): ItemDisplayInfoDBCFile {
        return new ItemDisplayInfoDBCFile().read(path);
    }
    add(ID : int, c? : ItemDisplayInfoCreator) : ItemDisplayInfoRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}