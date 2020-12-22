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
import { SQL } from "wotlkdata";
import { Subsystem } from "wotlkdata/cell/Subsystem";

export class Vendor<T> extends Subsystem<T> {
    readonly ID: number;

    constructor(owner: T, id: number) {
        super(owner);
        this.ID = id;
    }

    addItem(item: number, maxcount = 0, incrTime = 0, extendedCostId = 0) {
        SQL.npc_vendor.add(this.ID, item, extendedCostId)
            .maxcount.set(maxcount)
            .incrtime.set(incrTime)
            .VerifiedBuild.set(17688)
        return this;
    }
}