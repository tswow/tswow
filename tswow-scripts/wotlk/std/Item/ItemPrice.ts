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
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { CellBasic } from "../GameObject/ElevatorKeyframes";
import { convertCoin, CoinType, MoneyCell } from "../Misc/MoneyCell";
import { ItemTemplate } from "./ItemTemplate";

/**
 * The getters in this class are intentional, we DO NOT want people to get confused with
 * what price they're actually setting, so we should always
 */
export class ItemPrice extends CellSystem<ItemTemplate> {
    get BuyCount() { return this.ownerWrap(this.owner.row.BuyCount); }

    get PlayerBuyPrice() {
        return new MoneyCell(this.owner, 'COPPER', new CellBasic(
              this.owner
            , ()=>Number(this.owner.row.BuyPrice.get())
            , (value)=>this.owner.row.BuyPrice.set(BigInt(value)))
        )
    }

    get PlayerSellPrice() {
        return new MoneyCell(this.owner,'COPPER', this.owner.row.SellPrice);
    }

    set(sellPrice: number, buyPrice: number, buyCount: number = 1, currency: CoinType = 'COPPER') {
        if(sellPrice>buyPrice) {
            throw new Error(`Tried to set an item price where sellPrice > buyPrice, this will lead to exploits. Use setUnsafe if you really must.`)
        }
        return this.setUnsafe(
              sellPrice
            , buyPrice
            , buyCount
            , currency
        );
    }

    setAsCopper(sellPrice: number, buyPrice: number, buyCount: number = 1) {
        return this.set(sellPrice,buyPrice,buyCount,'COPPER')
    }

    setAsSilver(sellPrice: number, buyPrice: number, buyCount: number = 1) {
        return this.set(sellPrice,buyPrice,buyCount,'SILVER')
    }

    setAsGold(sellPrice: number, buyPrice: number, buyCount: number = 1) {
        return this.set(sellPrice,buyPrice,buyCount,'GOLD')
    }

    setUnsafe(sellPrice: number, buyPrice: number, buyCount: number = 1, currency: CoinType = 'COPPER')  {
        this.owner.row.SellPrice.set(convertCoin(sellPrice,currency,'COPPER'));
        this.owner.row.BuyPrice.set(BigInt(convertCoin(buyPrice,currency,'COPPER')));
        this.owner.row.BuyCount.set(buyCount);
        return this.owner;
    }
}