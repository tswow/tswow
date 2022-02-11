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
import { float, mediumint, smallint, tinyint } from '../../data/primitives'
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
export class spell_target_positionRow extends SqlRow<spell_target_positionCreator,spell_target_positionQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get ID() {return new SQLCellReadOnly<mediumint, this>(this, 'ID')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get EffectIndex() {return new SQLCellReadOnly<tinyint, this>(this, 'EffectIndex')}

    /**
     * No comment (yet!)
     */
    get MapID() {return new SQLCell<smallint, this>(this, 'MapID')}

    /**
     * No comment (yet!)
     */
    get PositionX() {return new SQLCell<float, this>(this, 'PositionX')}

    /**
     * No comment (yet!)
     */
    get PositionY() {return new SQLCell<float, this>(this, 'PositionY')}

    /**
     * No comment (yet!)
     */
    get PositionZ() {return new SQLCell<float, this>(this, 'PositionZ')}

    /**
     * No comment (yet!)
     */
    get Orientation() {return new SQLCell<float, this>(this, 'Orientation')}

    /**
     * No comment (yet!)
     */
    get VerifiedBuild() {return new SQLCell<smallint, this>(this, 'VerifiedBuild')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(ID : mediumint,EffectIndex : tinyint, c? : spell_target_positionCreator) : this {
        return this.cloneInternal([ID,EffectIndex],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type spell_target_positionCreator = {
    ID? : mediumint,
    EffectIndex? : tinyint,
    MapID? : smallint,
    PositionX? : float,
    PositionY? : float,
    PositionZ? : float,
    Orientation? : float,
    VerifiedBuild? : smallint,
}

/**
 * Used for object queries (Don't comment these)
 */
export type spell_target_positionQuery = {
    ID? : Relation<mediumint>,
    EffectIndex? : Relation<tinyint>,
    MapID? : Relation<smallint>,
    PositionX? : Relation<float>,
    PositionY? : Relation<float>,
    PositionZ? : Relation<float>,
    Orientation? : Relation<float>,
    VerifiedBuild? : Relation<smallint>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class spell_target_positionTable extends SqlTable<
    spell_target_positionCreator,
    spell_target_positionQuery,
    spell_target_positionRow> {
    add(ID : mediumint,EffectIndex : tinyint, c? : spell_target_positionCreator) : spell_target_positionRow {
        const first = this.first();
        if(first) return first.clone(ID,EffectIndex,c)
        else return this.rowCreator(this, {}).clone(ID,EffectIndex,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_spell_target_position = new spell_target_positionTable(
    'spell_target_position',
    (table, obj)=>new spell_target_positionRow(table, obj))