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
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { CreatureTemplate } from "./CreatureTemplate";

export class CreatureAttackTime extends CellSystem<CreatureTemplate> {
    set(melee: number, ranged: number = melee, meleeVariance=1, rangedVariance=meleeVariance) {
        this.MeleeBase.set(melee);
        this.RangedBase.set(ranged);
        this.MeleeVariance.set(meleeVariance);
        this.RangedVariance.set(rangedVariance);
        return this.owner;
    }

    get MeleeBase() { return this.ownerWrap(this.owner.row.BaseAttackTime); }
    get RangedBase() { return this.ownerWrap(this.owner.row.RangeAttackTime); }
    get MeleeVariance() { return this.ownerWrap(this.owner.row.BaseVariance); }
    get RangedVariance() { return this.ownerWrap(this.owner.row.RangeVariance); }
}
