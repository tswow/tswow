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
import { DBC } from "../../DBCFiles";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { Light } from "./Light";
import { getFloatBandIndex } from "./LightIndex";
import { LightWeather, LIGHT_WEATHER } from "./LightWeather";

export class LightFloatBand extends CellSystem<Light> {
    protected rowIndex: number;

    constructor(owner: Light, rowIndex: number) {
        super(owner);
        this.rowIndex = rowIndex;
    }

    set(callback: (weather: LightWeather, time: number, oldValue: number, index: number) => number) {
        for(let i=0;i<this.owner.row.LightParamsID.length();++i) {
            const param = this.owner.row.LightParamsID.getIndex(i);
            if(param===0) {
                continue;
            }

            const bandId = getFloatBandIndex(param, this.rowIndex);
            const bandRow = DBC.LightfloatBand.findById(bandId);
            const weather = Object.keys(LIGHT_WEATHER)
                .find(x=>LIGHT_WEATHER[x as LightWeather]==i) as LightWeather;

            for(let i=0;i<bandRow.Time.length();++i) {
                const time = bandRow.Time.getIndex(i);
                const data = bandRow.Data.getIndex(i);
                bandRow.Data.setIndex(i,callback(weather,time,data,i));
            }
        }
        return this.owner;
    }
}