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

export class SpellMissile extends Subsystem<Spell> {
    get row() { 
        if(this.owner.row.SpellMissileID.get()===0) {
            const row = DBC.SpellMissile.add(Ids.SpellMissile.id())
            this.owner.row.SpellMissileID.set(row.ID.get());
            return row;
        }
        return DBC.SpellMissile.find({ID: this.owner.row.SpellMissileID.get()})
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
        if(this.owner.row.SpellMissileID.get()===0) {
            return;
        }
        const row = DBC.SpellMissile.findById(this.owner.row.SpellMissileID.get())
            .clone(Ids.SpellMissile.id())
        this.owner.row.SpellMissileID.set(row.ID.get());
        return this.owner;
    }
}