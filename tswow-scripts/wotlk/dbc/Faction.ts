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
import { float, int, loc_constructor } from '../../data/primitives'
import { Relation } from '../../data/query/Relations'
import { PrimaryKey } from '../../data/table/PrimaryKey'
import { DBCFloatArrayCell, DBCIntArrayCell, DBCIntCell, DBCKeyCell, DBCLocCell } from '../../data/dbc/DBCCell'
import { DBCFile } from '../../data/dbc/DBCFile'
import { DBCRow } from '../../data/dbc/DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class FactionRow extends DBCRow<FactionCreator,FactionQuery> {
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
    get ReputationIndex() { return new DBCIntCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get ReputationRaceMask() { return new DBCIntArrayCell(this,4,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get ReputationClassMask() { return new DBCIntArrayCell(this,4,this.buffer,this.offset+24)}

    /**
     * No comment (yet!)
     */
    get ReputationBase() { return new DBCIntArrayCell(this,4,this.buffer,this.offset+40)}

    /**
     * No comment (yet!)
     */
    get ReputationFlags() { return new DBCIntArrayCell(this,4,this.buffer,this.offset+56)}

    /**
     * No comment (yet!)
     */
    get ParentFactionID() { return new DBCIntCell(this,this.buffer,this.offset+72)}

    /**
     * No comment (yet!)
     */
    get ParentFactionMod() { return new DBCFloatArrayCell(this,2,this.buffer,this.offset+76)}

    /**
     * No comment (yet!)
     */
    get ParentFactionCap() { return new DBCIntArrayCell(this,2,this.buffer,this.offset+84)}

    /**
     * No comment (yet!)
     */
    get Name() { return new DBCLocCell(this,this.buffer,this.offset+92)}

    /**
     * No comment (yet!)
     */
    get Description() { return new DBCLocCell(this,this.buffer,this.offset+160)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : FactionCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type FactionCreator = {
    ReputationIndex?: int
    ReputationRaceMask?: int[]
    ReputationClassMask?: int[]
    ReputationBase?: int[]
    ReputationFlags?: int[]
    ParentFactionID?: int
    ParentFactionMod?: float[]
    ParentFactionCap?: int[]
    Name?: loc_constructor
    Description?: loc_constructor
}

/**
 * Used for queries (Don't comment these)
 */
export type FactionQuery = {
    ID? : Relation<int>
    ReputationIndex? : Relation<int>
    ReputationRaceMask? : Relation<int>
    ReputationClassMask? : Relation<int>
    ReputationBase? : Relation<int>
    ReputationFlags? : Relation<int>
    ParentFactionID? : Relation<int>
    ParentFactionMod? : Relation<float>
    ParentFactionCap? : Relation<int>
    Name? : Relation<string>
    Description? : Relation<string>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class FactionDBCFile extends DBCFile<
    FactionCreator,
    FactionQuery,
    FactionRow> {
    constructor() {
        super('Faction',(t,b,o)=>new FactionRow(t,b,o))
    }
    /** Loads a new Faction.dbc from a file. */
    static read(path: string): FactionDBCFile {
        return new FactionDBCFile().read(path);
    }
    add(ID : int, c? : FactionCreator) : FactionRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}