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
import { CellSystem } from "wotlkdata/cell/systems/CellSystem";
import { ItemTemplate } from "./ItemTemplate";

/**
 * The getters in this class are intentional, we DO NOT want people to get confused with 
 * what price they're actually setting, so we should always 
 */
export class ItemPrice extends CellSystem<ItemTemplate> {
    get PlayerBuyPrice() { return Number(this.owner.row.BuyPrice.get()); }
    get PlayerSellPrice() { return this.owner.row.SellPrice.get(); }
    get BuyCount() { return this.owner.row.BuyCount.get(); }

    set(sellPrice: number, buyPrice: number, buyCount: number = 1) {
        if(sellPrice>buyPrice) {
            throw new Error(`Tried to set an item price where sellPrice > buyPrice, this will lead to exploits. Use setUnsafe if you really must.`)
        }

        return this.setUnsafe(sellPrice, buyPrice, buyCount);
    }

    setUnsafe(sellPrice: number, buyPrice: number, buyCount: number = 1)  {
        this.owner.row.SellPrice.set(sellPrice);
        this.owner.row.BuyPrice.set(BigInt(buyPrice));
        this.owner.row.BuyCount.set(buyCount);
        return this.owner;
    }
}