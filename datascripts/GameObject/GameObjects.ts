import { DBC, SQL } from "wotlkdata"
import { GameObjectDisplayInfoQuery } from "wotlkdata/dbc/types/GameObjectDisplayInfo"
import { gameobjectQuery } from "wotlkdata/sql/types/gameobject"
import { gameobject_templateQuery } from "wotlkdata/sql/types/gameobject_template"
import { Ids } from "../Base/Ids"
import { BoundingBox } from "../Misc/BoundingBox"
import { Position } from "../Misc/Position"
import { GameObjectBase } from "./GameObjectBase"
import { GameObjectDisplay } from "./GameObjectDisplay"
import { GameObjectInstance } from "./GameObjectInstance"

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
export const GameObjectTemplates = {
    create(mod: string, id: string, parent: number = -1) {
        const entry = Ids.GameObjectTemplate.id(mod,id)
        const row = parent != -1 ? SQL.gameobject_template
            .find({entry:parent}).clone(entry)
            : SQL.gameobject_template.add(entry)
        return new GameObjectBase(row);
    },

    load(id: number) {
        return new GameObjectBase(SQL.gameobject_template.find({entry:id}));
    },

    filter(query: gameobject_templateQuery) {
        return SQL.gameobject_template.filter(query).map(x=>new GameObjectBase(x));
    },
}

export const GameObjectInstances = {
    create(mod: string, id: string, pos: Position) {
        return new GameObjectInstance(
            SQL.gameobject.add(Ids.GameObjectInstance.id(mod,id))
                .VerifiedBuild.set(17688)
        ).Position.set(pos)
    },

    load(guid: number) {
        return new GameObjectInstance(SQL.gameobject.find({id: guid}));
    },

    filter(query: gameobjectQuery) {
        return SQL.gameobject.filter(query).map(x=>new GameObjectInstance(x));
    },
}

export const GameObjectDisplays = {
    create(modelPath: string, boundingBox: BoundingBox = new BoundingBox(-1,-1,-1,1,1,1)) {
        const row = DBC.GameObjectDisplayInfo.add(Ids.GameObjectDisplay.id());
        row.ModelName.set(modelPath);
        return new GameObjectDisplay(row).GeoBox.set(boundingBox);
    },

    load(id: number) {
        return new GameObjectDisplay(DBC.GameObjectDisplayInfo.findById(id));
    },

    filter(query: GameObjectDisplayInfoQuery) {
        return DBC.GameObjectDisplayInfo.filter(query).map(x=>new GameObjectDisplay(x));
    },
}