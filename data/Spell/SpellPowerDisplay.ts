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
import { Enum } from "wotlkdata/cell/Systems/Enum";
import { Spell } from "./Spell";

export class SpellPowerDisplay extends Enum<Spell> {
    setNone() { return this.set(0); }
    setAmmoSlot() { return this.set(1); }
    setPyrite() { return this.set(41); }
    setSteam() { return this.set(61); }
    setHeat() { return this.set(101); }
    setOoze() { return this.set(121); }
    setBloodPower() { return this.set(141); }
    setWrath() { return this.set(142); }
}