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
import { RefReadOnly } from "../Refs/Ref";

export class Title extends MainEntity<CharTitlesRow>{
    get ID() { return this.row.ID.get(); }
    get MaleText() { return this.wrapLoc(this.row.Name); }
    get FemaleText() { return this.wrapLoc(this.row.Name1); }
}

export const Titles = {
    create: (mod : string, id : string) => {
        const genid = Ids.CharTitles.id(mod,id);
        const highest = DBC.CharTitles.filter({}).sort((a,b)=>b.Mask_ID>a.Mask_ID?1:-1)[0].Mask_ID.get();
        const row = DBC.CharTitles.add(genid,{Mask_ID:highest+1})
        row.Name.clear();
        row.Name1.clear();
        return new Title(row);
    },

    load : (id : number) => {
        return new Title(DBC.CharTitles.findById(id));
    },

    filter (query: CharTitlesQuery) {
        return DBC.CharTitles.filter(query).map(x=>new Title(x));
    },

    find (query: CharTitlesQuery) {
        return new Title(DBC.CharTitles.find(query));
    }
}

export class TitleRefReadOnly<T> extends RefReadOnly<T, Title> {
    getRef(): Title {
        return Titles.load(this.cell.get());
    }
    exists(): boolean {
        return this.cell.get() > 0;
    }
}