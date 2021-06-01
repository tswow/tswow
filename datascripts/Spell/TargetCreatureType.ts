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
import { MaskCell32 } from "wotlkdata/cell/cells/MaskCell";
import { Spell } from "./Spell";

export class SpellCreatureTarget<T> extends MaskCell32<T> {

    get Beast() { return this.bit(0); }
    get Dragonkin() { return this.bit(1); }
    get Demon() { return this.bit(2); }
    get Elemental() { return this.bit(3); }
    get Giant() { return this.bit(4); }
    get Undead() { return this.bit(5); }
    get Humanoid() { return this.bit(6); }
    get Critter() { return this.bit(7); }
    get Mechanical() { return this.bit(8); }
    get Unspecied() { return this.bit(9); }
    get Totem() { return this.bit(10); }
    get NonCombatPet() { return this.bit(11); }
    get GasCloud() { return this.bit(12); }
}