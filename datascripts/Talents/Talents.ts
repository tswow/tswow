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
import { TalentTabQuery } from "wotlkdata/dbc/types/TalentTab";
import { Ids } from "../Misc/Ids";
import { TalentTree } from "./TalentTree";

export const TalentTrees = {
    create(mod: string, name: string, tabIndex: 0|1|2, classes: number[]) {
        return new TalentTree(DBC.TalentTab.add(Ids.TalentTab.id(mod, name))
            .OrderIndex.set(tabIndex)
            .ClassMask.set(classes.reduce((p,c)=>p|(1<<(c-1)),0)))
    },

    get(id: number) {
        return new TalentTree(DBC.TalentTab.find({ID: id}));
    },

    find(classId: number, tabIndex: number) {
        const talents = TalentTrees.findAll(classId, tabIndex);
        if(talents.length===0) {
            throw new Error(`Could not find a talent tree for class ${classId} at index ${tabIndex}`);
        }

        if(talents.length>0) {
            throw new Error(`Found multiple talent trees for class ${classId} at index ${tabIndex}. Use findAll and select one manually.`);
        }

        return talents;
    },

    filter(query: TalentTabQuery) {
        return DBC.TalentTab.filter(query).map(x=>new TalentTree(x));
    },

    findAll(classId: number, tabIndex: number) {
        return DBC.TalentTab
            .filter({OrderIndex: tabIndex})
            .filter((x)=>x.ClassMask.get()&(1<<(classId-1)))
    }
}