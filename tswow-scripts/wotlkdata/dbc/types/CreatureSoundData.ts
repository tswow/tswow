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
import { float, int } from '../../primitives'
import { Relation } from '../../query/Relations'
import { PrimaryKey } from '../../table/PrimaryKey'
import { DBCFloatCell, DBCIntArrayCell, DBCIntCell, DBCKeyCell } from '../DBCCell'
import { DBCFile } from '../DBCFile'
import { DBCRow } from '../DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class CreatureSoundDataRow extends DBCRow<CreatureSoundDataCreator,CreatureSoundDataQuery> {
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
    get SoundExertionID() { return new DBCIntCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get SoundExertionCriticalID() { return new DBCIntCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get SoundInjuryID() { return new DBCIntCell(this,this.buffer,this.offset+12)}

    /**
     * No comment (yet!)
     */
    get SoundInjuryCriticalID() { return new DBCIntCell(this,this.buffer,this.offset+16)}

    /**
     * No comment (yet!)
     */
    get SoundInjuryCrushingBlowID() { return new DBCIntCell(this,this.buffer,this.offset+20)}

    /**
     * No comment (yet!)
     */
    get SoundDeathID() { return new DBCIntCell(this,this.buffer,this.offset+24)}

    /**
     * No comment (yet!)
     */
    get SoundStunID() { return new DBCIntCell(this,this.buffer,this.offset+28)}

    /**
     * No comment (yet!)
     */
    get SoundStandID() { return new DBCIntCell(this,this.buffer,this.offset+32)}

    /**
     * No comment (yet!)
     */
    get SoundFootstepID() { return new DBCIntCell(this,this.buffer,this.offset+36)}

    /**
     * No comment (yet!)
     */
    get SoundAggroID() { return new DBCIntCell(this,this.buffer,this.offset+40)}

    /**
     * No comment (yet!)
     */
    get SoundWingFlapID() { return new DBCIntCell(this,this.buffer,this.offset+44)}

    /**
     * No comment (yet!)
     */
    get SoundWingGlideID() { return new DBCIntCell(this,this.buffer,this.offset+48)}

    /**
     * No comment (yet!)
     */
    get SoundAlertID() { return new DBCIntCell(this,this.buffer,this.offset+52)}

    /**
     * No comment (yet!)
     */
    get SoundFidget() { return new DBCIntArrayCell(this,5,this.buffer,this.offset+56)}

    /**
     * No comment (yet!)
     */
    get CustomAttack() { return new DBCIntArrayCell(this,4,this.buffer,this.offset+76)}

    /**
     * No comment (yet!)
     */
    get NPCSoundID() { return new DBCIntCell(this,this.buffer,this.offset+92)}

    /**
     * No comment (yet!)
     */
    get LoopSoundID() { return new DBCIntCell(this,this.buffer,this.offset+96)}

    /**
     * No comment (yet!)
     */
    get CreatureImpactType() { return new DBCIntCell(this,this.buffer,this.offset+100)}

    /**
     * No comment (yet!)
     */
    get SoundJumpStartID() { return new DBCIntCell(this,this.buffer,this.offset+104)}

    /**
     * No comment (yet!)
     */
    get SoundJumpEndID() { return new DBCIntCell(this,this.buffer,this.offset+108)}

    /**
     * No comment (yet!)
     */
    get SoundPetAttackID() { return new DBCIntCell(this,this.buffer,this.offset+112)}

    /**
     * No comment (yet!)
     */
    get SoundPetOrderID() { return new DBCIntCell(this,this.buffer,this.offset+116)}

    /**
     * No comment (yet!)
     */
    get SoundPetDismissID() { return new DBCIntCell(this,this.buffer,this.offset+120)}

    /**
     * No comment (yet!)
     */
    get FidgetDelaySecondsMin() { return new DBCFloatCell(this,this.buffer,this.offset+124)}

    /**
     * No comment (yet!)
     */
    get FidgetDelaySecondsMax() { return new DBCFloatCell(this,this.buffer,this.offset+128)}

    /**
     * No comment (yet!)
     */
    get BirthSoundID() { return new DBCIntCell(this,this.buffer,this.offset+132)}

    /**
     * No comment (yet!)
     */
    get SpellCastDirectedSoundID() { return new DBCIntCell(this,this.buffer,this.offset+136)}

    /**
     * No comment (yet!)
     */
    get SubmergeSoundID() { return new DBCIntCell(this,this.buffer,this.offset+140)}

    /**
     * No comment (yet!)
     */
    get SubmergedSoundID() { return new DBCIntCell(this,this.buffer,this.offset+144)}

    /**
     * No comment (yet!)
     */
    get CreatureSoundDataIDPet() { return new DBCIntCell(this,this.buffer,this.offset+148)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : CreatureSoundDataCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type CreatureSoundDataCreator = {
    SoundExertionID?: int
    SoundExertionCriticalID?: int
    SoundInjuryID?: int
    SoundInjuryCriticalID?: int
    SoundInjuryCrushingBlowID?: int
    SoundDeathID?: int
    SoundStunID?: int
    SoundStandID?: int
    SoundFootstepID?: int
    SoundAggroID?: int
    SoundWingFlapID?: int
    SoundWingGlideID?: int
    SoundAlertID?: int
    SoundFidget?: int[]
    CustomAttack?: int[]
    NPCSoundID?: int
    LoopSoundID?: int
    CreatureImpactType?: int
    SoundJumpStartID?: int
    SoundJumpEndID?: int
    SoundPetAttackID?: int
    SoundPetOrderID?: int
    SoundPetDismissID?: int
    FidgetDelaySecondsMin?: float
    FidgetDelaySecondsMax?: float
    BirthSoundID?: int
    SpellCastDirectedSoundID?: int
    SubmergeSoundID?: int
    SubmergedSoundID?: int
    CreatureSoundDataIDPet?: int
}

/**
 * Used for queries (Don't comment these)
 */
export type CreatureSoundDataQuery = {
    ID? : Relation<int>
    SoundExertionID? : Relation<int>
    SoundExertionCriticalID? : Relation<int>
    SoundInjuryID? : Relation<int>
    SoundInjuryCriticalID? : Relation<int>
    SoundInjuryCrushingBlowID? : Relation<int>
    SoundDeathID? : Relation<int>
    SoundStunID? : Relation<int>
    SoundStandID? : Relation<int>
    SoundFootstepID? : Relation<int>
    SoundAggroID? : Relation<int>
    SoundWingFlapID? : Relation<int>
    SoundWingGlideID? : Relation<int>
    SoundAlertID? : Relation<int>
    SoundFidget? : Relation<int>
    CustomAttack? : Relation<int>
    NPCSoundID? : Relation<int>
    LoopSoundID? : Relation<int>
    CreatureImpactType? : Relation<int>
    SoundJumpStartID? : Relation<int>
    SoundJumpEndID? : Relation<int>
    SoundPetAttackID? : Relation<int>
    SoundPetOrderID? : Relation<int>
    SoundPetDismissID? : Relation<int>
    FidgetDelaySecondsMin? : Relation<float>
    FidgetDelaySecondsMax? : Relation<float>
    BirthSoundID? : Relation<int>
    SpellCastDirectedSoundID? : Relation<int>
    SubmergeSoundID? : Relation<int>
    SubmergedSoundID? : Relation<int>
    CreatureSoundDataIDPet? : Relation<int>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class CreatureSoundDataDBCFile extends DBCFile<
    CreatureSoundDataCreator,
    CreatureSoundDataQuery,
    CreatureSoundDataRow> {
    constructor() {
        super('CreatureSoundData',(t,b,o)=>new CreatureSoundDataRow(t,b,o))
    }
    /** Loads a new CreatureSoundData.dbc from a file. */
    static read(path: string): CreatureSoundDataDBCFile {
        return new CreatureSoundDataDBCFile().read(path);
    }
    add(ID : int, c? : CreatureSoundDataCreator) : CreatureSoundDataRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}