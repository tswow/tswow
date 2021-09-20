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
import { CreatureGameEventsForward, GameEventModelEquipForward, GameEventNPCFlagForward, GameEventNPCVendorCreature } from "../GameEvent/GameEventRelations";
import { MainEntity } from "../Misc/Entity";
import { PositionMapXYZOCell } from "../Misc/PositionCell";
import { RefReadOnly } from "../Refs/RefOld";
import { VehicleInstanceAccessories } from "../Vehicle/VehicleAccessory";
import { CreatureMovementType } from "./CreatureMovementType";
import { CreaturePatrolPath } from "./CreaturePatrolPath";
import { CreatureInstanceRegistry } from "./Creatures";
import { CreatureSpawnMask } from "./CreatureSpawnMask";

export class CreatureInstance extends MainEntity<creatureRow> {
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
    get Template() { return this.wrap(this.row.id); }
    get SpawnMask() {
        return new CreatureSpawnMask(this, this.row.spawnMask);
    }
    get PhaseMask() { return this.wrap(this.row.phaseMask); }
    /** If 0, use a random model from CreatureTemplate#Models */
    get Model() { return this.wrap(this.row.modelid); }
    get Position() {
        return new PositionMapXYZOCell(
              this
            , this.row.map
            , this.row.position_x
            , this.row.position_y
            , this.row.position_z
            , this.row.orientation
            )
    }
    /** Respawn time in seconds */
    get SpawnTime() { return this.wrap(this.row.spawntimesecs); }
    get WanderDistance() { return this.wrap(this.row.wander_distance)}

    get MovementType() { return new CreatureMovementType(this, this.row.MovementType); }

    get PatrolPath() {
        return new CreaturePatrolPath(this);
    }

    get VehicleAccessories() {
        return new VehicleInstanceAccessories(this);
    }

    /**
     * The game events where this creature will be spawned.
     * If empty, the creature is always spawned
     */
    get GameEvents() { return new CreatureGameEventsForward(this); }

    /**
     * Special flags this creature will gain during different
     * game events.
     */
    get GameEventFlags() { return new GameEventNPCFlagForward(this); }

    /**
     * Special equips this creature can have during ONE event.
     *
     * @note it is **not** possible to define different equips for
     * **multiple** game_events.
     */
    get GameEventEquips() { return new GameEventModelEquipForward(this); }

    /**
     * Special items this creature will sell during one event.
     *
     * @note it is **not** possible to define a single
     *       creature/item pair for **multiple** game_events.
     */
    get GameEventVendor() { return new GameEventNPCVendorCreature(this); }
}

export class CreatureRefReadOnly<T> extends RefReadOnly<T,CreatureInstance> {
    getRef(): CreatureInstance {
        return CreatureInstanceRegistry.load(this.cell.get());
    }
    exists(): boolean {
        return this.cell.get() > 0;
    }
}