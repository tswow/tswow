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
import { int, loc_constructor, uint } from '../../data/primitives'
import { Relation } from '../../data/query/Relations'
import { PrimaryKey } from '../../data/table/PrimaryKey'
import { DBCEnumCell, DBCFlagCell, DBCIntCell, DBCKeyCell, DBCLocCell, DBCPointerCell } from '../../data/dbc/DBCCell'
import { DBCFile } from '../../data/dbc/DBCFile'
import { DBCRow } from '../../data/dbc/DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class AchievementRow extends DBCRow<AchievementCreator,AchievementQuery> {
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
    get Faction() { return new DBCEnumCell(this,this.buffer,this.offset+4)}

    /**
     * Only set if achievement is related to a zone, otherwise set to -1
     */
    get Map() { return new DBCIntCell(this,this.buffer,this.offset+8)}

    /**
     * If the Achievement belongs to a series, this is the ID of the previous one. 0 otherwise.
     */
    get Previous() { return new DBCIntCell(this,this.buffer,this.offset+12)}

    /**
     * No comment (yet!)
     */
    get Title() { return new DBCLocCell(this,this.buffer,this.offset+16)}

    /**
     * No comment (yet!)
     */
    get Description() { return new DBCLocCell(this,this.buffer,this.offset+84)}

    /**
     * No comment (yet!)
     */
    get Category() { return new DBCPointerCell(this,this.buffer,this.offset+152)}

    /**
     * How many Achievement points this achievement is worth.
     */
    get Points() { return new DBCIntCell(this,this.buffer,this.offset+156)}

    /**
     * Sort order in achievement pane. Lower means higher up.
     */
    get Ui_Order() { return new DBCIntCell(this,this.buffer,this.offset+160)}

    /**
     * 256 means only one person per realm can reach it.
     */
    get Flags() { return new DBCFlagCell(this,this.buffer,this.offset+164)}

    /**
     * No comment (yet!)
     */
    get IconID() { return new DBCPointerCell(this,this.buffer,this.offset+168)}

    /**
     * No comment (yet!)
     */
    get Reward() { return new DBCLocCell(this,this.buffer,this.offset+172)}

    /**
     * Number of things you must get/fulfill for this achievement.
     */
    get Minimum_Criteria() { return new DBCIntCell(this,this.buffer,this.offset+240)}

    /**
     * Achievement that this achievement is a subtask of
     */
    get Shares_Criteria() { return new DBCPointerCell(this,this.buffer,this.offset+244)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : AchievementCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type AchievementCreator = {
    Faction?: uint
    Map?: int
    Previous?: int
    Title?: loc_constructor
    Description?: loc_constructor
    Category?: uint
    Points?: int
    Ui_Order?: int
    Flags?: uint
    IconID?: uint
    Reward?: loc_constructor
    Minimum_Criteria?: int
    Shares_Criteria?: uint
}

/**
 * Used for queries (Don't comment these)
 */
export type AchievementQuery = {
    ID? : Relation<int>
    Faction? : Relation<number>
    Map? : Relation<int>
    Previous? : Relation<int>
    Title? : Relation<string>
    Description? : Relation<string>
    Category? : Relation<number>
    Points? : Relation<int>
    Ui_Order? : Relation<int>
    Flags? : Relation<number>
    IconID? : Relation<number>
    Reward? : Relation<string>
    Minimum_Criteria? : Relation<int>
    Shares_Criteria? : Relation<number>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class AchievementDBCFile extends DBCFile<
    AchievementCreator,
    AchievementQuery,
    AchievementRow> {
    constructor() {
        super('Achievement',(t,b,o)=>new AchievementRow(t,b,o))
    }
    /** Loads a new Achievement.dbc from a file. */
    static read(path: string): AchievementDBCFile {
        return new AchievementDBCFile().read(path);
    }
    add(ID : int, c? : AchievementCreator) : AchievementRow {
        return this.makeRow(0).clone(ID,c)
    }
}