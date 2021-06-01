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
import { Ids, AutoIdGenerator } from "../Misc/Ids";
import { std } from "../tswow-stdlib-data";
import { ItemVisualModels } from "./ItemVisualModels";
import { ItemIcon } from "./ItemIcon";
import { SharedRef, SharedRefTable } from "../Refs/SharedRef";
import { ItemDisplayInfoRow } from "wotlkdata/dbc/types/ItemDisplayInfo";
import { ItemEffects } from "./ItemVisualEffect";
import { SpellVisual } from "../Spell/SpellVisual";
import { ParticleColor } from "../Misc/ParticleColor";

export class ItemDisplayInfo<T> extends SharedRef<T, ItemDisplayInfoRow> {

    table(): SharedRefTable<ItemDisplayInfoRow> {
        return DBC.ItemDisplayInfo
    }

    ids(): AutoIdGenerator {
        return Ids.ItemDisplayInfo;
    }

    clear(): this {
        this
            .Flags.set(0)
            .GeosetGroup.set([0,0,0])
            .HelmGeosetVis.set([0,0])
            .EffectsID.set(0)
            .Models.clearAll()
            .Texture.set(["","","","","","","",""])
            .Icon.set("")
            .row.ParticleColorID.set(0)
                .SpellVisualID.set(0)
        return this;
    }

    get Flags() { return this.wrap(this.row.Flags); }
    get GeosetGroup() { return this.wrapArray(this.row.GeosetGroup); }
    get HelmGeosetVis() { return this.wrapArray(this.row.HelmetGeosetVis); }
    get Effects() { return new ItemEffects(this, this.row.ItemVisual); }
    get EffectsID() { return this.wrap(this.row.ItemVisual); }
    get Models(): ItemVisualModels<T> { return new ItemVisualModels(this); }
    get ParticleColor() { return new ParticleColor(this, [this.row.ParticleColorID]); }
    get SpellVisual() { return new SpellVisual(this, [this.row.SpellVisualID]); }
    get Texture() { return this.wrapArray(this.row.Texture); }
    get Icon(): ItemIcon<T> { return new ItemIcon(this); }

    copyFrom(templateId: number) {
        std.Items.load(templateId).DisplayInfo.row.copyTo(this.row);
        return this.owner;
    }
}