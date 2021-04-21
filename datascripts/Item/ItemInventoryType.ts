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
import { ItemTemplate } from "./ItemTemplate";

export enum InventoryType {
    NOT_EQUIPPABLE = 0,
    HEAD = 1,
    NECK = 2,
    SHOULDER = 3,
    SHIRT = 4,
    CHEST = 5,
    WAIST = 6,
    LEGS = 7,
    FEET = 8,
    WRISTS = 9,
    HANDS = 10,
    FINGER = 11,
    TRINKET = 12,
    WEAPON = 13,
    SHIELD = 14,
    RANGED = 15,
    BACK = 16,
    TWOHAND = 17,
    TABARD = 19,
    ROBE = 20,
    MAINHAND = 21,
    OFFHAND = 22,
    TOME = 23,
    AMMO = 24,
    THROWN = 25,
    WAND_GUN = 26,
    RELIC = 28
}

export class ItemInventoryType extends Enum<ItemTemplate> {
    constructor(owner: ItemTemplate) {
        super(owner, owner.row.InventoryType);
    }

    get(): number {
        return this.owner.row.InventoryType.get()
    }

    set(value: number): ItemTemplate {
        this.owner.row.InventoryType.set(value);
        this.owner.dbcRow.InventoryType.set(value);
        return this.owner;
    }

    @EnumField(0)
    setNonEquippable() { return this.set(0); }
    @EnumField(1)
    setHead() { return this.set(1); }
    @EnumField(2)
    setNeck() { return this.set(2); }
    @EnumField(3)
    setShoulder() { return this.set(3); }
    @EnumField(4)
    setShirt() { return this.set(4); }
    @EnumField(5)
    setChest() { return this.set(5); }
    @EnumField(6)
    setWaist() { return this.set(6); }
    @EnumField(7)
    setLegs() { return this.set(7); }
    @EnumField(8)
    setFeet() { return this.set(8); }
    @EnumField(9)
    setWrists() { return this.set(9); }
    @EnumField(10)
    setHands() { return this.set(10); }
    @EnumField(11)
    setFinger() { return this.set(11); }
    @EnumField(12)
    setTrinket() { return this.set(12); }
    @EnumField(13)
    setWeapon() { return this.set(13); }
    @EnumField(14)
    setShield() { return this.set(14); }
    @EnumField(15)
    setRanged() { return this.set(15); }
    @EnumField(16)
    setBack() { return this.set(16); }
    @EnumField(17)
    setTwohand() { return this.set(17); }
    @EnumField(18)
    setBag() { return this.set(18); }
    @EnumField(19)
    setTabard() { return this.set(19); }
    @EnumField(20)
    setRobe() { return this.set(20); }
    @EnumField(21)
    setMainhand() { return this.set(21); }
    @EnumField(22)
    setOffhand() { return this.set(22); }
    @EnumField(23)
    setTome() { return this.set(23); }
    @EnumField(24)
    setAmmo() { return this.set(24); }
    @EnumField(25)
    setThrown() { return this.set(25); }
    @EnumField(26)
    setWandGun() { return this.set(26); }
    @EnumField(27)
    setQuiver() { return this.set(27); }
    @EnumField(28)
    setRelic() { return this.set(28); }
}