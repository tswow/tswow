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
import { Subsystem } from "wotlkdata/cell/Subsystem";
import { Quest } from "./Quest";

export class QuestNPC extends Subsystem<Quest> {
    /**
     * Add a quest starter
     * @param npcId 
     */
    addStarter(npcId : number) {
        SQL.creature_queststarter.add(npcId,this.owner.ID);
        return this.up();
    }

    /**
     * Add a quest ender
     * @param npcId 
     */
    addEnder(npcId : number) {
        SQL.creature_questender.add(npcId,this.owner.ID)
        return this.up();
    }

    /**
     * Add both a quest starter and ender
     * @param npcId 
     */
    addBoth(npcId: number) {
        this.addStarter(npcId);
        this.addEnder(npcId);
        return this.up();
    }
}