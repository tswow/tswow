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
import { SQLCell } from "wotlkdata/sql/SQLCell";
import { ItemTemplate } from "./ItemTemplate";
import { SystemArray, ArrayEntry } from 'wotlkdata/cell/systems/SystemArray'
import { Enum, EnumField } from "wotlkdata/cell/systems/Enum"

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


export class ItemColor extends Enum<ItemTemplate> {
    @EnumField(0)
    setMeta() {return this.set(0)};

    @EnumField(1)
    setRed() {return this.set(1)};

    @EnumField(2)
    setBlue() {return this.set(2)};

    @EnumField(3)
    setPurple() {return this.set(3)};

    @EnumField(4)
    setOrange() {return this.set(4)};

    @EnumField(5)
    setGreen() {return this.set(5)};

    @EnumField(6)
    setYellow() {return this.set(6)};    
}

export class ItemSocket extends ArrayEntry<ItemTemplate>{
    get color() { return new ItemColor(this.owner, colors(this.owner)[this.index]); }
    get content() { return contents(this.owner)[this.index]; }

    clear() {
        this.color.set(0);
        this.content.set(0);
        return this.owner;
    }

    isClear() {
        return this.color.get() === 0;
    }
}

export class ItemSockets extends SystemArray<ItemSocket, ItemTemplate> {
    constructor(owner: ItemTemplate) {
        super(owner);
    }


    get length(): number {
        return 3;
    }

    get(index: number): ItemSocket {
        return new ItemSocket(this.owner, index);
    }

    add(col: number, amt: number) {
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
