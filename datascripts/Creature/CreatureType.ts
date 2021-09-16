/*
 * This file is part of tswow (https://github.com/tswow)
 *
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
import { EnumCell, EnumCellReadOnly } from "wotlkdata/cell/cells/EnumCell";
import { MaskCell32, MaskCell32ReadOnly } from "wotlkdata/cell/cells/MaskCell";

export class CreatureTypeEnum<T> extends EnumCell<T> {
    get None()         { return this.value(0) }
    get Beast()        { return this.value(1) }
    get Dragonkin()    { return this.value(2) }
    get Demon()        { return this.value(3) }
    get Elemental()    { return this.value(4) }
    get Giant()        { return this.value(5) }
    get Undead()       { return this.value(6) }
    get Humanoid()     { return this.value(7) }
    get Critter()      { return this.value(8) }
    get Mechanical()   { return this.value(9) }
    get NotSpecified() { return this.value(10) }
    get Totem()        { return this.value(11) }
    get NonCombatPet() { return this.value(12) }
    get GasCloud()     { return this.value(13) }
    get WildPet()      { return this.value(14) }
    get Aberration()   { return this.value(15) }
}

export class CreatureTypeEnumReadOnly<T> extends EnumCellReadOnly<T> {
    get None()         { return this.value(0) }
    get Beast()        { return this.value(1) }
    get Dragonkin()    { return this.value(2) }
    get Demon()        { return this.value(3) }
    get Elemental()    { return this.value(4) }
    get Giant()        { return this.value(5) }
    get Undead()       { return this.value(6) }
    get Humanoid()     { return this.value(7) }
    get Critter()      { return this.value(8) }
    get Mechanical()   { return this.value(9) }
    get NotSpecified() { return this.value(10) }
    get Totem()        { return this.value(11) }
    get NonCombatPet() { return this.value(12) }
    get GasCloud()     { return this.value(13) }
    get WildPet()      { return this.value(14) }
    get Aberration()   { return this.value(15) }
}

export enum CreatureTypes {
      CREATURE_TYPE_NONE           = 0x1
    , CREATURE_TYPE_BEAST          = 0x2
    , CREATURE_TYPE_DRAGONKIN      = 0x4
    , CREATURE_TYPE_DEMON          = 0x8
    , CREATURE_TYPE_ELEMENTAL      = 0x10
    , CREATURE_TYPE_GIANT          = 0x20
    , CREATURE_TYPE_UNDEAD         = 0x40
    , CREATURE_TYPE_HUMANOID       = 0x80
    , CREATURE_TYPE_CRITTER        = 0x100
    , CREATURE_TYPE_MECHANICAL     = 0x200
    , CREATURE_TYPE_NOT_SPECIFIED  = 0x400
    , CREATURE_TYPE_TOTEM          = 0x800
    , CREATURE_TYPE_NON_COMBAT_PET = 0x1000
    , CREATURE_TYPE_GAS_CLOUD      = 0x2000
    , CREATURE_TYPE_WILD_PET       = 0x4000
    , CREATURE_TYPE_ABERRATION     = 0x8000
}

export type CreatureType = keyof typeof CreatureTypes

export class CreatureTypeMask<T> extends MaskCell32<T> {
    get None()         { return this.bit(0); }
    get Beast()        { return this.bit(1); }
    get Dragonkin()    { return this.bit(2); }
    get Demon()        { return this.bit(3); }
    get Elemental()    { return this.bit(4); }
    get Giant()        { return this.bit(5); }
    get Undead()       { return this.bit(6); }
    get Humanoid()     { return this.bit(7); }
    get Critter()      { return this.bit(8); }
    get Mechanical()   { return this.bit(9); }
    get NotSpecified() { return this.bit(10); }
    get Totem()        { return this.bit(11); }
    get NonCombatPet() { return this.bit(12); }
    get GasCloud()     { return this.bit(13); }
    get WildPet()      { return this.bit(14); }
    get Aberration()   { return this.bit(15); }
}

export class CreatureTypeMaskReadOnly<T> extends MaskCell32ReadOnly<T> {
    get None()         { return this.bit(0); }
    get Beast()        { return this.bit(1); }
    get Dragonkin()    { return this.bit(2); }
    get Demon()        { return this.bit(3); }
    get Elemental()    { return this.bit(4); }
    get Giant()        { return this.bit(5); }
    get Undead()       { return this.bit(6); }
    get Humanoid()     { return this.bit(7); }
    get Critter()      { return this.bit(8); }
    get Mechanical()   { return this.bit(9); }
    get NotSpecified() { return this.bit(10); }
    get Totem()        { return this.bit(11); }
    get NonCombatPet() { return this.bit(12); }
    get GasCloud()     { return this.bit(13); }
    get WildPet()      { return this.bit(14); }
    get Aberration()   { return this.bit(15); }
}

export function makeCreatureTypeMask(types: CreatureType[]) {
    return types.reduce((p,c)=>p|CreatureTypes[c],0);
}