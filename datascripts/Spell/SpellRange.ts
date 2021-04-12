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
import { DBC } from "wotlkdata/dbc/DBCFiles";
import { loc_constructor } from "wotlkdata/primitives";
import { Ids, AutoIdGenerator } from "../Base/Ids";
import { SharedRef, SharedRefTable } from "../Refs/SharedRef";
import { SpellRangeRow } from "wotlkdata/dbc/types/SpellRange";
import { BaseSystem } from "wotlkdata/cell/BaseSystem";

export class SpellRange<T extends BaseSystem> extends SharedRef<T,SpellRangeRow> {
    table(): SharedRefTable<SpellRangeRow> {
        return DBC.SpellRange;
    }
    ids(): AutoIdGenerator {
        return Ids.SpellRange;
    }

    zeroFill(): this {
        this.Name.set({})
        this.NameShort.set({})
        this.Flags.set(0)
        this.HostileMin.set(0)
        this.HostileMax.set(0)
        this.FriendMin.set(0)
        this.FriendMax.set(0)
        return this;
    }

    get Name() { return this.ownerWrapLoc(this.row.DisplayName); }
    get NameShort() { return this.ownerWrapLoc(this.row.DisplayNameShort); }
    get Flags() { return this.ownerWrap(this.row.Flags); }
    
    get HostileMin() { return this.ownerWrapIndex(this.row.RangeMin, 0)}
    get FriendMin() { return this.ownerWrapIndex(this.row.RangeMin, 1)}

    get HostileMax() { return this.ownerWrapIndex(this.row.RangeMax, 0)}
    get FriendMax() { return this.ownerWrapIndex(this.row.RangeMax, 1)}

    get ID() { return this.row.ID.get(); }

    get row() { 
        return DBC.SpellRange.findById(this.cell.get());
    }

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
        
        return this.owner;
    }
}