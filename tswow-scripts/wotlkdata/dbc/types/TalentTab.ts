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
import { int, loc_constructor } from '../../primitives'
import { Relation } from '../../query/Relations'
import { PrimaryKey } from '../../table/PrimaryKey'
import { DBCIntCell, DBCKeyCell, DBCLocCell, DBCStringCell } from '../DBCCell'
import { DBCFile } from '../DBCFile'
import { DBCRow } from '../DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class TalentTabRow extends DBCRow<TalentTabCreator,TalentTabQuery> {
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
    get Name() { return new DBCLocCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get SpellIconID() { return new DBCIntCell(this,this.buffer,this.offset+72)}

    /**
     * No comment (yet!)
     */
    get RaceMask() { return new DBCIntCell(this,this.buffer,this.offset+76)}

    /**
     * No comment (yet!)
     */
    get ClassMask() { return new DBCIntCell(this,this.buffer,this.offset+80)}

    /**
     * No comment (yet!)
     */
    get PetTalentMask() { return new DBCIntCell(this,this.buffer,this.offset+84)}

    /**
     * No comment (yet!)
     */
    get OrderIndex() { return new DBCIntCell(this,this.buffer,this.offset+88)}

    /**
     * No comment (yet!)
     */
    get BackgroundFile() { return new DBCStringCell(this,this.buffer,this.offset+92)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : TalentTabCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type TalentTabCreator = {
    Name?: loc_constructor
    SpellIconID?: int
    RaceMask?: int
    ClassMask?: int
    PetTalentMask?: int
    OrderIndex?: int
    BackgroundFile?: string
}

/**
 * Used for queries (Don't comment these)
 */
export type TalentTabQuery = {
    ID? : Relation<int>
    Name? : Relation<string>
    SpellIconID? : Relation<int>
    RaceMask? : Relation<int>
    ClassMask? : Relation<int>
    PetTalentMask? : Relation<int>
    OrderIndex? : Relation<int>
    BackgroundFile? : Relation<string>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class TalentTabDBCFile extends DBCFile<
    TalentTabCreator,
    TalentTabQuery,
    TalentTabRow> {
    constructor() {
        super('TalentTab',(t,b,o)=>new TalentTabRow(t,b,o))
    }
    /** Loads a new TalentTab.dbc from a file. */
    static read(path: string): TalentTabDBCFile {
        return new TalentTabDBCFile().read(path);
    }
    add(ID : int, c? : TalentTabCreator) : TalentTabRow {
        return this.makeRow(0).clone(ID,c)
    }
}