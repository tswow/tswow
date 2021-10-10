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
import { CellSystem } from "wotlkdata/cell/systems/CellSystem";
import { std } from "../tswow-stdlib-data";
import { Quest } from "./Quest";

export class QuestNPC extends CellSystem<Quest> {
    private mark(id: number) {
        std.CreatureTemplates.load(id).NPCFlags.QuestGiver.mark();
    }

    /**
     * Mark a Creature as the start of a Quest.
     * @param npcId 
     */
    addCreatureStarter(npcId : number) {
        this.mark(npcId);
        SQL.creature_queststarter.add(npcId,this.owner.ID);
        return this.end;
    }

    /**
     * Mark a Creature as the end of a Quest.
     * @param npcId 
     */
    addCreatureEnder(npcId : number) {
        this.mark(npcId);
        SQL.creature_questender.add(npcId,this.owner.ID)
        return this.end;
    }

    /**
     * Mark a Creature as both a Quest starter and ender
     * @param npcId 
     */
    addCreatureBoth(npcId: number) {
        this.addCreatureStarter(npcId);
        this.addCreatureEnder(npcId);
        return this.end;
    }

    /**
     * Mark a GameObject as the start of a Quest.
     * @param goId 
     */
    addObjectStarter(goId : number) {
        SQL.gameobject_queststarter.add(goId, this.owner.ID);
        return this.end;
    }

    /**
     * Mark a GameObject as the end of a Quest.
     * @param goId 
     */
    addObjectEnder(goId : number) {
        SQL.gameobject_questender.add(goId, this.owner.ID)
        return this.end;
    }

    /**
     * Mark a GameObject as both a Quest starter and ender
     * @param goId 
     */
    addObjectBoth(goId: number) {
        this.addObjectStarter(goId);
        this.addObjectEnder(goId);
        return this.end;
    }
}