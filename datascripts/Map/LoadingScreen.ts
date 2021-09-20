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
import { LoadingScreensQuery, LoadingScreensRow } from "wotlkdata/dbc/types/LoadingScreens";
import { Table } from "wotlkdata/table/Table";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator, Ids } from "../Misc/Ids";
import { RegistryDynamic } from "../Refs/Registry";

export class LoadingScreen extends MainEntity<LoadingScreensRow> {
    get ID() { return this.row.ID.get(); }
    get Name() { return this.wrap(this.row.Name); }
    get FileName() { return this.wrap(this.row.FileName); }
    get HasWidescreen() { return this.wrap(this.row.HasWideScreen); }
}

export class LoadingScreenRegistryClass
    extends RegistryDynamic<LoadingScreen,LoadingScreensRow,LoadingScreensQuery>
{
    protected Table(): Table<any, LoadingScreensQuery, LoadingScreensRow> & { add: (id: number) => LoadingScreensRow; } {
        return DBC.LoadingScreens
    }
    protected ids(): DynamicIDGenerator {
        return Ids.LoadingScreens
    }
    Clear(entity: LoadingScreen): void {
        entity.FileName.set('')
              .HasWidescreen.set(0)
              .Name.set('')
    }
    protected Clone(entity: LoadingScreen, parent: LoadingScreen): void {
        throw new Error("Method not implemented.");
    }
    protected Entity(r: LoadingScreensRow): LoadingScreen {
        return new LoadingScreen(r);
    }
    protected FindByID(id: number): LoadingScreensRow {
        return DBC.LoadingScreens.findById(id);
    }
    protected EmptyQuery(): LoadingScreensQuery {
        return {}
    }
    ID(e: LoadingScreen): number {
        return e.ID
    }

    load(id: number|string) {
        if(typeof(id) === 'number') {
            return super.load(id);
        }
        let v = DBC.LoadingScreens.find({FileName:id})
        return (v ? new LoadingScreen(v) : undefined) as LoadingScreen
    }
}

export const LoadingScreens = new LoadingScreenRegistryClass();