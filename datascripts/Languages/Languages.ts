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
import { DBC } from "wotlkdata/dbc/DBCFiles";
import { LanguagesQuery, LanguagesRow } from "wotlkdata/dbc/types/Languages";
import { loc_constructor } from "wotlkdata/primitives";
import { MainEntity } from "../Misc/Entity";
import { Ids } from "../Misc/Ids";
import { std } from "../tswow-stdlib-data";
import { RaceType, resolveRaceType } from "../Race/RaceType";
import { ClassType, resolveClassType } from "../Class/ClassType";
import { SQL } from "wotlkdata"
import { CellSystem } from "wotlkdata/cell/systems/CellSystem";

export class LanguageAutoLearn extends CellSystem<Language> {
    add(races: RaceType[], classes: ClassType[]) {
        let classmask = 0;
        let racemask = 0;
        races.forEach(x=>{
            racemask |= (1<<(resolveRaceType(x)-1));
        })
        classes.forEach(x=>{
            classmask |= (1<<(resolveClassType(x)-1));
        })
        SQL.playercreateinfo_skills.add(racemask,classmask,this.owner.SkillID).comment.set('tswow')
        return this.owner;
    }
}

export class LanguageWords extends CellSystem<Language> {
    add(words: string[]) {
        // word ids are never used, so their ids can just be incremented.
        let highest = DBC.LanguageWords.filter({}).sort((a,b)=>a.ID.get()>b.ID.get()?-1:1)[0].ID.get();
        for(const word of words) {
            DBC.LanguageWords.add(++highest,
                {LanguageID:this.owner.ID,Word:word});
        }
        return this.owner;
    }

    get() {
        return DBC.LanguageWords
            .filter({LanguageID:this.owner.ID})
    }

    getText() {
        return this.get().map(x=>x.Word.get());
    }
}

/**
 * Creates and handles languages in World of Warcraft,
 * such as Orcish or Common.
 */
export class Language extends MainEntity<LanguagesRow> {
    constructor(row : LanguagesRow) {
        super(row);
    }

    get ID() {
        return this.row.ID.get();
    }

    get Name() { return this.wrapLoc(this.row.Name); }

    get SkillID() {
        let skillLines: {[skill: number]: boolean}= {}
        std.Spells
           .filter({Effect:39,EffectMiscValue:this.ID})
           .forEach(spell=>{
               spell.SkillLines.forEach(sla=>{
                    skillLines[sla.SkillLine.get()] = true;
               })
           })
        let keys = Object.keys(skillLines);
        if(keys.length === 0) {
            throw new Error(`Language ${this.ID} has no skill!`);
        }

        if(keys.length > 1) {
            throw new Error(`Language ${this.ID} has multiple skills!`)
        }

        return parseInt(keys[0]);
    }

    get AutoLearn() { return new LanguageAutoLearn(this); }
    get Words() { return new LanguageWords(this); }
}

export const Languages = {
    create : (mod : string, id : string, name: loc_constructor) => {
        const langRow = DBC.Languages.add(Ids.Language.id(mod,id),{Name:name});
        let sl = std.SkillLines.create(mod,id+'-skilline')
           .Category.set(10)
           .CanLink.set(0)
           .SkillCosts.set(0)
           .Name.set(name)
           .Icon.set('Interface\\Icons\\Trade_Engineering')
           .CanLink.set(0)
           .RaceClassInfos.modNew(
               x=>x.ClassMask.clearAll()
                   .RaceMask.set(0xffffffff)
                   .ClassMask.set(0xffffffff)
                   .Flags.clearAll()
                   .Flags.IsClassLine.mark()
                   .SkillTierID.set(0)
            )

        std.Spells.create(mod,id+'-spell')
            .Name.set(name)
            .Attributes.isPassive.mark()
            .Attributes.isHiddenInSpellbook.mark()
            .Proc.Chance.set(101)
            .DefenseType.set(1)
            .PreventionType.set(1)
            .Effects.modFree(effect=>{
                effect.EffectType.setLanguage()
                      .LanguageID.set(langRow.ID.get())
                      .ChainAmplitude.set(1)
            })
            .SchoolMask.Physical.mark()
            .SkillLines.modAdd(sl.ID,true,sla=>{
                sla.RaceMask.set(0xffffffff)
                   .AcquireMethod.set(2)
                   .ClassMask.set(0)
                   .ClassMaskForbidden.set(0)
            })
        return new Language(langRow);
    },

    load : (id : number) => {
        return new Language(DBC.Languages.find({ID:id}));
    },

    filter(query: LanguagesQuery) {
        return DBC.Languages.filter(query).map(x=>new Language(x));
    }
}
