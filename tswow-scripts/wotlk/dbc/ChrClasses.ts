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
import { int, loc_constructor } from '../../data/primitives'
import { Relation } from '../../data/query/Relations'
import { PrimaryKey } from '../../data/table/PrimaryKey'
import { DBCIntCell, DBCKeyCell, DBCLocCell, DBCStringCell } from '../../data/dbc/DBCCell'
import { DBCFile } from '../../data/dbc/DBCFile'
import { DBCRow } from '../../data/dbc/DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class ChrClassesRow extends DBCRow<ChrClassesCreator,ChrClassesQuery> {
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
    get Field01() { return new DBCIntCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get DisplayPower() { return new DBCIntCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get PetNameToken() { return new DBCIntCell(this,this.buffer,this.offset+12)}

    /**
     * No comment (yet!)
     */
    get Name() { return new DBCLocCell(this,this.buffer,this.offset+16)}

    /**
     * No comment (yet!)
     */
    get Name_Female() { return new DBCLocCell(this,this.buffer,this.offset+84)}

    /**
     * No comment (yet!)
     */
    get Name_Male() { return new DBCLocCell(this,this.buffer,this.offset+152)}

    /**
     * No comment (yet!)
     */
    get Filename() { return new DBCStringCell(this,this.buffer,this.offset+220)}

    /**
     * No comment (yet!)
     */
    get SpellClassSet() { return new DBCIntCell(this,this.buffer,this.offset+224)}

    /**
     * No comment (yet!)
     */
    get Flags() { return new DBCIntCell(this,this.buffer,this.offset+228)}

    /**
     * No comment (yet!)
     */
    get CinematicSequenceID() { return new DBCIntCell(this,this.buffer,this.offset+232)}

    /**
     * No comment (yet!)
     */
    get Required_Expansion() { return new DBCIntCell(this,this.buffer,this.offset+236)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : ChrClassesCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type ChrClassesCreator = {
    Field01?: int
    DisplayPower?: int
    PetNameToken?: int
    Name?: loc_constructor
    Name_Female?: loc_constructor
    Name_Male?: loc_constructor
    Filename?: string
    SpellClassSet?: int
    Flags?: int
    CinematicSequenceID?: int
    Required_Expansion?: int
}

/**
 * Used for queries (Don't comment these)
 */
export type ChrClassesQuery = {
    ID? : Relation<int>
    Field01? : Relation<int>
    DisplayPower? : Relation<int>
    PetNameToken? : Relation<int>
    Name? : Relation<string>
    Name_Female? : Relation<string>
    Name_Male? : Relation<string>
    Filename? : Relation<string>
    SpellClassSet? : Relation<int>
    Flags? : Relation<int>
    CinematicSequenceID? : Relation<int>
    Required_Expansion? : Relation<int>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class ChrClassesDBCFile extends DBCFile<
    ChrClassesCreator,
    ChrClassesQuery,
    ChrClassesRow> {
    constructor() {
        super('ChrClasses',(t,b,o)=>new ChrClassesRow(t,b,o))
    }
    /** Loads a new ChrClasses.dbc from a file. */
    static read(path: string): ChrClassesDBCFile {
        return new ChrClassesDBCFile().read(path);
    }
    add(ID : int, c? : ChrClassesCreator) : ChrClassesRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}