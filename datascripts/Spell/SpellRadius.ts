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
import { Ids } from "../Misc/Ids";
import { SpellRadiusRow } from "wotlkdata/dbc/types/SpellRadius";
import { MainEntity } from "../Misc/Entity";
import { Ref } from "../Refs/Ref";

export class SpellRadius extends MainEntity<SpellRadiusRow> {
    clear(): this {
        this.set(0,0,0);
        return this;
    }

    get ID() { return this.row.ID.get(); }
    get Radius() { return this.wrap(this.row.Radius); }
    get RadiusPerLevel() { return this.wrap(this.row.RadiusPerLevel); }
    get RadiusMax() { return this.wrap(this.row.RadiusMax); }

    set(radius: number, radiusPerLevel: number, radiusMax: number) {
        const row = this.row;
        row.Radius.set(radius);
        row.RadiusPerLevel.set(radiusPerLevel);
        row.RadiusMax.set(radiusMax);
        return this.owner;
    }

    copyFrom(radius: SpellRadius) {
        this.Radius.set(radius.Radius.get());
        this.RadiusPerLevel.set(radius.RadiusPerLevel.get());
        this.RadiusMax.set(radius.RadiusMax.get());
    }
}

export class SpellRadiusRef<T> extends Ref<T,SpellRadius> {
    protected exists(): boolean {
        return this.cell.get() > 0;
    }

    protected create(): SpellRadius {
        return new SpellRadius(DBC.SpellRadius.add(Ids.SpellRadius.id()));
    }

    protected clone(): SpellRadius {
        return new SpellRadius(this.resolve().row.clone(Ids.SpellRadius.id()));
    }

    protected id(v: SpellRadius): number {
        return v.ID;
    }

    protected resolve(): SpellRadius {
        return new SpellRadius(DBC.SpellRadius.findById(this.cell.get()));
    }

    setSimple(base: number, perLevel: number = 0, max: number = base + perLevel*255) {
        this.getRefCopy()
            .Radius.set(base)
            .RadiusPerLevel.set(perLevel)
            .RadiusMax.set(max)
        return this.owner;
    }
}