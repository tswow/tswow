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
import { char, float, int, mediumint, smallint, tinyint, varchar } from '../../primitives'
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
export class gameobject_templateRow extends SqlRow<gameobject_templateCreator,gameobject_templateQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get entry() {return new SQLCellReadOnly<mediumint, this>(this, 'entry')}

    /**
     * No comment (yet!)
     */
    get type() {return new SQLCell<tinyint, this>(this, 'type')}

    /**
     * No comment (yet!)
     */
    get displayId() {return new SQLCell<mediumint, this>(this, 'displayId')}

    /**
     * No comment (yet!)
     */
    get name() {return new SQLCell<varchar, this>(this, 'name')}

    /**
     * No comment (yet!)
     */
    get IconName() {return new SQLCell<varchar, this>(this, 'IconName')}

    /**
     * No comment (yet!)
     */
    get castBarCaption() {return new SQLCell<varchar, this>(this, 'castBarCaption')}

    /**
     * No comment (yet!)
     */
    get unk1() {return new SQLCell<varchar, this>(this, 'unk1')}

    /**
     * No comment (yet!)
     */
    get size() {return new SQLCell<float, this>(this, 'size')}

    /**
     * No comment (yet!)
     */
    get Data0() {return new SQLCell<int, this>(this, 'Data0')}

    /**
     * No comment (yet!)
     */
    get Data1() {return new SQLCell<int, this>(this, 'Data1')}

    /**
     * No comment (yet!)
     */
    get Data2() {return new SQLCell<int, this>(this, 'Data2')}

    /**
     * No comment (yet!)
     */
    get Data3() {return new SQLCell<int, this>(this, 'Data3')}

    /**
     * No comment (yet!)
     */
    get Data4() {return new SQLCell<int, this>(this, 'Data4')}

    /**
     * No comment (yet!)
     */
    get Data5() {return new SQLCell<int, this>(this, 'Data5')}

    /**
     * No comment (yet!)
     */
    get Data6() {return new SQLCell<int, this>(this, 'Data6')}

    /**
     * No comment (yet!)
     */
    get Data7() {return new SQLCell<int, this>(this, 'Data7')}

    /**
     * No comment (yet!)
     */
    get Data8() {return new SQLCell<int, this>(this, 'Data8')}

    /**
     * No comment (yet!)
     */
    get Data9() {return new SQLCell<int, this>(this, 'Data9')}

    /**
     * No comment (yet!)
     */
    get Data10() {return new SQLCell<int, this>(this, 'Data10')}

    /**
     * No comment (yet!)
     */
    get Data11() {return new SQLCell<int, this>(this, 'Data11')}

    /**
     * No comment (yet!)
     */
    get Data12() {return new SQLCell<int, this>(this, 'Data12')}

    /**
     * No comment (yet!)
     */
    get Data13() {return new SQLCell<int, this>(this, 'Data13')}

    /**
     * No comment (yet!)
     */
    get Data14() {return new SQLCell<int, this>(this, 'Data14')}

    /**
     * No comment (yet!)
     */
    get Data15() {return new SQLCell<int, this>(this, 'Data15')}

    /**
     * No comment (yet!)
     */
    get Data16() {return new SQLCell<int, this>(this, 'Data16')}

    /**
     * No comment (yet!)
     */
    get Data17() {return new SQLCell<int, this>(this, 'Data17')}

    /**
     * No comment (yet!)
     */
    get Data18() {return new SQLCell<int, this>(this, 'Data18')}

    /**
     * No comment (yet!)
     */
    get Data19() {return new SQLCell<int, this>(this, 'Data19')}

    /**
     * No comment (yet!)
     */
    get Data20() {return new SQLCell<int, this>(this, 'Data20')}

    /**
     * No comment (yet!)
     */
    get Data21() {return new SQLCell<int, this>(this, 'Data21')}

    /**
     * No comment (yet!)
     */
    get Data22() {return new SQLCell<int, this>(this, 'Data22')}

    /**
     * No comment (yet!)
     */
    get Data23() {return new SQLCell<int, this>(this, 'Data23')}

    /**
     * No comment (yet!)
     */
    get AIName() {return new SQLCell<char, this>(this, 'AIName')}

    /**
     * No comment (yet!)
     */
    get ScriptName() {return new SQLCell<varchar, this>(this, 'ScriptName')}

    /**
     * No comment (yet!)
     */
    get VerifiedBuild() {return new SQLCell<smallint, this>(this, 'VerifiedBuild')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(entry : mediumint, c? : gameobject_templateCreator) : this {
        return this.cloneInternal([entry],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type gameobject_templateCreator = {
    entry? : mediumint,
    type? : tinyint,
    displayId? : mediumint,
    name? : varchar,
    IconName? : varchar,
    castBarCaption? : varchar,
    unk1? : varchar,
    size? : float,
    Data0? : int,
    Data1? : int,
    Data2? : int,
    Data3? : int,
    Data4? : int,
    Data5? : int,
    Data6? : int,
    Data7? : int,
    Data8? : int,
    Data9? : int,
    Data10? : int,
    Data11? : int,
    Data12? : int,
    Data13? : int,
    Data14? : int,
    Data15? : int,
    Data16? : int,
    Data17? : int,
    Data18? : int,
    Data19? : int,
    Data20? : int,
    Data21? : int,
    Data22? : int,
    Data23? : int,
    AIName? : char,
    ScriptName? : varchar,
    VerifiedBuild? : smallint,
}

/**
 * Used for object queries (Don't comment these)
 */
export type gameobject_templateQuery = {
    entry? : Relation<mediumint>,
    type? : Relation<tinyint>,
    displayId? : Relation<mediumint>,
    name? : Relation<varchar>,
    IconName? : Relation<varchar>,
    castBarCaption? : Relation<varchar>,
    unk1? : Relation<varchar>,
    size? : Relation<float>,
    Data0? : Relation<int>,
    Data1? : Relation<int>,
    Data2? : Relation<int>,
    Data3? : Relation<int>,
    Data4? : Relation<int>,
    Data5? : Relation<int>,
    Data6? : Relation<int>,
    Data7? : Relation<int>,
    Data8? : Relation<int>,
    Data9? : Relation<int>,
    Data10? : Relation<int>,
    Data11? : Relation<int>,
    Data12? : Relation<int>,
    Data13? : Relation<int>,
    Data14? : Relation<int>,
    Data15? : Relation<int>,
    Data16? : Relation<int>,
    Data17? : Relation<int>,
    Data18? : Relation<int>,
    Data19? : Relation<int>,
    Data20? : Relation<int>,
    Data21? : Relation<int>,
    Data22? : Relation<int>,
    Data23? : Relation<int>,
    AIName? : Relation<char>,
    ScriptName? : Relation<varchar>,
    VerifiedBuild? : Relation<smallint>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class gameobject_templateTable extends SqlTable<
    gameobject_templateCreator,
    gameobject_templateQuery,
    gameobject_templateRow> {
    add(entry : mediumint, c? : gameobject_templateCreator) : gameobject_templateRow {
        const first = this.first();
        if(first) return first.clone(entry,c)
        else return this.rowCreator(this, {}).clone(entry,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_gameobject_template = new gameobject_templateTable(
    'gameobject_template',
    (table, obj)=>new gameobject_templateRow(table, obj))