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
import { Spell } from "./Spell";

export class SpellRanks {
    protected spells: Spell[];

    constructor(spells: Spell[]) {
        this.spells = spells;
    }

    forEach(callback: (spell: Spell, rank: number, lastSpell: Spell|undefined)=>any) {
        // Spells are 1-indexed
        this.spells.forEach((x,i,ls)=>callback(x,i+1,ls[i-1]));
        return this;
    }

    forEachFromTwo(callback: (spell: Spell, rank: number, lastSpell: Spell)=>any) {
        this.spells.forEach((x,i,ls)=>i>0?callback(x,i+1,ls[i-1]):undefined);
    }

    get length() { return this.spells.length; }

    get(index: number) {
        return this.spells[index];
    }

    setSkillLine(skillLine: number) {
        this.spells.forEach((x,i)=>{
            x.SkillLines.addGet(skillLine,undefined,undefined).MinSkillRank.set(1);
        });
        return this;
    }
}