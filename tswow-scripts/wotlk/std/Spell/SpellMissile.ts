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
import { SpellMissileQuery, SpellMissileRow } from "wotlkdata/wotlkdata/dbc/types/SpellMissile";
import { Table } from "wotlkdata/wotlkdata/table/Table";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator, Ids } from "../Misc/Ids";
import { MinMaxCell } from "../Misc/LimitCells";
import { RegistryDynamic } from "../Refs/Registry";

export class SpellMissile extends MainEntity<SpellMissileRow> {
    get ID() { return this.row.ID.get(); }

    get DefaultPitch() {
        return new MinMaxCell(
              this
            , this.row.DefaultPitchMin
            , this.row.DefaultPitchMax
        )
    }

    get DefaultSpeed() {
        return new MinMaxCell(
            this
          , this.row.DefaultSpeedMin
          , this.row.DefaultSpeedMax
      )
    }

    get RandomizeFacing() {
        return new MinMaxCell(
            this
          , this.row.RandomizeFacingMin
          , this.row.RandomizeFacingMax
      )
    }

    get RandomizePitch() {
        return new MinMaxCell(
            this
          , this.row.RandomizePitchMin
          , this.row.RandomizePitchMax
      )
    }

    get RandomizeSpeed() {
        return new MinMaxCell(
            this
          , this.row.RandomizeSpeedMin
          , this.row.RandomizeSpeedMax
      )
    }

    get CollisionRadius() { return this.wrap(this.row.CollisionRadius); }
    get Flags() { return this.wrap(this.row.Flags); }
    get Gravity() { return this.wrap(this.row.Gravity); }
    get MaxDuration() { return this.wrap(this.row.MaxDuration); }
}

export class SpellMissileRegistryClass
    extends RegistryDynamic<SpellMissile,SpellMissileRow,SpellMissileQuery>
{
    protected Table(): Table<any, SpellMissileQuery, SpellMissileRow> & { add: (id: number) => SpellMissileRow; } {
        return DBC.SpellMissile
    }
    protected ids(): DynamicIDGenerator {
        return Ids.SpellMissile
    }
    Clear(entity: SpellMissile): void {
        entity.CollisionRadius.set(0)
              .DefaultPitch.set(0,0)
              .DefaultSpeed.set(0,0)
              .Flags.set(0)
              .Gravity.set(0)
              .MaxDuration.set(0)
              .RandomizeFacing.set(0,0)
              .RandomizePitch.set(0,0)
              .RandomizeSpeed.set(0,0)
    }
    protected FindByID(id: number): SpellMissileRow {
        return DBC.SpellMissile.findById(id)
    }
    protected EmptyQuery(): SpellMissileQuery {
        return {}
    }
    ID(e: SpellMissile): number {
        return e.ID
    }
    protected Entity(r: SpellMissileRow): SpellMissile {
        return new SpellMissile(r);
    }
}

export const SpellMissileRegistry = new SpellMissileRegistryClass();