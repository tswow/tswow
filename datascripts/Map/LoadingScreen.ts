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
import { Cell } from "wotlkdata/wotlkdata/cell/cells/Cell";
import { DBC } from "wotlkdata/wotlkdata/dbc/DBCFiles";
import { LoadingScreensQuery, LoadingScreensRow } from "wotlkdata/wotlkdata/dbc/types/LoadingScreens";
import { Table } from "wotlkdata/wotlkdata/table/Table";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator, Ids } from "../Misc/Ids";
import { RefDynamic } from "../Refs/Ref";
import { RegistryDynamic } from "../Refs/Registry";

export class LoadingScreen extends MainEntity<LoadingScreensRow> {
    get ID() { return this.row.ID.get(); }
    get Name() { return this.wrap(this.row.Name); }
    get FileName() { return this.wrap(this.row.FileName); }
    get HasWidescreen() { return this.wrap(this.row.HasWideScreen); }
}

export class LoadingScreenRef<T> extends RefDynamic<T,LoadingScreen> {
    setSimple(path: string, widescreen: boolean = false) {
        this.getRefCopy()
            .FileName.set(path)
            .HasWidescreen.set(widescreen?1:0)
        return this.owner;
    }
}

export class LoadingScreenRegistryClass
    extends RegistryDynamic<LoadingScreen,LoadingScreensRow,LoadingScreensQuery>
{
    ref<T>(owner: T, cell: Cell<number,any>) {
        return new LoadingScreenRef(owner,cell,this);
    }
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
        let v = DBC.LoadingScreens.query({FileName:id})
        return (v ? new LoadingScreen(v) : undefined) as LoadingScreen
    }
}

export const LoadingScreens = new LoadingScreenRegistryClass();