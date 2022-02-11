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
import { Cell } from "wotlkdata/wotlkdata/cell/cells/Cell";
import { SpellDurationQuery, SpellDurationRow } from "wotlkdata/wotlkdata/dbc/types/SpellDuration";
import { Table } from "wotlkdata/wotlkdata/table/Table";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator, Ids } from "../Misc/Ids";
import { RefDynamic } from "../Refs/Ref";
import { RegistryDynamic } from "../Refs/Registry";

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

export class SpellDurationRef<T> extends RefDynamic<T,SpellDuration>
{
    setSimple(duration: number, durationPerLevel: number = 0, maxDuration = duration + durationPerLevel*255) {
        this.getRefCopy().set(duration,durationPerLevel,maxDuration);
        return this.owner;
    }
}

export class SpellDurationRegistryClass
    extends RegistryDynamic<SpellDuration,SpellDurationRow,SpellDurationQuery>
{
    ref<T>(owner: T, cell: Cell<number,any>) {
        return new SpellDurationRef(owner,cell,this);
    }
    protected Table(): Table<any, SpellDurationQuery, SpellDurationRow> & { add: (id: number) => SpellDurationRow; } {
        return DBC.SpellDuration
    }
    protected ids(): DynamicIDGenerator {
        return Ids.SpellDuration
    }
    Clear(entity: SpellDuration): void {
        entity.Duration.set(0)
              .DurationPerLevel.set(0)
              .MaxDuration.set(0)
    }
    protected FindByID(id: number): SpellDurationRow {
        return DBC.SpellDuration.findById(id);
    }
    protected EmptyQuery(): SpellDurationQuery {
        return {}
    }
    ID(e: SpellDuration): number {
        return e.ID;
    }
    protected Entity(r: SpellDurationRow): SpellDuration {
        return new SpellDuration(r);
    }
}

export const SpellDurationRegistry = new SpellDurationRegistryClass();