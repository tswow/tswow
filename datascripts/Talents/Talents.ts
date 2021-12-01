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
import { EnumCon, makeEnum } from "wotlkdata/wotlkdata/cell/cells/EnumCell";
import { TalentTabQuery, TalentTabRow } from "wotlkdata/wotlkdata/dbc/types/TalentTab";
import { lt } from "wotlkdata/wotlkdata/query/Relations";
import { Table } from "wotlkdata/wotlkdata/table/Table";
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
        return this.filter(e=>e.row.OrderIndex.get() & (1<<(classId-1)))
    }
}

export const TalentTreeRegistry = new TalentTreeRegistryClass();