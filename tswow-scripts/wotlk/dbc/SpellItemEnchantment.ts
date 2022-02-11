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
import { DBCIntArrayCell, DBCIntCell, DBCKeyCell, DBCLocCell } from '../../data/dbc/DBCCell'
import { DBCFile } from '../../data/dbc/DBCFile'
import { DBCRow } from '../../data/dbc/DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class SpellItemEnchantmentRow extends DBCRow<SpellItemEnchantmentCreator,SpellItemEnchantmentQuery> {
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
    get Charges() { return new DBCIntCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get Effect() { return new DBCIntArrayCell(this,3,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get EffectPointsMin() { return new DBCIntArrayCell(this,3,this.buffer,this.offset+20)}

    /**
     * No comment (yet!)
     */
    get EffectPointsMax() { return new DBCIntArrayCell(this,3,this.buffer,this.offset+32)}

    /**
     * No comment (yet!)
     */
    get EffectArg() { return new DBCIntArrayCell(this,3,this.buffer,this.offset+44)}

    /**
     * No comment (yet!)
     */
    get Name() { return new DBCLocCell(this,this.buffer,this.offset+56)}

    /**
     * No comment (yet!)
     */
    get ItemVisual() { return new DBCIntCell(this,this.buffer,this.offset+124)}

    /**
     * No comment (yet!)
     */
    get Flags() { return new DBCIntCell(this,this.buffer,this.offset+128)}

    /**
     * No comment (yet!)
     */
    get Src_ItemID() { return new DBCIntCell(this,this.buffer,this.offset+132)}

    /**
     * No comment (yet!)
     */
    get Condition_Id() { return new DBCIntCell(this,this.buffer,this.offset+136)}

    /**
     * No comment (yet!)
     */
    get RequiredSkillID() { return new DBCIntCell(this,this.buffer,this.offset+140)}

    /**
     * No comment (yet!)
     */
    get RequiredSkillRank() { return new DBCIntCell(this,this.buffer,this.offset+144)}

    /**
     * No comment (yet!)
     */
    get MinLevel() { return new DBCIntCell(this,this.buffer,this.offset+148)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : SpellItemEnchantmentCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type SpellItemEnchantmentCreator = {
    Charges?: int
    Effect?: int[]
    EffectPointsMin?: int[]
    EffectPointsMax?: int[]
    EffectArg?: int[]
    Name?: loc_constructor
    ItemVisual?: int
    Flags?: int
    Src_ItemID?: int
    Condition_Id?: int
    RequiredSkillID?: int
    RequiredSkillRank?: int
    MinLevel?: int
}

/**
 * Used for queries (Don't comment these)
 */
export type SpellItemEnchantmentQuery = {
    ID? : Relation<int>
    Charges? : Relation<int>
    Effect? : Relation<int>
    EffectPointsMin? : Relation<int>
    EffectPointsMax? : Relation<int>
    EffectArg? : Relation<int>
    Name? : Relation<string>
    ItemVisual? : Relation<int>
    Flags? : Relation<int>
    Src_ItemID? : Relation<int>
    Condition_Id? : Relation<int>
    RequiredSkillID? : Relation<int>
    RequiredSkillRank? : Relation<int>
    MinLevel? : Relation<int>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class SpellItemEnchantmentDBCFile extends DBCFile<
    SpellItemEnchantmentCreator,
    SpellItemEnchantmentQuery,
    SpellItemEnchantmentRow> {
    constructor() {
        super('SpellItemEnchantment',(t,b,o)=>new SpellItemEnchantmentRow(t,b,o))
    }
    /** Loads a new SpellItemEnchantment.dbc from a file. */
    static read(path: string): SpellItemEnchantmentDBCFile {
        return new SpellItemEnchantmentDBCFile().read(path);
    }
    add(ID : int, c? : SpellItemEnchantmentCreator) : SpellItemEnchantmentRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}