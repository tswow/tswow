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
import { DBC } from "wotlkdata";
import { LightQuery } from "wotlkdata/wotlkdata/dbc/types/Light";
import { Ids } from "../Misc/Ids";
import { Light } from "./Light";
import { FLOAT_BAND_COUNT, getFloatBandIndex, getIntBandIndex, INT_BAND_COUNT } from "./LightIndex";
import { LightPosition } from "./LightPos";
import { LightWeather, LIGHT_WEATHER } from "./LightWeather";

export const Lights = {
    load(id: number) {
        return new Light(DBC.Light.findById(id));
    },

    filter(query: LightQuery) {
        return DBC.Light.queryAll(query).map(x=>new Light(x));
    },

    create(pos: LightPosition, parent: number) {
        const lightid = Ids.Light.id();
        const srcLight = DBC.Light.findById(parent);
        const dstLight = srcLight.clone(lightid);

        dstLight.X.set(pos.x);
        dstLight.Y.set(pos.y);
        dstLight.Z.set(pos.z);
        dstLight.FalloffStart.set(pos.radiusInner);
        dstLight.FalloffEnd.set(pos.radiusOuter);

        for(const w of Object.keys(LIGHT_WEATHER)) {
            const weather = w as LightWeather;
            const index = LIGHT_WEATHER[weather];
            const srcParam = DBC.Light.findById(srcLight.LightParamsID.getIndex(index));
            const dstParam = srcParam.clone(Ids.LightParam.id());
            dstLight.LightParamsID.setIndex(index, dstParam.ID.get());
            for(let i=0;i<INT_BAND_COUNT;++i) {
                const srcIntId = getIntBandIndex(srcParam.ID.get(),i);
                const srcInt = DBC.LightintBand.findById(srcIntId);
                const dstIntId = getIntBandIndex(dstParam.ID.get(),i);
                srcInt.clone(dstIntId);
            }
            for(let i=0;i<FLOAT_BAND_COUNT;++i) {
                const srcFloatId = getFloatBandIndex(srcParam.ID.get(),i);
                const srcFloat = DBC.LightfloatBand.findById(srcFloatId);
                const dstFloatId = getFloatBandIndex(dstParam.ID.get(),i);
                srcFloat.clone(dstFloatId);
            }
        }

        return new Light(dstLight);
    },
}