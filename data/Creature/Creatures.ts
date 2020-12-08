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
import { SQL } from "wotlkdata/sql/SQLFiles";
import { Ids } from "../Base/Ids"
import { CreatureTemplate } from "./CreatureType";

export const Creatures = {
    createTemplate: (mod: string, id: string, parent: number) => {
        return new CreatureTemplate(SQL.creature_template.find({entry: parent})
            .clone(Ids.CreatureTemplate.id(mod, id)))
    },

    // TODO: Add gossip options and talent unlearns
    createTrainer(mod: string, id: string, trainerId: number, parent: number){
        const creature = Creatures.createTemplate(mod, id, parent)
        SQL.creature_default_trainer.add(creature.ID)
            .TrainerId.set(trainerId);
        creature.row.gossip_menu_id.set(0);
        return creature;
    }
}
