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
import { LanguageWordsRow } from "wotlkdata/dbc/types/LanguageWords";
import { LanguagesRow } from "wotlkdata/dbc/types/Languages";
import { loc_constructor } from "wotlkdata/primitives";
import { any } from "wotlkdata/query/Relations";
import { MainEntity } from "../Base/MainEntity";
import { Ids } from "../Base/Ids";
import { std } from "../tswow-stdlib-data";
import { makeRacemask, RaceType } from "../Race/RaceType";
import { ClassType, makeClassmask } from "../Class/ClassType";
import { SQL } from "wotlkdata";

const LANGUAGE_CATEGORY_ID = 10;
const GUTTERSPEAK_SKILL = 673;
const GUTTERSPEAK_SPELL = 17737;

/**
 * Creates and handles languages in World of Warcraft,
 * such as Orcish or Common.
 */
export class Language extends MainEntity<LanguagesRow> {
    readonly wordRows : LanguageWordsRow[] = [];

    constructor(row : LanguagesRow) {
        super(row);
        this.wordRows = DBC.LanguageWords.filter({LanguageID:this.ID});
    }

    get ID() {
        return this.row.ID.get();
    }

    test() {
        const skills = DBC.SkillLine.filter({CategoryID:LANGUAGE_CATEGORY_ID});
        const skillLineAbilities = DBC.SkillLineAbility.filter({SkillLine:any.apply(undefined,skills.map(x=>x.ID.get()))});
        const spells = DBC.Spell.filter({ID:any.apply(null,skillLineAbilities.map(x=>x.Spell.get()))});

        const spell = spells.find((x)=>x.EffectMiscValue.getIndex(0)==this.ID);
        if(spell===undefined) {
            throw new Error('No spell for language '+this.row.Name.enGB.get())
        }

        const sla = skillLineAbilities.find((x)=>x.Spell.get()===spell.ID.get());
        if(sla===undefined) {
            throw new Error('No skill line ability for language '+this.row.Name.enGB.get());
        }

        const skill = skills.find((x)=>x.ID.get()===sla.SkillLine.get());
        if(skill===undefined) {
            throw new Error('No skill for language '+this.row.Name.enGB.get());
        }

        return spells[0];
    }

    get Name() { return this.wrapLoc(this.row.Name); }

    addWords(words : string[]) {
        // word ids are never used, so their ids can just be incremented.
        let highest = DBC.LanguageWords.filter({}).sort((a,b)=>a.ID.get()>b.ID.get()?-1:1)[0].ID.get();
        for(const word of words) {
            const row = DBC.LanguageWords.add(++highest,
                {LanguageID:this.ID,Word:word});
            this.wordRows.push(row);
        }
        return this;
    }
}

export const Languages = {
    create : (mod : string, id : string, name: loc_constructor, autolearnRaces: RaceType[] = [], autolearnClasses: ClassType[] = []) => {
        const langRow = DBC.Languages.add(Ids.Language.id(mod,id),{Name:name});

        let gutterSpell = DBC.Spell.findById(GUTTERSPEAK_SPELL)
        let gutterSkill = DBC.SkillLine.findById(GUTTERSPEAK_SKILL)
        let gutterSkillRaceClass = DBC.SkillRaceClassInfo.find({SkillID:GUTTERSPEAK_SKILL});
        let gutterSkillAbility = DBC.SkillLineAbility.find({SkillLine:GUTTERSPEAK_SKILL});

        // Spell definition
        const spell = gutterSpell.clone(Ids.Spell.id(mod,id+'_spell'))
            .Name.set(name)
            .EffectMiscValue.set([langRow.ID.get(),0,0])

        // Skill definition
        const skill = gutterSkill.clone(Ids.SkillLine.id(mod,id+'_skill'))
            .DisplayName.set(name)

        // Class/race enabling
        const src = gutterSkillRaceClass.clone(Ids.SkillRaceClassInfo.id())
            .SkillID.set(skill.ID.get())
            .ClassMask.set(0xffff)
            .RaceMask.set(0xffff)

        const cmask = makeClassmask(autolearnClasses);
        const rmask = makeRacemask(autolearnRaces);
        if(cmask!==0 || rmask!==0) {
            // TODO: Doesn't work currently. Don't know why.
            gutterSkillAbility.clone(Ids.SkillLineAbility.id())
                .Spell.set(spell.ID.get())
                .ClassMask.set(cmask)
                .RaceMask.set(0)
                .AcquireMethod.set(1)
            SQL.playercreateinfo_spell_custom
                .add(rmask, cmask, spell.ID.get())
                .Note.set('TSWoW') 
        }

        // Skill<->Spell Mapping
        const sla = gutterSkillAbility.clone(Ids.SkillLineAbility.id())
            .Spell.set(spell.ID.get())
            .SkillLine.set(skill.ID.get())
            .ClassMask.set(0)
            .RaceMask.set(0xffff)

        return new Language(langRow);
    },

    load : (id : number) => {
        return new Language(DBC.Languages.find({ID:id}));
    },
}
