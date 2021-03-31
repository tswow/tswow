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
import { Spell } from "./Spell";

export class SpellRecovery extends Subsystem<Spell> {
    get Time() { return this.ownerWrap(this.owner.row.RecoveryTime); }
    get CategoryTime() { return this.ownerWrap(this.owner.row.CategoryRecoveryTime); }

    get StartTime() { return this.ownerWrap(this.owner.row.StartRecoveryTime); }
    get StartCategory() { return this.ownerWrap(this.owner.row.StartRecoveryCategory); }

    set(time: number, categoryTime: number, startTime: number, startCategory: number) {
        this.Time.set(time);
        this.CategoryTime.set(categoryTime); 
        this.StartTime.set(startTime);
        this.StartCategory.set(startCategory);
        return this.owner;
    }
}