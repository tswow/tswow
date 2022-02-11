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
import { float, int } from '../../data/primitives'
import { Relation } from '../../data/query/Relations'
import { PrimaryKey } from '../../data/table/PrimaryKey'
import { DBCFloatCell, DBCKeyCell, DBCStringCell } from '../../data/dbc/DBCCell'
import { DBCFile } from '../../data/dbc/DBCFile'
import { DBCRow } from '../../data/dbc/DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class SpellVisualEffectNameRow extends DBCRow<SpellVisualEffectNameCreator,SpellVisualEffectNameQuery> {
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
    get FileName() { return new DBCStringCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get AreaEffectSize() { return new DBCFloatCell(this,this.buffer,this.offset+12)}

    /**
     * No comment (yet!)
     */
    get Scale() { return new DBCFloatCell(this,this.buffer,this.offset+16)}

    /**
     * No comment (yet!)
     */
    get MinAllowedScale() { return new DBCFloatCell(this,this.buffer,this.offset+20)}

    /**
     * No comment (yet!)
     */
    get MaxAllowedScale() { return new DBCFloatCell(this,this.buffer,this.offset+24)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : SpellVisualEffectNameCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type SpellVisualEffectNameCreator = {
    Name?: string
    FileName?: string
    AreaEffectSize?: float
    Scale?: float
    MinAllowedScale?: float
    MaxAllowedScale?: float
}

/**
 * Used for queries (Don't comment these)
 */
export type SpellVisualEffectNameQuery = {
    ID? : Relation<int>
    Name? : Relation<string>
    FileName? : Relation<string>
    AreaEffectSize? : Relation<float>
    Scale? : Relation<float>
    MinAllowedScale? : Relation<float>
    MaxAllowedScale? : Relation<float>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class SpellVisualEffectNameDBCFile extends DBCFile<
    SpellVisualEffectNameCreator,
    SpellVisualEffectNameQuery,
    SpellVisualEffectNameRow> {
    constructor() {
        super('SpellVisualEffectName',(t,b,o)=>new SpellVisualEffectNameRow(t,b,o))
    }
    /** Loads a new SpellVisualEffectName.dbc from a file. */
    static read(path: string): SpellVisualEffectNameDBCFile {
        return new SpellVisualEffectNameDBCFile().read(path);
    }
    add(ID : int, c? : SpellVisualEffectNameCreator) : SpellVisualEffectNameRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}