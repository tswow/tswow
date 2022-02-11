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
import { float, int, smallint, tinyint } from '../../data/primitives'
import { Relation } from '../../data/query/Relations'
import { PrimaryKey } from '../../data/table/PrimaryKey'
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell'
import { SqlRow } from '../../data/sql/SQLRow'
import { SqlTable } from '../../data/sql/SQLTable'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class spell_procRow extends SqlRow<spell_procCreator,spell_procQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get SpellId() {return new SQLCellReadOnly<int, this>(this, 'SpellId')}

    /**
     * No comment (yet!)
     */
    get SchoolMask() {return new SQLCell<tinyint, this>(this, 'SchoolMask')}

    /**
     * No comment (yet!)
     */
    get SpellFamilyName() {return new SQLCell<smallint, this>(this, 'SpellFamilyName')}

    /**
     * No comment (yet!)
     */
    get SpellFamilyMask0() {return new SQLCell<int, this>(this, 'SpellFamilyMask0')}

    /**
     * No comment (yet!)
     */
    get SpellFamilyMask1() {return new SQLCell<int, this>(this, 'SpellFamilyMask1')}

    /**
     * No comment (yet!)
     */
    get SpellFamilyMask2() {return new SQLCell<int, this>(this, 'SpellFamilyMask2')}

    /**
     * No comment (yet!)
     */
    get ProcFlags() {return new SQLCell<int, this>(this, 'ProcFlags')}

    /**
     * No comment (yet!)
     */
    get SpellTypeMask() {return new SQLCell<int, this>(this, 'SpellTypeMask')}

    /**
     * No comment (yet!)
     */
    get SpellPhaseMask() {return new SQLCell<int, this>(this, 'SpellPhaseMask')}

    /**
     * No comment (yet!)
     */
    get HitMask() {return new SQLCell<int, this>(this, 'HitMask')}

    /**
     * No comment (yet!)
     */
    get AttributesMask() {return new SQLCell<int, this>(this, 'AttributesMask')}

    /**
     * No comment (yet!)
     */
    get DisableEffectsMask() {return new SQLCell<int, this>(this, 'DisableEffectsMask')}

    /**
     * No comment (yet!)
     */
    get ProcsPerMinute() {return new SQLCell<float, this>(this, 'ProcsPerMinute')}

    /**
     * No comment (yet!)
     */
    get Chance() {return new SQLCell<float, this>(this, 'Chance')}

    /**
     * No comment (yet!)
     */
    get Cooldown() {return new SQLCell<int, this>(this, 'Cooldown')}

    /**
     * No comment (yet!)
     */
    get Charges() {return new SQLCell<tinyint, this>(this, 'Charges')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(SpellId : int, c? : spell_procCreator) : this {
        return this.cloneInternal([SpellId],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type spell_procCreator = {
    SpellId? : int,
    SchoolMask? : tinyint,
    SpellFamilyName? : smallint,
    SpellFamilyMask0? : int,
    SpellFamilyMask1? : int,
    SpellFamilyMask2? : int,
    ProcFlags? : int,
    SpellTypeMask? : int,
    SpellPhaseMask? : int,
    HitMask? : int,
    AttributesMask? : int,
    DisableEffectsMask? : int,
    ProcsPerMinute? : float,
    Chance? : float,
    Cooldown? : int,
    Charges? : tinyint,
}

/**
 * Used for object queries (Don't comment these)
 */
export type spell_procQuery = {
    SpellId? : Relation<int>,
    SchoolMask? : Relation<tinyint>,
    SpellFamilyName? : Relation<smallint>,
    SpellFamilyMask0? : Relation<int>,
    SpellFamilyMask1? : Relation<int>,
    SpellFamilyMask2? : Relation<int>,
    ProcFlags? : Relation<int>,
    SpellTypeMask? : Relation<int>,
    SpellPhaseMask? : Relation<int>,
    HitMask? : Relation<int>,
    AttributesMask? : Relation<int>,
    DisableEffectsMask? : Relation<int>,
    ProcsPerMinute? : Relation<float>,
    Chance? : Relation<float>,
    Cooldown? : Relation<int>,
    Charges? : Relation<tinyint>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class spell_procTable extends SqlTable<
    spell_procCreator,
    spell_procQuery,
    spell_procRow> {
    add(SpellId : int, c? : spell_procCreator) : spell_procRow {
        const first = this.first();
        if(first) return first.clone(SpellId,c)
        else return this.rowCreator(this, {}).clone(SpellId,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_spell_proc = new spell_procTable(
    'spell_proc',
    (table, obj)=>new spell_procRow(table, obj))