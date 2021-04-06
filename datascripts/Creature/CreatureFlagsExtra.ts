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

export class CreatureFlagsExtra extends MaskCell<CreatureTemplate> {
    get BindsInstance() { return this.bit(0); }
    get Civilian() { return this.bit(1); }
    get NoParry() { return this.bit(2); }
    get NoParryHasten() { return this.bit(2); }
    get NoBlock() { return this.bit(2); }
    get NoCrush() { return this.bit(2); }
    get NoXPAtKill() { return this.bit(2); }
    get ExtraTrigger() { return this.bit(2); }
    get NoTaunt() { return this.bit(2); }
    get NoMoveFlagsUpdate() { return this.bit(2); }
    get GhostVisibility() { return this.bit(2); }
    get UseOffhandAttack() { return this.bit(2); }
    get NoSellVendor() { return this.bit(2); }
    get WorldEvent() { return this.bit(2); }
    get Guard() { return this.bit(2); }
    get NoCrit() { return this.bit(2); }
    get NoSkillGain() { return this.bit(2); }
    get TauntDiminish() { return this.bit(2); }
    get AllDiminish() { return this.bit(2); }
    get NoplayerDamageReq() { return this.bit(2); }
    get DungeonBoss() { return this.bit(2); }
    get Ignorepathfinding() { return this.bit(2); }
    get Knockback() { return this.bit(2); }
}