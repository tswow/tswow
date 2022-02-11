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
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { CreatureTemplate } from "./CreatureTemplate";

export class CreatureIconNames extends CellSystem<CreatureTemplate> {
    set(value: string) {
        this.owner.row.IconName.set(value);
        return this.owner;
    }

    /** Used by most creatures */
    setNone() {
        return this.set('');
    }

    /** Used for Guards and Teleporter NPC's  */
    setDirections() { return this.set('Directions'); }

    /** Indicator of a Turrent NPC/Player controlled */
    setGunner() { return this.set('Gunner'); }

    /** Indicator that this is a PCV (Player Controlled Vehicle) */
    setVehicle() { return this.set('vehicleCursor'); }

    /** Shows a Steering Wheel icon when mouse over. */
    setDriver() { return this.set('Driver'); }

    /** Shows a Sword icon indicating you can attack this target */
    setAttack() { return this.set('Attack'); }

    /** Shows a brown bag icon usually if the NPC only sells things */
    setBuy() { return this.set('Buy'); }

    /** Shows a chat bubbule icon if this NPC has Quest/Gossip options */
    setSpeak() { return this.set('Speak'); }

    /** Shows a Hand Grasping icon if this NPC can be picked up for quest/items */
    setPickup() { return this.set('Pickup'); }

    /** Shows cog icon commonly used for quest/transport */
    setInteract() { return this.set('Interact'); }

    /** Shows a book icon, identifying this npc as a Trainer */
    setTrainer() { return this.set('Trainer'); }

    /** Shows a Boot w/Wings icon identifying this NPC as a "Taxi" */
    setTaxi() { return this.set('Taxi'); }

    /** Shows an Anvil icon identifying this npc as a Repair NPC */
    setRepair() { return this.set('Repair'); }

    /** Shows a Multiple brown Bag icon (same as holding shift when looting a creature) */
    setLootAll() { return this.set('LootAll'); }

    /** Unused/Unknown */
    setQuest() { return this.set('Quest'); }

    /** Unused/Unknown */
    setPVP() { return this.set('PVP'); }
}