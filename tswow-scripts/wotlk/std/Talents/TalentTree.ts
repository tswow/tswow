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
import { makeMaskCell32, MaskCell32 } from "../../../data/cell/cells/MaskCell";
import { MultiRowSystem } from "../../../data/cell/systems/MultiRowSystem";
import { finish } from "../../../data/index";
import { BuildArgs } from "../../../data/Settings";
import { TalentTabRow } from "../../dbc/TalentTab";
import { DBC } from "../../DBCFiles";
import { ClassMask } from "../Class/ClassRegistry";
import { MainEntity } from "../Misc/Entity";
import { Ids } from "../Misc/Ids";
import { SpellIconCell } from "../Spell/SpellIcon";
import { SpellRegistry } from "../Spell/Spells";
import { Talent } from "./Talent";
import { TalentTreeRegistry } from "./Talents";

export class TalentTreeTalents extends MultiRowSystem<Talent,TalentTree> {
    protected getAllRows(): Talent[] {
        return DBC.Talent.queryAll({TabID:this.owner.ID})
            .map(x=>new Talent(x));
    }
    protected isDeleted(value: Talent): boolean {
        return value.row.isDeleted();
    }

    getPos(row: number, column: number) {
        return new Talent(DBC.Talent
            .query({
                  TabID:this.owner.ID
                , ColumnIndex:column
                , TierID:row
            }))
    }

    modPos(row: number, column: number, callback: (talent: Talent)=>void) {
        callback(this.getPos(row,column));
        return this.owner;
    }

    addGet(mod: string, id: string) {
        return new Talent(
            DBC.Talent.add(Ids.Talent.id(mod,id))
                .TabID.set(this.owner.ID)
                .PrereqTalent.set([0,0,0])
                .PrereqRank.set([0,0,0])
                .CategoryMask.set([0,0])
                .SpellRank.set([0,0,0,0,0,0,0])
                .RequiredSpellID.set(0)
        )
    }

    addMod(mod: string, id: string, callback: (talent: Talent)=>void) {
        callback(this.addGet(mod,id));
        return this.owner;
    }

    addSpellsGet(mod: string, id: string, ranks: number, parentSpell = 0) {
        let spellids: number[] = []
        for(let i=0;i<ranks;++i) {
            spellids.push(
                SpellRegistry.create(
                    mod,`${id}-spell-${i}`,parentSpell,true
                ).ID
            )
        }
        let talent = new Talent(
            DBC.Talent.add(Ids.Talent.id(mod,id))
                .TabID.set(this.owner.ID)
                .PrereqTalent.set([0,0,0])
                .PrereqRank.set([0,0,0])
                .CategoryMask.set([0,0])
                .SpellRank.set([0,0,0,0,0,0,0])
                .RequiredSpellID.set(0)
        )
        talent.Spells.add(spellids)
        return talent;
    }

    /**
     * @param parentSpell set to 0 for no parent
     * @returns
     */
    addSpellsMod(mod: string, id: string, ranks: number, parentSpell: number, callback: (talent: Talent)=>void) {
        callback(this.addSpellsGet(mod,id,ranks,parentSpell));
        return this.owner;
    }
}

export class TalentTree extends MainEntity<TalentTabRow> {
    get ID() { return this.row.ID.get(); }
    get Name() { return this.wrapLoc(this.row.Name); }
    get BackgroundImage() { return this.wrap(this.row.BackgroundFile); }
    get Icon() { return new SpellIconCell(this, this.row.SpellIconID); }
    get Talents() { return new TalentTreeTalents(this); }
    // racemasks don't seem to work clientside for now
    //get RaceMask() { return new RaceMask(this, this.row.RaceMask); }
    get ClassMask() { return makeMaskCell32(ClassMask, this, this.row.ClassMask); }
    get OrderIndex() { return this.wrap(this.row.OrderIndex); }
    get PetTalentMask() { return new MaskCell32(this, this.row.PetTalentMask)}

}

finish('verify-talent-trees',()=>{
    if(BuildArgs.READ_ONLY) return;
    TalentTreeRegistry.forEach(x=>{
        if(x.ClassMask.get() === 0 && !x.PetTalentMask.get()) {
            throw new Error(`Talent Tab ${x.ID} has no classmask set, it will bug out talents for all classes`)
        }
    })
})