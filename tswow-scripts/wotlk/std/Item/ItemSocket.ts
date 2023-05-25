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
import { EnumCell, EnumCon, makeEnumCell } from "../../../data/cell/cells/EnumCell";
import { ArrayEntry, ArraySystem } from "../../../data/cell/systems/ArraySystem";
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
    /** @deprecated use Color */
    get color() { return new ItemColorCell(this, colors(this.container)[this.index]); }
    /** @deprecated use Content */
    get content() { return this.wrap(contents(this.container)[this.index]); }

    get Content() { return this.wrap(contents(this.container)[this.index]); }
    get Color() { return makeEnumCell(ItemColorMask, this, colors(this.container)[this.index])}

    set(color: EnumCon<keyof typeof ItemColorMask>, content: number)
    {
        this.Color.set(color);
        this.Content.set(content);
        return this;
    }

    clear() {
        this.Color.set(0);
        this.Content.set(0);
        return this;
    }

    isClear() {
        return this.Color.get() === 0;
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

    protected _add(col: number) {
        const free = this.addGet();
        free.color.set(col);
        free.content.set(1);
        return this.owner;
    }

    add(color: EnumCon<keyof typeof ItemColorMask>, content: number = 1)
    {
        return this.addMod(x=>x
            .Color.set(color)
            .Content.set(content)
        )
    }

    get Properties() { return this.ownerWrap(this.owner.row.GemProperties); }

    addMeta() {return this._add(1)};
    addRed() {return this._add(2)};
    addYellow() {return this._add(4)};
    addBlue() {return this._add(8)};
}
