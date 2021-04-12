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
import { DBC } from "wotlkdata";
import { Subsystem } from "wotlkdata/cell/Subsystem";
import { Ids } from "../Base/Ids";
import { Spell } from "./Spell";
import { Cell } from "wotlkdata/cell/Cell";

export class SpellMissile<T> extends Subsystem<T> {
    
    protected cell: Cell<number,any>

    constructor(owner: T, cell: Cell<number,any>) {
        super(owner);
        this.cell = cell;
    }

    protected transientFields() {
        return super.transientFields().concat(['cell']);
    }

    get row() { 
        return DBC.SpellMissile.find({ID: this.cell.get()})
    }

    get CollisionRaduis() { return this.wrap(this.row.CollisionRadius); }
    get DefaultPitchMax() { return this.wrap(this.row.DefaultPitchMax); }
    get DefaultSpeedMax() { return this.wrap(this.row.DefaultSpeedMax); }
    get DefaultSpeedMin() { return this.wrap(this.row.DefaultSpeedMin); }
    get Flags() { return this.wrap(this.row.Flags); }
    get Gravity() { return this.wrap(this.row.Gravity); }
    get MaxDuration() { return this.wrap(this.row.MaxDuration); }
    get RandomizeFacingMax() { return this.wrap(this.row.RandomizeFacingMax); }
    get RandomizeFacingMin() { return this.wrap(this.row.RandomizeFacingMin); }
    get RandomizePitchmax() { return this.wrap(this.row.RandomizePitchMax); }
    get RandomizePitchMin() { return this.wrap(this.row.RandomizePitchMin); }
    get RandomizeSpeedMax() { return this.wrap(this.row.RandomizeSpeedMax); }
    get RandomizeSpeedMin() { return this.wrap(this.row.RandomizeSpeedMin); }

    makeUnique() {
        const row = DBC.SpellMissile.findById(this.cell.get())
            .clone(Ids.SpellMissile.id())
        this.cell.set(row.ID.get());
        return this.owner;
    }
}