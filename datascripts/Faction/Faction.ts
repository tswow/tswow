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
import { FactionRelations } from "./FactionRelations";
import { FactionReputations } from "./FactionReputation";

function emptyTemplate(id: number, factionId: number) {
    return DBC.FactionTemplate.add(id)
        .Faction.set(factionId)
        .Enemies.set([0,0,0,0])
        .Friend.set([0,0,0,0])
        .FactionGroup.set(0)
        .FriendGroup.set(0)
        .Flags.set(0)
        .EnemyGroup.set(0)
}

export class Faction extends MainEntity<FactionRow> {
    protected relationSets : FactionRelations[];

    constructor(row: FactionRow) {
        super(row);
        this.relationSets = DBC.FactionTemplate
            .filter({ID:this.row.ID.get()})
            .map(x=>new FactionRelations(this, x))

        if(this.relationSets.length===0) {
            this.relationSets = [
                emptyTemplate(Ids.FactionTemplate.id(),this.row.ID.get())
            ].map(x=>new FactionRelations(this, x))
        }
    }

    /**
     * This is the ID used for creatures
     */
    get RelationID() {
        return this.relation.row.ID.get();
    }

    get relation() {
        return this.relationSets[0];
    }

    get extraRelations() {
        return this.relationSets.slice(1);
    }

    get Reputation() { return new FactionReputations(this); }

    get Name() { return this.wrapLoc(this.row.Name); }
    get Description() { return this.wrapLoc(this.row.Description); }
}

export const Factions = {
    create(mod: string, id: string) {
        const facrow = DBC.Faction.add(Ids.Faction.id(mod,id))
            .ParentFactionCap.set([5,5])
            .ParentFactionID.set(0)
            .ParentFactionMod.set([1,1])
            .ReputationBase.set([0,0,0,0])
            .ReputationClassMask.set([0,0,0,0])
            .ReputationFlags.set([0,0,0,0])
            .ReputationIndex.set(-1)
            .ReputationRaceMask.set([0,0,0,0])
        return new Faction(facrow);
    },

    load(id: number) {
        return new Faction(DBC.Faction.findById(id));
    },

    filter(query: FactionQuery) {
        return DBC.Faction.filter(query).map(x=>new Faction(x));
    },

    createHorde(mod: string, id: string) {
        return Factions.create(mod,id)
            .relation.addFriendGroups(['HORDE'])
            .relation.addEnemyGroup(['ALLIANCE'])
    },

    createAlliance(mod: string, id: string) {
        return Factions.create(mod,id)
            .relation.addFriendGroups(['ALLIANCE'])
            .relation.addEnemyGroup(['HORDE'])
    }
}