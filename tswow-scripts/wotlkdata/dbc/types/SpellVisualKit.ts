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
import { float, int, uint } from '../../primitives'
import { Relation } from '../../query/Relations'
import { PrimaryKey } from '../../table/PrimaryKey'
import { DBCIntArrayCell, DBCIntCell, DBCKeyCell, DBCMultiArrayCell, DBCUIntCell } from '../DBCCell'
import { DBCFile } from '../DBCFile'
import { DBCRow } from '../DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class SpellVisualKitRow extends DBCRow<SpellVisualKitCreator,SpellVisualKitQuery> {
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
    get StartAnimID() { return new DBCIntCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get AnimID() { return new DBCIntCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get HeadEffect() { return new DBCIntCell(this,this.buffer,this.offset+12)}

    /**
     * No comment (yet!)
     */
    get ChestEffect() { return new DBCIntCell(this,this.buffer,this.offset+16)}

    /**
     * No comment (yet!)
     */
    get BaseEffect() { return new DBCIntCell(this,this.buffer,this.offset+20)}

    /**
     * No comment (yet!)
     */
    get LeftHandEffect() { return new DBCIntCell(this,this.buffer,this.offset+24)}

    /**
     * No comment (yet!)
     */
    get RightHandEffect() { return new DBCIntCell(this,this.buffer,this.offset+28)}

    /**
     * No comment (yet!)
     */
    get BreathEffect() { return new DBCIntCell(this,this.buffer,this.offset+32)}

    /**
     * No comment (yet!)
     */
    get LeftWeaponEffect() { return new DBCIntCell(this,this.buffer,this.offset+36)}

    /**
     * No comment (yet!)
     */
    get RightWeaponEffect() { return new DBCIntCell(this,this.buffer,this.offset+40)}

    /**
     * No comment (yet!)
     */
    get SpecialEffect() { return new DBCIntArrayCell(this,3,this.buffer,this.offset+44)}

    /**
     * No comment (yet!)
     */
    get WorldEffect() { return new DBCIntCell(this,this.buffer,this.offset+56)}

    /**
     * No comment (yet!)
     */
    get SoundID() { return new DBCIntCell(this,this.buffer,this.offset+60)}

    /**
     * No comment (yet!)
     */
    get ShakeID() { return new DBCIntCell(this,this.buffer,this.offset+64)}

    /**
     * No comment (yet!)
     */
    get CharProc() { return new DBCIntArrayCell(this,4,this.buffer,this.offset+68)}

    /**
     * No comment (yet!)
     */
    get CharParamZero() { return new DBCMultiArrayCell(this,4,this.buffer,this.offset+84)}

    /**
     * No comment (yet!)
     */
    get CharParamOne() { return new DBCMultiArrayCell(this,4,this.buffer,this.offset+100)}

    /**
     * No comment (yet!)
     */
    get CharParamTwo() { return new DBCMultiArrayCell(this,4,this.buffer,this.offset+116)}

    /**
     * No comment (yet!)
     */
    get CharParamThree() { return new DBCMultiArrayCell(this,4,this.buffer,this.offset+132)}

    /**
     * No comment (yet!)
     */
    get Flags() { return new DBCUIntCell(this,this.buffer,this.offset+148)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : SpellVisualKitCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type SpellVisualKitCreator = {
    StartAnimID?: int
    AnimID?: int
    HeadEffect?: int
    ChestEffect?: int
    BaseEffect?: int
    LeftHandEffect?: int
    RightHandEffect?: int
    BreathEffect?: int
    LeftWeaponEffect?: int
    RightWeaponEffect?: int
    SpecialEffect?: int[]
    WorldEffect?: int
    SoundID?: int
    ShakeID?: int
    CharProc?: int[]
    CharParamZero?: float[]
    CharParamOne?: float[]
    CharParamTwo?: float[]
    CharParamThree?: float[]
    Flags?: uint
}

/**
 * Used for queries (Don't comment these)
 */
export type SpellVisualKitQuery = {
    ID? : Relation<int>
    StartAnimID? : Relation<int>
    AnimID? : Relation<int>
    HeadEffect? : Relation<int>
    ChestEffect? : Relation<int>
    BaseEffect? : Relation<int>
    LeftHandEffect? : Relation<int>
    RightHandEffect? : Relation<int>
    BreathEffect? : Relation<int>
    LeftWeaponEffect? : Relation<int>
    RightWeaponEffect? : Relation<int>
    SpecialEffect? : Relation<int>
    WorldEffect? : Relation<int>
    SoundID? : Relation<int>
    ShakeID? : Relation<int>
    CharProc? : Relation<int>
    CharParamZero? : Relation<float>
    CharParamOne? : Relation<float>
    CharParamTwo? : Relation<float>
    CharParamThree? : Relation<float>
    Flags? : Relation<uint>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class SpellVisualKitDBCFile extends DBCFile<
    SpellVisualKitCreator,
    SpellVisualKitQuery,
    SpellVisualKitRow> {
    constructor() {
        super('SpellVisualKit',(t,b,o)=>new SpellVisualKitRow(t,b,o))
    }
    /** Loads a new SpellVisualKit.dbc from a file. */
    static read(path: string): SpellVisualKitDBCFile {
        return new SpellVisualKitDBCFile().read(path);
    }
    add(ID : int, c? : SpellVisualKitCreator) : SpellVisualKitRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}