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
import { Table } from "../../../data/table/Table";
import { ItemDisplayInfoQuery, ItemDisplayInfoRow } from "../../dbc/ItemDisplayInfo";
import { DBC } from "../../DBCFiles";
import { SQL } from "../../SQLFiles";
import { CodegenSettings, GenerateCode } from "../Misc/Codegen";
import { MainEntity } from "../Misc/Entity";
import { Ids, StaticIDGenerator } from "../Misc/Ids";
import { ParticleColorRegistry } from "../Misc/ParticleColor";
import { RefStatic } from "../Refs/Ref";
import { RegistryStatic } from "../Refs/Registry";
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
    get GroupSoundIndex() { return this.wrap(this.row.GroupSoundIndex); }

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

    codify(settings: {mod?: string, id?: string} & CodegenSettings)
    {
        return GenerateCode(settings,`std.ItemDisplayInfo.create('${settings.mod || 'mod'}','${settings.id || 'id'}')`,code=>
        {
            if(this.Icon.get().length > 0)
            {
                code.line(`.Icon.set('${this.Icon.get()}')`)
            }

            if(this.SpellVisual.get())
            {
                code.begin_block(`.SpellVisual.modRefCopy(x=>x`)
                code.substruct(this.SpellVisual.getRef(), settings);
                code.end_block(`)`)
            }

            this.Models.forEach((x,i)=>{
                if(x.Model.get() !== "" || x.ModelTexture.get() !== "")
                {
                    code.line(`.Models.set(${i},'${x.Model.get()}','${x.ModelTexture.get()}')`)
                }
            })

            for(let i = 0; i < this.Texture.length(); ++i)
            {
                if(this.Texture.getIndex(i).length > 0)
                {
                    code.line(`.Texture.setIndex(${i},'${this.Texture.getIndex(i)}')`)
                }
            }

            if(this.Visuals.get())
            {
                let vis = this.Visuals.getRef();
                code.begin_block(`.Visuals.modRefCopy(x=>x`)
                for(let i = 0; i < vis.length; ++i)
                {
                    let str = vis.get(i).get();
                    if(str.length > 0)
                    {
                        code.line(`.set(${i},"${str}")`)
                    }
                }
                code.end_block(`)`)
            }

            if(this.ParticleColor.get())
            {
                code.begin_block(`.ParticleColor.modRefCopy(x=>x`)
                code.substruct(this.ParticleColor.getRef(), settings);
                code.end_block(`)`)
            }

            code.non_zero_enum('Flags', this.Flags);

            for(let i = 0; i < this.GeosetGroup.length(); ++i)
            {
                if(this.GeosetGroup.getIndex(i) !== 0)
                {
                    code.line(`.GeosetGroup.setIndex(${i},${this.GeosetGroup.getIndex(i)})`)
                }
            }
            for(let i = 0; i < this.HelmGeosetVis.length(); ++i)
            {
                if(this.HelmGeosetVis.getIndex(i) !== 0)
                {
                    code.line(`.HelmGeosetVis.setIndex(${i},${this.HelmGeosetVis.getIndex(i)})`)
                }
            }
            code.non_def_num('GroupSoundIndex',this.GroupSoundIndex);
        })
    }
}

export class ItemDisplayInfoRef<T> extends RefStatic<T,ItemDisplayInfo> {
    setSimpleIcon(mod: string, name: string, icon: string) {
        this.getRefCopy(mod,name).Icon.set(icon)
        return this.owner;
    }
}


export class ItemDisplayInfoRegistryClass
    extends RegistryStatic<
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
    protected IDs(): StaticIDGenerator {
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