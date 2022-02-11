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
import { LightRow } from "../../dbc/Light";
import { MainEntity } from "../Misc/Entity";
import { PositionMapXYZCell } from "../Misc/PositionCell";
import { LightFalloff } from "./LightFalloff";
import { LightFloatBand } from "./LightFloatBand";
import { FLOAT_BAND_COUNT, getFloatBandIndex, getIntBandIndex, INT_BAND_COUNT } from "./LightIndex";
import { LightIntBand } from "./LightIntBand";
import { LightParam } from "./LightParam";

export class Light extends MainEntity<LightRow> {
    get Position() { return new PositionMapXYZCell(this, this.row.MapID,this.row.X,this.row.Y,this.row.Z); }
    get Falloff() { return new LightFalloff(this); }

    constructor(row: LightRow) {
        super(row);
    }

    get AmbientLight() { return new LightIntBand(this, 0); }
    get DiffuseLight() { return new LightIntBand(this, 1); }
    get SkyColorTop() { return new LightIntBand(this, 2); }
    get SkyColorMid() { return new LightIntBand(this, 3); }
    get SkyColorBelowMid() { return new LightIntBand(this, 4); }
    get SkyColorAboveHorizon() { return new LightIntBand(this, 5); }
    get SkyColorHorizon() { return new LightIntBand(this, 6); }
    get FogColor() { return new LightIntBand(this, 7); }

    get UnknownInt8() { return new LightIntBand(this, 8); }
    get SunColor() { return new LightIntBand(this, 9); }
    get SunHalo() { return new LightIntBand(this, 10); }

    get CloudColorEdge() { return new LightIntBand(this, 11); }
    get CloudColorBase() { return new LightIntBand(this, 12); }

    get UnknownInt13() { return new LightIntBand(this, 13); }
    get OceanColorShallow() { return new LightIntBand(this, 14); }
    get OceanColorDeep() { return new LightIntBand(this, 15); }
    get RiverColorShallow() { return new LightIntBand(this, 16); }
    get RiverColorDeep() { return new LightIntBand(this, 17); }

    get FogDistance() { return new LightFloatBand(this, 0); }
    get FogMultiplier() { return new LightFloatBand(this, 1); }
    get CelestialGlow() { return new LightFloatBand(this, 2); }
    get CloudDensity() { return new LightFloatBand(this, 3); }

    get UnknownFloat4() { return new LightFloatBand(this, 4); }
    get UnknownFloat5() { return new LightFloatBand(this, 5); }

    get HighlightSky() {
        return new LightParam(this,(x)=>this.paramRow(x).HighlightSky)
    }

    get Skybox() {
        return new LightParam(this,(x)=>this.paramRow(x).LightSkyboxID)
    }

    get CloudType() {
        return new LightParam(this,(x)=>this.paramRow(x).CloudTypeID)
    }

    get Glow() {
        return new LightParam(this,(x)=>this.paramRow(x).Glow)
    }

    get WaterShallowAlpha() {
        return new LightParam(this,(x)=>this.paramRow(x).WaterShallowAlpha)
    }

    get WaterDeepAlpha() {
        return new LightParam(this,(x)=>this.paramRow(x).WaterDeepAlpha)
    }

    get OceanShallowAlpha() {
        return new LightParam(this,(x)=>this.paramRow(x).OceanShallowAlpha)
    }

    get OceanDeepAlpha() {
        return new LightParam(this,(x)=>this.paramRow(x).OceanDeepAlpha)
    }

    protected paramRow(index: number) {
        return DBC.LightParams
            .findById(this.row.LightParamsID.getIndex(index));
    }

    copyFrom(id: number) {
        let row = DBC.Light.findById(id);
        this.row.FalloffEnd.set(row.FalloffEnd.get());
        this.row.FalloffStart.set(row.FalloffStart.get());

        for(let i=0;i<row.LightParamsID.length();++i) {
            const srcParamId = row.LightParamsID.getIndex(i);
            if(srcParamId===0) {
                continue;
            }
            const srcParam = DBC.LightParams.findById(srcParamId);
            const dstParam = this.paramRow(i);

            dstParam.CloudTypeID.set(srcParam.CloudTypeID.get());
            dstParam.Glow.set(srcParam.Glow.get());
            dstParam.HighlightSky.set(srcParam.HighlightSky.get());
            dstParam.LightSkyboxID.set(srcParam.LightSkyboxID.get());
            dstParam.OceanDeepAlpha.set(srcParam.OceanDeepAlpha.get());
            dstParam.OceanShallowAlpha.set(srcParam.OceanShallowAlpha.get());
            dstParam.WaterDeepAlpha.set(srcParam.WaterDeepAlpha.get());
            dstParam.WaterShallowAlpha.set(srcParam.WaterShallowAlpha.get());

            for(let i=0;i<INT_BAND_COUNT;++i) {
                const srcId = getIntBandIndex(srcParamId,i);
                const dstId = getIntBandIndex(dstParam.ID.get(),i);

                const srcRow = DBC.LightintBand.findById(srcId);
                const dstRow = DBC.LightintBand.findById(dstId);

                dstRow.Data.set(srcRow.Data.get());
                dstRow.Num.set(srcRow.Num.get());
                dstRow.Time.set(srcRow.Time.get());
            }

            for(let i=0;i<FLOAT_BAND_COUNT;++i) {
                const srcId = getFloatBandIndex(srcParamId,i);
                const dstId = getFloatBandIndex(dstParam.ID.get(),i);
                const srcRow = DBC.LightfloatBand.findById(srcId);
                const dstRow = DBC.LightfloatBand.findById(dstId);

                dstRow.Data.set(srcRow.Data.get());
                dstRow.Num.set(srcRow.Num.get());
                dstRow.Time.set(srcRow.Time.get());
            }
        }
    }
}