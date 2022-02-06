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
import { DBCFloatCell, DBCIntCell, DBCKeyCell, DBCStringCell } from '../DBCCell'
import { DBCFile } from '../DBCFile'
import { DBCRow } from '../DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class ObjectEffectRow extends DBCRow<ObjectEffectCreator,ObjectEffectQuery> {
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
    get ObjectEffectGroupID() { return new DBCIntCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get TriggerType() { return new DBCIntCell(this,this.buffer,this.offset+12)}

    /**
     * No comment (yet!)
     */
    get EventType() { return new DBCIntCell(this,this.buffer,this.offset+16)}

    /**
     * No comment (yet!)
     */
    get EffectRecType() { return new DBCIntCell(this,this.buffer,this.offset+20)}

    /**
     * No comment (yet!)
     */
    get EffectRecID() { return new DBCIntCell(this,this.buffer,this.offset+24)}

    /**
     * No comment (yet!)
     */
    get Attachment() { return new DBCIntCell(this,this.buffer,this.offset+28)}

    /**
     * No comment (yet!)
     */
    get OffsetX() { return new DBCFloatCell(this,this.buffer,this.offset+32)}

    /**
     * No comment (yet!)
     */
    get OffsetY() { return new DBCFloatCell(this,this.buffer,this.offset+36)}

    /**
     * No comment (yet!)
     */
    get OffsetZ() { return new DBCFloatCell(this,this.buffer,this.offset+40)}

    /**
     * No comment (yet!)
     */
    get ObjectEffectModifierID() { return new DBCIntCell(this,this.buffer,this.offset+44)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : ObjectEffectCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type ObjectEffectCreator = {
    Name?: string
    ObjectEffectGroupID?: int
    TriggerType?: int
    EventType?: int
    EffectRecType?: int
    EffectRecID?: int
    Attachment?: int
    OffsetX?: float
    OffsetY?: float
    OffsetZ?: float
    ObjectEffectModifierID?: int
}

/**
 * Used for queries (Don't comment these)
 */
export type ObjectEffectQuery = {
    ID? : Relation<int>
    Name? : Relation<string>
    ObjectEffectGroupID? : Relation<int>
    TriggerType? : Relation<int>
    EventType? : Relation<int>
    EffectRecType? : Relation<int>
    EffectRecID? : Relation<int>
    Attachment? : Relation<int>
    OffsetX? : Relation<float>
    OffsetY? : Relation<float>
    OffsetZ? : Relation<float>
    ObjectEffectModifierID? : Relation<int>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class ObjectEffectDBCFile extends DBCFile<
    ObjectEffectCreator,
    ObjectEffectQuery,
    ObjectEffectRow> {
    constructor() {
        super('ObjectEffect',(t,b,o)=>new ObjectEffectRow(t,b,o))
    }
    /** Loads a new ObjectEffect.dbc from a file. */
    static read(path: string): ObjectEffectDBCFile {
        return new ObjectEffectDBCFile().read(path);
    }
    add(ID : int, c? : ObjectEffectCreator) : ObjectEffectRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}