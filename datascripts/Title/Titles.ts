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
import { CharTitlesQuery, CharTitlesRow } from "wotlkdata/wotlkdata/dbc/types/CharTitles";
import { Table } from "wotlkdata/wotlkdata/table/Table";
import { MainEntity } from "../Misc/Entity";
import { GenderedText } from "../Misc/GenderedText";
import { Ids } from "../Misc/Ids";
import { RegistryRowBase } from "../Refs/Registry";

export class Title extends MainEntity<CharTitlesRow>{
    get ID() { return this.row.ID.get(); }

    get Text() {
        return new GenderedText(
              this
            , 'WRITE_MALE'
            , this.row.Name
            , this.row.Name1
        )
    }
}
export class TitleRegistryClass extends RegistryRowBase<Title,CharTitlesRow,CharTitlesQuery> {
    protected Table(): Table<any, CharTitlesQuery, CharTitlesRow> & { add: (id: number) => CharTitlesRow; } {
        return DBC.CharTitles
    }

    protected Entity(r: CharTitlesRow): Title {
        return new Title(r);
    }

    protected FindByID(id: number): CharTitlesRow {
        return DBC.CharTitles.findById(id);
    }
    protected EmptyQuery(): CharTitlesQuery {
        return {}
    }

    create(mod: string, id: string) {
        let nid = Ids.CharTitles.id()
        let mid = Ids.CharTitleMask.id(mod,id);
        let title = DBC.CharTitles.add(nid)
            .Mask_ID.set(mid)
            .Condition_ID.set(0)
            .Name.clear()
            .Name1.clear()
        return new Title(title);
    }

    ID(e: Title): number {
        return e.ID;
    }
}
export const TitleRegistry = new TitleRegistryClass();