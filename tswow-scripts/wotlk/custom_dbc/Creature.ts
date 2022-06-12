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
import { DBCFloatCell, DBCIntCell, DBCKeyCell, DBCStringCell, DBCUIntCell } from '../../data/dbc/DBCCell'
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
export class CreatureRow extends DBCRow<CreatureCreator,CreatureQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get guid() { return new DBCKeyCell(this,this.buffer,this.offset+0)}

    /**
     * No comment (yet!)
     */
    get id() { return new DBCUIntCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get map() { return new DBCUIntCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get zoneId() { return new DBCUIntCell(this,this.buffer,this.offset+12)}

    /**
     * No comment (yet!)
     */
    get areaId() { return new DBCUIntCell(this,this.buffer,this.offset+16)}

    /**
     * No comment (yet!)
     */
    get spawnMask() { return new DBCUIntCell(this,this.buffer,this.offset+20)}

    /**
     * No comment (yet!)
     */
    get phaseMask() { return new DBCUIntCell(this,this.buffer,this.offset+24)}

    /**
     * No comment (yet!)
     */
    get modelid() { return new DBCUIntCell(this,this.buffer,this.offset+28)}

    /**
     * No comment (yet!)
     */
    get equipment_id() { return new DBCIntCell(this,this.buffer,this.offset+32)}

    /**
     * No comment (yet!)
     */
    get position_x() { return new DBCFloatCell(this,this.buffer,this.offset+36)}

    /**
     * No comment (yet!)
     */
    get position_y() { return new DBCFloatCell(this,this.buffer,this.offset+40)}

    /**
     * No comment (yet!)
     */
    get position_z() { return new DBCFloatCell(this,this.buffer,this.offset+44)}

    /**
     * No comment (yet!)
     */
    get orientation() { return new DBCFloatCell(this,this.buffer,this.offset+48)}

    /**
     * No comment (yet!)
     */
    get spawntimesecs() { return new DBCUIntCell(this,this.buffer,this.offset+52)}

    /**
     * No comment (yet!)
     */
    get wander_distance() { return new DBCFloatCell(this,this.buffer,this.offset+56)}

    /**
     * No comment (yet!)
     */
    get currentwaypoint() { return new DBCUIntCell(this,this.buffer,this.offset+60)}

    /**
     * No comment (yet!)
     */
    get curhealth() { return new DBCUIntCell(this,this.buffer,this.offset+64)}

    /**
     * No comment (yet!)
     */
    get curmana() { return new DBCUIntCell(this,this.buffer,this.offset+68)}

    /**
     * No comment (yet!)
     */
    get MovementType() { return new DBCUIntCell(this,this.buffer,this.offset+72)}

    /**
     * No comment (yet!)
     */
    get npcflag() { return new DBCUIntCell(this,this.buffer,this.offset+76)}

    /**
     * No comment (yet!)
     */
    get unit_flags() { return new DBCUIntCell(this,this.buffer,this.offset+80)}

    /**
     * No comment (yet!)
     */
    get dynamicflags() { return new DBCUIntCell(this,this.buffer,this.offset+84)}

    /**
     * No comment (yet!)
     */
    get ScriptName() { return new DBCStringCell(this,this.buffer,this.offset+88)}

    static SIZE = 92;

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : CreatureCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type CreatureCreator = {
    guid? : int32,
    id? : int32,
    map? : int32,
    zoneId? : int32,
    areaId? : int32,
    spawnMask? : int32,
    phaseMask? : int32,
    modelid? : int32,
    equipment_id? : int32,
    position_x? : float,
    position_y? : float,
    position_z? : float,
    orientation? : float,
    spawntimesecs? : int32,
    wander_distance? : float,
    currentwaypoint? : int32,
    curhealth? : int32,
    curmana? : int32,
    MovementType? : int32,
    npcflag? : int32,
    unit_flags? : int32,
    dynamicflags? : int32,
    ScriptName? : string,
    VerifiedBuild? : int32,
}

/**
 * Used for queries (Don't comment these)
 */
export type CreatureQuery = {
    guid? : Relation<int32>,
    id? : Relation<int32>,
    map? : Relation<int32>,
    zoneId? : Relation<int32>,
    areaId? : Relation<int32>,
    spawnMask? : Relation<int32>,
    phaseMask? : Relation<int32>,
    modelid? : Relation<int32>,
    equipment_id? : Relation<int32>,
    position_x? : Relation<float>,
    position_y? : Relation<float>,
    position_z? : Relation<float>,
    orientation? : Relation<float>,
    spawntimesecs? : Relation<int32>,
    wander_distance? : Relation<float>,
    currentwaypoint? : Relation<int32>,
    curhealth? : Relation<int32>,
    curmana? : Relation<int32>,
    MovementType? : Relation<int32>,
    npcflag? : Relation<int32>,
    unit_flags? : Relation<int32>,
    dynamicflags? : Relation<int32>,
    ScriptName? : Relation<string>,
    VerifiedBuild? : Relation<int32>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class CreatureDBCFile extends DBCFile<
    CreatureCreator,
    CreatureQuery,
    CreatureRow> {
    constructor() {
        super('Creature',(t,b,o)=>new CreatureRow(t,b,o))
    }
    /** Loads a new Creature.dbc from a file. */
    static read(path: string): CreatureDBCFile {
        return new CreatureDBCFile().read(path);
    }

    add(entry : int, c? : CreatureCreator) : CreatureRow {
        return this.makeRow(0).clone(entry,c)
    }

    findById(id: number) {
        return this.fastSearch(id);
    }
}