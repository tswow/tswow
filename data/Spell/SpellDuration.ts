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
import { DBC } from "wotlkdata/dbc/DBCFiles";
import { Ids } from "../Base/Ids";
import { Spell } from "./Spell";

export class SpellDuration extends Subsystem<Spell> {
    constructor(owner: Spell) {
        super(owner);
    }

    get row() { 
        if(this.owner.row.DurationIndex.get()===0) {
            const row = DBC.SpellDuration.add(Ids.SpellDuration.id())
            this.owner.row.DurationIndex.set(row.ID.get());
            return row;
        }
        return DBC.SpellDuration.find({ID: this.owner.row.DurationIndex.get()})
    }

    makeUnique() {
        if(this.owner.row.DurationIndex.get()===0) {
            return;
        }
        const row = DBC.SpellDuration.findById(this.owner.row.DurationIndex.get())
            .clone(Ids.SpellDuration.id())
        this.owner.row.DurationIndex.set(row.ID.get());
        return this.owner;
    }

    get ID() { return this.row.ID.get(); }
    get Duration() { return this.ownerWrap(this.row.Duration); }
    get DurationPerLevel() { return this.ownerWrap(this.row.DurationPerLevel); }
    get MaxDuration() { return this.ownerWrap(this.row.MaxDuration); }

    set(duration: number, durationPerLevel: number, maxDuration: number) {
        this.Duration.set(duration);
        this.DurationPerLevel.set(durationPerLevel);
        this.MaxDuration.set(maxDuration);
        return this.owner;
    }
}