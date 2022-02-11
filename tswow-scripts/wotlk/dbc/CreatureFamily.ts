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
import { DBCFloatCell, DBCIntArrayCell, DBCIntCell, DBCKeyCell, DBCLocCell, DBCStringCell } from '../../data/dbc/DBCCell'
import { DBCFile } from '../../data/dbc/DBCFile'
import { DBCRow } from '../../data/dbc/DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class CreatureFamilyRow extends DBCRow<CreatureFamilyCreator,CreatureFamilyQuery> {
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
    get MinScale() { return new DBCFloatCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get MinScaleLevel() { return new DBCIntCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get MaxScale() { return new DBCFloatCell(this,this.buffer,this.offset+12)}

    /**
     * No comment (yet!)
     */
    get MaxScaleLevel() { return new DBCIntCell(this,this.buffer,this.offset+16)}

    /**
     * No comment (yet!)
     */
    get SkillLine() { return new DBCIntArrayCell(this,2,this.buffer,this.offset+20)}

    /**
     * No comment (yet!)
     */
    get PetFoodMask() { return new DBCIntCell(this,this.buffer,this.offset+28)}

    /**
     * No comment (yet!)
     */
    get PetTalentType() { return new DBCIntCell(this,this.buffer,this.offset+32)}

    /**
     * No comment (yet!)
     */
    get CategoryEnumID() { return new DBCIntCell(this,this.buffer,this.offset+36)}

    /**
     * No comment (yet!)
     */
    get Name() { return new DBCLocCell(this,this.buffer,this.offset+40)}

    /**
     * No comment (yet!)
     */
    get IconFile() { return new DBCStringCell(this,this.buffer,this.offset+108)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : CreatureFamilyCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type CreatureFamilyCreator = {
    MinScale?: float
    MinScaleLevel?: int
    MaxScale?: float
    MaxScaleLevel?: int
    SkillLine?: int[]
    PetFoodMask?: int
    PetTalentType?: int
    CategoryEnumID?: int
    Name?: loc_constructor
    IconFile?: string
}

/**
 * Used for queries (Don't comment these)
 */
export type CreatureFamilyQuery = {
    ID? : Relation<int>
    MinScale? : Relation<float>
    MinScaleLevel? : Relation<int>
    MaxScale? : Relation<float>
    MaxScaleLevel? : Relation<int>
    SkillLine? : Relation<int>
    PetFoodMask? : Relation<int>
    PetTalentType? : Relation<int>
    CategoryEnumID? : Relation<int>
    Name? : Relation<string>
    IconFile? : Relation<string>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class CreatureFamilyDBCFile extends DBCFile<
    CreatureFamilyCreator,
    CreatureFamilyQuery,
    CreatureFamilyRow> {
    constructor() {
        super('CreatureFamily',(t,b,o)=>new CreatureFamilyRow(t,b,o))
    }
    /** Loads a new CreatureFamily.dbc from a file. */
    static read(path: string): CreatureFamilyDBCFile {
        return new CreatureFamilyDBCFile().read(path);
    }
    add(ID : int, c? : CreatureFamilyCreator) : CreatureFamilyRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}