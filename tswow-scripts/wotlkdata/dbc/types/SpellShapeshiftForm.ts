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
import { DBCKeyCell , DBCIntCell , DBCLocCell , DBCIntArrayCell} from '../DBCCell'
import { int , loc_constructor} from '../../primitives'
import { PrimaryKey } from '../../table/PrimaryKey'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class SpellShapeshiftFormRow extends DBCRow<SpellShapeshiftFormCreator,SpellShapeshiftFormQuery> {
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
    get BonusActionBar() { return new DBCIntCell(this,this.buffer,this.offset+4)}
    
    /**
     * No comment (yet!)
     */
    get Name() { return new DBCLocCell(this,this.buffer,this.offset+8)}
    
    /**
     * No comment (yet!)
     */
    get Flags() { return new DBCIntCell(this,this.buffer,this.offset+76)}
    
    /**
     * No comment (yet!)
     */
    get CreatureType() { return new DBCIntCell(this,this.buffer,this.offset+80)}
    
    /**
     * No comment (yet!)
     */
    get AttackIconID() { return new DBCIntCell(this,this.buffer,this.offset+84)}
    
    /**
     * No comment (yet!)
     */
    get CombatRoundTime() { return new DBCIntCell(this,this.buffer,this.offset+88)}
    
    /**
     * No comment (yet!)
     */
    get CreatureDisplayID() { return new DBCIntArrayCell(this,4,this.buffer,this.offset+92)}
    
    /**
     * No comment (yet!)
     */
    get PresetSpellID() { return new DBCIntArrayCell(this,8,this.buffer,this.offset+108)}
    
    /**
     * Creates a clone of this row with new primary keys.
     * 
     * Cloned rows are automatically added at the end of the DBC file.
     */ 
    clone(ID : int, c? : SpellShapeshiftFormCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type SpellShapeshiftFormCreator = {
    BonusActionBar?: int
    Name?: loc_constructor
    Flags?: int
    CreatureType?: int
    AttackIconID?: int
    CombatRoundTime?: int
    CreatureDisplayID?: int
    PresetSpellID?: int
}

/**
 * Used for queries (Don't comment these)
 */
export type SpellShapeshiftFormQuery = {
    ID? : Relation<int>
    BonusActionBar? : Relation<int>
    Name? : Relation<string>
    Flags? : Relation<int>
    CreatureType? : Relation<int>
    AttackIconID? : Relation<int>
    CombatRoundTime? : Relation<int>
    CreatureDisplayID? : Relation<int>
    PresetSpellID? : Relation<int>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class SpellShapeshiftFormDBCFile extends DBCFile<
    SpellShapeshiftFormCreator,
    SpellShapeshiftFormQuery,
    SpellShapeshiftFormRow> {
    add(ID : int, c? : SpellShapeshiftFormCreator) : SpellShapeshiftFormRow {
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
export const DBC_SpellShapeshiftForm = new SpellShapeshiftFormDBCFile(
    'SpellShapeshiftForm',
    (table,buffer,offset)=>new SpellShapeshiftFormRow(table,buffer,offset))
