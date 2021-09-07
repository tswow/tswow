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
     * Add a quest starter
     * @param npcId 
     */
    addStarter(npcId : number) {
        this.mark(npcId);
        SQL.creature_queststarter.add(npcId,this.owner.ID);
        return this.end;
    }

    /**
     * Add a quest ender
     * @param npcId 
     */
    addEnder(npcId : number, addPoi = true) {
        this.mark(npcId);
        SQL.creature_questender.add(npcId,this.owner.ID)

        if(addPoi) {
            let creatures = SQL.creature.filter({id:npcId})
            if(creatures.length === 0) {
                throw new Error(
                      `No spawn for creature template ${npcId}, `
                    + `either spawn your creature before creating the quest `
                    + `or set the complete poi manually (Quest.CompletePoint)`
                )
            }

            if(creatures.length > 1) {
                throw new Error(
                        `Multiple spawns for creature template ${npcId}, `
                      + `please set poi manually`
                )
            }

            this.owner.POIs.add(-1,[{
                  map:creatures[0].map.get()
                , x:creatures[0].position_x.get()
                , y:creatures[0].position_y.get()
                , z:creatures[0].position_z.get()
                , o:0
            }])
        }

        return this.owner;
    }

    /**
     * Add both a quest starter and ender
     * @param npcId 
     */
    addBoth(npcId: number, addPoi = true) {
        this.addStarter(npcId);
        this.addEnder(npcId, addPoi);
        return this.owner;
    }
}