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
import { Table } from "wotlkdata/table/Table";
import { MainEntity } from "../Misc/Entity";
import { Ids, StaticIDGenerator } from "../Misc/Ids";
import { RegistryStatic } from "../Refs/Registry";
import { FactionReputations } from "./FactionReputation";
import { FactionTemplates } from "./FactionTemplates";

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
}

export class FactionRegistryClass
    extends RegistryStatic<Faction,FactionRow,FactionQuery>
{
    protected Table(): Table<any, FactionQuery, FactionRow> & { add: (id: number) => FactionRow; } {
        return DBC.Faction
    }
    protected IDs(): StaticIDGenerator {
        return Ids.Faction
    }
    Clear(r: Faction): void {
        r.row
            .ParentFactionCap.set([5,5])
            .ParentFactionID.set(0)
            .ParentFactionMod.set([1,1])
            .ReputationBase.set([0,0,0,0])
            .ReputationClassMask.set([0,0,0,0])
            .ReputationFlags.set([0,0,0,0])
            .ReputationIndex.set(-1)
            .ReputationRaceMask.set([0,0,0,0])
    }
    protected Clone(mod: string, name: string, r: Faction, parent: Faction): void {
        throw new Error("Method not implemented.");
    }
    protected Entity(r: FactionRow): Faction {
        return new Faction(r);
    }
    protected FindByID(id: number): FactionRow {
        return DBC.Faction.findById(id);
    }
    protected EmptyQuery(): FactionQuery {
        return {}
    }
    protected ID(e: Faction): number {
        return e.ID;
    }

    createHorde(mod: string, id: string, hostileToMonsters: boolean = false) {
        return this.create(mod,id)
            .Templates.addMod(relation=>{
                relation.addFriendGroups(['HORDE'])
                        .addEnemyGroup(['ALLIANCE'])
                if(hostileToMonsters) {
                    relation.addEnemyGroup(['MONSTERS'])
                }
            })
    }

    createAlliance(mod: string, id: string, hostileToMonsters: boolean = false) {
        return this.create(mod,id)
            .Templates.addMod(relation=>{
                relation.addFriendGroups(['ALLIANCE'])
                        .addEnemyGroup(['HORDE'])
                if(hostileToMonsters) {
                    relation.addEnemyGroup(['MONSTERS'])
                }
            })
    }

    createNeutralHostile(mod: string, id: string) {
        return this.create(mod,id)
            .Templates.addMod(relation=>{
                relation.addEnemyGroup(['ALLIANCE','HORDE'])
                        .addFriendGroups(['MONSTERS'])
            })
    }
}
export const FactionRegistry = new FactionRegistryClass();