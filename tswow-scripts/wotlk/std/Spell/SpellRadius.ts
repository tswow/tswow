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
import { DBC } from "../../DBCFiles";
import { Cell } from "../../../data/cell/cells/Cell";
import { SpellRadiusQuery, SpellRadiusRow } from "../../dbc/SpellRadius";
import { Table } from "../../../data/table/Table";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator, Ids } from "../Misc/Ids";
import { RefDynamic } from "../Refs/Ref";
import { RegistryDynamic } from "../Refs/Registry";

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

export class SpellRadiusRef<T> extends RefDynamic<T,SpellRadius>
{
    setSimple(base: number, perLevel: number = 0, max: number = base + perLevel*255) {
        this.getRefCopy()
            .Radius.set(base)
            .RadiusPerLevel.set(perLevel)
            .RadiusMax.set(max)
        return this.owner;
    }
}

export class SpellRadiusRegistryClass
    extends RegistryDynamic<SpellRadius,SpellRadiusRow,SpellRadiusQuery>
{
    ref<T>(owner: T, cell: Cell<number,any>) {
        return new SpellRadiusRef(owner, cell, this);
    }
    protected Table(): Table<any, SpellRadiusQuery, SpellRadiusRow> & { add: (id: number) => SpellRadiusRow; } {
        return DBC.SpellRadius
    }
    protected ids(): DynamicIDGenerator {
        return Ids.SpellRadius
    }
    Clear(entity: SpellRadius): void {
        entity.set(0,0,0)
    }
    protected FindByID(id: number): SpellRadiusRow {
        return DBC.SpellRadius.findById(id);
    }
    protected EmptyQuery(): SpellRadiusQuery {
        return {}
    }
    ID(e: SpellRadius): number {
        return e.ID
    }
    protected Entity(r: SpellRadiusRow): SpellRadius {
        return new SpellRadius(r);
    }
}
export const SpellRadiusRegistry = new SpellRadiusRegistryClass();