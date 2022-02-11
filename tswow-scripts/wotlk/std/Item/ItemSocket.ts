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
import { EnumCell } from "wotlkdata/wotlkdata/cell/cells/EnumCell";
import { ArrayEntry, ArraySystem } from "wotlkdata/wotlkdata/cell/systems/ArraySystem";
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

export enum ItemColorMask {
      NONE   = 0
    , META   = 1
    , RED    = 2
    , YELLOW = 4
    , BLUE   = 8
}

export class ItemColorCell extends EnumCell<ItemSocket> {
    get NONE()   { return this.value(0,()=>this.owner.content.set(0))}
    get META()   { return this.value(1,()=>this.owner.content.set(1)) }
    get RED()    { return this.value(2,()=>this.owner.content.set(1)) }
    get YELLOW() { return this.value(4,()=>this.owner.content.set(1)) }
    get BLUE()   { return this.value(8,()=>this.owner.content.set(1)) }
}

export class ItemSocket extends ArrayEntry<ItemTemplate>{
    get color() { return new ItemColorCell(this, colors(this.container)[this.index]); }
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

    protected add(col: number) {
        const free = this.addGet();
        free.color.set(col);
        free.content.set(1);
        return this.owner;
    }

    get Properties() { return this.ownerWrap(this.owner.row.GemProperties); }

    addMeta() {return this.add(1)};
    addRed() {return this.add(2)};
    addYellow() {return this.add(4)};
    addBlue() {return this.add(8)};
}
