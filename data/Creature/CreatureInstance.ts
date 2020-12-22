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

import { creatureRow } from "wotlkdata/sql/types/creature";
import { MainEntity } from "../Base/MainEntity";
import { CreatureMovementType } from "./CreatureMovementType";
import { CreaturePosition } from "./CreaturePosition";
import { CreatureSpawnMask } from "./CreatureSpawnMask";

export class CreatureInstance extends MainEntity<creatureRow> {
    get GUID() { return this.row.guid.get(); }
    get TemplateID() { return this.wrap(this.row.id); }
    get Map() { return this.wrap(this.row.map); }
    get SpawnMask() { return new CreatureSpawnMask(this, this.row.spawnMask); }
    get PhaseMask() { return this.wrap(this.row.phaseMask); }
    /** If 0, use a random model from CreatureTemplate#Models */
    get ModelID() { return this.wrap(this.row.modelid); }
    get Position() { return new CreaturePosition(this); }

    /** Respawn time in seconds */
    get SpawnTime() { return this.wrap(this.row.spawntimesecs); }
    get WanderDistance() { return this.wrap(this.row.wander_distance)}

    get MovementType() { return new CreatureMovementType(this, this.row.MovementType); }
}
