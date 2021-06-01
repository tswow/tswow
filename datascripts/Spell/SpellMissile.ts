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
import { Ids, AutoIdGenerator } from "../Misc/Ids";
import { SharedRef, SharedRefTable } from "../Refs/SharedRef";
import { SpellMissileRow } from "wotlkdata/dbc/types/SpellMissile";

export class SpellMissile<T> extends SharedRef<T,SpellMissileRow> {
    table(): SharedRefTable<SpellMissileRow> {
        return DBC.SpellMissile;
    }
    ids(): AutoIdGenerator {
        return Ids.SpellMissile;
    }
    clear(): this {
        this.CollisionRadius.set(0)
            .DefaultPitchMax.set(0)
            .DefaultSpeedMax.set(0)
            .DefaultSpeedMin.set(0)
            .Flags.set(0)
            .Gravity.set(0)
            .MaxDuration.set(0)
            .RandomizeFacingMax.set(0)
            .RandomizeFacingMin.set(0)
            .RandomizePitchMin.set(0)
            .RandomizePitchmax.set(0)
            .RandomizeSpeedMax.set(0)
            .RandomizeSpeedMin.set(0)
        return this;
    }

    get CollisionRadius() { return this.wrap(this.row.CollisionRadius); }
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
}