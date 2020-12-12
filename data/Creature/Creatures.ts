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
import { Position } from "../Misc/Position";
import { CreatureInstance } from "./CreatureInstance";
import { CreatureTemplate } from "./CreatureTemplate";

export const CreatureTemplates = {
    create: (mod: string, id: string, parent: number) => {
        return new CreatureTemplate(SQL.creature_template.find({entry: parent})
            .clone(Ids.CreatureTemplate.id(mod, id)))
    },

    load(id: number) {
        return new CreatureTemplate(SQL.creature_template.find({entry:id}));
    }
}

export const CreatureInstances = {
    create(mod: string, name: string, template: number, position: Position) {
        return new CreatureInstance(
            SQL.creature.add(Ids.CreatureInstance.id(mod, name))
                .curhealth.set(1)
                .curmana.set(0)
                .currentwaypoint.set(0)
                .MovementType.set(0)
                .modelid.set(0)
                .npcflag.set(0)
            )
        .Position.set(position)
        .TemplateID.set(template)
    },

    load(id: number) {
        return new CreatureInstance(SQL.creature.find({guid: id}));
    }
}
