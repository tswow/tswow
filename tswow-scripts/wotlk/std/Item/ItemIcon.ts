/*
* This file is part of tswow (https://github.com/tswow)
*
* Copyright (C) 2021 tswow <https://github.com/tswow/>
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
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { ItemDisplayInfo } from "./ItemDisplayInfo";

export class ItemIcon extends CellSystem<ItemDisplayInfo> {
    set(value: string) {
        if(value.includes('\\')) {
            if(!value.startsWith('Interface\\Icons\\')) {
                throw new Error(
                    `Invalid icon path ${value}:`
                    +` ItemIcons cannot have absolute paths outside of Interface\\Icons`);
            }
            value = value.replace('Interface\\Icons\\','');
        }
        this.owner.row.InventoryIcon.setIndex(0,value);
        return this.owner;
    }

    get() {
        return this.owner.row.InventoryIcon.getIndex(0);
    }

    objectify() {
        return this.owner.row.InventoryIcon.get();
    }
}