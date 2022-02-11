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
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { SQL } from "../../SQLFiles";
import { npc_vendorRow } from "../../sql/npc_vendor";
import { CreatureTemplate } from "./CreatureTemplate";

export class CreatureVendor extends CellSystem<CreatureTemplate> {
    protected rows() {
        return SQL.npc_vendor.queryAll({entry: this.owner.ID});
    }

    get length() { return this.rows().length; }

    addItem(item: number, maxcount = 0, incrTime = 0, extendedCostId = 0) {
        // We must always have vendor flag if we sell items
        this.owner.NPCFlags.VENDOR.set(true);
        SQL.npc_vendor.add(this.owner.ID, item, extendedCostId)
            .maxcount.set(maxcount)
            .incrtime.set(incrTime)
            .VerifiedBuild.set(17688)
        return this.owner;
    }

    copyFrom(creatureTemplate: number, filter?: (row: npc_vendorRow)=>boolean) {
        // We must always have vendor flag if we sell items
        this.owner.NPCFlags.VENDOR.set(true);
        SQL.npc_vendor.queryAll({entry: creatureTemplate}).forEach((x)=>{
            if(filter && !filter(x)) {
                return;
            }
            SQL.npc_vendor.add(
                this.owner.ID,x.item.get(),x.ExtendedCost.get()
            ).maxcount.set(x.maxcount.get())
            .incrtime.set(x.incrtime.get())
            .VerifiedBuild.set(17688)
        });
        return this.owner;
    }
}