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
import { DBCFloatCell, DBCIntCell, DBCKeyCell, DBCLocCell, DBCStringCell, DBCUIntCell } from '../../data/dbc/DBCCell'
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

    get difficulty_entry_1() { return new DBCUIntCell(this,this.buffer,this.offset+4)}
    get difficulty_entry_2() { return new DBCUIntCell(this,this.buffer,this.offset+8)}
    get difficulty_entry_3() { return new DBCUIntCell(this,this.buffer,this.offset+12)}

    get KillCredit1() { return new DBCUIntCell(this, this.buffer, this.offset+16)}
    get KillCredit2() { return new DBCUIntCell(this, this.buffer, this.offset+20)}

    get modelid1() { return new DBCUIntCell(this, this.buffer, this.offset + 24)}
    get modelid2() { return new DBCUIntCell(this, this.buffer, this.offset + 28)}
    get modelid3() { return new DBCUIntCell(this, this.buffer, this.offset + 32)}
    get modelid4() { return new DBCUIntCell(this, this.buffer, this.offset + 36)}

    get name() { return new DBCLocCell(this, this.buffer, this.offset + 40)}

    get subname() { return new DBCLocCell(this, this.buffer, this.offset + 108)}

    get IconName() { return new DBCStringCell(this, this.buffer, this.offset + 176)}

    get gossip_menu_id() { return new DBCUIntCell(this, this.buffer, this.offset + 180)}

    get minlevel() { return new DBCUIntCell(this, this.buffer, this.offset + 184)}

    get maxlevel() { return new DBCUIntCell(this, this.buffer, this.offset + 188)}

    get exp() { return new DBCIntCell(this, this.buffer, this.offset + 192)}

    get faction() { return new DBCUIntCell(this, this.buffer, this.offset + 196)}

    get npcflag() { return new DBCUIntCell(this, this.buffer, this.offset + 200)}

    get speed_walk() { return new DBCFloatCell(this, this.buffer, this.offset + 204)}

    get speed_run() { return new DBCFloatCell(this, this.buffer, this.offset + 208)}

    get scale() { return new DBCFloatCell(this, this.buffer, this.offset + 212)}

    get rank() { return new DBCUIntCell(this, this.buffer, this.offset + 216)}

    get dmgschool() { return new DBCIntCell(this, this.buffer, this.offset + 220)}

    get BaseAttackTime() { return new DBCUIntCell(this, this.buffer, this.offset + 224)}

    get RangeAttackTime() { return new DBCUIntCell(this, this.buffer, this.offset + 228)}

    get BaseVariance() { return new DBCFloatCell(this, this.buffer, this.offset + 232)}

    get RangeVariance() { return new DBCFloatCell(this, this.buffer, this.offset + 236)}

    get unit_class() { return new DBCUIntCell(this, this.buffer, this.offset + 240)}

    get unit_flags() { return new DBCUIntCell(this, this.buffer, this.offset + 244)}

    get unit_flags2() { return new DBCUIntCell(this, this.buffer, this.offset + 248)}

    get dynamicflags() { return new DBCUIntCell(this, this.buffer, this.offset + 252)}

    get family() { return new DBCIntCell(this, this.buffer, this.offset + 256)}

    get type() { return new DBCUIntCell(this, this.buffer, this.offset + 260)}

    get type_flags() { return new DBCUIntCell(this, this.buffer, this.offset + 264)}

    get lootid() { return new DBCUIntCell(this, this.buffer, this.offset + 268)}

    get pickpocketloot() { return new DBCUIntCell(this, this.buffer, this.offset + 272)}

    get skinloot() { return new DBCUIntCell(this, this.buffer, this.offset + 276)}

    get PetSpellDataId() { return new DBCUIntCell(this, this.buffer, this.offset + 280)}

    get VehicleId() { return new DBCUIntCell(this, this.buffer, this.offset + 284)}

    get mingold() { return new DBCUIntCell(this, this.buffer, this.offset + 288)}

    get maxgold() { return new DBCUIntCell(this, this.buffer, this.offset + 292)}

    get AIName() { return new DBCStringCell(this, this.buffer, this.offset + 296)}

    get MovementType() { return new DBCUIntCell(this, this.buffer, this.offset + 300)}

    get HoverHeight() { return new DBCFloatCell(this, this.buffer, this.offset + 304)}

    get HealthModifier() { return new DBCFloatCell(this, this.buffer, this.offset + 308)}

    get ManaModifier() { return new DBCFloatCell(this, this.buffer, this.offset + 312)}

    get ArmorModifier() { return new DBCFloatCell(this, this.buffer, this.offset + 316)}

    get DamageModifier() { return new DBCFloatCell(this, this.buffer, this.offset + 320)}

    get ExperienceModifier() { return new DBCFloatCell(this, this.buffer, this.offset + 324)}

    get RacialLeader() { return new DBCUIntCell(this, this.buffer, this.offset + 328)}

    get movementId() { return new DBCUIntCell(this, this.buffer, this.offset + 332)}

    get RegenHealth() { return new DBCUIntCell(this, this.buffer, this.offset + 336)}

    get mechanic_immune_mask() { return new DBCUIntCell(this, this.buffer, this.offset + 340)}

    get spell_school_immune_mask() { return new DBCUIntCell(this, this.buffer, this.offset + 344)}

    get flags_extra() { return new DBCUIntCell(this, this.buffer, this.offset + 348)}

    get ScriptName() { return new DBCStringCell(this, this.buffer, this.offset + 352)}

    static SIZE = 356;

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
 * @todo These have the wrong sign/number types, but they aren't enforced.
 */
export type CreatureTemplateCreator = {
    entry? : int32,
    difficulty_entry_1? : int32,
    difficulty_entry_2? : int32,
    difficulty_entry_3? : int32,
    KillCredit1? : int32,
    KillCredit2? : int32,
    modelid1? : int32,
    modelid2? : int32,
    modelid3? : int32,
    modelid4? : int32,
    name? : string,
    subname? : string,
    IconName? : string,
    gossip_menu_id? : int32,
    minlevel? : int32,
    maxlevel? : int32,
    exp? : int32,
    faction? : int32,
    npcflag? : int32,
    speed_walk? : float,
    speed_run? : float,
    scale? : float,
    rank? : int32,
    dmgschool? : int32,
    BaseAttackTime? : int32,
    RangeAttackTime? : int32,
    BaseVariance? : float,
    RangeVariance? : float,
    unit_class? : int32,
    unit_flags? : int32,
    unit_flags2? : int32,
    dynamicflags? : int32,
    family? : int32,
    type? : int32,
    type_flags? : int32,
    lootid? : int32,
    pickpocketloot? : int32,
    skinloot? : int32,
    PetSpellDataId? : int32,
    VehicleId? : int32,
    mingold? : int32,
    maxgold? : int32,
    AIName? : string,
    MovementType? : int32,
    HoverHeight? : float,
    HealthModifier? : float,
    ManaModifier? : float,
    ArmorModifier? : float,
    DamageModifier? : float,
    ExperienceModifier? : float,
    RacialLeader? : int32,
    movementId? : int32,
    RegenHealth? : int32,
    mechanic_immune_mask? : int32,
    spell_school_immune_mask? : int32,
    flags_extra? : int32,
    ScriptName? : string,
}

/**
 * Used for queries (Don't comment these)
 * @todo These have the wrong sign/number types, but they aren't enforced.
 */
export type CreatureTemplateQuery = {
    entry? : Relation<int32>
    difficulty_entry_1? : Relation<int32>,
    difficulty_entry_2? : Relation<int32>,
    difficulty_entry_3? : Relation<int32>,
    KillCredit1? : Relation<int32>,
    KillCredit2? : Relation<int32>,
    modelid1? : Relation<int32>,
    modelid2? : Relation<int32>,
    modelid3? : Relation<int32>,
    modelid4? : Relation<int32>,
    name? : Relation<string>,
    subname? : Relation<string>,
    IconName? : Relation<string>,
    gossip_menu_id? : Relation<int32>,
    minlevel? : Relation<int32>,
    maxlevel? : Relation<int32>,
    exp? : Relation<int32>,
    faction? : Relation<int32>,
    npcflag? : Relation<int32>,
    speed_walk? : Relation<float>,
    speed_run? : Relation<float>,
    scale? : Relation<float>,
    rank? : Relation<int32>,
    dmgschool? : Relation<int32>,
    BaseAttackTime? : Relation<int32>,
    RangeAttackTime? : Relation<int32>,
    BaseVariance? : Relation<float>,
    RangeVariance? : Relation<float>,
    unit_class? : Relation<int32>,
    unit_flags? : Relation<int32>,
    unit_flags2? : Relation<int32>,
    dynamicflags? : Relation<int32>,
    family? : Relation<int32>,
    type? : Relation<int32>,
    type_flags? : Relation<int32>,
    lootid? : Relation<int32>,
    pickpocketloot? : Relation<int32>,
    skinloot? : Relation<int32>,
    PetSpellDataId? : Relation<int32>,
    VehicleId? : Relation<int32>,
    mingold? : Relation<int32>,
    maxgold? : Relation<int32>,
    AIName? : Relation<string>,
    MovementType? : Relation<int32>,
    HoverHeight? : Relation<float>,
    HealthModifier? : Relation<float>,
    ManaModifier? : Relation<float>,
    ArmorModifier? : Relation<float>,
    DamageModifier? : Relation<float>,
    ExperienceModifier? : Relation<float>,
    RacialLeader? : Relation<int32>,
    movementId? : Relation<int>,
    RegenHealth? : Relation<int32>,
    mechanic_immune_mask? : Relation<int32>,
    spell_school_immune_mask? : Relation<int32>,
    flags_extra? : Relation<int32>,
    ScriptName? : Relation<string>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class CreatureTemplateDBCFile extends DBCFile<
    CreatureTemplateCreator,
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