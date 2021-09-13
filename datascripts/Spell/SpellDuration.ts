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
import { SpellDurationRow } from "wotlkdata/dbc/types/SpellDuration";
import { MainEntity } from "../Misc/Entity";
import { Ids } from "../Misc/Ids";
import { Ref } from "../Refs/Ref";

export class SpellDuration extends MainEntity<SpellDurationRow> {
    clear(): this {
        this.set(0,0,0);
        return this;
    }

    get ID() { return this.row.ID.get(); }
    get Duration() { return this.wrap(this.row.Duration); }
    get DurationPerLevel() { return this.wrap(this.row.DurationPerLevel); }
    get MaxDuration() { return this.wrap(this.row.MaxDuration); }

    set(duration: number, durationPerLevel: number, maxDuration: number) {
        this.Duration.set(duration);
        this.DurationPerLevel.set(durationPerLevel);
        this.MaxDuration.set(maxDuration);
        return this.owner;
    }
}

export class SpellDurationPointer<T> extends Ref<T,SpellDuration> {
    exists(): boolean {
        return this.cell.get() > 0;
    }
    protected create(): SpellDuration {
        return new SpellDuration(DBC.SpellDuration.add(Ids.SpellDuration.id()));
    }
    protected clone(): SpellDuration {
        return new SpellDuration(this.resolve().row.clone(Ids.SpellDuration.id()));
    }
    protected id(v: SpellDuration): number {
        return v.row.ID.get()
    }
    protected resolve(): SpellDuration {
        return new SpellDuration(DBC.SpellDuration.findById(this.cell.get()));
    }

    setSimple(duration: number, durationPerLevel: number = 0, maxDuration = duration + durationPerLevel*255) {
        this.getRefCopy().set(duration,durationPerLevel,maxDuration);
        return this.owner;
    }
}