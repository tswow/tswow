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
import { Subsystem } from "wotlkdata/cell/Subsystem";
import { DBC } from "wotlkdata/dbc/DBCFiles";
import { loc_constructor } from "wotlkdata/primitives";
import { Ids } from "../Base/Ids";
import { Spell } from "./Spell";

export class SpellRange extends Subsystem<Spell> {
    get Name() { return this.ownerWrapLoc(this.row.DisplayName); }
    get NameShort() { return this.ownerWrapLoc(this.row.DisplayNameShort); }
    get Flags() { return this.ownerWrap(this.row.Flags); }
    
    get HostileMin() { return this.ownerWrapIndex(this.row.RangeMin, 0)}
    get FriendMin() { return this.ownerWrapIndex(this.row.RangeMin, 1)}

    get HostileMax() { return this.ownerWrapIndex(this.row.RangeMax, 0)}
    get FriendMax() { return this.ownerWrapIndex(this.row.RangeMax, 1)}

    get ID() { return this.row.ID.get(); }

    protected get icell() {
        return this.owner.row.RangeIndex;
    }

    get row() { 
        if(this.icell.get()===0) {
            const row = DBC.SpellRange.add(Ids.SpellRange.id());
            this.icell.set(row.ID.get());
            return row;
        } else {
            return DBC.SpellRange.findById(this.icell.get());
        }
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

    makeUnique() {
        if(this.icell.get()===0) {
            return;
        }
        this.icell.set(this.row.clone(Ids.SpellRange.id()).ID.get());
    }
}