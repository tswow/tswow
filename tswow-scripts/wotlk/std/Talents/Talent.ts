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
import { sort } from "../../../data";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { TalentRow } from "../../dbc/Talent";
import { DBC } from "../../DBCFiles";
import { MainEntity } from "../Misc/Entity";
import { RefUnknown } from "../Refs/Ref";
import { Spell } from "../Spell/Spell";
import { SpellRegistry } from "../Spell/Spells";
import { TalentRequirements } from "./TalentRequirements";

export class TalentSpells extends CellSystem<Talent> {
    get length() {
        return this.owner.row.SpellRank.length();
    }

    get(index: number) {
        return SpellRegistry.load(this.owner.row.SpellRank.getIndex(index));
    }

    set(index: number, spellId: number) {
        this.owner.row.SpellRank.setIndex(index,spellId);
        return this.owner;
    }

    add(spellId: number[]) {
        for(let i=0;i<this.owner.row.SpellRank.length();++i) {
            if(spellId.length === 0) return this.owner;
            if(this.owner.row.SpellRank.getIndex(i) === 0) {
                this.owner.row.SpellRank.setIndex(i,spellId.splice(0,1)[0]);
            }
            if(spellId.length === 0) return this.owner;
        }
        throw new Error(
            `No room for more talent ranks!`
            + `A talent can only have ${this.length} entries`
            );
    }

    forEach(callback: (spell: Spell, index: number)=>void) {
        this.owner.row.SpellRank.get().forEach((x,i)=>{
            if(x>0) { callback(SpellRegistry.load(x),i); }
        })
        return this.owner;
    }
}

export class TalentPosition extends CellSystem<Talent> {
    get Column() { return this.ownerWrap(this.owner.row.ColumnIndex); }
    /**
     * @note Called "TierID" in DBC
     */
    get Row() { return this.ownerWrap(this.owner.row.TierID); }
    set(row: number, column: number) {
        this.Row.set(row);
        this.Column.set(column);
        return this.owner;
    }
}

export class Talent extends MainEntity<TalentRow> {
    get ID() { return this.row.ID.get() }
    get Position() { return new TalentPosition(this); }
    get Requirements() { return new TalentRequirements(this); }
    get RequiredSpell() { return this.wrap(this.row.RequiredSpellID); }
    get Tab() { return new RefUnknown(this, this.row.TabID); }
    get Spells() { return new TalentSpells(this); }
}

sort('talents', () => {
    DBC.Talent.quickSort((talent1,talent2)=>{
        let t1 = talent1.TabID.get();
        let t2 = talent2.TabID.get()
        if(t1 !== t2) return t1 > t2 ? 1 : -1;

        let r1 = talent1.TierID.get();
        let r2 = talent2.TierID.get();
        if (r1 !== r2) return r1 > r2 ? 1 : -1;

        let c1 = talent1.ColumnIndex.get();
        let c2 = talent2.ColumnIndex.get();
        if (c1 !== c2) return c1 > c2 ? 1: -1;

        return 0; // todo: some pet talents have duplicates, not sure why
    })
})