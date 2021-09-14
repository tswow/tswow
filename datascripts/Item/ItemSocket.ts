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
import { ArrayEntry, ArraySystem } from "wotlkdata/cell/systems/ArraySystem";
import { ItemTemplate } from "./ItemTemplate";

function colors(owner: ItemTemplate) {
    return [
        owner.row.socketColor_1,
        owner.row.socketColor_2,
        owner.row.socketColor_3,
    ]
}

function contents(owner: ItemTemplate) {
    return [
        owner.row.socketContent_1,
        owner.row.socketContent_2,
        owner.row.socketContent_3,
    ]
}


export class ItemColor extends EnumCell<ItemSocket> {
    /** Enum Value:                  0 */
    get Meta()   { return this.value(0) }
    /** Enum Value:                  1 */
    get Red()    { return this.value(1) }
    /** Enum Value:                  2 */
    get Blue()   { return this.value(2) }
    /** Enum Value:                  3 */
    get Purple() { return this.value(3) }
    /** Enum Value:                  4 */
    get Orange() { return this.value(4) }
    /** Enum Value:                  5 */
    get Green()  { return this.value(5) }
    /** Enum Value:                  6 */
    get Yellow() { return this.value(6) }
}

export class ItemSocket extends ArrayEntry<ItemTemplate>{
    get color() { return new ItemColor(this, colors(this.container)[this.index]); }
    get content() { return this.wrap(contents(this.container)[this.index]); }

    clear() {
        this.color.set(0);
        this.content.set(0);
        return this;
    }

    isClear() {
        return this.color.get() === 0;
    }
}

export class ItemSockets extends ArraySystem<ItemSocket, ItemTemplate> {
    constructor(owner: ItemTemplate) {
        super(owner);
    }


    get length(): number {
        return 3;
    }

    get(index: number): ItemSocket {
        return new ItemSocket(this.owner, index);
    }

    protected add(col: number, amt: number) {
        const free = this.getFree();
        free.color.set(col);
        free.content.set(amt);
        return this.owner;
    }

    get Properties() { return this.ownerWrap(this.owner.row.GemProperties); }

    addMeta(amount: number) {return this.add(0,amount)};
    addRed(amount: number) {return this.add(1,amount)};
    addBlue(amount: number) {return this.add(2,amount)};
    addPurple(amount: number) {return this.add(3,amount)};
    addOrange(amount: number) {return this.add(4,amount)};
    addGreen(amount: number) {return this.add(5,amount)};
    addYellow(amount: number) {return this.add(6,amount)};
}
