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
import { float, int } from '../../data/primitives'
import { Relation } from '../../data/query/Relations'
import { PrimaryKey } from '../../data/table/PrimaryKey'
import { DBCFloatCell, DBCIntCell, DBCKeyCell } from '../../data/dbc/DBCCell'
import { DBCFile } from '../../data/dbc/DBCFile'
import { DBCRow } from '../../data/dbc/DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class SpellVisualRow extends DBCRow<SpellVisualCreator,SpellVisualQuery> {
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
    get PrecastKit() { return new DBCIntCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get CastKit() { return new DBCIntCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get ImpactKit() { return new DBCIntCell(this,this.buffer,this.offset+12)}

    /**
     * No comment (yet!)
     */
    get StateKit() { return new DBCIntCell(this,this.buffer,this.offset+16)}

    /**
     * No comment (yet!)
     */
    get StateDoneKit() { return new DBCIntCell(this,this.buffer,this.offset+20)}

    /**
     * No comment (yet!)
     */
    get ChannelKit() { return new DBCIntCell(this,this.buffer,this.offset+24)}

    /**
     * No comment (yet!)
     */
    get HasMissile() { return new DBCIntCell(this,this.buffer,this.offset+28)}

    /**
     * No comment (yet!)
     */
    get MissileModel() { return new DBCIntCell(this,this.buffer,this.offset+32)}

    /**
     * No comment (yet!)
     */
    get MissilePathType() { return new DBCIntCell(this,this.buffer,this.offset+36)}

    /**
     * No comment (yet!)
     */
    get MissileDestinationAttachment() { return new DBCIntCell(this,this.buffer,this.offset+40)}

    /**
     * No comment (yet!)
     */
    get MissileSound() { return new DBCIntCell(this,this.buffer,this.offset+44)}

    /**
     * No comment (yet!)
     */
    get AnimEventSoundID() { return new DBCIntCell(this,this.buffer,this.offset+48)}

    /**
     * No comment (yet!)
     */
    get Flags() { return new DBCIntCell(this,this.buffer,this.offset+52)}

    /**
     * No comment (yet!)
     */
    get CasterImpactKit() { return new DBCIntCell(this,this.buffer,this.offset+56)}

    /**
     * No comment (yet!)
     */
    get TargetImpactKit() { return new DBCIntCell(this,this.buffer,this.offset+60)}

    /**
     * No comment (yet!)
     */
    get MissileAttachment() { return new DBCIntCell(this,this.buffer,this.offset+64)}

    /**
     * No comment (yet!)
     */
    get MissileFollowGroundHeight() { return new DBCIntCell(this,this.buffer,this.offset+68)}

    /**
     * No comment (yet!)
     */
    get MissileFollowGroundDropSpeed() { return new DBCIntCell(this,this.buffer,this.offset+72)}

    /**
     * No comment (yet!)
     */
    get MissileFollowGroundApproach() { return new DBCIntCell(this,this.buffer,this.offset+76)}

    /**
     * No comment (yet!)
     */
    get MissileFollowGroundFlags() { return new DBCIntCell(this,this.buffer,this.offset+80)}

    /**
     * No comment (yet!)
     */
    get MissileMotion() { return new DBCIntCell(this,this.buffer,this.offset+84)}

    /**
     * No comment (yet!)
     */
    get MissileTargetingKit() { return new DBCIntCell(this,this.buffer,this.offset+88)}

    /**
     * No comment (yet!)
     */
    get InstantAreaKit() { return new DBCIntCell(this,this.buffer,this.offset+92)}

    /**
     * No comment (yet!)
     */
    get ImpactAreaKit() { return new DBCIntCell(this,this.buffer,this.offset+96)}

    /**
     * No comment (yet!)
     */
    get PersistentAreaKit() { return new DBCIntCell(this,this.buffer,this.offset+100)}

    /**
     * No comment (yet!)
     */
    get MissileCastOffsetX() { return new DBCFloatCell(this,this.buffer,this.offset+104)}

    /**
     * No comment (yet!)
     */
    get MissileCastOffsetY() { return new DBCFloatCell(this,this.buffer,this.offset+108)}

    /**
     * No comment (yet!)
     */
    get MissileCastOffsetZ() { return new DBCFloatCell(this,this.buffer,this.offset+112)}

    /**
     * No comment (yet!)
     */
    get MissileImpactOffsetX() { return new DBCFloatCell(this,this.buffer,this.offset+116)}

    /**
     * No comment (yet!)
     */
    get MissileImpactOffsetY() { return new DBCFloatCell(this,this.buffer,this.offset+120)}

    /**
     * No comment (yet!)
     */
    get MissileImpactOffsetZ() { return new DBCFloatCell(this,this.buffer,this.offset+124)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : SpellVisualCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type SpellVisualCreator = {
    PrecastKit?: int
    CastKit?: int
    ImpactKit?: int
    StateKit?: int
    StateDoneKit?: int
    ChannelKit?: int
    HasMissile?: int
    MissileModel?: int
    MissilePathType?: int
    MissileDestinationAttachment?: int
    MissileSound?: int
    AnimEventSoundID?: int
    Flags?: int
    CasterImpactKit?: int
    TargetImpactKit?: int
    MissileAttachment?: int
    MissileFollowGroundHeight?: int
    MissileFollowGroundDropSpeed?: int
    MissileFollowGroundApproach?: int
    MissileFollowGroundFlags?: int
    MissileMotion?: int
    MissileTargetingKit?: int
    InstantAreaKit?: int
    ImpactAreaKit?: int
    PersistentAreaKit?: int
    MissileCastOffsetX?: float
    MissileCastOffsetY?: float
    MissileCastOffsetZ?: float
    MissileImpactOffsetX?: float
    MissileImpactOffsetY?: float
    MissileImpactOffsetZ?: float
}

/**
 * Used for queries (Don't comment these)
 */
export type SpellVisualQuery = {
    ID? : Relation<int>
    PrecastKit? : Relation<int>
    CastKit? : Relation<int>
    ImpactKit? : Relation<int>
    StateKit? : Relation<int>
    StateDoneKit? : Relation<int>
    ChannelKit? : Relation<int>
    HasMissile? : Relation<int>
    MissileModel? : Relation<int>
    MissilePathType? : Relation<int>
    MissileDestinationAttachment? : Relation<int>
    MissileSound? : Relation<int>
    AnimEventSoundID? : Relation<int>
    Flags? : Relation<int>
    CasterImpactKit? : Relation<int>
    TargetImpactKit? : Relation<int>
    MissileAttachment? : Relation<int>
    MissileFollowGroundHeight? : Relation<int>
    MissileFollowGroundDropSpeed? : Relation<int>
    MissileFollowGroundApproach? : Relation<int>
    MissileFollowGroundFlags? : Relation<int>
    MissileMotion? : Relation<int>
    MissileTargetingKit? : Relation<int>
    InstantAreaKit? : Relation<int>
    ImpactAreaKit? : Relation<int>
    PersistentAreaKit? : Relation<int>
    MissileCastOffsetX? : Relation<float>
    MissileCastOffsetY? : Relation<float>
    MissileCastOffsetZ? : Relation<float>
    MissileImpactOffsetX? : Relation<float>
    MissileImpactOffsetY? : Relation<float>
    MissileImpactOffsetZ? : Relation<float>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class SpellVisualDBCFile extends DBCFile<
    SpellVisualCreator,
    SpellVisualQuery,
    SpellVisualRow> {
    constructor() {
        super('SpellVisual',(t,b,o)=>new SpellVisualRow(t,b,o))
    }
    /** Loads a new SpellVisual.dbc from a file. */
    static read(path: string): SpellVisualDBCFile {
        return new SpellVisualDBCFile().read(path);
    }
    add(ID : int, c? : SpellVisualCreator) : SpellVisualRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}