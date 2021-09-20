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
import { DBC, SQL } from "wotlkdata"
import { GameObjectDisplayInfoQuery, GameObjectDisplayInfoRow } from "wotlkdata/dbc/types/GameObjectDisplayInfo"
import { gameobjectQuery, gameobjectRow } from "wotlkdata/sql/types/gameobject"
import { gameobject_templateQuery, gameobject_templateRow } from "wotlkdata/sql/types/gameobject_template"
import { Table } from "wotlkdata/table/Table"
import { DynamicIDGenerator, Ids, StaticIDGenerator } from "../Misc/Ids"
import { RegistryDynamic, RegistryStatic } from "../Refs/Registry"
import { GameObjectDisplay } from "./GameObjectDisplay"
import { GameObjectInstance } from "./GameObjectInstance"
import { GameObjectPlain } from "./GameObjectTemplate"

export class GameObjectTemplateRegistryClass
    extends RegistryStatic<GameObjectPlain,gameobject_templateRow,gameobject_templateQuery>
{
    protected Table(): Table<any, gameobject_templateQuery, gameobject_templateRow> & { add: (id: number) => gameobject_templateRow } {
        return SQL.gameobject_template;
    }
    protected IDs(): StaticIDGenerator {
        return Ids.gameobject_template
    }
    Clear(r: GameObjectPlain, mod: string, name: string): void {
        r.row
            .AIName.set("")
            .Data0.set(0)
            .Data1.set(0)
            .Data10.set(0)
            .Data11.set(0)
            .Data12.set(0)
            .Data13.set(0)
            .Data14.set(0)
            .Data15.set(0)
            .Data16.set(0)
            .Data17.set(0)
            .Data18.set(0)
            .Data19.set(0)
            .Data2.set(0)
            .Data20.set(0)
            .Data21.set(0)
            .Data22.set(0)
            .Data23.set(0)
            .Data3.set(0)
            .Data4.set(0)
            .Data5.set(0)
            .Data6.set(0)
            .Data7.set(0)
            .Data8.set(0)
            .Data9.set(0)
            .IconName.set("")
            .ScriptName.set("")
            .castBarCaption.set("")
            .displayId.set(0)
            .name.set("")
            .size.set(0)
            .type.set(0)
            .unk1.set("")
    }
    protected Clone(mod: string, name: string, r: GameObjectPlain, parent: GameObjectPlain): void {
        throw new Error("Method not implemented.")
    }
    protected Entity(r: gameobject_templateRow): GameObjectPlain {
        return new GameObjectPlain(r);
    }
    protected FindByID(id: number): gameobject_templateRow {
        return SQL.gameobject_template.find({entry:id});
    }
    protected EmptyQuery(): gameobject_templateQuery {
        return {}
    }
    protected ID(e: GameObjectPlain): number {
        return e.ID;
    }
}

export const GameObjectTemplates = new GameObjectTemplateRegistryClass();

export class GameObjectInstanceRegistryClass
    extends RegistryStatic<GameObjectInstance,gameobjectRow,gameobjectQuery>
{
    protected Table(): Table<any, gameobjectQuery, gameobjectRow> & { add: (id: number) => gameobjectRow } {
        return SQL.gameobject
    }
    protected IDs(): StaticIDGenerator {
        return Ids.gameobject
    }
    Clear(r: GameObjectInstance): void {
        r.PhaseMask.set(0)
         .Position.setSpread(0,0,0,0,0)
         .Area.set(0)
         .PhaseMask.set(0)
         .Rotation.setSpread(0,0,0,0)
         .ScriptName.set('')
         .SpawnMask.set(0)
         .SpawnTimeSecs.set(0)
         .State.set(0)
         .Zone.set(0)
    }
    protected Clone(mod: string, name: string, r: GameObjectInstance, parent: GameObjectInstance): void {
        throw new Error("Method not implemented.")
    }
    protected Entity(r: gameobjectRow): GameObjectInstance {
        return new GameObjectInstance(r);
    }
    protected FindByID(id: number): gameobjectRow {
        return SQL.gameobject.find({guid:id});
    }
    protected EmptyQuery(): gameobjectQuery {
        return {}
    }
    protected ID(e: GameObjectInstance): number {
        return e.ID;
    }
}

export const GameObjectInstances = new GameObjectInstanceRegistryClass();

export class GameObejctDisplayRegistryClass
    extends RegistryDynamic<
        GameObjectDisplay,GameObjectDisplayInfoRow,GameObjectDisplayInfoQuery
    >
{
    protected Table(): Table<any, GameObjectDisplayInfoQuery, GameObjectDisplayInfoRow> & { add: (id: number) => GameObjectDisplayInfoRow } {
        return DBC.GameObjectDisplayInfo;
    }
    protected ids(): DynamicIDGenerator {
        return Ids.GameObjectDisplayInfo
    }
    Clear(entity: GameObjectDisplay): void {
        entity.GeoBox.set({minX:0,minY:0,minZ:0,maxX:0,maxY:0,maxZ:0})
    }
    protected Clone(entity: GameObjectDisplay, parent: GameObjectDisplay): void {
        throw new Error("Method not implemented.")
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
    protected ID(e: GameObjectDisplay): number {
        return e.ID;
    }
}
export const GameObjectDisplayRegistry = new GameObejctDisplayRegistryClass();