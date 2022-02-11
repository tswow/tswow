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
import { SQL } from "../../SQLFiles";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { CreatureTemplate } from "./CreatureTemplate";

export class CreatureQuestgiver extends CellSystem<CreatureTemplate> {
    addBoth(questId: number) {
        this.addStarter(questId);
        this.addEnder(questId);
        return this.owner;
    }

    addStarter(questId: number) {
        SQL.creature_queststarter.add(this.owner.ID,questId);
        return this.owner;
    }

    addEnder(questId: number) {
        SQL.creature_questender.add(this.owner.ID,questId)
        return this.owner;
    }
}