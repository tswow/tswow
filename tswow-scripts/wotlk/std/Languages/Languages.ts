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
import { Cell } from "../../../data/cell/cells/Cell";
import { MaskCon } from "../../../data/cell/cells/MaskCell";
import { MulticastCell } from "../../../data/cell/cells/MulticastCell";
import { PendingCell } from "../../../data/cell/cells/PendingCell";
import { CellSystem, LocSystem } from "../../../data/cell/systems/CellSystem";
import { MultirowSystemCached } from "../../../data/cell/systems/MultiRowSystem";
import { DBC } from "../../DBCFiles";
import { Language, Languages } from "../../../data/dbc/Localization";
import { LanguagesQuery, LanguagesRow } from "../../dbc/Languages";
import { iterLocConstructor, loc_constructor } from "../../../data/primitives";
import { Table } from "../../../data/table/Table";
import { ClassMask } from "../Class/ClassRegistry";
import { MainEntity } from "../Misc/Entity";
import { Ids, StaticIDGenerator } from "../Misc/Ids";
import { RaceMask } from "../Race/RaceType";
import { RegistryStaticNoClone } from "../Refs/Registry";
import { SkillLine } from "../SkillLines/SkillLine";
import { SkillLineRegistry } from "../SkillLines/SkillLines";
import { Spell } from "../Spell/Spell";
import { SpellRegistry } from "../Spell/Spells";
import { SkillLineAbility, SpellSkillLineAbilites } from "../Spell/SpellSkillLines";

export class LanguageAutoLearn extends CellSystem<WoWLanguage> {
    add(classes?: MaskCon<keyof typeof ClassMask>, races?: MaskCon<keyof typeof RaceMask>) {
        this.owner.Skills.forEach(x=>x.enableAutolearn(classes,races,0))
        return this.owner;
    }
}

export class LanguageWords extends CellSystem<WoWLanguage> {
    add(words: string[]) {
        // word ids are never used, so their ids can just be incremented.
        let highest = DBC.LanguageWords.queryAll({}).sort((a,b)=>a.ID.get()>b.ID.get()?-1:1)[0].ID.get();
        for(const word of words) {
            DBC.LanguageWords.add(++highest,
                {LanguageID:this.owner.ID,Word:word});
        }
        return this.owner;
    }

    get() {
        return DBC.LanguageWords
            .queryAll({LanguageID:this.owner.ID})
    }

    getText() {
        return this.get().map(x=>x.Word.get());
    }
}

export class LanguageName extends LocSystem<WoWLanguage> {
    lang(lang: Language): Cell<string, WoWLanguage> & PendingCell {
        return new MulticastCell(this.owner,[
              ...this.owner.Skills.map(x=>x.Name.lang(lang))
            , ...this.owner.Spells.map(x=>x.Name.lang(lang))
            , this.owner.row.Name.lang(lang)
        ]);
    }

    clear() {
        Languages.forEach(x=>{
            let c = this.lang(x);
            if(c && c.get() && c.get().length>0) {
                c.set('')
            }
        });
        return this.owner;
    }

    get mask(): Cell<number, WoWLanguage> {
        return new MulticastCell(this.owner,[
            ...this.owner.Skills.map(x=>x.Name.mask),
            this.owner.row.Name.mask
        ]);
    }

    set(con: loc_constructor): WoWLanguage {
        iterLocConstructor(con,(lang,value)=>{
            this.lang(lang).set(value);
        });
        return this.owner;
    }
}

export class LanguageSkills extends MultirowSystemCached<SkillLine,WoWLanguage> {
    private cachedSkills?: SkillLine[] = undefined;

    protected getAllRows(): SkillLine[] {
        if(this.cachedSkills) return this.cachedSkills;
        let skills: SkillLine[] = [];
        this.owner.Abilities.forEach((value)=>{
            let sl = value.SkillLine.get();
            if(!skills.find((x)=>x.ID == sl)) {
                skills.push(SkillLineRegistry.load(sl));
            }
        })
        this.cachedSkills = skills;
        return skills;
    }
    protected isDeleted(value: SkillLine): boolean {
        return value.row.isDeleted();
    }
}

export class LanguageAbilities extends MultirowSystemCached<SkillLineAbility,WoWLanguage> {
    protected getAllRows(): SkillLineAbility[] {
        let rows: SkillLineAbility[] = [];
        this.owner.Spells.forEach(x=>{
            rows = rows.concat(SpellSkillLineAbilites.getAllRows(x.SkillLines))
        });
        return rows;
    }
    protected isDeleted(value: SkillLineAbility): boolean {
        return value.row.isDeleted();
    }
}
export class LanguageSpells extends MultirowSystemCached<Spell,WoWLanguage>  {
    protected getAllRows(): Spell[] {
        return SpellRegistry
            .filter(x=>x.Effects.find(eff=>
                   eff.Type.LANGUAGE.is()
                && eff.MiscValueA.get() === this.owner.ID
            ))
    }
    protected isDeleted(value: Spell): boolean {
        return value.row.isDeleted()
    }
}

/**
 * Creates and handles languages in World of Warcraft,
 * such as Orcish or Common.
 */
export class WoWLanguage extends MainEntity<LanguagesRow> {
    constructor(row : LanguagesRow) {
        super(row);
    }

    get ID() {
        return this.row.ID.get();
    }

    get Name() {  return new LanguageName(this); }
    readonly Spells = new LanguageSpells(this);
    readonly Abilities = new LanguageAbilities(this)
    readonly Skills = new LanguageSkills(this)
    readonly AutoLearn = new LanguageAutoLearn(this)
    readonly Words = new LanguageWords(this)
}

export class LanguageRegistryClass extends RegistryStaticNoClone<WoWLanguage,LanguagesRow,LanguagesQuery> {
    protected Table(): Table<any, LanguagesQuery, LanguagesRow> & { add: (id: number) => LanguagesRow; } {
        return DBC.Languages
    }
    protected IDs(): StaticIDGenerator {
        return Ids.Language
    }
    protected Entity(r: LanguagesRow): WoWLanguage {
        return new WoWLanguage(r);
    }
    protected FindByID(id: number): LanguagesRow {
        return this.Table().query({ID:id})
    }
    protected EmptyQuery(): LanguagesQuery {
        return {}
    }
    ID(e: WoWLanguage): number {
        return e.ID;
    }

    Clear(lang: WoWLanguage, mod: string, id: string) {
        let sl = SkillLineRegistry.create(mod,id+'-skill')
            .Category.set(10)
            .CanLink.set(0)
            .SkillCosts.set(0)
            .Icon.setPath('Interface\\Icons\\Trade_Engineering')
            .CanLink.set(0)
            .RaceClassInfos.addMod(undefined,undefined,
                x=>x
                    .Flags.clearAll()
                    .Flags.IS_CLASS_LINE.set(true)
                    .SkillTier.set(0)
            )

        lang.Skills.setCache([sl]);

        const spell = SpellRegistry
            .create(mod,id+'-spell')
            .Attributes.IS_PASSIVE.set(true)
            .Attributes.IS_HIDDEN_IN_SPELLBOOK.set(true)
            .Proc.Chance.set(100,'[0-100]')
            .DefenseType.set(1)
            .PreventionType.set(1)
            .Effects.addMod(effect=>{
                effect.Type.LANGUAGE.set()
                    .Language.set(lang.ID)
                    .ChainAmplitude.set(1)
            })
            .SchoolMask.PHYSICAL.set(true)
            .SkillLines.addMod(sl.ID,undefined,undefined,sla=>{
                lang.Abilities.setCache([sla]);
                sla.RaceMask.set(0xffffffff)
                    .AcquireMethod.set(2)
                    .ClassMask.set(0)
                    .ClassMaskForbidden.set(0)
            })
        lang.Spells.setCache([spell])

        // clear name now that caches are all set up
        lang.Name.clear()
    }
}
export const LanguageRegistry = new LanguageRegistryClass();