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
import { DBCIntArrayCell, DBCIntCell, DBCKeyCell, DBCLocCell, DBCStringCell } from '../DBCCell'
import { DBCFile } from '../DBCFile'
import { DBCRow } from '../DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class WorldStateUIRow extends DBCRow<WorldStateUICreator,WorldStateUIQuery> {
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
    get MapID() { return new DBCIntCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get AreaID() { return new DBCIntCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get PhaseShift() { return new DBCIntCell(this,this.buffer,this.offset+12)}

    /**
     * No comment (yet!)
     */
    get Icon() { return new DBCStringCell(this,this.buffer,this.offset+16)}

    /**
     * No comment (yet!)
     */
    get String() { return new DBCLocCell(this,this.buffer,this.offset+20)}

    /**
     * No comment (yet!)
     */
    get Tooltip() { return new DBCLocCell(this,this.buffer,this.offset+88)}

    /**
     * No comment (yet!)
     */
    get StateVariable() { return new DBCIntCell(this,this.buffer,this.offset+156)}

    /**
     * No comment (yet!)
     */
    get Type() { return new DBCIntCell(this,this.buffer,this.offset+160)}

    /**
     * No comment (yet!)
     */
    get DynamicIcon() { return new DBCStringCell(this,this.buffer,this.offset+164)}

    /**
     * No comment (yet!)
     */
    get DynamicTooltip() { return new DBCLocCell(this,this.buffer,this.offset+168)}

    /**
     * No comment (yet!)
     */
    get ExtendedUI() { return new DBCStringCell(this,this.buffer,this.offset+236)}

    /**
     * No comment (yet!)
     */
    get ExtendedUIStateVariable() { return new DBCIntArrayCell(this,3,this.buffer,this.offset+240)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : WorldStateUICreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type WorldStateUICreator = {
    MapID?: int
    AreaID?: int
    PhaseShift?: int
    Icon?: string
    String?: loc_constructor
    Tooltip?: loc_constructor
    StateVariable?: int
    Type?: int
    DynamicIcon?: string
    DynamicTooltip?: loc_constructor
    ExtendedUI?: string
    ExtendedUIStateVariable?: int[]
}

/**
 * Used for queries (Don't comment these)
 */
export type WorldStateUIQuery = {
    ID? : Relation<int>
    MapID? : Relation<int>
    AreaID? : Relation<int>
    PhaseShift? : Relation<int>
    Icon? : Relation<string>
    String? : Relation<string>
    Tooltip? : Relation<string>
    StateVariable? : Relation<int>
    Type? : Relation<int>
    DynamicIcon? : Relation<string>
    DynamicTooltip? : Relation<string>
    ExtendedUI? : Relation<string>
    ExtendedUIStateVariable? : Relation<int>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class WorldStateUIDBCFile extends DBCFile<
    WorldStateUICreator,
    WorldStateUIQuery,
    WorldStateUIRow> {
    constructor() {
        super('WorldStateUI',(t,b,o)=>new WorldStateUIRow(t,b,o))
    }
    /** Loads a new WorldStateUI.dbc from a file. */
    static read(path: string): WorldStateUIDBCFile {
        return new WorldStateUIDBCFile().read(path);
    }
    add(ID : int, c? : WorldStateUICreator) : WorldStateUIRow {
        return this.makeRow(0).clone(ID,c)
    }
}