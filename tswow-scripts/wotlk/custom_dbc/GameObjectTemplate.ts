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
import { DBCFloatCell, DBCIntCell, DBCKeyCell, DBCLocCell, DBCStringCell } from '../../data/dbc/DBCCell'
import { DBCFile } from '../../data/dbc/DBCFile'
import { DBCRow } from '../../data/dbc/DBCRow'
import { int } from '../../data/primitives'
import { Relation } from '../../data/query/Relations'
import { PrimaryKey } from '../../data/table/PrimaryKey'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class GameObjectTemplateRow extends DBCRow<GameObjectTemplateCreator,GameObjectTemplateQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get entry() { return new DBCKeyCell(this,this.buffer,this.offset+0)}

    /**
     * No comment (yet!)
     */
    get type() { return new DBCIntCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get displayId() { return new DBCIntCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get name() { return new DBCLocCell(this,this.buffer,this.offset+12)}

    /**
     * No comment (yet!)
     */
    get IconName() { return new DBCStringCell(this,this.buffer,this.offset+80)}

    /**
     * No comment (yet!)
     */
    get castBarCaption() { return new DBCLocCell(this,this.buffer,this.offset+84)}

    /**
     * No comment (yet!)
     */
    get unk1() { return new DBCStringCell(this,this.buffer,this.offset+152)}

    /**
     * No comment (yet!)
     */
    get size() { return new DBCFloatCell(this,this.buffer,this.offset+156)}

    /**
     * No comment (yet!)
     */
    get Data0() { return new DBCIntCell(this,this.buffer,this.offset+160)}

    /**
     * No comment (yet!)
     */
    get Data1() { return new DBCIntCell(this,this.buffer,this.offset+164)}

    /**
     * No comment (yet!)
     */
    get Data2() { return new DBCIntCell(this,this.buffer,this.offset+168)}

    /**
     * No comment (yet!)
     */
    get Data3() { return new DBCIntCell(this,this.buffer,this.offset+172)}

    /**
     * No comment (yet!)
     */
    get Data4() { return new DBCIntCell(this,this.buffer,this.offset+176)}

    /**
     * No comment (yet!)
     */
    get Data5() { return new DBCIntCell(this,this.buffer,this.offset+180)}

    /**
     * No comment (yet!)
     */
    get Data6() { return new DBCIntCell(this,this.buffer,this.offset+184)}

    /**
     * No comment (yet!)
     */
    get Data7() { return new DBCIntCell(this,this.buffer,this.offset+188)}

    /**
     * No comment (yet!)
     */
    get Data8() { return new DBCIntCell(this,this.buffer,this.offset+192)}

    /**
     * No comment (yet!)
     */
    get Data9() { return new DBCIntCell(this,this.buffer,this.offset+196)}

    /**
     * No comment (yet!)
     */
    get Data10() { return new DBCIntCell(this,this.buffer,this.offset+200)}

    /**
     * No comment (yet!)
     */
    get Data11() { return new DBCIntCell(this,this.buffer,this.offset+204)}

    /**
     * No comment (yet!)
     */
    get Data12() { return new DBCIntCell(this,this.buffer,this.offset+208)}

    /**
     * No comment (yet!)
     */
    get Data13() { return new DBCIntCell(this,this.buffer,this.offset+212)}

    /**
     * No comment (yet!)
     */
    get Data14() { return new DBCIntCell(this,this.buffer,this.offset+216)}

    /**
     * No comment (yet!)
     */
    get Data15() { return new DBCIntCell(this,this.buffer,this.offset+220)}

    /**
     * No comment (yet!)
     */
    get Data16() { return new DBCIntCell(this,this.buffer,this.offset+224)}

    /**
     * No comment (yet!)
     */
    get Data17() { return new DBCIntCell(this,this.buffer,this.offset+228)}

    /**
     * No comment (yet!)
     */
    get Data18() { return new DBCIntCell(this,this.buffer,this.offset+232)}

    /**
     * No comment (yet!)
     */
    get Data19() { return new DBCIntCell(this,this.buffer,this.offset+236)}

    /**
     * No comment (yet!)
     */
    get Data20() { return new DBCIntCell(this,this.buffer,this.offset+240)}

    /**
     * No comment (yet!)
     */
    get Data21() { return new DBCIntCell(this,this.buffer,this.offset+244)}

    /**
     * No comment (yet!)
     */
    get Data22() { return new DBCIntCell(this,this.buffer,this.offset+248)}

    /**
     * No comment (yet!)
     */
    get Data23() { return new DBCIntCell(this,this.buffer,this.offset+252)}

    /**
     * No comment (yet!)
     */
    get AIName() { return new DBCStringCell(this,this.buffer,this.offset+256)}

    /**
     * No comment (yet!)
     */
    get ScriptName() { return new DBCStringCell(this,this.buffer,this.offset+260)}

    static SIZE = 264;

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : GameObjectTemplateCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type GameObjectTemplateCreator = {
    entry? : int32,
    type? : int32,
    displayId? : int32,
    name? : string,
    IconName? : string,
    castBarCaption? : string,
    unk1? : string,
    size? : float,
    Data0? : int32,
    Data1? : int32,
    Data2? : int32,
    Data3? : int32,
    Data4? : int32,
    Data5? : int32,
    Data6? : int32,
    Data7? : int32,
    Data8? : int32,
    Data9? : int32,
    Data10? : int32,
    Data11? : int32,
    Data12? : int32,
    Data13? : int32,
    Data14? : int32,
    Data15? : int32,
    Data16? : int32,
    Data17? : int32,
    Data18? : int32,
    Data19? : int32,
    Data20? : int32,
    Data21? : int32,
    Data22? : int32,
    Data23? : int32,
    AIName? : string,
    ScriptName? : string,
}

/**
 * Used for queries (Don't comment these)
 */
export type GameObjectTemplateQuery = {
    entry? : Relation<int32>,
    type? : Relation<int32>,
    displayId? : Relation<int32>,
    name? : Relation<string>,
    IconName? : Relation<string>,
    castBarCaption? : Relation<string>,
    unk1? : Relation<string>,
    size? : Relation<float>,
    Data0? : Relation<int32>,
    Data1? : Relation<int32>,
    Data2? : Relation<int32>,
    Data3? : Relation<int32>,
    Data4? : Relation<int32>,
    Data5? : Relation<int32>,
    Data6? : Relation<int32>,
    Data7? : Relation<int32>,
    Data8? : Relation<int32>,
    Data9? : Relation<int32>,
    Data10? : Relation<int32>,
    Data11? : Relation<int32>,
    Data12? : Relation<int32>,
    Data13? : Relation<int32>,
    Data14? : Relation<int32>,
    Data15? : Relation<int32>,
    Data16? : Relation<int32>,
    Data17? : Relation<int32>,
    Data18? : Relation<int32>,
    Data19? : Relation<int32>,
    Data20? : Relation<int32>,
    Data21? : Relation<int32>,
    Data22? : Relation<int32>,
    Data23? : Relation<int32>,
    AIName? : Relation<string>,
    ScriptName? : Relation<string>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class GameObjectTemplateDBCFile extends DBCFile<
    GameObjectTemplateCreator,
    GameObjectTemplateQuery,
    GameObjectTemplateRow> {
    constructor() {
        super('GameObjectTemplate',(t,b,o)=>new GameObjectTemplateRow(t,b,o))
    }
    /** Loads a new GameObjectTemplate.dbc from a file. */
    static read(path: string): GameObjectTemplateDBCFile {
        return new GameObjectTemplateDBCFile().read(path);
    }

    add(entry : int, c? : GameObjectTemplateCreator) : GameObjectTemplateRow {
        return this.makeRow(0).clone(entry,c)
    }

    findById(id: number) {
        return this.fastSearch(id);
    }
}