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
import { ItemDisplayInfoRow } from "wotlkdata/dbc/types/ItemDisplayInfo";
import { DBC, SQL } from "wotlkdata/wotlkdata";
import { MainEntity } from "../Misc/Entity";
import { Ids } from "../Misc/Ids";
import { ParticleColorPointer } from "../Misc/ParticleColor";
import { Ref } from "../Refs/Ref";
import { SpellVisualPointer } from "../Spell/SpellVisual";
import { ItemIcon } from "./ItemIcon";
import { ItemEffectsPointer } from "./ItemVisualEffect";
import { ItemVisualModels } from "./ItemVisualModels";

export class ItemDisplayInfo extends MainEntity<ItemDisplayInfoRow> {
    clear(): this {
        this
            .Flags.set(0)
            .GeosetGroup.set([0,0,0])
            .HelmGeosetVis.set([0,0])
            .Effects.setRefID(0)
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
    get Effects() { return new ItemEffectsPointer(this, this.row.ItemVisual); }
    get Models() { return new ItemVisualModels(this); }
    get ParticleColor() { return new ParticleColorPointer(this, this.row.ParticleColorID); }
    get SpellVisual() { return new SpellVisualPointer(this, this.row.SpellVisualID); }
    get Texture() { return this.wrapArray(this.row.Texture); }
    get Icon() { return new ItemIcon(this); }

    copyFromDisplay(displayId: number) {
        DBC.ItemDisplayInfo
            .findById(displayId)
            .clone(Ids.ItemDisplayInfo.id())
        return this;
    }

    copyFromTemplate(templateId: number) {
        this.copyFromDisplay(
            SQL.item_template.find({entry:templateId}).displayid.get())
        return this;
    }
}

export class ItemDisplayInfoPointer<T> extends Ref<T,ItemDisplayInfo> {
    exists(): boolean {
        return this.cell.get() > 0;
    }
    protected create(): ItemDisplayInfo {
        return new ItemDisplayInfo(
            DBC.ItemDisplayInfo.add(Ids.ItemDisplayInfo.id()))
    }
    protected clone(): ItemDisplayInfo {
        return new ItemDisplayInfo(
            this.resolve().row.clone(Ids.ItemDisplayInfo.id()))
    }
    protected id(v: ItemDisplayInfo): number {
        return v.row.ID.get()
    }
    protected resolve(): ItemDisplayInfo {
        return new ItemDisplayInfo(DBC.ItemDisplayInfo.findById(this.cell.get()));
    }
}