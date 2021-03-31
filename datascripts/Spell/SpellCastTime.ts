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
import { SpellCastTimesRow } from "wotlkdata/dbc/types/SpellCastTimes";
import { Ids } from "../Base/Ids";
import { Spell } from "./Spell";

export class SpellCastTime extends Subsystem<Spell> {
    readonly row: SpellCastTimesRow;
    constructor(owner: Spell) {
        super(owner);
        if(owner.row.CastingTimeIndex.get()===0)  {
            this.row = DBC.SpellCastTimes.add(Ids.SpellCastTimes.id());
        } else {
            // TODO: This is dumb, it creates a new object every time
            // you access it.
            this.row = DBC.SpellCastTimes
                .findById(this.owner.row.CastingTimeIndex.get())
                .clone(Ids.SpellCastTimes.id())
        }
        this.owner.row.CastingTimeIndex.set(this.row.ID.get());
    }

    get Base() { return this.wrap(this.row.Base); }
    get PerLevel() { return this.wrap(this.row.PerLevel); }
    get Minimum() { return this.wrap(this.row.Minimum); }

    set(base: number, perLevel: number, minimum: number) {
        this.Base.set(base);
        this.PerLevel.set(perLevel);
        this.Minimum.set(minimum)
        return this.owner;
    }
}
