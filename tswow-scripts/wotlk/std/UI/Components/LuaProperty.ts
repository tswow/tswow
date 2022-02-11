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
import { Cell } from "../../../../data/cell/cells/Cell";
import { Edit } from "../../../../data/luaxml/TextFile";

export class LuaStringProperty<T> extends Cell<string,T> {
    protected edit: Edit;

    constructor(owner: T, edit : Edit) {
        super(owner);
        this.edit = edit;
    }

    get(): string {
        let quoteStart = this.edit.text.indexOf('"');
        let quoteEnd = this.edit.text.lastIndexOf('"');
        return this.edit.text.substring(quoteStart,quoteEnd);
    }

    set(value: string): T {
        let eqIndex = this.edit.text.indexOf('=');
        let nameStr = this.edit.text.substring(0,eqIndex).split(' ').join('')
        this.edit.text = `${nameStr} = "${value}";`
        return this.owner;
    }
}

export class LuaNumberProperty<T> extends Cell<number,T> {
    protected edit: Edit;

    constructor(owner: T, edit: Edit) {
        super(owner);
        this.edit = edit;
    }

    get(): number {
        return parseFloat(this.edit.text.split('=')[1].split(';')[0]);
    }

    set(value: number): T {
        let nameStr = this.edit.text
            .split('=')[0].split(' ').join('')
        this.edit.text = `${nameStr} = ${value};`;
        return this.owner;
    }
}