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
import { Cell, CPrim } from "wotlkdata/wotlkdata/cell/cells/Cell";
import { CellSystem } from "wotlkdata/wotlkdata/cell/systems/CellSystem";
import { Light } from "./Light";
import { LightWeather, LIGHT_WEATHER } from "./LightWeather";

export class LightParam<T extends CPrim> extends CellSystem<Light> {
    protected cellGetter: (weather: number) => Cell<T,any>;

    constructor(owner: Light, cellGetter: (weather: number) => Cell<T,any>) {
        super(owner);
        this.cellGetter = cellGetter;
    }

    set(callback: (weather: LightWeather) => T) {
        for(const w of Object.keys(LIGHT_WEATHER)) {
            const weather = w as LightWeather;
            const index = LIGHT_WEATHER[weather];
            this.cellGetter(index).set(callback(weather));
        }
    }
}