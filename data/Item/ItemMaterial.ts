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
import { Enum, EnumField } from "wotlkdata/cell/Systems/Enum";
import { ItemTemplate } from "./ItemTemplate";

export class ItemMaterial extends Enum<ItemTemplate> {
    constructor(owner: ItemTemplate) {
        super(owner,owner.row.Material)
    }

    @EnumField(-1)
    setConsumables() { return this.set(-1); }

    @EnumField(1)
    setUndefined() { return this.set(0); }

    @EnumField(2)
    setMetal() { return this.set(1); }

    @EnumField(3)
    setWood() { return this.set(2); }

    @EnumField(4)
    setLiquid() { return this.set(3); }

    @EnumField(5)
    setJewelry() { return this.set(4); }

    @EnumField(6)
    setChain() { return this.set(5); }

    @EnumField(7)
    setPlate() { return this.set(6); }

    @EnumField(8)
    setCloth() { return this.set(7); }

    @EnumField(9)
    setLeather() { return this.set(8); }
}