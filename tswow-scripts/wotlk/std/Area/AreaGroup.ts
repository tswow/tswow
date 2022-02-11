/*
 * This file is part of tswow (https://github.com/tswow)
 *
 * Copyright (C) 2022 tswow <https://github.com/tswow/>
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
import { CellSystem } from "wotlkdata/wotlkdata/cell/systems/CellSystem";
import { AreaGroupQuery, AreaGroupRow } from "wotlkdata/wotlkdata/dbc/types/AreaGroup";
import { Table } from "wotlkdata/wotlkdata/table/Table";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator, Ids } from "../Misc/Ids";
import { RegistryDynamic } from "../Refs/Registry";

export class AreaGroupAreas extends CellSystem<AreaGroup> {
    add(id: number) {
        let cur = this.owner.row;
        while(true) {
            for(let i=0;i<cur.AreaID.length();++i) {
                if(cur.AreaID.getIndex(i) == 0) {
                    cur.AreaID.setIndex(i,id);
                    return;
                }
            }

            if(cur.NextAreaID.get() == 0) {
                let newGroup = AreaGroupRegistry.create();
                newGroup.row.AreaID.setIndex(0,id);
                return;
            } else {
                cur = DBC.AreaGroup.findById(cur.NextAreaID.get());
            }
        }
    }
}

export class AreaGroup extends MainEntity<AreaGroupRow> {
    get ID() { return this.row.ID.get(); }
    get Areas() { return new AreaGroupAreas(this); }
}

export class AreaGroupRegistryClass 
    extends RegistryDynamic<AreaGroup,AreaGroupRow,AreaGroupQuery>
{
    protected Table(): Table<any, AreaGroupQuery, AreaGroupRow> & { add: (id: number) => AreaGroupRow; } {
        return DBC.AreaGroup
    }
    protected ids(): DynamicIDGenerator {
        return Ids.AreaGroup
    }
    Clear(entity: AreaGroup): void {
        entity.row.NextAreaID.set(0)
        entity.row.AreaID.fill(0);
    }
    protected FindByID(id: number): AreaGroupRow {
        return DBC.AreaGroup.findById(id);
    }
    ID(e: AreaGroup): number {
        return e.ID;
    }
    protected EmptyQuery(): AreaGroupQuery {
        return {}
    }
    protected Entity(r: AreaGroupRow): AreaGroup {
        return new AreaGroup(r);
    }
}

export const AreaGroupRegistry = new AreaGroupRegistryClass();