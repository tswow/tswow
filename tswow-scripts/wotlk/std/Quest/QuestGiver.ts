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
import { Quest } from "./Quest";

export class QuestNPC extends CellSystem<Quest> {
    /**
     * Mark a Creature as the start of a Quest.
     * @param npcId
     */
    addCreatureStarter(npcId : number) {
        SQL.creature_queststarter.add(npcId,this.owner.ID);
        return this.owner;
    }

    /**
     * Mark a Creature as the end of a Quest.
     * @param npcId
     */
    addCreatureEnder(npcId : number, addPoi: boolean = true) {
        SQL.creature_questender.add(npcId,this.owner.ID)

        if(addPoi) {
            let creatures = SQL.creature.queryAll({id:npcId})
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
     * Mark a Creature as both a Quest starter and ender
     * @param npcId
     */
    addCreatureBoth(npcId: number, addPoi: boolean = true) {
        this.addCreatureStarter(npcId);
        this.addCreatureEnder(npcId,addPoi);
        return this.owner;
    }

    /**
     * Mark a GameObject as the start of a Quest.
     * @param goId
     */
    addObjectStarter(goId : number) {
        SQL.gameobject_queststarter.add(goId, this.owner.ID);
        return this.owner;
    }

    /**
     * Mark a GameObject as the end of a Quest.
     * @param goId
     */
    addObjectEnder(goId : number) {
        SQL.gameobject_questender.add(goId, this.owner.ID)
        return this.owner;
    }

    /**
     * Mark a GameObject as both a Quest starter and ender
     * @param goId
     */
    addObjectBoth(goId: number) {
        this.addObjectStarter(goId);
        this.addObjectEnder(goId);
        return this.owner;
    }
}