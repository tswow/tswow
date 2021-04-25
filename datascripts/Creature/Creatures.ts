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
import { creatureQuery } from "wotlkdata/sql/types/creature";
import { creature_templateQuery } from "wotlkdata/sql/types/creature_template";
import { Ids } from "../Misc/Ids"
import { Position } from "../Misc/Position";
import { CreatureInstance } from "./CreatureInstance";
import { CreatureTemplate } from "./CreatureTemplate";
import { CreaturePresets } from "./CreaturePresets/CreaturePresets";

export const CreatureTemplates = {
    Presets: CreaturePresets,

    create: (mod: string, id: string, parent: number = -1) => {
        let nid = Ids.CreatureTemplate.id(mod,id);
        if(parent<0) {
            return new CreatureTemplate(SQL.creature_template.add(nid))
                .Icon.setNone()
                .Level.set(1,1)
                .MechanicImmunity.clearAll()
                .Models.clearAll()
                .MovementID.set(0)
                .MovementSpeed.set(1,1.14)
                .MovementType.setIdle()
                .NPCFlags.clearAll()
                .PetSpells.set(0)
                .RacialLeader.set(0)
                .RaidHeroic10ID.set(0)
                .RaidHeroic25ID.set(0)
                .RaidNormal25ID.set(0)
                .Rank.setNormal()
                .RegenHealth.set(1)
                .Scale.set(1)
                .SpellSchoolImmunity.clearAll()
                .Stats.set(1,1,1,1,1)
                .Subname.enGB.set('')
                .Type.setHumanoid()
                .TypeFlags.clearAll()
                .UnitClass.setWarrior()
                .UnitFlags.clearAll()
                .VehicleID.set(0)
                .AIName.ReactorAI()
                .AttackTime.set(1,1,1,1)
                .DamageSchool.setNormal()
                .DungeonHeroicID.set(0)
                .DynFlags.clearAll()
                .DynamicFlags.set(0)
                .FactionTemplate.setNeutralPassive()
                .Family.set(0)
                .FlagsExtra.set(0)
                .Gold.set(0)
                .HealthExpansion.set(0)
                .HoverHeight.set(0)
        } else {
            return new CreatureTemplate(SQL.creature_template.find({entry: parent})
                .clone(Ids.CreatureTemplate.id(mod, id))).Gossip.setID(0)
        }
    },

    load(id: number) {
        return new CreatureTemplate(SQL.creature_template.find({entry:id}));
    },

    filter(query: creature_templateQuery) {
        return SQL.creature_template.filter(query).map(x=>new CreatureTemplate(x));
    }
}

export const CreatureInstances = {
    create(mod: string, name: string, template: number, position: Position) {
        return new CreatureInstance(
            undefined,
            SQL.creature.add(Ids.CreatureInstance.id(mod, name))
                .curhealth.set(1)
                .curmana.set(0)
                .currentwaypoint.set(0)
                .MovementType.set(0)
                .modelid.set(0)
                .npcflag.set(0)
                .wander_distance.set(0)
                .VerifiedBuild.set(17688)
            )
        .Position.set(position)
        .TemplateID.set(template)
    },

    filter(query: creatureQuery) {
        return SQL.creature.filter(query).map(x=>new CreatureInstance(undefined,x));
    },

    load(id: number) {
        return new CreatureInstance(undefined, SQL.creature.find({guid: id}));
    }
}
