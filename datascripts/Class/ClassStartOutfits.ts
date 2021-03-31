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
import { Subsystem } from "wotlkdata/cell/Subsystem";
import { CharStartOutfitRow } from "wotlkdata/dbc/types/CharStartOutfit";
import { SQL } from "wotlkdata/sql/SQLFiles";
import { Ids } from "../Base/Ids";
import { InventoryType } from "../Item/ItemInventoryType";
import { Class } from "./Class";

export type Gender = 'Male'|'Female';

export class OutfitPart extends Subsystem<Class> {
    types: number[];

    constructor(owner: Class, types: number[]) {
        super(owner);
        this.types = types;
    }

    protected getRaces(races: number[]) {
        if(races.length===0) {
            races = DBC.ChrRaces.filter({}).map(x=>x.ID.get());
        }
        return races;
    }

    protected getRow(gender: Gender, race: number, create: boolean) {
        const row = DBC.CharStartOutfit.find({
            ClassID:this.owner.ID, SexID: gender==='Male'?0:1, RaceID: race})
        if(row===undefined && create) {
            return DBC.CharStartOutfit.add(Ids.CharStartOutfit.id())
                .ClassID.set(this.owner.ID)
                .RaceID.set(race)
                .SexID.set(gender==='Male' ?0:1);
        } else {
            return row;
        }
    }

    getItem(gender : Gender, race: number = 1) {
        const row = this.getRow(gender,race,false)
        if(row) {
            return row.ItemID.get();
        } else {
            return -1;
        }
    }

    getDisplayId(gender: Gender, race: number= 1) {
        const row = this.getRow(gender,race,false);
        if(row) {
            return row.DisplayItemID.get();
        } else {
            return -1;
        }
    }

    protected findIndex(row: CharStartOutfitRow) {
        for(let i=0;i<row.InventoryType.length;++i) {
            for(const type of this.types) {
                if(row.InventoryType.getIndex(i) === type) {
                    return i;
                }
            }
        }

        for(let i=0;i<row.InventoryType.length;++i) {
            if(row.InventoryType.getIndex(i)===-1) {
                return i;
            }
        }

        return -1;
    }

    /**
     * @param item Item ID that the character will actually use.
     * @param displayId Display ID (not Item ID) of item shown during character creation (not item ID). 
     * Set to 0 (default) to use the model of the item
     * Set to -1 to make item invisible during character creation.
     * @param genders 
     * @param races 
     */
    set(item: number, displayId: number = 0, genders: Gender[] = ['Male','Female'], races: number[] = []) {
        this.clear(genders, races);
        // Automatically read displayId from item if set to 0. 
        if(displayId===0 && item!==-1) {
            displayId = SQL.item_template.find({entry: item}).displayid.get();
        }

        races = this.getRaces(races);

        for(const gender of genders) {
            for(const race of races) {
                const row = this.getRow(gender, race, true);
                const index = this.findIndex(row);
                if(index===-1) {
                    throw new Error(`No more free equip slots for gender=${gender} race=${race}`);
                }
                row.InventoryType.setIndex(index, this.types[0]);
                row.ItemID.setIndex(index, item);
                row.DisplayItemID.setIndex(index, displayId);
            }
        }
        return this.owner;
    }

    clear(genders: Gender[] = ['Male','Female'], races: number[] = []) {
        for(const gender of genders) {
            for(const race of races) {
                const row = this.getRow(gender, race, true);
                for(let i=0;i<row.InventoryType.length;++i) {
                    for(const type of this.types) {
                        if(row.InventoryType.getIndex(i) === type) {
                            row.InventoryType.setIndex(i, -1);
                            row.ItemID.setIndex(i, -1);
                            row.DisplayItemID.setIndex(i, -1);
                        }
                    }
                }
            }
        }
        return this.owner;
    }
}

const it = InventoryType;

export class ClassStartOutfits extends Subsystem<Class> {
    private op(nums: number[]) {
        return new OutfitPart(this.owner, nums);
    };
    get Head() { return this.op([it.HEAD])}
    get Neck() { return this.op([it.NECK])}
    get Shoulder() { return this.op([it.SHOULDER])}
    get Shirt() { return this.op([it.SHIRT])}
    get Chest() { return this.op([it.CHEST, it.ROBE])}
    get Waist() { return this.op([it.WAIST])}
    get Legs() { return this.op([it.LEGS])}
    get Feet() { return this.op([it.FEET])}
    get Wrists() { return this.op([it.WRISTS])}
    get Hands() { return this.op([it.HANDS])}
    get Finger() { return this.op([it.FINGER])}
    get Trinket() { return this.op([it.TRINKET])}
    get Back() { return this.op([it.BACK])}
    get Tabard() { return this.op([it.TABARD])}
    get Mainhand() { return this.op([it.MAINHAND,it.TWOHAND])}
    get Offhand() { return this.op([it.OFFHAND,it.TWOHAND, it.SHIELD])}
    get Ranged() { return this.op([it.RANGED])}
    get Thrown() { return this.op([it.THROWN, it.RANGED, it.WAND_GUN])}
    get GunWand() { return this.op([it.WAND_GUN, it.RANGED, it.THROWN])}
    get Relic() { return this.op([it.RELIC, it.RELIC])}

    clear(genders: Gender[] = ['Male','Female'], races: number[]) {
        for(const gender of genders) {
            for(const race of races) {
                const row = DBC.CharStartOutfit.find({
                    ClassID:this.owner.ID, SexID: gender==='Male'?0:1, RaceID: race})
                for(let i=0; i<row.InventoryType.length; ++i ){
                    row.InventoryType.setIndex(i,-1);
                    row.ItemID.setIndex(i,-1);
                    row.DisplayItemID.setIndex(i,-1);
                }
            }
        }
        return this.owner;
    }
};