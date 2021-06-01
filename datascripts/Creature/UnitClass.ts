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
import { EnumCellWrapper, EnumField } from "wotlkdata/cell/cells/EnumCell";
import { CreatureTemplate } from "./CreatureTemplate";

export class UnitClass extends EnumCellWrapper<CreatureTemplate> {
    get(): number {
        return this.owner.row.unit_class.get();
    }

    set(value: number): CreatureTemplate {
        this.owner.row.unit_class.set(value);
        return this.owner;
    }

    @EnumField(1)
    setWarrior() { return this.set(1); }

    @EnumField(2)
    setPaladin() { return this.set(2); }

    @EnumField(4)
    setRogue() { return this.set(4); }

    @EnumField(8)
    setMage() { return this.set(8); }
}