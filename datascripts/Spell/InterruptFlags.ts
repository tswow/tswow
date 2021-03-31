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
import { MaskCell } from "wotlkdata/cell/systems/Mask";
import { Spell } from "./Spell";

export class InterruptFlags extends MaskCell<Spell> {
    constructor(owner: Spell) {
        super(owner, owner.row.InterruptFlags);
    }

    get OnMovement() { return this.bit(0); }
    get OnPushback() { return this.bit(1); }
    get OnInterruptCast() { return this.bit(2); }
}