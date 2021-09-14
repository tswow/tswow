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
import { CreatureTemplate } from "./CreatureTemplate";

export class CreatureFamily extends EnumCell<CreatureTemplate> {
    get Wolf()          { return this.value(1)}
    get Cat()           { return this.value(2)}
    get Spider()        { return this.value(3)}
    get Bear()          { return this.value(4)}
    get Boar()          { return this.value(5)}
    get Crocolisk()     { return this.value(6)}
    get CarrionBird()   { return this.value(7)}
    get Crab()          { return this.value(8)}
    get Gorilla()       { return this.value(9)}
    get Raptor()        { return this.value(10)}
    get Tallstrider()   { return this.value(11)}
    get Felhunter()     { return this.value(12)}
    get Voidwalker()    { return this.value(13)}
    get Succubus()      { return this.value(14)}
    get Doomguard()     { return this.value(15)}
    get Scorpid()       { return this.value(16)}
    get Turtle()        { return this.value(17)}
    get Imp()           { return this.value(18)}
    get Bat()           { return this.value(19)}
    get Hyena()         { return this.value(20)}
    get Owl()           { return this.value(21)}
    get WindSerpent()   { return this.value(22)}
    get RemoteControl() { return this.value(23)}
    get Felguard()      { return this.value(24)}
    get DragonHawk()    { return this.value(25)}
    get Ravager()       { return this.value(26)}
    get WarpStalker()   { return this.value(27)}
    get Sporebat()      { return this.value(28)}
    get NetherRay()     { return this.value(29)}
    get Serpent()       { return this.value(30)}
    get Moth()          { return this.value(31)}
    get Chimaera()      { return this.value(32)}
    get Devilsaur()     { return this.value(33)}
    get Ghoul()         { return this.value(34)}
    get Silithid()      { return this.value(35)}
    get Worm()          { return this.value(36)}
    get Rhino()         { return this.value(37)}
    get Wasp()          { return this.value(38)}
    get Corehound()     { return this.value(39)}
    get SpiritBeast()   { return this.value(40)}
}