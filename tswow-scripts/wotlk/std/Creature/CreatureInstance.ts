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

import { finish } from "wotlkdata";
import { makeEnumCell } from "wotlkdata/wotlkdata/cell/cells/EnumCell";
import { makeMaskCell32 } from "wotlkdata/wotlkdata/cell/cells/MaskCell";
import { Transient } from "wotlkdata/wotlkdata/cell/serialization/Transient";
import { CellSystem } from "wotlkdata/wotlkdata/cell/systems/CellSystem";
import { SQL } from "wotlkdata/wotlkdata/sql/SQLFiles";
import { creatureRow } from "wotlkdata/wotlkdata/sql/types/creature";
import { creature_addonRow } from "wotlkdata/wotlkdata/sql/types/creature_addon";
import { instance_boss_creatureRow } from "wotlkdata/wotlkdata/sql/types/instance_boss_creature";
import { CreatureGameEventsForward, GameEventModelEquipForward, GameEventNPCFlagForward, GameEventNPCVendorCreature } from "../GameEvent/GameEventRelations";
import { MainEntity } from "../Misc/Entity";
import { PositionMapXYZOCell } from "../Misc/PositionCell";
import { SpawnMask } from "../Misc/SpawnMask";
import { MaybeSQLEntity } from "../Misc/SQLDBCEntity";
import { implicitCreatureState } from "../SpawnGroup/ImplicitBossGroup";
import { VehicleInstanceAccessories } from "../Vehicle/VehicleAccessory";
import { CreatureMovementType } from "./CreatureMovementType";
import { CreaturePatrolPath } from "./CreaturePatrolPath";

export class CreatureInstanceAddon
    extends MaybeSQLEntity<CreatureInstance,creature_addonRow>
{
    protected createSQL(): creature_addonRow{
        return SQL.creature_addon.add(this.owner.ID)
            .MountCreatureID.set(0)
            .auras.set('')
            .bytes1.set(0)
            .bytes2.set(0)
            .emote.set(0)
            .mount.set(0)
            .path_id.set(0)
            .visibilityDistanceType.set(0)
    }
    protected findSQL(): creature_addonRow {
        return SQL.creature_addon.query({guid:this.owner.ID})
    }
    protected isValidSQL(sql: creature_addonRow): boolean {
        return sql.guid.get() === this.owner.ID;
    }

    get Auras()  { return this.wrapSQL('',sql=>sql.auras) }
    get Path()   { return this.wrapSQL(0,sql=>sql.path_id); }
    get Bytes1() { return this.wrapSQL(0,sql=>sql.bytes1); }
    get Bytes2() { return this.wrapSQL(0,sql=>sql.bytes2); }
    get Emote()  { return this.wrapSQL(0,sql=>sql.emote); }
    get Mount()  { return this.wrapSQL(0,sql=>sql.mount); }
    get VisibilityDistanceType() {
        return this.wrapSQL(0,sql=>sql.visibilityDistanceType);
    }
}

export class CreatureInstanceBoss
    extends MaybeSQLEntity<CreatureInstance,instance_boss_creatureRow>
{
    protected createSQL(): instance_boss_creatureRow {
        return SQL.instance_boss_creature.add(this.owner.ID)
            .boss.set(0)
            .map.set(-1)
    }
    protected findSQL(): instance_boss_creatureRow {
        return SQL.instance_boss_creature.query({guid:this.owner.ID})
    }
    protected isValidSQL(sql: instance_boss_creatureRow): boolean {
        return sql.guid.get() === this.owner.ID
    }

    get Boss() { return this.wrapSQL(-1,sql=>sql.boss)}

    set(boss: number) {
        if(!this.exists()) {
            this.createSQL()
                .boss.set(boss)
                .map.set(-1) // <-- means we will set it later
        } else {
            this.getSQL()
                .boss.set(boss);
        }
    }

    get() {
        return this.wrapSQL(-1,sql=>sql.boss).get()
    }
}

export class CreatureInstanceAddonRow extends CellSystem<CreatureInstance> {
    protected readonly Addon = new CreatureInstanceAddon(this.owner)
    exists() { return this.Addon.exists(); }
    get() { return this.Addon.getSQL(); }
    mod(callback: (row: creature_addonRow)=>void) {
        callback(this.get());
        return this.owner;
    }

    static addon(inst: CreatureInstance) {
        return inst.AddonRow.Addon;
    }
}

export class CreatureInstance extends MainEntity<creatureRow> {
    @Transient
    protected get Addon() { return CreatureInstanceAddonRow.addon(this); }
    @Transient
    readonly AddonRow = new CreatureInstanceAddonRow(this);
    get Auras() { return this.Addon.Auras; }
    get Path() { return this.Addon.Path; }
    get AddonBytes1() { return this.Addon.Bytes1; }
    get AddonBytes2() { return this.Addon.Bytes2; }
    get Emote() { return this.Addon.Emote; }
    get Mount() { return this.Addon.Mount; }
    get VisibilityDistanceType() { return this.Addon.VisibilityDistanceType; }
    get EncounterSpawn() { return implicitCreatureState(this) }
    get ID() { return this.row.guid.get(); }
    get Template() { return this.wrap(this.row.id); }
    get SpawnMask() {
        return makeMaskCell32(SpawnMask,this, this.row.spawnMask);
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

    get MovementType() {
        return makeEnumCell(CreatureMovementType,this, this.row.MovementType);
    }

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

    /**
     * The boss id of this creature in the instance it belongs to
     */
    get Boss() { return new CreatureInstanceBoss(this); }
}

// write boss maps once we're done writing, since the map could change before then
finish('boss_maps',()=>{
    SQL.instance_boss_creature.queryAll({})
        .forEach(x=>{
            // only set maps set to be "unset"
            if(x.map.get() !== -1) return;
            const c = SQL.creature.query({guid:x.guid.get()})
            if(!c) return;
            x.map.set(c.map.get());
        })
});