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
import { Enum } from "wotlkdata/cell/Systems/Enum";
import { Map } from "./Map";

export class MapInstanceType extends Enum<Map>{
    
    setNone() { return this.set(0); }

    setParty() { return this.set(1); }
    setRaid() { return this.set(2); }
    setPVP() { return this.set(3); }
    setArena() { return this.set(4); }
}