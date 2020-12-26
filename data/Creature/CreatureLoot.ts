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
import { Subsystem } from "wotlkdata/cell/Subsystem";
import { SQL } from "wotlkdata/sql/SQLFiles";
import { Ids } from "../Base/Ids";
import { AttachedLootSet } from "../Loot/Loot";
import { CreatureTemplate } from "./CreatureTemplate";

export class CreatureLoot extends Subsystem<CreatureTemplate> {
    get Normal() { return new AttachedLootSet(this, 
        this.owner.row.lootid, 
        Ids.CreatureLoot, 
        SQL.creature_loot_template)
    }

    get Pickpocket() { return new AttachedLootSet(this, 
        this.owner.row.pickpocketloot, 
        Ids.PickPocketLoot, 
        SQL.pickpocketing_loot_template)
    }

    get Skinning() { return new AttachedLootSet(this, 
        this.owner.row.skinloot, 
        Ids.SkinningLoot, 
        SQL.skinning_loot_template)
    }
}