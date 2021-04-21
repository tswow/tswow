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
import { CreatureInstance } from "./CreatureInstance";

export class CreatureSpawnMask<T> extends MaskCell<CreatureInstance<T>> {
    get Normal10Man() { return this.bit(0); }
    get Normal25Man() { return this.bit(1); }
    get Heroic10Man() { return this.bit(2); }
    get Heroic25Man() { return this.bit(3); }
}