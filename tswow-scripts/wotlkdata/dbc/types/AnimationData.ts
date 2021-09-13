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
import { DBCKeyCell , DBCStringCell , DBCFlagCell , DBCIntCell , DBCPointerCell , DBCEnumCell} from '../DBCCell'
import { int , uint} from '../../primitives'
import { PrimaryKey } from '../../table/PrimaryKey'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class AnimationDataRow extends DBCRow<AnimationDataCreator,AnimationDataQuery> {
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
    get Name() { return new DBCStringCell(this,this.buffer,this.offset+4)}

    /**
     * 32 = pull out weapons during animation. 16 and 4 puts weapons away during animation.
     */
    get Weaponflags() { return new DBCFlagCell(this,this.buffer,this.offset+8)}

    /**
     * Unknown
     */
    get Bodyflags() { return new DBCFlagCell(this,this.buffer,this.offset+12)}

    /**
     * Unknown
     */
    get Flags() { return new DBCIntCell(this,this.buffer,this.offset+16)}

    /**
     * ID of animation preceding this one
     */
    get Fallback() { return new DBCPointerCell(this,this.buffer,this.offset+20)}

    /**
     * Same as ID for normal animations
     */
    get BehaviorID() { return new DBCIntCell(this,this.buffer,this.offset+24)}

    /**
     * 0 means normal, 3 means fly
     */
    get BehaviorTier() { return new DBCEnumCell(this,this.buffer,this.offset+28)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : AnimationDataCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type AnimationDataCreator = {
    Name?: string
    Weaponflags?: uint
    Bodyflags?: uint
    Flags?: int
    Fallback?: uint
    BehaviorID?: int
    BehaviorTier?: uint
}

/**
 * Used for queries (Don't comment these)
 */
export type AnimationDataQuery = {
    ID? : Relation<int>
    Name? : Relation<string>
    Weaponflags? : Relation<number>
    Bodyflags? : Relation<number>
    Flags? : Relation<int>
    Fallback? : Relation<number>
    BehaviorID? : Relation<int>
    BehaviorTier? : Relation<number>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class AnimationDataDBCFile extends DBCFile<
    AnimationDataCreator,
    AnimationDataQuery,
    AnimationDataRow> {
    add(ID : int, c? : AnimationDataCreator) : AnimationDataRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}

/**
 * Table singleton (Object used by 'DBC' namespace)
 * - Add file comments to DBCFiles.ts
 */
export const DBC_AnimationData = new AnimationDataDBCFile(
    'AnimationData',
    (table,buffer,offset)=>new AnimationDataRow(table,buffer,offset))
