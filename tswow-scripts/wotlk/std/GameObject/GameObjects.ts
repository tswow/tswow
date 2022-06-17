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
import { Cell } from "../../../data/cell/cells/Cell"
import { Table } from "../../../data/table/Table"
import { GameObjectQuery, GameObjectRow } from "../../custom_dbc/GameObject"
import { GameObjectDisplayInfoQuery, GameObjectDisplayInfoRow } from "../../dbc/GameObjectDisplayInfo"
import { DBC } from "../../DBCFiles"
import { DynamicIDGenerator, Ids, StaticIDGenerator } from "../Misc/Ids"
import { RefDynamic } from "../Refs/Ref"
import { RegistryDynamic, RegistryStatic } from "../Refs/Registry"
import { GameObjectDisplay } from "./GameObjectDisplay"
import { GameObjectInstance } from "./GameObjectInstance"

export class GameObjectInstanceRegistryClass
    extends RegistryStatic<GameObjectInstance,GameObjectRow,GameObjectQuery>
{
    protected Table(): Table<any, GameObjectQuery, GameObjectRow> & { add: (id: number) => GameObjectRow } {
        return DBC.GameObject
    }
    protected IDs(): StaticIDGenerator {
        return Ids.gameobject
    }
    Clear(r: GameObjectInstance): void {
        r
         .Position.setSpread(0,0,0,0,0)
         .Area.set(0)
         .Rotation.setSpread(0,0,0,0)
         .ScriptName.set('')
         .Zone.set(0)
         .SpawnTimeSecs.set(120)
         .PhaseMask.set(1)
         .SpawnMask.set(1)
         .State.set(1)
         .row
            .id.set(0)
    }
    protected Clone(mod: string, id: string, r: GameObjectInstance, parent: GameObjectInstance): void {
        if(parent.AddonRow.exists()) {
            parent.AddonRow.get().clone(r.ID);
        }
    }
    protected Entity(r: GameObjectRow): GameObjectInstance {
        return new GameObjectInstance(r);
    }
    protected FindByID(id: number): GameObjectRow {
        return DBC.GameObject.findById(id);
    }
    protected EmptyQuery(): GameObjectQuery {
        return {}
    }
    ID(e: GameObjectInstance): number {
        return e.ID;
    }
}

export const GameObjectInstances = new GameObjectInstanceRegistryClass();

export class GameObjectDisplayRef<T> extends RefDynamic<T,GameObjectDisplay> {
    setSimple(model: string, geobox: number) {
        let entry = GameObjectDisplayRegistry
            .create()
            .ModelName.set(model)
            .GeoBox.set(geobox)
        this.set(entry.ID)
        return this.owner;
    }
}

export class GameObejctDisplayRegistryClass
    extends RegistryDynamic<
          GameObjectDisplay
        , GameObjectDisplayInfoRow
        , GameObjectDisplayInfoQuery
    >
{

    ref<T>(owner: T, cell: Cell<number, any>): GameObjectDisplayRef<T> {
        return new GameObjectDisplayRef(owner, cell, this);
    }

    protected Table(): Table<any, GameObjectDisplayInfoQuery, GameObjectDisplayInfoRow> & { add: (id: number) => GameObjectDisplayInfoRow } {
        return DBC.GameObjectDisplayInfo;
    }
    protected ids(): DynamicIDGenerator {
        return Ids.GameObjectDisplayInfo
    }
    Clear(entity: GameObjectDisplay): void {
        entity.GeoBox.set({minX:0,minY:0,minZ:0,maxX:0,maxY:0,maxZ:0})
    }
    protected Entity(r: GameObjectDisplayInfoRow): GameObjectDisplay {
        return new GameObjectDisplay(r);
    }
    protected FindByID(id: number): GameObjectDisplayInfoRow {
        return DBC.GameObjectDisplayInfo.findById(id);
    }
    protected EmptyQuery(): GameObjectDisplayInfoQuery {
        return {}
    }
    ID(e: GameObjectDisplay): number {
        return e.ID;
    }
}
export const GameObjectDisplayRegistry = new GameObejctDisplayRegistryClass();