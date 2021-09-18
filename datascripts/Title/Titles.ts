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
import { DBC } from "wotlkdata/dbc/DBCFiles";
import { CharTitlesQuery, CharTitlesRow } from "wotlkdata/dbc/types/CharTitles";
import { MainEntity } from "../Misc/Entity";
import { Ids } from "../Misc/Ids";
import { RegistryStatic } from "../Refs/Registry";

export class Title extends MainEntity<CharTitlesRow>{
    get ID() { return this.row.ID.get(); }
    get MaleText() { return this.wrapLoc(this.row.Name); }
    get FemaleText() { return this.wrapLoc(this.row.Name1); }
}

export class TitleRegistryClass extends RegistryStatic<Title,CharTitlesRow,CharTitlesQuery> {
    protected IDs           = Ids.CharTitles
    protected Table         = DBC.CharTitles
    protected EmptyQuery    = {}
    protected Entity        = (r: CharTitlesRow)=>new Title(r)
    protected FindByID      = (id: number)=>DBC.CharTitles.findById(id)
    protected ID            = (e: Title)=>e.ID;
    protected Clear         = (r: Title)=> {
        r.MaleText.clear().FemaleText.clear()
    }
}
export const TitleRegistry = new TitleRegistryClass();