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
import { int, uint } from '../../primitives'
import { Relation } from '../../query/Relations'
import { PrimaryKey } from '../../table/PrimaryKey'
import { DBCKeyCell, DBCMaskCell, DBCUIntArrayCell, DBCUIntCell } from '../DBCCell'
import { DBCFile } from '../DBCFile'
import { DBCRow } from '../DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class SkillLineAbilityRow extends DBCRow<SkillLineAbilityCreator,SkillLineAbilityQuery> {
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
    get SkillLine() { return new DBCUIntCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get Spell() { return new DBCUIntCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get RaceMask() { return new DBCMaskCell(this,this.buffer,this.offset+12)}

    /**
     * No comment (yet!)
     */
    get ClassMask() { return new DBCMaskCell(this,this.buffer,this.offset+16)}

    /**
     * No comment (yet!)
     */
    get RaceMaskForbidden() { return new DBCMaskCell(this,this.buffer,this.offset+20)}

    /**
     * No comment (yet!)
     */
    get ClassMaskForbidden() { return new DBCMaskCell(this,this.buffer,this.offset+24)}

    /**
     * No comment (yet!)
     */
    get MinSkillLineRank() { return new DBCUIntCell(this,this.buffer,this.offset+28)}

    /**
     * No comment (yet!)
     */
    get SupercededBySpell() { return new DBCUIntCell(this,this.buffer,this.offset+32)}

    /**
     * No comment (yet!)
     */
    get AcquireMethod() { return new DBCUIntCell(this,this.buffer,this.offset+36)}

    /**
     * No comment (yet!)
     */
    get TrivialSkillLineRankHigh() { return new DBCUIntCell(this,this.buffer,this.offset+40)}

    /**
     * No comment (yet!)
     */
    get TrivialSkillLineRankLow() { return new DBCUIntCell(this,this.buffer,this.offset+44)}

    /**
     * No comment (yet!)
     */
    get CharacterPoints() { return new DBCUIntArrayCell(this,2,this.buffer,this.offset+48)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : SkillLineAbilityCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type SkillLineAbilityCreator = {
    SkillLine?: uint
    Spell?: uint
    RaceMask?: uint
    ClassMask?: uint
    RaceMaskForbidden?: uint
    ClassMaskForbidden?: uint
    MinSkillLineRank?: uint
    SupercededBySpell?: uint
    AcquireMethod?: uint
    TrivialSkillLineRankHigh?: uint
    TrivialSkillLineRankLow?: uint
    CharacterPoints?: uint[]
}

/**
 * Used for queries (Don't comment these)
 */
export type SkillLineAbilityQuery = {
    ID? : Relation<int>
    SkillLine? : Relation<uint>
    Spell? : Relation<uint>
    RaceMask? : Relation<uint>
    ClassMask? : Relation<uint>
    RaceMaskForbidden? : Relation<uint>
    ClassMaskForbidden? : Relation<uint>
    MinSkillLineRank? : Relation<uint>
    SupercededBySpell? : Relation<uint>
    AcquireMethod? : Relation<uint>
    TrivialSkillLineRankHigh? : Relation<uint>
    TrivialSkillLineRankLow? : Relation<uint>
    CharacterPoints? : Relation<uint>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class SkillLineAbilityDBCFile extends DBCFile<
    SkillLineAbilityCreator,
    SkillLineAbilityQuery,
    SkillLineAbilityRow> {
    constructor() {
        super('SkillLineAbility',(t,b,o)=>new SkillLineAbilityRow(t,b,o))
    }
    /** Loads a new SkillLineAbility.dbc from a file. */
    static read(path: string): SkillLineAbilityDBCFile {
        return new SkillLineAbilityDBCFile().read(path);
    }
    add(ID : int, c? : SkillLineAbilityCreator) : SkillLineAbilityRow {
        return this.makeRow(0).clone(ID,c)
    }
}