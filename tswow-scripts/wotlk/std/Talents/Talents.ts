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
import { EnumCon, makeEnum } from "../../../data/cell/cells/EnumCell";
import { lt } from "../../../data/query/Relations";
import { Table } from "../../../data/table/Table";
import { TalentTabQuery, TalentTabRow } from "../../dbc/TalentTab";
import { DBC } from "../../DBCFiles";
import { ClassIDs } from "../Class/ClassIDs";
import { Ids, StaticIDGenerator } from "../Misc/Ids";
import { RegistryStatic } from "../Refs/Registry";
import { TalentTree } from "./TalentTree";

export class TalentTreeRegistryClass
    extends RegistryStatic<TalentTree,TalentTabRow,TalentTabQuery>
{
    protected Table(): Table<any, TalentTabQuery, TalentTabRow> & { add: (id: number) => TalentTabRow; } {
        return DBC.TalentTab
    }
    protected IDs(): StaticIDGenerator {
        return Ids.TalentTab
    }
    Clear(r: TalentTree): void {
        r.Name.clear()
         .BackgroundImage.set('')
         .Icon.set(0)
         .ClassMask.set(0)
         .OrderIndex.set(0)
         .row
         .RaceMask.set(0x7fffffff)
    }

    protected Entity(r: TalentTabRow): TalentTree {
        return new TalentTree(r);
    }
    protected FindByID(id: number): TalentTabRow {
        return DBC.TalentTab.query({ID:id})
    }
    protected EmptyQuery(): TalentTabQuery {
        return {}
    }
    ID(e: TalentTree): number {
        return e.ID;
    }

    unlockRaces() {
        DBC.TalentTab
            .queryAll({ID:lt(Ids.TalentTab.startId)})
            .forEach(x=>x.RaceMask.set(0x7fffffff))
    }

    forClass(cls: EnumCon<keyof typeof ClassIDs>) {
        let classId = makeEnum(ClassIDs,cls);
        return this.filter(e=>e.row.ClassMask.get() & (1<<(classId-1))).sort((a,b)=>a.OrderIndex.get() > b.OrderIndex.get() ? 1 : -1)
    }
}

export const TalentTreeRegistry = new TalentTreeRegistryClass();