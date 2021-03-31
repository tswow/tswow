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
import { Enum, EnumField } from "wotlkdata/cell/systems/Enum";
import { Area } from "./Area";

export class AreaFaction extends Enum<Area> {
    @EnumField(0)
    setContested() { return this.set(0); }

    @EnumField(2)
    setAlliance() { return this.set(2); }

    @EnumField(4)
    setHorde() { return this.set(4); }

    @EnumField(6)
    setNeutral() { return this.set(6); }
}