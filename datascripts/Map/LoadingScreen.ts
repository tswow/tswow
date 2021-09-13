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
import { LoadingScreensRow } from "wotlkdata/dbc/types/LoadingScreens";
import { MainEntity } from "../Misc/Entity";
import { Ids } from "../Misc/Ids";

export class LoadingScreen extends MainEntity<LoadingScreensRow> {
    get ID() { return this.row.ID.get(); }
    get Name() { return this.wrap(this.row.Name); }
    get FileName() { return this.wrap(this.row.FileName); }
    get HasWidescreen() { return this.wrap(this.row.HasWideScreen); }
}

export const LoadingScreens = {
    load(id: number|string) {
        if(typeof(id)==='string') {
            return new LoadingScreen(DBC.LoadingScreens.find({FileName:id}))
        } else {
            return new LoadingScreen(DBC.LoadingScreens.findById(id));
        }
    },

    create() {
        return new LoadingScreen(
            DBC.LoadingScreens.add(Ids.LoadingScreens.id()));
    }
}