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
import { MaskCell32 } from "wotlkdata/cell/cells/MaskCell";
import { CreatureTemplate } from "./CreatureTemplate";

export class DynFlags extends MaskCell32<CreatureTemplate> {
    get None() { return this.bit(0); }
    get Lootable() { return this.bit(1); }
    get TrackUnit() { return this.bit(2); }
    get Tapped() { return this.bit(3); }
    get TappedByPlayer() { return this.bit(4); }
    get SpecialInfo() { return this.bit(5); }
    get Dead() { return this.bit(6); }
    get ReferAFriend() { return this.bit(7); }
    get TappedByAllThreatList() { return this.bit(8); }
}