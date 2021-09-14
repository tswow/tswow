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
import { EnumCell } from "wotlkdata/cell/cells/EnumCell";
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

export class ItemInventoryType extends EnumCell<ItemTemplate> {
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

    /** Enum Value:                         0 */
    get NonEquippable() { return this.value(0) }
    /** Enum Value:                         1 */
    get Head()          { return this.value(1) }
    /** Enum Value:                         2 */
    get Neck()          { return this.value(2) }
    /** Enum Value:                         3 */
    get Shoulder()      { return this.value(3) }
    /** Enum Value:                         4 */
    get Shirt()         { return this.value(4) }
    /** Enum Value:                         5 */
    get Chest()         { return this.value(5) }
    /** Enum Value:                         6 */
    get Waist()         { return this.value(6) }
    /** Enum Value:                         7 */
    get Legs()          { return this.value(7) }
    /** Enum Value:                         8 */
    get Feet()          { return this.value(8) }
    /** Enum Value:                         9 */
    get Wrists()        { return this.value(9) }
    /** Enum Value:                         10 */
    get Hands()         { return this.value(10) }
    /** Enum Value:                         11 */
    get Finger()        { return this.value(11) }
    /** Enum Value:                         12 */
    get Trinket()       { return this.value(12) }
    /** Enum Value:                         13 */
    get Weapon()        { return this.value(13) }
    /** Enum Value:                         14 */
    get Shield()        { return this.value(14) }
    /** Enum Value:                         15 */
    get Ranged()        { return this.value(15) }
    /** Enum Value:                         16 */
    get Back()          { return this.value(16) }
    /** Enum Value:                         17 */
    get Twohand()       { return this.value(17) }
    /** Enum Value:                         18 */
    get Bag()           { return this.value(18) }
    /** Enum Value:                         19 */
    get Tabard()        { return this.value(19) }
    /** Enum Value:                         20 */
    get Robe()          { return this.value(20) }
    /** Enum Value:                         21 */
    get Mainhand()      { return this.value(21) }
    /** Enum Value:                         22 */
    get Offhand()       { return this.value(22) }
    /** Enum Value:                         23 */
    get Tome()          { return this.value(23) }
    /** Enum Value:                         24 */
    get Ammo()          { return this.value(24) }
    /** Enum Value:                         25 */
    get Thrown()        { return this.value(25) }
    /** Enum Value:                         26 */
    get WandGun()       { return this.value(26) }
    /** Enum Value:                         27 */
    get Quiver()        { return this.value(27) }
    /** Enum Value:                         28 */
    get Relic()         { return this.value(28) }
}