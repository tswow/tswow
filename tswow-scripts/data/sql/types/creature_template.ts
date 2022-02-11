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
import { char, float, int, mediumint, smallint, tinyint } from '../../primitives'
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
export class creature_templateRow extends SqlRow<creature_templateCreator,creature_templateQuery> {
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
    get difficulty_entry_1() {return new SQLCell<mediumint, this>(this, 'difficulty_entry_1')}

    /**
     * No comment (yet!)
     */
    get difficulty_entry_2() {return new SQLCell<mediumint, this>(this, 'difficulty_entry_2')}

    /**
     * No comment (yet!)
     */
    get difficulty_entry_3() {return new SQLCell<mediumint, this>(this, 'difficulty_entry_3')}

    /**
     * No comment (yet!)
     */
    get KillCredit1() {return new SQLCell<int, this>(this, 'KillCredit1')}

    /**
     * No comment (yet!)
     */
    get KillCredit2() {return new SQLCell<int, this>(this, 'KillCredit2')}

    /**
     * No comment (yet!)
     */
    get modelid1() {return new SQLCell<mediumint, this>(this, 'modelid1')}

    /**
     * No comment (yet!)
     */
    get modelid2() {return new SQLCell<mediumint, this>(this, 'modelid2')}

    /**
     * No comment (yet!)
     */
    get modelid3() {return new SQLCell<mediumint, this>(this, 'modelid3')}

    /**
     * No comment (yet!)
     */
    get modelid4() {return new SQLCell<mediumint, this>(this, 'modelid4')}

    /**
     * No comment (yet!)
     */
    get name() {return new SQLCell<char, this>(this, 'name')}

    /**
     * No comment (yet!)
     */
    get subname() {return new SQLCell<char, this>(this, 'subname')}

    /**
     * No comment (yet!)
     */
    get IconName() {return new SQLCell<char, this>(this, 'IconName')}

    /**
     * No comment (yet!)
     */
    get gossip_menu_id() {return new SQLCell<mediumint, this>(this, 'gossip_menu_id')}

    /**
     * No comment (yet!)
     */
    get minlevel() {return new SQLCell<tinyint, this>(this, 'minlevel')}

    /**
     * No comment (yet!)
     */
    get maxlevel() {return new SQLCell<tinyint, this>(this, 'maxlevel')}

    /**
     * No comment (yet!)
     */
    get exp() {return new SQLCell<smallint, this>(this, 'exp')}

    /**
     * No comment (yet!)
     */
    get faction() {return new SQLCell<smallint, this>(this, 'faction')}

    /**
     * No comment (yet!)
     */
    get npcflag() {return new SQLCell<int, this>(this, 'npcflag')}

    /**
     * No comment (yet!)
     */
    get speed_walk() {return new SQLCell<float, this>(this, 'speed_walk')}

    /**
     * No comment (yet!)
     */
    get speed_run() {return new SQLCell<float, this>(this, 'speed_run')}

    /**
     * No comment (yet!)
     */
    get scale() {return new SQLCell<float, this>(this, 'scale')}

    /**
     * No comment (yet!)
     */
    get rank() {return new SQLCell<tinyint, this>(this, 'rank')}

    /**
     * No comment (yet!)
     */
    get dmgschool() {return new SQLCell<tinyint, this>(this, 'dmgschool')}

    /**
     * No comment (yet!)
     */
    get BaseAttackTime() {return new SQLCell<int, this>(this, 'BaseAttackTime')}

    /**
     * No comment (yet!)
     */
    get RangeAttackTime() {return new SQLCell<int, this>(this, 'RangeAttackTime')}

    /**
     * No comment (yet!)
     */
    get BaseVariance() {return new SQLCell<float, this>(this, 'BaseVariance')}

    /**
     * No comment (yet!)
     */
    get RangeVariance() {return new SQLCell<float, this>(this, 'RangeVariance')}

    /**
     * No comment (yet!)
     */
    get unit_class() {return new SQLCell<tinyint, this>(this, 'unit_class')}

    /**
     * No comment (yet!)
     */
    get unit_flags() {return new SQLCell<int, this>(this, 'unit_flags')}

    /**
     * No comment (yet!)
     */
    get unit_flags2() {return new SQLCell<int, this>(this, 'unit_flags2')}

    /**
     * No comment (yet!)
     */
    get dynamicflags() {return new SQLCell<int, this>(this, 'dynamicflags')}

    /**
     * No comment (yet!)
     */
    get family() {return new SQLCell<tinyint, this>(this, 'family')}

    /**
     * No comment (yet!)
     */
    get type() {return new SQLCell<tinyint, this>(this, 'type')}

    /**
     * No comment (yet!)
     */
    get type_flags() {return new SQLCell<int, this>(this, 'type_flags')}

    /**
     * No comment (yet!)
     */
    get lootid() {return new SQLCell<mediumint, this>(this, 'lootid')}

    /**
     * No comment (yet!)
     */
    get pickpocketloot() {return new SQLCell<mediumint, this>(this, 'pickpocketloot')}

    /**
     * No comment (yet!)
     */
    get skinloot() {return new SQLCell<mediumint, this>(this, 'skinloot')}

    /**
     * No comment (yet!)
     */
    get PetSpellDataId() {return new SQLCell<mediumint, this>(this, 'PetSpellDataId')}

    /**
     * No comment (yet!)
     */
    get VehicleId() {return new SQLCell<mediumint, this>(this, 'VehicleId')}

    /**
     * No comment (yet!)
     */
    get mingold() {return new SQLCell<mediumint, this>(this, 'mingold')}

    /**
     * No comment (yet!)
     */
    get maxgold() {return new SQLCell<mediumint, this>(this, 'maxgold')}

    /**
     * No comment (yet!)
     */
    get AIName() {return new SQLCell<char, this>(this, 'AIName')}

    /**
     * No comment (yet!)
     */
    get MovementType() {return new SQLCell<tinyint, this>(this, 'MovementType')}

    /**
     * No comment (yet!)
     */
    get HoverHeight() {return new SQLCell<float, this>(this, 'HoverHeight')}

    /**
     * No comment (yet!)
     */
    get HealthModifier() {return new SQLCell<float, this>(this, 'HealthModifier')}

    /**
     * No comment (yet!)
     */
    get ManaModifier() {return new SQLCell<float, this>(this, 'ManaModifier')}

    /**
     * No comment (yet!)
     */
    get ArmorModifier() {return new SQLCell<float, this>(this, 'ArmorModifier')}

    /**
     * No comment (yet!)
     */
    get DamageModifier() {return new SQLCell<float, this>(this, 'DamageModifier')}

    /**
     * No comment (yet!)
     */
    get ExperienceModifier() {return new SQLCell<float, this>(this, 'ExperienceModifier')}

    /**
     * No comment (yet!)
     */
    get RacialLeader() {return new SQLCell<tinyint, this>(this, 'RacialLeader')}

    /**
     * No comment (yet!)
     */
    get movementId() {return new SQLCell<int, this>(this, 'movementId')}

    /**
     * No comment (yet!)
     */
    get RegenHealth() {return new SQLCell<tinyint, this>(this, 'RegenHealth')}

    /**
     * No comment (yet!)
     */
    get mechanic_immune_mask() {return new SQLCell<int, this>(this, 'mechanic_immune_mask')}

    /**
     * No comment (yet!)
     */
    get spell_school_immune_mask() {return new SQLCell<int, this>(this, 'spell_school_immune_mask')}

    /**
     * No comment (yet!)
     */
    get flags_extra() {return new SQLCell<int, this>(this, 'flags_extra')}

    /**
     * No comment (yet!)
     */
    get ScriptName() {return new SQLCell<char, this>(this, 'ScriptName')}

    /**
     * No comment (yet!)
     */
    get VerifiedBuild() {return new SQLCell<smallint, this>(this, 'VerifiedBuild')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(entry : mediumint, c? : creature_templateCreator) : this {
        return this.cloneInternal([entry],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type creature_templateCreator = {
    entry? : mediumint,
    difficulty_entry_1? : mediumint,
    difficulty_entry_2? : mediumint,
    difficulty_entry_3? : mediumint,
    KillCredit1? : int,
    KillCredit2? : int,
    modelid1? : mediumint,
    modelid2? : mediumint,
    modelid3? : mediumint,
    modelid4? : mediumint,
    name? : char,
    subname? : char,
    IconName? : char,
    gossip_menu_id? : mediumint,
    minlevel? : tinyint,
    maxlevel? : tinyint,
    exp? : smallint,
    faction? : smallint,
    npcflag? : int,
    speed_walk? : float,
    speed_run? : float,
    scale? : float,
    rank? : tinyint,
    dmgschool? : tinyint,
    BaseAttackTime? : int,
    RangeAttackTime? : int,
    BaseVariance? : float,
    RangeVariance? : float,
    unit_class? : tinyint,
    unit_flags? : int,
    unit_flags2? : int,
    dynamicflags? : int,
    family? : tinyint,
    type? : tinyint,
    type_flags? : int,
    lootid? : mediumint,
    pickpocketloot? : mediumint,
    skinloot? : mediumint,
    PetSpellDataId? : mediumint,
    VehicleId? : mediumint,
    mingold? : mediumint,
    maxgold? : mediumint,
    AIName? : char,
    MovementType? : tinyint,
    HoverHeight? : float,
    HealthModifier? : float,
    ManaModifier? : float,
    ArmorModifier? : float,
    DamageModifier? : float,
    ExperienceModifier? : float,
    RacialLeader? : tinyint,
    movementId? : int,
    RegenHealth? : tinyint,
    mechanic_immune_mask? : int,
    spell_school_immune_mask? : int,
    flags_extra? : int,
    ScriptName? : char,
    VerifiedBuild? : smallint,
}

/**
 * Used for object queries (Don't comment these)
 */
export type creature_templateQuery = {
    entry? : Relation<mediumint>,
    difficulty_entry_1? : Relation<mediumint>,
    difficulty_entry_2? : Relation<mediumint>,
    difficulty_entry_3? : Relation<mediumint>,
    KillCredit1? : Relation<int>,
    KillCredit2? : Relation<int>,
    modelid1? : Relation<mediumint>,
    modelid2? : Relation<mediumint>,
    modelid3? : Relation<mediumint>,
    modelid4? : Relation<mediumint>,
    name? : Relation<char>,
    subname? : Relation<char>,
    IconName? : Relation<char>,
    gossip_menu_id? : Relation<mediumint>,
    minlevel? : Relation<tinyint>,
    maxlevel? : Relation<tinyint>,
    exp? : Relation<smallint>,
    faction? : Relation<smallint>,
    npcflag? : Relation<int>,
    speed_walk? : Relation<float>,
    speed_run? : Relation<float>,
    scale? : Relation<float>,
    rank? : Relation<tinyint>,
    dmgschool? : Relation<tinyint>,
    BaseAttackTime? : Relation<int>,
    RangeAttackTime? : Relation<int>,
    BaseVariance? : Relation<float>,
    RangeVariance? : Relation<float>,
    unit_class? : Relation<tinyint>,
    unit_flags? : Relation<int>,
    unit_flags2? : Relation<int>,
    dynamicflags? : Relation<int>,
    family? : Relation<tinyint>,
    type? : Relation<tinyint>,
    type_flags? : Relation<int>,
    lootid? : Relation<mediumint>,
    pickpocketloot? : Relation<mediumint>,
    skinloot? : Relation<mediumint>,
    PetSpellDataId? : Relation<mediumint>,
    VehicleId? : Relation<mediumint>,
    mingold? : Relation<mediumint>,
    maxgold? : Relation<mediumint>,
    AIName? : Relation<char>,
    MovementType? : Relation<tinyint>,
    HoverHeight? : Relation<float>,
    HealthModifier? : Relation<float>,
    ManaModifier? : Relation<float>,
    ArmorModifier? : Relation<float>,
    DamageModifier? : Relation<float>,
    ExperienceModifier? : Relation<float>,
    RacialLeader? : Relation<tinyint>,
    movementId? : Relation<int>,
    RegenHealth? : Relation<tinyint>,
    mechanic_immune_mask? : Relation<int>,
    spell_school_immune_mask? : Relation<int>,
    flags_extra? : Relation<int>,
    ScriptName? : Relation<char>,
    VerifiedBuild? : Relation<smallint>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class creature_templateTable extends SqlTable<
    creature_templateCreator,
    creature_templateQuery,
    creature_templateRow> {
    add(entry : mediumint, c? : creature_templateCreator) : creature_templateRow {
        const first = this.first();
        if(first) return first.clone(entry,c)
        else return this.rowCreator(this, {}).clone(entry,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_creature_template = new creature_templateTable(
    'creature_template',
    (table, obj)=>new creature_templateRow(table, obj))