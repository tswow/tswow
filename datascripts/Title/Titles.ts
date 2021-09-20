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
import { CharTitlesQuery, CharTitlesRow } from "wotlkdata/dbc/types/CharTitles";
import { Table } from "wotlkdata/table/Table";
import { MainEntity } from "../Misc/Entity";
import { Ids, StaticIDGenerator } from "../Misc/Ids";
import { RegistryStatic } from "../Refs/Registry";

export class Title extends MainEntity<CharTitlesRow>{
    get ID() { return this.row.ID.get(); }
    get MaleText() { return this.wrapLoc(this.row.Name); }
    get FemaleText() { return this.wrapLoc(this.row.Name1); }
}

export class TitleRegistryClass extends RegistryStatic<Title,CharTitlesRow,CharTitlesQuery> {
    protected Table(): Table<any, CharTitlesQuery, CharTitlesRow> & { add: (id: number) => CharTitlesRow; } {
        return DBC.CharTitles
    }
    protected IDs(): StaticIDGenerator {
        return Ids.CharTitles
    }
    protected Clone(mod: string, name: string, r: Title, parent: Title): void {
        throw new Error("Method not implemented.");
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
    protected ID(e: Title): number {
        return e.ID;
    }
    Clear(title: Title) {
        title.MaleText.clear().FemaleText.clear()
    }
}
export const TitleRegistry = new TitleRegistryClass();