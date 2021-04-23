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
import { Ids, AutoIdGenerator } from "../Base/Ids";
import { BaseSystem } from "wotlkdata/cell/BaseSystem";
import { SharedRef, SharedRefTable } from "../Refs/SharedRef";

export class SpellCastTime<T> extends SharedRef<T, SpellCastTimesRow> {
    table(): SharedRefTable<SpellCastTimesRow> {
        return DBC.SpellCastTimes;
    }

    ids(): AutoIdGenerator {
        return Ids.SpellCastTimes;
    }

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
}
