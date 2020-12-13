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
import { TalentTabRow } from "wotlkdata/dbc/types/TalentTab";
import { Ids } from "../Base/Ids";
import { MainEntity } from "../Base/MainEntity";
import { SpellIconCell } from "../Spell/SpellIcon";
import { Talent } from "./Talent";

export class TalentTree extends MainEntity<TalentTabRow> {
    get ID() { return this.row.ID.get(); }
    get Name() { return this.wrapLoc(this.row.Name); }
    get BackgroundImage() { return this.wrap(this.row.BackgroundFile); }
    get Icon() { return new SpellIconCell(this, this.row.SpellIconID); }

    addTalent(mod: string, id: string, row: number, column: number, spellIds: number[]) {
        const talent = DBC.Talent.add(Ids.Talent.id(mod,id))
            .TabID.set(this.ID)
            .ColumnIndex.set(column)
            .TierID.set(row)
            .PrereqTalent.set([0,0,0])
            .PrereqRank.set([0,0,0])
            .Flags.set(spellIds.length===0? 1 : 0)
            .CategoryMask.set([0,0])
            .SpellRank.set([0,0,0,0,0,0,0,0,0])

        for(let i=0;i<spellIds.length;++i) {
            talent.SpellRank.setIndex(i, spellIds[i]);
        }

        return new Talent(this, talent);
    }
}