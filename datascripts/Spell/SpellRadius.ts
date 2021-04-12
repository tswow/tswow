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
import { Ids, AutoIdGenerator } from "../Base/Ids";
import { SpellRadiusRow } from "wotlkdata/dbc/types/SpellRadius";
import { BaseSystem } from "wotlkdata/cell/BaseSystem";
import { SharedRef, SharedRefTable } from "../Refs/SharedRef";

export class SpellRadius<T extends BaseSystem> extends SharedRef<T, SpellRadiusRow> {
    table(): SharedRefTable<SpellRadiusRow> {
        return DBC.SpellRadius;
    }

    ids(): AutoIdGenerator {
        return Ids.SpellRadius;
    }

    zeroFill(): this {
        this.set(0,0,0);
        return this;
    }

    get ID() { return this.row.ID.get(); }

    get Radius() { return this.ownerWrap(this.row.Radius); }
    get RadiusPerLevel() { return this.ownerWrap(this.row.RadiusPerLevel); }
    get RadiusMax() { return this.ownerWrap(this.row.RadiusMax); }

    set(radius: number, radiusPerLevel: number, radiusMax: number) {
        const row = this.row;
        row.Radius.set(radius);
        row.RadiusPerLevel.set(radiusPerLevel);
        row.RadiusMax.set(radiusMax);
        return this.owner;
    }

    copyFrom(radius: SpellRadius<any>) {
        this.Radius.set(radius.Radius.get());
        this.RadiusPerLevel.set(radius.RadiusPerLevel.get());
        this.RadiusMax.set(radius.RadiusMax.get());
    }
}