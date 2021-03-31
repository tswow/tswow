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

export class MechanicImmunity extends MaskCell<CreatureTemplate> {
    get Charm() { return this.bit(0); }
    get Disoriented() { return this.bit(1); }
    get Disarm() { return this.bit(2); }
    get Distract() { return this.bit(3); }
    get Fear() { return this.bit(4); }
    get Grip() { return this.bit(5); }
    get Root() { return this.bit(6); }
    get SlowAttack() { return this.bit(7); }
    get Silence() { return this.bit(8); }
    get Sleep() { return this.bit(9); }
    get Snare() { return this.bit(10); }
    get Stun() { return this.bit(11); }
    get Freeze() { return this.bit(12); }
    get Knockout() { return this.bit(13); }
    get Bleed() { return this.bit(14); }
    get Bandage() { return this.bit(15); }
    get Polymorph() { return this.bit(16); }
    get Banish() { return this.bit(17); }
    get Shield() { return this.bit(18); }
    get Shackle() { return this.bit(19); }
    get Mount() { return this.bit(20); }
    get Infected() { return this.bit(21); }
    get Turn() { return this.bit(22); }
    get Horror() { return this.bit(23); }
    get Invulnerability() { return this.bit(24); }
    get Interrupt() { return this.bit(25); }
    get Daze() { return this.bit(26); }
    get Discovery() { return this.bit(27); }
    get ImmuneShiled() { return this.bit(28); }
    get Sapped() { return this.bit(29); }
    get Enraged() { return this.bit(30); }
}