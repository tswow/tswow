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
import { DBCIntCell, DBCKeyCell, DBCMaskCell } from '../../data/dbc/DBCCell'
import { DBCFile } from '../../data/dbc/DBCFile'
import { DBCRow } from '../../data/dbc/DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class SkillRaceClassInfoRow extends DBCRow<SkillRaceClassInfoCreator,SkillRaceClassInfoQuery> {
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
    get SkillID() { return new DBCIntCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get RaceMask() { return new DBCMaskCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get ClassMask() { return new DBCMaskCell(this,this.buffer,this.offset+12)}

    /**
     * No comment (yet!)
     */
    get Flags() { return new DBCMaskCell(this,this.buffer,this.offset+16)}

    /**
     * No comment (yet!)
     */
    get MinLevel() { return new DBCIntCell(this,this.buffer,this.offset+20)}

    /**
     * No comment (yet!)
     */
    get SkillTierID() { return new DBCIntCell(this,this.buffer,this.offset+24)}

    /**
     * No comment (yet!)
     */
    get SkillCostIndex() { return new DBCIntCell(this,this.buffer,this.offset+28)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : SkillRaceClassInfoCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type SkillRaceClassInfoCreator = {
    SkillID?: int
    RaceMask?: int
    ClassMask?: int
    Flags?: int
    MinLevel?: int
    SkillTierID?: int
    SkillCostIndex?: int
}

/**
 * Used for queries (Don't comment these)
 */
export type SkillRaceClassInfoQuery = {
    ID? : Relation<int>
    SkillID? : Relation<int>
    RaceMask? : Relation<int>
    ClassMask? : Relation<int>
    Flags? : Relation<int>
    MinLevel? : Relation<int>
    SkillTierID? : Relation<int>
    SkillCostIndex? : Relation<int>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class SkillRaceClassInfoDBCFile extends DBCFile<
    SkillRaceClassInfoCreator,
    SkillRaceClassInfoQuery,
    SkillRaceClassInfoRow> {
    constructor() {
        super('SkillRaceClassInfo',(t,b,o)=>new SkillRaceClassInfoRow(t,b,o))
    }
    /** Loads a new SkillRaceClassInfo.dbc from a file. */
    static read(path: string): SkillRaceClassInfoDBCFile {
        return new SkillRaceClassInfoDBCFile().read(path);
    }
    add(ID : int, c? : SkillRaceClassInfoCreator) : SkillRaceClassInfoRow {
        return this.makeRow(0).clone(ID,c)
    }
}