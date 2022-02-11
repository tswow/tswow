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
import { Cell } from "../../../data/cell/cells/Cell";
import { ItemDisplayInfoQuery, ItemDisplayInfoRow } from "../../dbc/ItemDisplayInfo";
import { Table } from "../../../data/table/Table";
import { DBC } from "../../DBCFiles"
import { SQL } from "../../SQLFiles"
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator, Ids } from "../Misc/Ids";
import { ParticleColorRegistry } from "../Misc/ParticleColor";
import { RefDynamic } from "../Refs/Ref";
import { RegistryDynamic } from "../Refs/Registry";
import { SpellVisualRegistry } from "../Spell/SpellVisual";
import { ItemIcon } from "./ItemIcon";
import { ItemVisualsRegistry } from "./ItemVisualEffect";
import { ItemVisualModels } from "./ItemVisualModels";

export class ItemDisplayInfo extends MainEntity<ItemDisplayInfoRow> {
    get ID() { return this.row.ID.get(); }
    get Flags() { return this.wrap(this.row.Flags); }
    get GeosetGroup() { return this.wrapArray(this.row.GeosetGroup); }
    get HelmGeosetVis() { return this.wrapArray(this.row.HelmetGeosetVis); }
    get Visuals() { return ItemVisualsRegistry.ref(this, this.row.ItemVisual); }
    get Models() { return new ItemVisualModels(this); }
    get ParticleColor() { return ParticleColorRegistry.ref(this, this.row.ParticleColorID); }
    get SpellVisual() { return SpellVisualRegistry.ref(this, this.row.SpellVisualID); }
    get Texture() { return this.wrapArray(this.row.Texture); }
    get Icon() { return new ItemIcon(this); }

    copyFromDisplay(displayId: number) {
        DBC.ItemDisplayInfo
            .findById(displayId)
            .copyTo(this.row)
        return this;
    }

    copyFromTemplate(templateId: number) {
        this.copyFromDisplay(
            SQL.item_template.query({entry:templateId}).displayid.get())
        return this;
    }
}

export class ItemDisplayInfoRef<T> extends RefDynamic<T,ItemDisplayInfo> {
    setSimpleIcon(icon: string) {
        this.getRefCopy().Icon.set(icon)
        return this.owner;
    }
}


export class ItemDisplayInfoRegistryClass
    extends RegistryDynamic<
          ItemDisplayInfo
        , ItemDisplayInfoRow
        , ItemDisplayInfoQuery
        >
{
    ref<T>(owner: T, cell: Cell<number,any>) {
        return new ItemDisplayInfoRef(owner, cell, this);
    }
    protected Table(): Table<any, ItemDisplayInfoQuery, ItemDisplayInfoRow> & { add: (id: number) => ItemDisplayInfoRow; } {
        return DBC.ItemDisplayInfo
    }
    protected ids(): DynamicIDGenerator {
        return Ids.ItemDisplayInfo
    }
    Clear(entity: ItemDisplayInfo): void {
        entity.Visuals.set(0)
              .Flags.set(0)
              .GeosetGroup.fill(0)
              .HelmGeosetVis.fill(0)
              .Icon.set('')
              .Models.clearAll()
              .ParticleColor.set(0)
              .SpellVisual.set(0)
              .Texture.fill('')
    }
    protected FindByID(id: number): ItemDisplayInfoRow {
        return DBC.ItemDisplayInfo.findById(id);
    }
    protected EmptyQuery(): ItemDisplayInfoQuery {
        return {}
    }
    ID(e: ItemDisplayInfo): number {
        return e.ID
    }
    protected Entity(r: ItemDisplayInfoRow): ItemDisplayInfo {
        return new ItemDisplayInfo(r);
    }
}

export const ItemDisplayinfoRegistry = new ItemDisplayInfoRegistryClass();