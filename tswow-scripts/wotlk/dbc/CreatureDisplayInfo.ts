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
import { DBCFloatCell, DBCIntCell, DBCKeyCell, DBCStringArrayCell, DBCStringCell } from '../../data/dbc/DBCCell'
import { DBCFile } from '../../data/dbc/DBCFile'
import { DBCRow } from '../../data/dbc/DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class CreatureDisplayInfoRow extends DBCRow<CreatureDisplayInfoCreator,CreatureDisplayInfoQuery> {
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
    get ModelID() { return new DBCIntCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get SoundID() { return new DBCIntCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get ExtendedDisplayInfoID() { return new DBCIntCell(this,this.buffer,this.offset+12)}

    /**
     * No comment (yet!)
     */
    get CreatureModelScale() { return new DBCFloatCell(this,this.buffer,this.offset+16)}

    /**
     * No comment (yet!)
     */
    get CreatureModelAlpha() { return new DBCIntCell(this,this.buffer,this.offset+20)}

    /**
     * No comment (yet!)
     */
    get TextureVariation() { return new DBCStringArrayCell(this,3,this.buffer,this.offset+24)}

    /**
     * No comment (yet!)
     */
    get PortraitTextureName() { return new DBCStringCell(this,this.buffer,this.offset+36)}

    /**
     * No comment (yet!)
     */
    get BloodLevel() { return new DBCIntCell(this,this.buffer,this.offset+40)}

    /**
     * No comment (yet!)
     */
    get BloodID() { return new DBCIntCell(this,this.buffer,this.offset+44)}

    /**
     * No comment (yet!)
     */
    get NPCSoundID() { return new DBCIntCell(this,this.buffer,this.offset+48)}

    /**
     * No comment (yet!)
     */
    get ParticleColorID() { return new DBCIntCell(this,this.buffer,this.offset+52)}

    /**
     * No comment (yet!)
     */
    get CreatureGeosetData() { return new DBCIntCell(this,this.buffer,this.offset+56)}

    /**
     * No comment (yet!)
     */
    get ObjectEffectPackageID() { return new DBCIntCell(this,this.buffer,this.offset+60)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : CreatureDisplayInfoCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type CreatureDisplayInfoCreator = {
    ModelID?: int
    SoundID?: int
    ExtendedDisplayInfoID?: int
    CreatureModelScale?: float
    CreatureModelAlpha?: int
    TextureVariation?: string[]
    PortraitTextureName?: string
    BloodLevel?: int
    BloodID?: int
    NPCSoundID?: int
    ParticleColorID?: int
    CreatureGeosetData?: int
    ObjectEffectPackageID?: int
}

/**
 * Used for queries (Don't comment these)
 */
export type CreatureDisplayInfoQuery = {
    ID? : Relation<int>
    ModelID? : Relation<int>
    SoundID? : Relation<int>
    ExtendedDisplayInfoID? : Relation<int>
    CreatureModelScale? : Relation<float>
    CreatureModelAlpha? : Relation<int>
    TextureVariation? : Relation<string>
    PortraitTextureName? : Relation<string>
    BloodLevel? : Relation<int>
    BloodID? : Relation<int>
    NPCSoundID? : Relation<int>
    ParticleColorID? : Relation<int>
    CreatureGeosetData? : Relation<int>
    ObjectEffectPackageID? : Relation<int>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class CreatureDisplayInfoDBCFile extends DBCFile<
    CreatureDisplayInfoCreator,
    CreatureDisplayInfoQuery,
    CreatureDisplayInfoRow> {
    constructor() {
        super('CreatureDisplayInfo',(t,b,o)=>new CreatureDisplayInfoRow(t,b,o))
    }
    /** Loads a new CreatureDisplayInfo.dbc from a file. */
    static read(path: string): CreatureDisplayInfoDBCFile {
        return new CreatureDisplayInfoDBCFile().read(path);
    }
    add(ID : int, c? : CreatureDisplayInfoCreator) : CreatureDisplayInfoRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}