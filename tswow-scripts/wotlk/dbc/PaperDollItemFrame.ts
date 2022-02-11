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
import { DBCIntCell, DBCStringCell } from '../../data/dbc/DBCCell'
import { DBCFile } from '../../data/dbc/DBCFile'
import { DBCRow } from '../../data/dbc/DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class PaperDollItemFrameRow extends DBCRow<PaperDollItemFrameCreator,PaperDollItemFrameQuery> {
    /**
     * No comment (yet!)
     */
    get ItemButtonName() { return new DBCStringCell(this,this.buffer,this.offset+0)}

    /**
     * No comment (yet!)
     */
    get SlotIcon() { return new DBCStringCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get SlotNumber() { return new DBCIntCell(this,this.buffer,this.offset+8)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(c?: PaperDollItemFrameCreator) : this {
        return this.cloneInternal([],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type PaperDollItemFrameCreator = {
    ItemButtonName?: string
    SlotIcon?: string
    SlotNumber?: int
}

/**
 * Used for queries (Don't comment these)
 */
export type PaperDollItemFrameQuery = {
    ItemButtonName? : Relation<string>
    SlotIcon? : Relation<string>
    SlotNumber? : Relation<int>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class PaperDollItemFrameDBCFile extends DBCFile<
    PaperDollItemFrameCreator,
    PaperDollItemFrameQuery,
    PaperDollItemFrameRow> {
    constructor() {
        super('PaperDollItemFrame',(t,b,o)=>new PaperDollItemFrameRow(t,b,o))
    }
    /** Loads a new PaperDollItemFrame.dbc from a file. */
    static read(path: string): PaperDollItemFrameDBCFile {
        return new PaperDollItemFrameDBCFile().read(path);
    }
    add(c? : PaperDollItemFrameCreator) : PaperDollItemFrameRow {
        return this.makeRow(0).clone(c)
    }
}