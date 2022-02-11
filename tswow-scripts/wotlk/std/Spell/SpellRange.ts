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
import { SpellRangeQuery, SpellRangeRow } from "wotlkdata/wotlkdata/dbc/types/SpellRange";
import { loc_constructor } from "wotlkdata/wotlkdata/primitives";
import { Table } from "wotlkdata/wotlkdata/table/Table";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator, Ids } from "../Misc/Ids";
import { RefDynamic } from "../Refs/Ref";
import { RegistryDynamic } from "../Refs/Registry";

export class SpellRange extends MainEntity<SpellRangeRow> {
    clear(): this {
        this.Name.set({})
        this.NameShort.set({})
        this.Flags.set(0)
        this.HostileMin.set(0)
        this.HostileMax.set(0)
        this.FriendMin.set(0)
        this.FriendMax.set(0)
        return this;
    }

    get Name() { return this.wrapLoc(this.row.DisplayName); }
    get NameShort() { return this.wrapLoc(this.row.DisplayNameShort); }
    get Flags() { return this.wrap(this.row.Flags); }

    get HostileMin() { return this.wrapIndex(this.row.RangeMin, 0)}
    get FriendMin() { return this.wrapIndex(this.row.RangeMin, 1)}

    get HostileMax() { return this.wrapIndex(this.row.RangeMax, 0)}
    get FriendMax() { return this.wrapIndex(this.row.RangeMax, 1)}

    get ID() { return this.row.ID.get(); }

    set(hostileMin: number, hostileMax: number, friendMin: number, friendMax: number, name?: loc_constructor, nameShort?: loc_constructor, flags?: number) {
        this.HostileMin.set(hostileMin);
        this.HostileMax.set(hostileMax);
        this.FriendMin.set(friendMin);
        this.FriendMax.set(friendMax);
        if(name!==undefined) {
            this.Name.set(name);
        }

        if(nameShort!==undefined) {
            this.NameShort.set(nameShort);
        }

        if(flags!==undefined) {
            this.Flags.set(flags);
        }

        return this;
    }
}

export class SpellRangeRef<T> extends RefDynamic<T,SpellRange>
{
    setSimple(min: number, max: number, flags = 0) {
        this.getRefCopy()
            .FriendMin.set(min)
            .FriendMax.set(max)
            .HostileMin.set(min)
            .HostileMax.set(max)
            .Flags.set(flags)
        return this.owner;
    }
}

export class SpellRangeRegistryClass
    extends RegistryDynamic<SpellRange,SpellRangeRow,SpellRangeQuery>
{
    ref<T>(owner: T, cell: Cell<number,any>) {
        return new SpellRangeRef(owner,cell,this);
    }
    protected Table(): Table<any, SpellRangeQuery, SpellRangeRow> & { add: (id: number) => SpellRangeRow; } {
        return DBC.SpellRange
    }
    protected ids(): DynamicIDGenerator {
        return Ids.SpellRange
    }
    Clear(entity: SpellRange): void {
        entity.Flags.set(0)
              .FriendMax.set(0)
              .FriendMin.set(0)
              .HostileMax.set(0)
              .HostileMin.set(0)
              .Name.clear()
              .NameShort.clear()
    }
    protected FindByID(id: number): SpellRangeRow {
        return DBC.SpellRange.findById(id);
    }
    protected EmptyQuery(): SpellRangeQuery {
        return {}
    }
    ID(e: SpellRange): number {
        return e.ID;
    }
    protected Entity(r: SpellRangeRow): SpellRange {
        return new SpellRange(r);
    }
}

export const SpellRangeRegistry = new SpellRangeRegistryClass();