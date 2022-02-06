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
import { DBCFloatArrayCell, DBCFloatCell, DBCIntArrayCell, DBCIntCell, DBCKeyCell, DBCStringArrayCell, DBCStringCell } from '../DBCCell'
import { DBCFile } from '../DBCFile'
import { DBCRow } from '../DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class LiquidTypeRow extends DBCRow<LiquidTypeCreator,LiquidTypeQuery> {
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
    get Flags() { return new DBCIntCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get Type() { return new DBCIntCell(this,this.buffer,this.offset+12)}

    /**
     * No comment (yet!)
     */
    get SoundID() { return new DBCIntCell(this,this.buffer,this.offset+16)}

    /**
     * No comment (yet!)
     */
    get SpellID() { return new DBCIntCell(this,this.buffer,this.offset+20)}

    /**
     * No comment (yet!)
     */
    get MaxDarkenDepth() { return new DBCFloatCell(this,this.buffer,this.offset+24)}

    /**
     * No comment (yet!)
     */
    get FogDarkenintensity() { return new DBCFloatCell(this,this.buffer,this.offset+28)}

    /**
     * No comment (yet!)
     */
    get AmbDarkenintensity() { return new DBCFloatCell(this,this.buffer,this.offset+32)}

    /**
     * No comment (yet!)
     */
    get DirDarkenintensity() { return new DBCFloatCell(this,this.buffer,this.offset+36)}

    /**
     * No comment (yet!)
     */
    get LightID() { return new DBCIntCell(this,this.buffer,this.offset+40)}

    /**
     * No comment (yet!)
     */
    get ParticleScale() { return new DBCFloatCell(this,this.buffer,this.offset+44)}

    /**
     * No comment (yet!)
     */
    get ParticleMovement() { return new DBCIntCell(this,this.buffer,this.offset+48)}

    /**
     * No comment (yet!)
     */
    get ParticleTexSlots() { return new DBCIntCell(this,this.buffer,this.offset+52)}

    /**
     * No comment (yet!)
     */
    get MaterialID() { return new DBCIntCell(this,this.buffer,this.offset+56)}

    /**
     * No comment (yet!)
     */
    get Texture() { return new DBCStringArrayCell(this,6,this.buffer,this.offset+60)}

    /**
     * No comment (yet!)
     */
    get Color() { return new DBCIntArrayCell(this,2,this.buffer,this.offset+84)}

    /**
     * No comment (yet!)
     */
    get Float() { return new DBCFloatArrayCell(this,18,this.buffer,this.offset+92)}

    /**
     * No comment (yet!)
     */
    get Int() { return new DBCIntArrayCell(this,4,this.buffer,this.offset+164)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : LiquidTypeCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type LiquidTypeCreator = {
    Name?: string
    Flags?: int
    Type?: int
    SoundID?: int
    SpellID?: int
    MaxDarkenDepth?: float
    FogDarkenintensity?: float
    AmbDarkenintensity?: float
    DirDarkenintensity?: float
    LightID?: int
    ParticleScale?: float
    ParticleMovement?: int
    ParticleTexSlots?: int
    MaterialID?: int
    Texture?: string[]
    Color?: int[]
    Float?: float[]
    Int?: int[]
}

/**
 * Used for queries (Don't comment these)
 */
export type LiquidTypeQuery = {
    ID? : Relation<int>
    Name? : Relation<string>
    Flags? : Relation<int>
    Type? : Relation<int>
    SoundID? : Relation<int>
    SpellID? : Relation<int>
    MaxDarkenDepth? : Relation<float>
    FogDarkenintensity? : Relation<float>
    AmbDarkenintensity? : Relation<float>
    DirDarkenintensity? : Relation<float>
    LightID? : Relation<int>
    ParticleScale? : Relation<float>
    ParticleMovement? : Relation<int>
    ParticleTexSlots? : Relation<int>
    MaterialID? : Relation<int>
    Texture? : Relation<string>
    Color? : Relation<int>
    Float? : Relation<float>
    Int? : Relation<int>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class LiquidTypeDBCFile extends DBCFile<
    LiquidTypeCreator,
    LiquidTypeQuery,
    LiquidTypeRow> {
    constructor() {
        super('LiquidType',(t,b,o)=>new LiquidTypeRow(t,b,o))
    }
    /** Loads a new LiquidType.dbc from a file. */
    static read(path: string): LiquidTypeDBCFile {
        return new LiquidTypeDBCFile().read(path);
    }
    add(ID : int, c? : LiquidTypeCreator) : LiquidTypeRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}