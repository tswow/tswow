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
import { Subsystem } from "wotlkdata/cell/Subsystem";
import { MaskCell } from "wotlkdata/cell/systems/Mask";
import { Spell } from "./Spell";

export class SpellProc extends Subsystem<Spell> {

    get TypeMask() { return new MaskCell(this.owner, this.owner.row.ProcTypeMask); }
    get Chance() { return this.ownerWrap(this.owner.row.ProcChance); }
    get Charges() { return this.ownerWrap(this.owner.row.ProcCharges); }

    set(chance: number, charges: number, typeMask = -1) {
        if(typeMask>0) {
            this.TypeMask.set(typeMask);
        }
        this.Chance.set(chance);
        this.Charges.set(charges);
        return this.owner;
    }
}