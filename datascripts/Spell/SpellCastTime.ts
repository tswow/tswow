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
import { SpellCastTimesQuery, SpellCastTimesRow } from "wotlkdata/wotlkdata/dbc/types/SpellCastTimes";
import { Table } from "wotlkdata/wotlkdata/table/Table";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator, Ids } from "../Misc/Ids";
import { RefDynamic } from "../Refs/Ref";
import { RegistryDynamic } from "../Refs/Registry";

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

export class SpellCastTimeRef<T> extends RefDynamic<T,SpellCastTime>
{
    setSimple(base: number, perLevel: number = 0, minimum: number = 0) {
        this.getRefCopy()
            .Base.set(base)
            .PerLevel.set(perLevel)
            .Minimum.set(minimum)
        return this.owner;
    }
}

export class SpellCastTimeRegistryClass
    extends RegistryDynamic<
      SpellCastTime
    , SpellCastTimesRow
    , SpellCastTimesQuery
    >
{
    ref<T>(owner: T, cell: Cell<number,any>) {
        return new SpellCastTimeRef(owner, cell, this);
    }
    protected Table(): Table<any, SpellCastTimesQuery, SpellCastTimesRow> & { add: (id: number) => SpellCastTimesRow; } {
        return DBC.SpellCastTimes
    }
    protected ids(): DynamicIDGenerator {
        return Ids.SpellCastTimes
    }
    Clear(entity: SpellCastTime): void {
        entity.Base.set(0)
              .Minimum.set(0)
              .PerLevel.set(0)
    }
    protected FindByID(id: number): SpellCastTimesRow {
        return DBC.SpellCastTimes.findById(id)
    }
    protected EmptyQuery(): SpellCastTimesQuery {
        return {}
    }
    ID(e: SpellCastTime): number {
        return e.ID
    }
    protected Entity(r: SpellCastTimesRow): SpellCastTime {
        return new SpellCastTime(r);
    }
}
export const SpellCastTimeRegistry = new SpellCastTimeRegistryClass();