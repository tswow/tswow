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
export class LfgDungeonsRow extends DBCRow<LfgDungeonsCreator,LfgDungeonsQuery> {
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
    get MinLevel() { return new DBCIntCell(this,this.buffer,this.offset+72)}

    /**
     * No comment (yet!)
     */
    get MaxLevel() { return new DBCIntCell(this,this.buffer,this.offset+76)}

    /**
     * No comment (yet!)
     */
    get Target_Level() { return new DBCIntCell(this,this.buffer,this.offset+80)}

    /**
     * No comment (yet!)
     */
    get Target_Level_Min() { return new DBCIntCell(this,this.buffer,this.offset+84)}

    /**
     * No comment (yet!)
     */
    get Target_Level_Max() { return new DBCIntCell(this,this.buffer,this.offset+88)}

    /**
     * No comment (yet!)
     */
    get MapID() { return new DBCIntCell(this,this.buffer,this.offset+92)}

    /**
     * No comment (yet!)
     */
    get Difficulty() { return new DBCIntCell(this,this.buffer,this.offset+96)}

    /**
     * No comment (yet!)
     */
    get Flags() { return new DBCIntCell(this,this.buffer,this.offset+100)}

    /**
     * No comment (yet!)
     */
    get TypeID() { return new DBCIntCell(this,this.buffer,this.offset+104)}

    /**
     * No comment (yet!)
     */
    get Faction() { return new DBCIntCell(this,this.buffer,this.offset+108)}

    /**
     * No comment (yet!)
     */
    get TextureFilename() { return new DBCStringCell(this,this.buffer,this.offset+112)}

    /**
     * No comment (yet!)
     */
    get ExpansionLevel() { return new DBCIntCell(this,this.buffer,this.offset+116)}

    /**
     * No comment (yet!)
     */
    get Order_Index() { return new DBCIntCell(this,this.buffer,this.offset+120)}

    /**
     * No comment (yet!)
     */
    get Group_Id() { return new DBCIntCell(this,this.buffer,this.offset+124)}

    /**
     * No comment (yet!)
     */
    get Description() { return new DBCLocCell(this,this.buffer,this.offset+128)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : LfgDungeonsCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type LfgDungeonsCreator = {
    Name?: loc_constructor
    MinLevel?: int
    MaxLevel?: int
    Target_Level?: int
    Target_Level_Min?: int
    Target_Level_Max?: int
    MapID?: int
    Difficulty?: int
    Flags?: int
    TypeID?: int
    Faction?: int
    TextureFilename?: string
    ExpansionLevel?: int
    Order_Index?: int
    Group_Id?: int
    Description?: loc_constructor
}

/**
 * Used for queries (Don't comment these)
 */
export type LfgDungeonsQuery = {
    ID? : Relation<int>
    Name? : Relation<string>
    MinLevel? : Relation<int>
    MaxLevel? : Relation<int>
    Target_Level? : Relation<int>
    Target_Level_Min? : Relation<int>
    Target_Level_Max? : Relation<int>
    MapID? : Relation<int>
    Difficulty? : Relation<int>
    Flags? : Relation<int>
    TypeID? : Relation<int>
    Faction? : Relation<int>
    TextureFilename? : Relation<string>
    ExpansionLevel? : Relation<int>
    Order_Index? : Relation<int>
    Group_Id? : Relation<int>
    Description? : Relation<string>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class LfgDungeonsDBCFile extends DBCFile<
    LfgDungeonsCreator,
    LfgDungeonsQuery,
    LfgDungeonsRow> {
    constructor() {
        super('LfgDungeons',(t,b,o)=>new LfgDungeonsRow(t,b,o))
    }
    /** Loads a new LfgDungeons.dbc from a file. */
    static read(path: string): LfgDungeonsDBCFile {
        return new LfgDungeonsDBCFile().read(path);
    }
    add(ID : int, c? : LfgDungeonsCreator) : LfgDungeonsRow {
        return this.makeRow(0).clone(ID,c)
    }
}