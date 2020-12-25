import { DBC } from "wotlkdata"
import { Ids } from "../Base/Ids"
import { std } from "../tswow-stdlib-data"
import { Area } from "./Area"

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
export const Areas = {
    load(id: number) {
        return new Area(DBC.AreaTable.findById(id))
    },

    create(mod: string, name: string) {
        return new Area(DBC.AreaTable
            .add(Ids.Area.id(mod,name))
                .ExploreFlag.set(Ids.AreaBit.id(mod,name+'_areabit')))
    }
}