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
import { ItemTemplate } from "./ItemTemplate";

export class ItemSheath extends EnumCellWrapper<ItemTemplate> {
    get(): number {
        return this.owner.row.sheath.get();
    }
    set(value: number): ItemTemplate {
        this.owner.row.sheath.set(value);
        return this.owner;
    }

    @EnumField(0)
    setNone() { return this.set(0); }

    @EnumField(1)
    setTwoHandedWeapon() { return this.set(1); }

    @EnumField(2)
    setStaff() { return this.set(2); }

    @EnumField(3)
    setOneHanded() { return this.set(3); }

    @EnumField(4)
    setShield() { return this.set(4); }

    @EnumField(5)
    setEnchantersRod() { return this.set(5); }

    @EnumField(6)
    setOffhand() { return this.set(6); }
}