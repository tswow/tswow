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
import { Subsystem } from "wotlkdata/cell/Subsystem";
import { Ids } from "../Base/Ids";
import { std } from "../tswow-stdlib-data";
import { ItemTemplate } from "./ItemTemplate";
import { ItemVisualModels } from "./ItemVisualModels";
import { ItemIcon } from "./ItemIcon";
import { SharedRefs } from "../Refs/SharedRefs";

export class ItemVisual extends Subsystem<ItemTemplate> {
    get row() {
        return DBC.ItemDisplayInfo.findById(this.owner.sqlRow.displayid.get());
    }

    get Flags() { return this.ownerWrap(this.row.Flags); }
    get GeosetGroup() { return this.ownerWrapArray(this.row.GeosetGroup); }
    get HelmGeosetVis() { return this.ownerWrapArray(this.row.HelmetGeosetVis); }
    get Effects() { return SharedRefs.getOrCreateItemVisuals(this, this.row.ItemVisual); }
    get EffectsID() { return this.wrap(this.row.ItemVisual); }
    get Models() { return new ItemVisualModels(this.owner); }
    get ParticleColorID() { return this.ownerWrap(this.row.ParticleColorID); }
    get ParticleColor() { return SharedRefs.getOrCreateParticleColor(this, this.ParticleColorID); }
    get SpellVisualID() { return this.ownerWrap(this.row.SpellVisualID); }
    get SpellVisual() { return SharedRefs.getOrCreateSpellVisual(this, this.row.SpellVisualID); }
    get Texture() { return this.ownerWrapArray(this.row.Texture); }
    get Icon() { return new ItemIcon(this); }

    copyFrom(templateId: number) {
        std.Items.load(templateId).Visual.row.copyTo(this.row);
        return this.owner;
    }

    makeUnique() {
        const nuRow = this.row.clone(Ids.ItemDisplayInfo.id());
        this.owner.sqlRow.displayid.set(nuRow.ID.get());
        this.owner.dbcRow.DisplayInfoID.set(nuRow.ID.get());
        return this.owner;
    }
}