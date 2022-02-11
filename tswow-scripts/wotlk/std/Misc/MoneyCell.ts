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
import { Cell } from "../../../data/cell/cells/Cell";
import { CellSystem } from "../../../data/cell/systems/CellSystem";

export type CoinType = 'COPPER'|'SILVER'|'GOLD'

export function convertCoin(value: number, from: CoinType, to: CoinType) {
    switch(from) {
        case 'COPPER':
            value = value;
        case 'SILVER':
            value = value * 100;
        case 'GOLD':
            value = value * 10000;
    }
    switch(to) {
        case 'COPPER': return value;
        case 'SILVER': return value/100;
        case 'GOLD': return value/10000;
    }
}

export class MoneyCell<T> extends CellSystem<T> {
    protected cell: Cell<number,any>;
    protected stored: CoinType

    constructor(owner: T, stored: CoinType, cell: Cell<number,any>) {
        super(owner);
        this.cell = cell;
        this.stored = stored;
    }

    get(currency: CoinType = 'COPPER') {
        return convertCoin(this.cell.get(),this.stored,currency);
    }

    set(value: number, currency: CoinType = 'COPPER') {
        this.cell.set(convertCoin(value,currency,this.stored));
        return this.owner;
    }

    add(value: number, currency: CoinType) {
        this.cell.set(convertCoin(value,currency,this.stored) + this.cell.get());
        return this.owner;
    }

    getAsCopper() { return this.get('COPPER'); }
    getAsSilver() { return this.get('SILVER'); }
    getAsGold() { return this.get('GOLD'); }

    addCopper(value: number) { return this.add(value,'COPPER'); }
    addSilver(value: number) { return this.add(value,'SILVER'); }
    addGold(value: number) { return this.add(value,'GOLD'); }

    getCopperOnly() { return this.get('COPPER') % 100 }
    getSilverOnly() { return Math.floor(this.get('COPPER')/100) % 100}
    getGoldOnly() { return Math.floor(this.get('COPPER')/10000)}
}