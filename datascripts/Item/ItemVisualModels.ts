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
import { ArrayEntry, ArraySystem } from "wotlkdata/wotlkdata/cell/systems/ArraySystem";
import { ItemDisplayInfo } from "./ItemDisplayInfo";

export class ItemVisualModel<T> extends ArrayEntry<ItemDisplayInfo> {
    get Model() { return this.wrapIndex(this.container.row.ModelName, this.index); }
    get ModelTexture() { return this.wrapIndex(this.container.row.ModelTexture, this.index); }

    clear() {
        this.Model.set("")
        this.ModelTexture.set("");
        return this;
    }

    isClear(): boolean {
        return this.Model.get()==='' && this.ModelTexture.get()===''
    }
}

export class ItemVisualModels<T> extends ArraySystem<ItemVisualModel<T>,ItemDisplayInfo> {
    get length(): number {
        return 2;
    }

    get(index: number): ItemVisualModel<T> {
        return new ItemVisualModel(this.owner, index);
    }

    add(model: string, texture: string) {
        this.addGet()
            .Model.set(model)
            .ModelTexture.set(texture);
        return this.owner;
    }
}