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
import { Subsystem } from "wotlkdata/cell/Subsystem";
import { Ids } from "../Base/Ids";
import { SpellEffect } from "./SpellEffect";

export class SpellRadius extends Subsystem<SpellEffect> {
    get ID() { return this.row.ID.get(); }

    get Radius() { return this.ownerWrap(this.row.Radius); }
    get RadiusPerLevel() { return this.ownerWrap(this.row.RadiusPerLevel); }
    get RadiusMax() { return this.ownerWrap(this.row.RadiusMax); }

    protected get icell() {
        return this.wrapIndex(this.owner.row.EffectRadiusIndex, this.owner.index);
    }

    transientFields() {
        return super.transientFields().concat(['icell']);
    }

    set(radius: number, radiusPerLevel: number, radiusMax: number) {
        const row = this.row;
        row.Radius.set(radius);
        row.RadiusPerLevel.set(radiusPerLevel);
        row.RadiusMax.set(radiusMax);
        return this.owner;
    }

    get row() { 
        if(this.icell.get()===0) {
            const row = DBC.SpellRadius.add(Ids.SpellRange.id());
            this.icell.set(row.ID.get());
            return row;
        } else {
            return DBC.SpellRadius.findById(this.icell.get());
        }
    }

    copyFrom(radius: SpellRadius) {
        this.Radius.set(radius.Radius.get());
        this.RadiusPerLevel.set(radius.RadiusPerLevel.get());
        this.RadiusMax.set(radius.RadiusMax.get());
    }

    makeUnique() {
        if(this.icell.get()===0) {
            return;
        }
        this.icell.set(this.row.clone(Ids.SpellRadius.id()).ID.get());
        return this.owner;
    }
}