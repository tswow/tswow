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
import { int, smallint, tinyint } from '../../primitives'
import { Relation } from '../../query/Relations'
import { PrimaryKey } from '../../table/PrimaryKey'
import { SQLCell, SQLCellReadOnly } from '../SQLCell'
import { SqlRow } from '../SQLRow'
import { SqlTable } from '../SQLTable'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class trainer_spellRow extends SqlRow<trainer_spellCreator,trainer_spellQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get TrainerId() {return new SQLCellReadOnly<int, this>(this, 'TrainerId')}

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
    get MoneyCost() {return new SQLCell<int, this>(this, 'MoneyCost')}

    /**
     * No comment (yet!)
     */
    get ReqSkillLine() {return new SQLCell<int, this>(this, 'ReqSkillLine')}

    /**
     * No comment (yet!)
     */
    get ReqSkillRank() {return new SQLCell<int, this>(this, 'ReqSkillRank')}

    /**
     * No comment (yet!)
     */
    get ReqAbility1() {return new SQLCell<int, this>(this, 'ReqAbility1')}

    /**
     * No comment (yet!)
     */
    get ReqAbility2() {return new SQLCell<int, this>(this, 'ReqAbility2')}

    /**
     * No comment (yet!)
     */
    get ReqAbility3() {return new SQLCell<int, this>(this, 'ReqAbility3')}

    /**
     * No comment (yet!)
     */
    get ReqLevel() {return new SQLCell<tinyint, this>(this, 'ReqLevel')}

    /**
     * No comment (yet!)
     */
    get VerifiedBuild() {return new SQLCell<smallint, this>(this, 'VerifiedBuild')}

    /**
     * Custom tswow field
     */
    get raceMask() { return new SQLCell<int,this>(this, 'raceMask')}

    /**
     * Custom tswow field
     */
    get classMask() { return new SQLCell<int,this>(this, 'classMask')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(TrainerId : int,SpellId : int, c? : trainer_spellCreator) : this {
        return this.cloneInternal([TrainerId,SpellId],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type trainer_spellCreator = {
    TrainerId? : int,
    SpellId? : int,
    MoneyCost? : int,
    ReqSkillLine? : int,
    ReqSkillRank? : int,
    ReqAbility1? : int,
    ReqAbility2? : int,
    ReqAbility3? : int,
    ReqLevel? : tinyint,
    VerifiedBuild? : smallint,
    raceMask?: int
    classMask?: int
}

/**
 * Used for object queries (Don't comment these)
 */
export type trainer_spellQuery = {
    TrainerId? : Relation<int>,
    SpellId? : Relation<int>,
    MoneyCost? : Relation<int>,
    ReqSkillLine? : Relation<int>,
    ReqSkillRank? : Relation<int>,
    ReqAbility1? : Relation<int>,
    ReqAbility2? : Relation<int>,
    ReqAbility3? : Relation<int>,
    ReqLevel? : Relation<tinyint>,
    VerifiedBuild? : Relation<smallint>,
    raceMask? : Relation<int>,
    classMask? : Relation<int>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class trainer_spellTable extends SqlTable<
    trainer_spellCreator,
    trainer_spellQuery,
    trainer_spellRow> {
    add(TrainerId : int,SpellId : int, c? : trainer_spellCreator) : trainer_spellRow {
        const first = this.first();
        if(first) return first.clone(TrainerId,SpellId,c)
        else return this.rowCreator(this, {}).clone(TrainerId,SpellId,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_trainer_spell = new trainer_spellTable(
    'trainer_spell',
    (table, obj)=>new trainer_spellRow(table, obj))