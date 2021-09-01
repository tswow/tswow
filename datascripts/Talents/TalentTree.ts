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
import { Ids } from "../Misc/Ids";
import { MainEntity } from "../Misc/Entity";
import { SpellIconCell } from "../Spell/SpellIcon";
import { Talent } from "./Talent";
import { Spell } from "../Spell/Spell";
import { Spells } from "../Spell/Spells";

export class TalentTree extends MainEntity<TalentTabRow> {
    get ID() { return this.row.ID.get(); }
    get Name() { return this.wrapLoc(this.row.Name); }
    get BackgroundImage() { return this.wrap(this.row.BackgroundFile); }
    get Icon() { return new SpellIconCell(this, this.row.SpellIconID); }

    forEach(callback: (talent: Talent)=>void) {
        DBC.Talent.filter({TabID:this.ID})
            .map(x=>new Talent(x))
            .forEach(callback);
        return this;
    }

    get(row: number, column: number) {
        return new Talent(DBC.Talent.find({TierID:this.ID,ColumnIndex:column,TabID:row}));
    }

    mod(row: number, column: number, callback: (talent: Talent)=>void) {
        callback(this.get(row,column));
        return this;
    }

    addSpells(mod: string, id: string, spellCount: number, parentSpell = 0) {
        let spells: Spell[] = [];
        for(let i=0;i<spellCount;++i) {
            spells.push(Spells.create(mod,`${id}-spell-rank-${i}`,parentSpell));
        }
        spells.forEach((x,i)=>{
            x.Rank.set(spells[0].ID,i+1);
        })
        return this.add(mod,`${id}-talent`)
            .Spells.add(...spells.map(x=>x.ID));
    }

    addSpellsMod(mod: string, id: string, spellCount: number, callback: (talent: Talent)=>void) {
        callback(this.addSpells(mod,id,spellCount))
        return this.owner;
    }

    addMod(mod: string, id: string, callback: (talent: Talent)=>void = ()=>{}) {
        callback(this.add(mod,id))
    }

    add(mod: string, id: string) {
        const talent = DBC.Talent.add(Ids.Talent.id(mod,id))
            .TabID.set(this.ID)
            .PrereqTalent.set([0,0,0])
            .PrereqRank.set([0,0,0])
            .CategoryMask.set([0,0])
            .SpellRank.set([0,0,0,0,0,0,0])
        return new Talent(talent);
    }
}