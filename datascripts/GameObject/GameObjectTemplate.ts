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
import { SQL } from "wotlkdata";
import { gameobject_templateRow } from "wotlkdata/sql/types/gameobject_template";
import { GOCreature } from "../Misc/GOorCreature";
import { Ids } from "../Misc/Ids";
import { Position } from "../Misc/Position";
import { GameObjectInstance } from "./GameObjectInstance";
import { GameObjectName } from "./GameObjectName";
import { GameObjectType } from "./GameObjectType";
import { GameObjectDisplay } from "./GameObjectDisplay";

export class GameObjectTemplate<T extends GameObjectTemplate<T>> extends GOCreature<gameobject_templateRow> {
    protected isCreature(): boolean {
        return false;
    }

    protected isGameObject(): boolean {
        return true;
    }

    get row2() {
        let row = SQL.gameobject_template_addon.find({entry: this.ID});

        if(row===undefined) {
            row = SQL.gameobject_template_addon.add(this.ID)
                .artkit0.set(0)
                .artkit1.set(0)
                .artkit2.set(0)
                .artkit3.set(0)
                .faction.set(0)
                .flags.set(0)
                .maxgold.set(0)
                .mingold.set(0)
        }
        return row;
    }

    protected get Type(): GameObjectType<T> { return new GameObjectType<T>(this, this.row.type); }
    get ID() { return (this as any as T).row.entry.get(); }

    get Display(): GameObjectDisplay<T> { return new GameObjectDisplay(this, [this.row.displayId]) as any; }

    get Name(): GameObjectName<T> { return new GameObjectName<T>(this as any as T); }
    get Icon() { return (this as any as T).wrap(this.row.IconName); }
    get CastBarCaption() { return (this as any as T).wrap(this.row.castBarCaption); }
    get Size() { return (this as any as T).wrap(this.row.size); }

    spawn(mod: string, id: string, position: Position) {
        return new GameObjectInstance(
            SQL.gameobject.add(Ids.GameObjectInstance.id(mod,id))
                .VerifiedBuild.set(17688)
        ).Position.set(position)
    }
}