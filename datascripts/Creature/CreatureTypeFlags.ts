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
import { MaskCell } from "wotlkdata/cell/systems/Mask";
import { CreatureTemplate } from "./CreatureTemplate";

export class CreatureTypeFlags extends MaskCell<CreatureTemplate> {
    get Tameable() { return this.bit(0); }
    get Ghost() { return this.bit(1); }
    get Boss() { return this.bit(2); }
    get NoParryAnimation() { return this.bit(3); }
    get HideFactionTooltip() { return this.bit(4); }
    get Unk6() { return this.bit(5); }
    get SpellAttackable() { return this.bit(6); }
    get DeadInteract() { return this.bit(7); }
    get HerbLoot() { return this.bit(8); }
    get MiningLoot() { return this.bit(9); }
    get DontLogDeath() { return this.bit(10); }
    get MountedCombat() { return this.bit(11); }
    get AidPlayers() { return this.bit(12); }
    get IsPetBarUsed() { return this.bit(13); }
    get MaskUID() { return this.bit(14); }
    get EngineerLoot() { return this.bit(15); }
    get ExoticPet() { return this.bit(16); }
    get UseDeafultCollision() { return this.bit(17); }
    get IsSiegeWeapon() { return this.bit(18); }
    get ProjectileCollision() { return this.bit(19); }
    get HideNameplate() { return this.bit(20); }
    get NoMountedAnimations() { return this.bit(21); }
    get IsLinkAll() { return this.bit(22); }
    get InteractOnlyWithCreator() { return this.bit(23); }
    get ForceGossip() { return this.bit(24); }
}