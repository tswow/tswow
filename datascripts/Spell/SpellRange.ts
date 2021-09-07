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
import { loc_constructor } from "wotlkdata/primitives";
import { SpellRangeRow } from "wotlkdata/dbc/types/SpellRange";
import { Ref } from "../Refs/Ref";
import { MainEntity } from "../Misc/Entity";
import { DBC } from "wotlkdata";
import { Ids } from "../Misc/Ids";

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

export class SpellRangePointer<T> extends Ref<T,SpellRange> {
    exists(): boolean {
        return this.cell.get() > 0;
    }
    protected create(): SpellRange {
        return new SpellRange(DBC.SpellRange.add(Ids.SpellRange.id()))
            .clear();
    }
    protected clone(): SpellRange {
        return new SpellRange(this.resolve().row.clone(Ids.SpellRange.id()))
    }
    protected id(v: SpellRange): number {
        return v.ID;
    }
    protected resolve(): SpellRange {
        return new SpellRange(DBC.SpellRange.findById(this.cell.get()));
    }

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