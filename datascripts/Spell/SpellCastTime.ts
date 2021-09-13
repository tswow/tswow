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
import { SpellCastTimesRow } from "wotlkdata/dbc/types/SpellCastTimes";
import { MainEntity } from "../Misc/Entity";
import { Ids } from "../Misc/Ids";
import { Ref } from "../Refs/Ref";

export class SpellCastTime extends MainEntity<SpellCastTimesRow> {
    clear(): this {
        this.Base.set(0)
        this.PerLevel.set(0)
        this.Minimum.set(0)
        return this;
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

    get ID() { return this.row.ID.get(); }
}

export class SpellCastTimePointer<T> extends Ref<T, SpellCastTime> {
    exists(): boolean {
        return this.cell.get() > 0;
    }
    protected create(): SpellCastTime {
        return new SpellCastTime(DBC.SpellCastTimes.add(Ids.SpellCastTimes.id()));
    }
    protected clone(): SpellCastTime {
        return new SpellCastTime(this.resolve().row.clone(Ids.SpellCastTimes.id()));
    }
    protected id(v: SpellCastTime): number {
        return v.ID;
    }
    protected resolve(): SpellCastTime {
        return new SpellCastTime(DBC.SpellCastTimes.findById(this.cell.get()));
    }

    setSimple(base: number, perLevel: number = 0, minimum: number = 0) {
        this.getRefCopy()
            .Base.set(base)
            .PerLevel.set(perLevel)
            .Minimum.set(minimum)
        return this.owner;
    }
}