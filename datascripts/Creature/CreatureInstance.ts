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
import { creatureRow } from "wotlkdata/sql/types/creature";
import { CreatureMovementType } from "./CreatureMovementType";
import { CreaturePatrolPath } from "./CreaturePatrolPath";
import { CreaturePosition } from "./CreaturePosition";
import { CreatureSpawnMask } from "./CreatureSpawnMask";
import { CellSystem } from "wotlkdata/cell/systems/CellSystem";
import { Transient } from "wotlkdata/cell/serialization/Transient";

export class CreatureInstance<T> extends CellSystem<T> {

    @Transient
    readonly row: creatureRow;

    constructor(owner: T, row: creatureRow) {
        super(owner);
        this.row = row;
    }

    get addonRow() {
        let row = SQL.creature_addon.find({guid: this.row.guid.get()});
        if(row===undefined) {
            row = SQL.creature_addon.add(this.GUID)
                .auras.set('')
                .bytes1.set(0)
                .bytes2.set(0)
                .emote.set(0)
                .mount.set(0)
                .path_id.set(0)
        }
        return row;
    }

    get GUID() { return this.row.guid.get(); }
    get TemplateID() { return this.wrap(this.row.id); }
    get Map() { return this.wrap(this.row.map); }
    get SpawnMask(): CreatureSpawnMask<T> {
        return new CreatureSpawnMask(this, this.row.spawnMask);
    }
    get PhaseMask() { return this.wrap(this.row.phaseMask); }
    /** If 0, use a random model from CreatureTemplate#Models */
    get ModelID() { return this.wrap(this.row.modelid); }
    get Position(): CreaturePosition<T> {
        return new CreaturePosition(this);
    }

    /** Respawn time in seconds */
    get SpawnTime() { return this.wrap(this.row.spawntimesecs); }
    get WanderDistance() { return this.wrap(this.row.wander_distance)}

    get MovementType() { return new CreatureMovementType(this, this.row.MovementType); }

    get PatrolPath(): CreaturePatrolPath<T> {
        return new CreaturePatrolPath(this);
    }
}
