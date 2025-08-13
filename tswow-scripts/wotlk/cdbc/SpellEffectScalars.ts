/*
 * Copyright (C) 2024 tswow <https://github.com/tswow/>
 * and Duskhaven <https://github.com/orgs/Duskhaven-Reforged>
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
import { int, uint } from '../../data/primitives'
import { Relation } from '../../data/query/Relations'
import { PrimaryKey } from '../../data/table/PrimaryKey'
import { DBCKeyCell, DBCStringCell, DBCUIntCell, DBCFloatCell, DBCIntCell } from '../../data/dbc/DBCCell'
import { CDBCFile } from './CDBCFile'
import { DBCRow } from '../../data/dbc/DBCRow'

/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export class SpellEffectScalarsRow extends DBCRow<SpellEffectScalarsCreator,SpellEffectScalarsQuery> {

    /**
     * Spell id, from to Spell.dbc
     */
    get SpellID() { return new DBCIntCell(this,this.buffer,this.offset+0) }

    /**
     * effect index
     */
    get effectIdx() { return new DBCIntCell(this,this.buffer,this.offset+4) }

    /**
     * float
     */
    get sp() { return new DBCFloatCell(this,this.buffer,this.offset+8) }

    /**
     * float
     */
    get ap() { return new DBCFloatCell(this,this.buffer,this.offset+12) }

    /**
     * float
     */
    get bv() { return new DBCFloatCell(this,this.buffer,this.offset+16) }

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : SpellEffectScalarsCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type SpellEffectScalarsCreator = {
    effectIdx?: int
    sp?: float
    ap?: float
    bv?: float
}

/**
 * Used for queries (Don't comment these)
 */
export type SpellEffectScalarsQuery = {
    SpellID? : Relation<int>
    effectIdx?: Relation<int>
    sp?: Relation<float>
    ap?: Relation<float>
    bv?: Relation<float>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class SpellEffectScalarsCDBCFile extends CDBCFile<
    SpellEffectScalarsCreator,
    SpellEffectScalarsQuery,
    SpellEffectScalarsRow> {
    protected defaultRow = [1, 2, 0, 0.0, 0.0];

    constructor() {
        super('SpellEffectScalars',(t,b,o)=> new SpellEffectScalarsRow(t,b,o))
    }
    /** Loads a new SpellAdditionalCostData.dbc from a file. */
    static read(path: string): SpellEffectScalarsCDBCFile {
        return new SpellEffectScalarsCDBCFile().read(path)
    }
    add(ID : int, c? : SpellEffectScalarsCreator) : SpellEffectScalarsRow {
        return this.makeRow(0).clone(ID,c)
    }
    findByID(id : number) {
        return this.fastSearch(id);
    }
}
