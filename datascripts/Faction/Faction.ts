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
import { FactionQuery, FactionRow } from "wotlkdata/dbc/types/Faction";
import { Ids } from "../Misc/Ids";
import { MainEntity } from "../Misc/Entity";
import { FactionTemplates } from "./FactionTemplates";
import { FactionReputations } from "./FactionReputation";

export class Faction extends MainEntity<FactionRow> {
    constructor(row: FactionRow) {
        super(row);
    }

    get ID() {
        return this.row.ID.get();
    }

    get Templates() {
        return new FactionTemplates(this);
    }

    get Reputation() { return new FactionReputations(this); }
    get Name() { return this.wrapLoc(this.row.Name); }
    get Description() { return this.wrapLoc(this.row.Description); }

    clear() {
        this.row
            .ParentFactionCap.set([5,5])
            .ParentFactionID.set(0)
            .ParentFactionMod.set([1,1])
            .ReputationBase.set([0,0,0,0])
            .ReputationClassMask.set([0,0,0,0])
            .ReputationFlags.set([0,0,0,0])
            .ReputationIndex.set(-1)
            .ReputationRaceMask.set([0,0,0,0])
        return this;
    }
}

export const Factions = {
    create(mod: string, id: string) {
        return new Faction(DBC.Faction.add(Ids.Faction.id(mod,id))).clear();
    },

    load(id: number) {
        return new Faction(DBC.Faction.findById(id));
    },

    filter(query: FactionQuery) {
        return DBC.Faction.filter(query).map(x=>new Faction(x));
    },

    createHorde(mod: string, id: string) {
        return Factions.create(mod,id)
            .Templates.modAdd(relation=>{
                relation.addFriendGroups(['HORDE'])
                        .addEnemyGroup(['ALLIANCE'])
            })
    },

    createAlliance(mod: string, id: string) {
        return Factions.create(mod,id)
            .Templates.modAdd(relation=>{
                relation.addFriendGroups(['ALLIANCE'])
                        .addEnemyGroup(['HORDE'])
            })
    }
}