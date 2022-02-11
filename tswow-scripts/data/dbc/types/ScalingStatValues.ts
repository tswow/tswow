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
import { int } from '../../primitives'
import { Relation } from '../../query/Relations'
import { PrimaryKey } from '../../table/PrimaryKey'
import { DBCIntCell, DBCKeyCell } from '../DBCCell'
import { DBCFile } from '../DBCFile'
import { DBCRow } from '../DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class ScalingStatValuesRow extends DBCRow<ScalingStatValuesCreator,ScalingStatValuesQuery> {
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
    get Charlevel() { return new DBCIntCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get ShoulderBudget() { return new DBCIntCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get TrinketBudget() { return new DBCIntCell(this,this.buffer,this.offset+12)}

    /**
     * No comment (yet!)
     */
    get WeaponBudget1H() { return new DBCIntCell(this,this.buffer,this.offset+16)}

    /**
     * No comment (yet!)
     */
    get RangedBudget() { return new DBCIntCell(this,this.buffer,this.offset+20)}

    /**
     * No comment (yet!)
     */
    get ClothShoulderArmor() { return new DBCIntCell(this,this.buffer,this.offset+24)}

    /**
     * No comment (yet!)
     */
    get LeatherShoulderArmor() { return new DBCIntCell(this,this.buffer,this.offset+28)}

    /**
     * No comment (yet!)
     */
    get MailShoulderArmor() { return new DBCIntCell(this,this.buffer,this.offset+32)}

    /**
     * No comment (yet!)
     */
    get PlateShoulderArmor() { return new DBCIntCell(this,this.buffer,this.offset+36)}

    /**
     * No comment (yet!)
     */
    get WeaponDPS1H() { return new DBCIntCell(this,this.buffer,this.offset+40)}

    /**
     * No comment (yet!)
     */
    get WeaponDPS2H() { return new DBCIntCell(this,this.buffer,this.offset+44)}

    /**
     * No comment (yet!)
     */
    get SpellcasterDPS1H() { return new DBCIntCell(this,this.buffer,this.offset+48)}

    /**
     * No comment (yet!)
     */
    get SpellcasterDPS2H() { return new DBCIntCell(this,this.buffer,this.offset+52)}

    /**
     * No comment (yet!)
     */
    get RangedDPS() { return new DBCIntCell(this,this.buffer,this.offset+56)}

    /**
     * No comment (yet!)
     */
    get WandDPS() { return new DBCIntCell(this,this.buffer,this.offset+60)}

    /**
     * No comment (yet!)
     */
    get SpellPower() { return new DBCIntCell(this,this.buffer,this.offset+64)}

    /**
     * No comment (yet!)
     */
    get PrimaryBudget() { return new DBCIntCell(this,this.buffer,this.offset+68)}

    /**
     * No comment (yet!)
     */
    get TertiaryBudget() { return new DBCIntCell(this,this.buffer,this.offset+72)}

    /**
     * No comment (yet!)
     */
    get ClothCloakArmor() { return new DBCIntCell(this,this.buffer,this.offset+76)}

    /**
     * No comment (yet!)
     */
    get ClothChestArmor() { return new DBCIntCell(this,this.buffer,this.offset+80)}

    /**
     * No comment (yet!)
     */
    get LeatherChestArmor() { return new DBCIntCell(this,this.buffer,this.offset+84)}

    /**
     * No comment (yet!)
     */
    get MailChestArmor() { return new DBCIntCell(this,this.buffer,this.offset+88)}

    /**
     * No comment (yet!)
     */
    get PlateChestArmor() { return new DBCIntCell(this,this.buffer,this.offset+92)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : ScalingStatValuesCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type ScalingStatValuesCreator = {
    Charlevel?: int
    ShoulderBudget?: int
    TrinketBudget?: int
    WeaponBudget1H?: int
    RangedBudget?: int
    ClothShoulderArmor?: int
    LeatherShoulderArmor?: int
    MailShoulderArmor?: int
    PlateShoulderArmor?: int
    WeaponDPS1H?: int
    WeaponDPS2H?: int
    SpellcasterDPS1H?: int
    SpellcasterDPS2H?: int
    RangedDPS?: int
    WandDPS?: int
    SpellPower?: int
    PrimaryBudget?: int
    TertiaryBudget?: int
    ClothCloakArmor?: int
    ClothChestArmor?: int
    LeatherChestArmor?: int
    MailChestArmor?: int
    PlateChestArmor?: int
}

/**
 * Used for queries (Don't comment these)
 */
export type ScalingStatValuesQuery = {
    ID? : Relation<int>
    Charlevel? : Relation<int>
    ShoulderBudget? : Relation<int>
    TrinketBudget? : Relation<int>
    WeaponBudget1H? : Relation<int>
    RangedBudget? : Relation<int>
    ClothShoulderArmor? : Relation<int>
    LeatherShoulderArmor? : Relation<int>
    MailShoulderArmor? : Relation<int>
    PlateShoulderArmor? : Relation<int>
    WeaponDPS1H? : Relation<int>
    WeaponDPS2H? : Relation<int>
    SpellcasterDPS1H? : Relation<int>
    SpellcasterDPS2H? : Relation<int>
    RangedDPS? : Relation<int>
    WandDPS? : Relation<int>
    SpellPower? : Relation<int>
    PrimaryBudget? : Relation<int>
    TertiaryBudget? : Relation<int>
    ClothCloakArmor? : Relation<int>
    ClothChestArmor? : Relation<int>
    LeatherChestArmor? : Relation<int>
    MailChestArmor? : Relation<int>
    PlateChestArmor? : Relation<int>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class ScalingStatValuesDBCFile extends DBCFile<
    ScalingStatValuesCreator,
    ScalingStatValuesQuery,
    ScalingStatValuesRow> {
    constructor() {
        super('ScalingStatValues',(t,b,o)=>new ScalingStatValuesRow(t,b,o))
    }
    /** Loads a new ScalingStatValues.dbc from a file. */
    static read(path: string): ScalingStatValuesDBCFile {
        return new ScalingStatValuesDBCFile().read(path);
    }
    add(ID : int, c? : ScalingStatValuesCreator) : ScalingStatValuesRow {
        return this.makeRow(0).clone(ID,c)
    }
}