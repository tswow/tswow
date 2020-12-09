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
import { EnumBase } from "wotlkdata/cell/Systems/Enum";
import { CreatureTemplate } from "./CreatureTemplate";

export class UnitClass extends EnumBase<CreatureTemplate> {
    get(): number {
        return this.owner.row.unit_class.get();
    }

    set(value: number): CreatureTemplate {
        this.owner.row.unit_class.set(value);
        return this.owner;
    }

    setWarrior() { return this.set(1); }
    setPaladin() { return this.set(2); }
    setRogue() { return this.set(3); }
    setMage() { return this.set(4); }
}