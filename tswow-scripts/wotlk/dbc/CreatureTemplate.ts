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
export class CreatureTemplateRow extends DBCRow<CreatureTemplateCreator,CreatureTemplateQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get entry() { return new DBCKeyCell(this,this.buffer,this.offset+0)}

    get difficulty_entry_1() { return new DBCIntCell(this,this.buffer,this.offset+4)}

    get difficulty_entry_2() { return new DBCIntCell(this,this.buffer,this.offset+8)}

    get difficulty_entry_3() { return new DBCIntCell(this,this.buffer,this.offset+12)}

    get name() { return new DBCLocCell(this, this.buffer, this.offset + 16)}

    get subname() { return new DBCLocCell(this, this.buffer, this.offset + 84)}

    get IconName() { return new DBCStringCell(this, this.buffer, this.offset + 152)}

    get gossip_menu_id() { return new DBCIntCell(this, this.buffer, this.offset + 156)}

    get minlevel() { return new DBCIntCell(this, this.buffer, this.offset + 160)}

    get maxlevel() { return new DBCIntCell(this, this.buffer, this.offset + 164)}

    get exp() { return new DBCIntCell(this, this.buffer, this.offset + 168)}

    get faction() { return new DBCIntCell(this, this.buffer, this.offset + 172)}

    get npcflag() { return new DBCIntCell(this, this.buffer, this.offset + 178)}

    get speed_walk() { return new DBCFloatCell(this, this.buffer, this.offset + 182)}

    get speed_run() { return new DBCFloatCell(this, this.buffer, this.offset + 186)}

    get scale() { return new DBCIntCell(this, this.buffer, this.offset + 190)}

    get rank() { return new DBCIntCell(this, this.buffer, this.offset + 194)}

    get dmgschool() { return new DBCIntCell(this, this.buffer, this.offset + 198)}

    get BaseAttackTime() { return new DBCIntCell(this, this.buffer, this.offset + 202)}

    get RangeAttackTime() { return new DBCIntCell(this, this.buffer, this.offset + 206)}

    get BaseVariance() { return new DBCFloatCell(this, this.buffer, this.offset + 210)}

    get RangeVariance() { return new DBCFloatCell(this, this.buffer, this.offset + 214)}

    get unit_class() { return new DBCIntCell(this, this.buffer, this.offset + 218)}

    get unit_flags() { return new DBCIntCell(this, this.buffer, this.offset + 222)}

    get unit_flags2() { return new DBCIntCell(this, this.buffer, this.offset + 226)}

    get dynamicflags() { return new DBCIntCell(this, this.buffer, this.offset + 230)}

    get family() { return new DBCIntCell(this, this.buffer, this.offset + 234)}

    get type() { return new DBCIntCell(this, this.buffer, this.offset + 238)}

    get type_flags() { return new DBCIntCell(this, this.buffer, this.offset + 242)}

    get lootid() { return new DBCIntCell(this, this.buffer, this.offset + 246)}

    get pickpocketloot() { return new DBCIntCell(this, this.buffer, this.offset + 250)}

    get skinloot() { return new DBCIntCell(this, this.buffer, this.offset + 254)}

    get PetSpellDataId() { return new DBCIntCell(this, this.buffer, this.offset + 258)}

    get VehicleId() { return new DBCIntCell(this, this.buffer, this.offset + 262)}

    get mingold() { return new DBCIntCell(this, this.buffer, this.offset + 268)}

    get maxgold() { return new DBCIntCell(this, this.buffer, this.offset + 272)}

    get AIName() { return new DBCStringCell(this, this.buffer, this.offset + 276)}

    get MovementType() { return new DBCIntCell(this, this.buffer, this.offset + 280)}

    get HoverHeight() { return new DBCFloatCell(this, this.buffer, this.offset + 284)}

    get HealthModifier() { return new DBCFloatCell(this, this.buffer, this.offset + 288)}

    get ManaModifier() { return new DBCFloatCell(this, this.buffer, this.offset + 292)}

    get ArmorModifier() { return new DBCFloatCell(this, this.buffer, this.offset + 296)}

    get DamageModifier() { return new DBCFloatCell(this, this.buffer, this.offset + 300)}

    get ExperienceModifier() { return new DBCFloatCell(this, this.buffer, this.offset + 304)}

    get RacialLeader() { return new DBCIntCell(this, this.buffer, this.offset + 308)}

    get movementId() { return new DBCIntCell(this, this.buffer, this.offset + 312)}

    get RegenHealth() { return new DBCIntCell(this, this.buffer, this.offset + 316)}

    get mechanic_immune_mask() { return new DBCIntCell(this, this.buffer, this.offset + 320)}

    get spell_school_immune_mask() { return new DBCIntCell(this, this.buffer, this.offset + 324)}

    get flags_extra() { return new DBCIntCell(this, this.buffer, this.offset + 328)}

    get ScriptName() { return new DBCStringCell(this, this.buffer, this.offset + 332)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : CreatureTemplateCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type CreatureTemplateCreator = {
}

/**
 * Used for queries (Don't comment these)
 */
export type CreatureTemplateQuery = {
    entry? : Relation<int>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class CreatureTemplateDBCFile extends DBCFile<
    CreatureTemplateRow,
    CreatureTemplateQuery,
    CreatureTemplateRow> {
    constructor() {
        super('CreatureTemplate',(t,b,o)=>new CreatureTemplateRow(t,b,o))
    }
    /** Loads a new CreatureTemplate.dbc from a file. */
    static read(path: string): CreatureTemplateDBCFile {
        return new CreatureTemplateDBCFile().read(path);
    }

    add(entry : int, c? : CreatureTemplateCreator) : CreatureTemplateRow {
        return this.makeRow(0).clone(entry,c)
    }

    findById(id: number) {
        return this.fastSearch(id);
    }
}