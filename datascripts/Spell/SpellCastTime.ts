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

export class SpellCastTime<T> extends Subsystem<T> {
    protected spell: Spell;

    constructor(owner: T, spell: Spell) {
        super(owner);
        this.spell = spell;
    }

    get row() { return DBC.SpellCastTimes.findById(this.spell.row.CastingTimeIndex.get())}

    get Base() { return this.wrap(this.row.Base); }
    get PerLevel() { return this.wrap(this.row.PerLevel); }
    get Minimum() { return this.wrap(this.row.Minimum); }

    makeUnique() {
        let id = Ids.SpellCastTimes.id();
        this.row.clone(id);
        this.spell.row.CastingTimeIndex.set(id);
        return this.owner;
    }

    set(base: number, perLevel: number, minimum: number) {
        this.Base.set(base);
        this.PerLevel.set(perLevel);
        this.Minimum.set(minimum)
        return this.owner;
    }
}
