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
import { EnumCell } from "wotlkdata/cell/cells/EnumCell";
import { MaskCell32 } from "wotlkdata/cell/cells/MaskCell";

export class SpellEffectMechanicEnum<T> extends EnumCell<T> {
    /** Enum Value:                         0 */
    get None()          { return this.value(0) }
    /** Enum Value:                         1 */
    get Charmed()       { return this.value(1) }
    /** Enum Value:                         2 */
    get Disoriented()   { return this.value(2) }
    /** Enum Value:                         3 */
    get Disarmed()      { return this.value(3) }
    /** Enum Value:                         4 */
    get Distracted()    { return this.value(4) }
    /** Enum Value:                         5 */
    get Fleeing()       { return this.value(5) }
    /** Enum Value:                         6 */
    get Gripped()       { return this.value(6) }
    /** Enum Value:                         7 */
    get Rooted()        { return this.value(7) }
    /** Enum Value:                         8 */
    get Slowed()        { return this.value(8) }
    /** Enum Value:                         9 */
    get Silenced()      { return this.value(9) }
    /** Enum Value:                         10 */
    get Asleep()        { return this.value(10) }
    /** Enum Value:                         11 */
    get Snared()        { return this.value(11) }
    /** Enum Value:                         12 */
    get Stunned()       { return this.value(12) }
    /** Enum Value:                         13 */
    get Frozen()        { return this.value(13) }
    /** Enum Value:                         14 */
    get Incapacitated() { return this.value(14) }
    /** Enum Value:                         15 */
    get Bleeding()      { return this.value(15) }
    /** Enum Value:                         16 */
    get Healing()       { return this.value(16) }
    /** Enum Value:                         17 */
    get Polymorphed()   { return this.value(17) }
    /** Enum Value:                         18 */
    get Banished()      { return this.value(18) }
    /** Enum Value:                         19 */
    get Shielded()      { return this.value(19) }
    /** Enum Value:                         20 */
    get Shackled()      { return this.value(20) }
    /** Enum Value:                         21 */
    get Mounted()       { return this.value(21) }
    /** Enum Value:                         22 */
    get Infected()      { return this.value(22) }
    /** Enum Value:                         23 */
    get Turned()        { return this.value(23) }
    /** Enum Value:                         24 */
    get Horrified()     { return this.value(24) }
    /** Enum Value:                         25 */
    get Invulnerable()  { return this.value(25) }
    /** Enum Value:                         26 */
    get Interrupted()   { return this.value(26) }
    /** Enum Value:                         27 */
    get Dazed()         { return this.value(27) }
    /** Enum Value:                         28 */
    get Discovery()     { return this.value(28) }
    /** Enum Value:                         29 */
    get Invulnerable2() { return this.value(29) }
    /** Enum Value:                         30 */
    get Sapped()        { return this.value(30) }
    /** Enum Value:                         31 */
    get Enraged()       { return this.value(31) }
}

export class SpellEffectMechanicMask<T> extends MaskCell32<T> {
    get None() { return this.bit(0);}
    get Charmed() { return this.bit(1); }
    get Disoriented() { return this.bit(2); }
    get Disarmed() { return this.bit(3); }
    get Distracted() { return this.bit(4); }
    get Fleeing() { return this.bit(5); }
    get Gripped() { return this.bit(6); }
    get Rooted() { return this.bit(7); }
    get Slowed() { return this.bit(8); }
    get Silenced() { return this.bit(9); }
    get Asleep() { return this.bit(10); }
    get Snared() { return this.bit(11); }
    get Stunned() { return this.bit(12); }
    get Frozen() { return this.bit(13); }
    get Incapacitated() { return this.bit(14); }
    get Bleeding() { return this.bit(15); }
    get Healing() { return this.bit(16); }
    get Polymorphed() { return this.bit(17); }
    get Banished() { return this.bit(18); }
    get Shielded() { return this.bit(19); }
    get Shackled() { return this.bit(20); }
    get Mounted() { return this.bit(21); }
    get Infected() { return this.bit(22); }
    get Turned() { return this.bit(23); }
    get Horrified() { return this.bit(24); }
    get Invulnerable() { return this.bit(25); }
    get Interrupted() { return this.bit(26); }
    get Dazed() { return this.bit(27); }
    get Discovery() { return this.bit(28); }
    get Invulnerable2() { return this.bit(29); }
    get Sapped() { return this.bit(30); }
    get Enraged() { return this.bit(31);}
}