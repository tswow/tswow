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
import { DBCIntArrayCell, DBCIntCell, DBCKeyCell } from '../../data/dbc/DBCCell'
import { DBCFile } from '../../data/dbc/DBCFile'
import { DBCRow } from '../../data/dbc/DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class TalentRow extends DBCRow<TalentCreator,TalentQuery> {
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
    get TabID() { return new DBCIntCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get TierID() { return new DBCIntCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get ColumnIndex() { return new DBCIntCell(this,this.buffer,this.offset+12)}

    /**
     * No comment (yet!)
     */
    get SpellRank() { return new DBCIntArrayCell(this,9,this.buffer,this.offset+16)}

    /**
     * No comment (yet!)
     */
    get PrereqTalent() { return new DBCIntArrayCell(this,3,this.buffer,this.offset+52)}

    /**
     * No comment (yet!)
     */
    get PrereqRank() { return new DBCIntArrayCell(this,3,this.buffer,this.offset+64)}

    /**
     * No comment (yet!)
     */
    get Flags() { return new DBCIntCell(this,this.buffer,this.offset+76)}

    /**
     * No comment (yet!)
     */
    get RequiredSpellID() { return new DBCIntCell(this,this.buffer,this.offset+80)}

    /**
     * No comment (yet!)
     */
    get CategoryMask() { return new DBCIntArrayCell(this,2,this.buffer,this.offset+84)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : TalentCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type TalentCreator = {
    TabID?: int
    TierID?: int
    ColumnIndex?: int
    SpellRank?: int[]
    PrereqTalent?: int[]
    PrereqRank?: int[]
    Flags?: int
    RequiredSpellID?: int
    CategoryMask?: int[]
}

/**
 * Used for queries (Don't comment these)
 */
export type TalentQuery = {
    ID? : Relation<int>
    TabID? : Relation<int>
    TierID? : Relation<int>
    ColumnIndex? : Relation<int>
    SpellRank? : Relation<int>
    PrereqTalent? : Relation<int>
    PrereqRank? : Relation<int>
    Flags? : Relation<int>
    RequiredSpellID? : Relation<int>
    CategoryMask? : Relation<int>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class TalentDBCFile extends DBCFile<
    TalentCreator,
    TalentQuery,
    TalentRow> {
    constructor() {
        super('Talent',(t,b,o)=>new TalentRow(t,b,o))
    }
    /** Loads a new Talent.dbc from a file. */
    static read(path: string): TalentDBCFile {
        return new TalentDBCFile().read(path);
    }
    add(ID : int, c? : TalentCreator) : TalentRow {
        return this.makeRow(0).clone(ID,c)
    }
}