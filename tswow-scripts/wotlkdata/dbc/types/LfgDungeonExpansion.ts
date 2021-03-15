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
import { DBCRow } from '../DBCRow'
import { DBCFile } from '../DBCFile'
import { Relation } from '../../query/Relations'
import { DBCKeyCell , DBCIntCell} from '../DBCCell'
import { int} from '../../primitives'
import { PrimaryKey } from '../../table/PrimaryKey'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class LfgDungeonExpansionRow extends DBCRow<LfgDungeonExpansionCreator,LfgDungeonExpansionQuery> {
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
    get Lfg_Id() { return new DBCIntCell(this,this.buffer,this.offset+4)}
    
    /**
     * No comment (yet!)
     */
    get Expansion_Level() { return new DBCIntCell(this,this.buffer,this.offset+8)}
    
    /**
     * No comment (yet!)
     */
    get Random_Id() { return new DBCIntCell(this,this.buffer,this.offset+12)}
    
    /**
     * No comment (yet!)
     */
    get Hard_Level_Min() { return new DBCIntCell(this,this.buffer,this.offset+16)}
    
    /**
     * No comment (yet!)
     */
    get Hard_Level_Max() { return new DBCIntCell(this,this.buffer,this.offset+20)}
    
    /**
     * No comment (yet!)
     */
    get Target_Level_Min() { return new DBCIntCell(this,this.buffer,this.offset+24)}
    
    /**
     * No comment (yet!)
     */
    get Target_Level_Max() { return new DBCIntCell(this,this.buffer,this.offset+28)}
    
    /**
     * Creates a clone of this row with new primary keys.
     * 
     * Cloned rows are automatically added at the end of the DBC file.
     */ 
    clone(ID : int, c? : LfgDungeonExpansionCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type LfgDungeonExpansionCreator = {
    Lfg_Id?: int
    Expansion_Level?: int
    Random_Id?: int
    Hard_Level_Min?: int
    Hard_Level_Max?: int
    Target_Level_Min?: int
    Target_Level_Max?: int
}

/**
 * Used for queries (Don't comment these)
 */
export type LfgDungeonExpansionQuery = {
    ID? : Relation<int>
    Lfg_Id? : Relation<int>
    Expansion_Level? : Relation<int>
    Random_Id? : Relation<int>
    Hard_Level_Min? : Relation<int>
    Hard_Level_Max? : Relation<int>
    Target_Level_Min? : Relation<int>
    Target_Level_Max? : Relation<int>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class LfgDungeonExpansionDBCFile extends DBCFile<
    LfgDungeonExpansionCreator,
    LfgDungeonExpansionQuery,
    LfgDungeonExpansionRow> {
    add(ID : int, c? : LfgDungeonExpansionCreator) : LfgDungeonExpansionRow {
        return this.makeRow(0).clone(ID,c)
    }
}

/**
 * Table singleton (Object used by 'DBC' namespace)
 * - Add file comments to DBCFiles.ts
 */
export const DBC_LfgDungeonExpansion = new LfgDungeonExpansionDBCFile(
    'LFGDungeonExpansion',
    (table,buffer,offset)=>new LfgDungeonExpansionRow(table,buffer,offset))
