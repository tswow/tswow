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
import { CreatureTemplate } from "../Creature/CreatureTemplate";
import { GameObjectTemplate } from "../GameObject/GameObjectTemplate";
import { MainEntity } from "./Entity";

export abstract class GOCreature<T> extends MainEntity<T> {
    protected abstract isCreature() : boolean;
    protected abstract isGameObject() : boolean;
    abstract readonly ID: number;

    static isCreature(creature: GOCreature<any>) : creature is CreatureTemplate {
        return creature.isCreature();
    }

    static isGameObject<T extends GameObjectTemplate<T>>(go: GOCreature<any>) : go is GameObjectTemplate<T> {
        return go.isGameObject();
    }
}