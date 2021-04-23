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
import { BaseSystem } from "wotlkdata/cell/BaseSystem";
import { SpellDurationRow } from "wotlkdata/dbc/types/SpellDuration";
import { SharedRef, SharedRefTable } from "../Refs/SharedRef";
import { DBC } from "wotlkdata";
import { AutoIdGenerator, Ids } from "../Base/Ids";

export class SpellDuration<T> extends SharedRef<T, SpellDurationRow> {
    table(): SharedRefTable<SpellDurationRow> {
        return DBC.SpellDuration;
    }

    ids(): AutoIdGenerator {
        return Ids.SpellDuration;
    }

    clear(): this {
        this.set(0,0,0);
        return this;
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