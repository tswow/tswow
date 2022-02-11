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
import { SQL } from "../../SQLFiles";
import { makeMaskCell32 } from "../../../data/cell/cells/MaskCell";
import { CellSystemTop } from "../../../data/cell/systems/CellSystem";
import { MultiRowSystem } from "../../../data/cell/systems/MultiRowSystem";
import { npc_vendorRow } from "../../sql/npc_vendor";
import { ClassMask } from "../Class/ClassRegistry";
import { CreatureTemplateRegistry } from "../Creature/Creatures";
import { ExtendedCostRegistry } from "../ExtendedCost/ExtendedCost";
import { ItemTemplateRegistry } from "../Item/ItemTemplate";
import { MainEntity } from "../Misc/Entity";
import { RaceMask } from "../Race/RaceType";

export class VendorItem extends MainEntity<npc_vendorRow> {
    get CreatureTemplate() {
        return CreatureTemplateRegistry.readOnlyRef(this, this.row.entry);
    }

    get Slot() {
        return this.wrap(this.row.slot)
    }

    get MaxCount() {
        return this.wrap(this.row.maxcount);
    }

    get IncreaseTime() {
        return this.wrap(this.row.incrtime);
    }

    get ClassMask() {
        return makeMaskCell32(ClassMask, this, this.row.classMask)
    }

    get RaceMask() {
        return makeMaskCell32(RaceMask, this, this.row.raceMask)
    }

    get ExtendedCost() {
        return ExtendedCostRegistry.readOnlyRef(this, this.row.ExtendedCost);
    }

    get Item() {
        return ItemTemplateRegistry.readOnlyRef(this, this.row.item);
    }
}

export class VendorItems<T> extends MultiRowSystem<VendorItem,T> {
    protected getAllRows(): VendorItem[] {
        return SQL.npc_vendor
            .queryAll({entry:this.ID})
            .map(x=>new VendorItem(x))
    }
    protected isDeleted(value: VendorItem): boolean {
        return value.row.isDeleted();
    }

    readonly ID: number;

    constructor(owner: T, id: number) {
        super(owner);
        this.ID = id;
    }

    add(item: number, extendedCostId = 0, maxCount = 0, incrTime = 0) {
        SQL.npc_vendor.add(this.ID, item, extendedCostId)
            .maxcount.set(maxCount)
            .incrtime.set(incrTime)
            .VerifiedBuild.set(17688)
        return this.owner;
    }

    addGet(item: number, extendedCostId: number|'GENERATE' = 0) {
        if(extendedCostId === 'GENERATE') {
            extendedCostId = ExtendedCostRegistry.create().ID;
        }
        return new VendorItem(SQL.npc_vendor.add(this.ID,item,extendedCostId));
    }

    addMod(item: number, extendedCostId: number|'GENERATE', callback: (item: VendorItem)=>void) {
        callback(this.addGet(item,extendedCostId));
        return this.owner;
    }
}

export class Vendor extends CellSystemTop {
    protected id: number;

    constructor(id: number) {
        super();
        this.id = id;
    }

    get Items() {
        return new VendorItems(this, this.id);
    }
}