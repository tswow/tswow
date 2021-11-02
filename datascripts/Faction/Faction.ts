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
import { Cell } from "wotlkdata/wotlkdata/cell/cells/Cell";
import { FactionQuery, FactionRow } from "wotlkdata/wotlkdata/dbc/types/Faction";
import { Table } from "wotlkdata/wotlkdata/table/Table";
import { MainEntity } from "../Misc/Entity";
import { Ids, StaticIDGenerator } from "../Misc/Ids";
import { RefNoCreate } from "../Refs/Ref";
import { RegistryRowBase } from "../Refs/Registry";
import { FactionReputations } from "./FactionReputation";
import { FactionReputationIndex } from "./FactionReputationIndex";
import { FactionTemplates } from "./FactionTemplates";

export class Faction extends MainEntity<FactionRow> {
    get Parent() {
        return FactionRegistry.ref(this, this.row.ParentFactionID);
    }

    /**
     * How much of the parents reputation gains spills over
     * to this faction
     */
    get DownRepGainRate() {
        return this.wrapIndex(this.row.ParentFactionMod,0)
    }

    /**
     * How much of the this reputations gains spills over
     * to the parent
     */
    get UpRepGainRate() {
        return this.wrapIndex(this.row.ParentFactionMod,1)
    }

    /**
     * The maximum rank at which this faction gains
     * reputation spillover from its parent
     */
    get DownRepGainCap() {
        return this.wrapIndex(this.row.ParentFactionCap,0)
    }

    // parentFactionCap[1] is unused in trinitycore

    constructor(row: FactionRow) {
        super(row);
    }

    get ID() {
        return this.row.ID.get();
    }

    get Templates() {
        return new FactionTemplates(this);
    }

    /**
     * The bit index used to track reputation for this faction
     */
    get ReputationIndex() { return new FactionReputationIndex(this); }

    /**
     * Up to 4 different reputation settings for
     * different race/classmasks
     */
    get Reputation() { return new FactionReputations(this); }
    get Name() { return this.wrapLoc(this.row.Name); }
    get Description() { return this.wrapLoc(this.row.Description); }
}

export class FactionRegistryClass
    extends RegistryRowBase<Faction,FactionRow,FactionQuery>
{
    ref<T>(owner: T, cell: Cell<number,any>) {
        return new RefNoCreate(owner, cell, this);
    }

    protected Table(): Table<any, FactionQuery, FactionRow> & { add: (id: number) => FactionRow; } {
        return DBC.Faction
    }
    protected IDs(): StaticIDGenerator {
        return Ids.Faction
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

    create(mod: string, id: string, hasReputation: boolean) {
        let v = new Faction(DBC.Faction.add(Ids.Faction.id(mod,id))
                .ReputationIndex.set(-1)
            )
            .Name.clear()
            .Description.clear()
            .DownRepGainCap.set(0)
            .DownRepGainRate.set(0)
            .Reputation.clearAll()
            .UpRepGainRate.set(0)
        if(hasReputation) {
            v.ReputationIndex.assign(mod,`${id}-rep`);
        }
        return v;
    }

    ID(e: Faction): number {
        return e.ID;
    }
}
export const FactionRegistry = new FactionRegistryClass();