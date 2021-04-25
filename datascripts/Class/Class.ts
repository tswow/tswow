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

import { Cell } from "wotlkdata/cell/Cell";
import { DBC } from "wotlkdata/dbc/DBCFiles";
import { ChrClassesRow } from "wotlkdata/dbc/types/ChrClasses";
import { LUAXML } from "wotlkdata/luaxml/LUAXML";
import { Edit } from "wotlkdata/luaxml/TextFile";
import { includes, neq } from "wotlkdata/query/Relations";
import { SQL } from "wotlkdata/sql/SQLFiles";
import { playercreateinfo_skillsRow } from "wotlkdata/sql/types/playercreateinfo_skills";
import { Ids } from "../Misc/Ids";
import { MainEntity } from "../Misc/MainEntity";
import { RaceType, resolveRaceType } from "../Race/RaceType";
import { CharacterCreationUI } from "../UI/CharacterCreation";
import { BaseClassData } from "./BaseClassData";
import { DefaultClassRaces, getDefaultClass, getDefaultRace } from "./ClassDefaultRaces";
import { ClassStartInventory } from "./ClassStartInventory";
import { ClassStartOutfits } from "./ClassStartOutfits";
import { ClassStats } from "./ClassStats";
import { ClassType, resolveClassType } from "./ClassType";
import { ClassUISettings } from "./ClassUISettings";
import { EquipSkills } from "./EquipSkills";

type ClassFinder = number;

let created = false;

export type LevelStats = { str: number, agi: number, sta: number, inte: number, spi: number};

let languages : playercreateinfo_skillsRow[] = []

export class Class extends MainEntity<ChrClassesRow> {
    readonly UI : ClassUISettings;
    readonly BaseClass: number;

    constructor(baseClass: number, row : ChrClassesRow, 
        tCoordsCCEdit : Edit, 
        classColorEdit : Edit, 
        sortOrderEdit : Edit, 
        tCoordsEdit : Edit, 
        xmlEdit : Edit, 
        maleDescription : Edit, 
        femaleDescription : Edit, 
        infoRows : Edit[]) {
            super(row);
            this.UI = new ClassUISettings(this,
                tCoordsCCEdit,classColorEdit,sortOrderEdit,
                tCoordsEdit,xmlEdit,maleDescription,
                femaleDescription,infoRows);
            this.BaseClass = baseClass;
    }

    get Inventory() { return new ClassStartInventory(this); }
    get EquipSkills() { return new EquipSkills(this); }
    get StartGear() { return new ClassStartOutfits(this); }
    get Filename() { return this.row.Filename.get(); }
    get ID() { return this.row.ID.get(); }
    get Stats() { return new ClassStats(this); }
    get Name() { return this.wrapLoc(this.row.Name); }
    get Flags() { return this.wrap(this.row.Flags); }
    get CinematicSequence() { return this.wrap(this.row.CinematicSequenceID); }
    get RequiredExpansion() { return this.wrap(this.row.Required_Expansion); }
    get DisplayPower() { return this.wrap(this.row.DisplayPower); }
    get PetNameToken() { return this.wrap(this.row.PetNameToken); }

    addRaces(races : RaceType[]) {
        // Is base class

        const rci = DBC.SkillRaceClassInfo.filter({})
            .filter((x)=>x.RaceMask.get()!==4294967295 && x.ClassMask.get()&(1<<(this.BaseClass-1)));

        for(let raceType of races) {
            const raceid = resolveRaceType(raceType);

            if(this.ID <= 11) {
                let found = false;
                for(const {race,cls} of Object.values(DefaultClassRaces)) {
                    if(race==raceid && cls == this.ID) {
                        found = true;
                        break;
                    }
                }
                if(found) {
                    continue;
                }
            }

            const {race: oldRace,cls} = getDefaultRace(raceid,this.BaseClass);

            SQL.player_levelstats
                .filter({class: cls, race: oldRace})
                .forEach(x=>x.clone(raceid,this.ID,x.level.get()));

            // Copy all RCI's from the parent class/race pair (or class/default race)
            rci.filter(x=>x.RaceMask.get()&(1<<(oldRace)))
                .forEach(x=>{
                    if(x.ClassMask.get()!==0xffffffff) {
                        x.ClassMask.mark(this.ID-1);
                    }

                    if(x.RaceMask.get()!==0xffffffff) {
                        x.RaceMask.mark(raceid-1);
                    }
                })

            DBC.CharStartOutfit
                .filter({ClassID: cls, RaceID: oldRace})
                .forEach(x=>x.clone(Ids.CharStartOutfit.id())
                    .ClassID.set(this.ID)
                    .RaceID.set(raceid))


            // By default, the classes should come from here.
            const defaultClass = getDefaultClass(raceid);
            SQL.playercreateinfo.find({race: raceid, class: defaultClass})
                .clone(raceid, this.ID)

            DBC.CharBaseInfo.add(raceid,this.row.ID.get());
        }
        return this;
    }
}

const clsResolve = (f : ClassFinder) => {
    return DBC.ChrClasses.find({ID:f});
}

export const Classes = {

    load : (finder: ClassType) => {
        const finderId = resolveClassType(finder);
        const row = clsResolve(finderId);

        const cc = LUAXML.file('Interface/GlueXML/CharacterCreate.lua');
        const co = LUAXML.file('Interface/FrameXML/Constants.lua');
        const xm = LUAXML.file('Interface/GlueXML/CharacterCreate.xml');
        const gs = LUAXML.file('Interface/GlueXML/GlueStrings.lua');

        const fn = row.Filename.get()
        const tcoordscc = cc.emptyReplace(BaseClassData.CHARACTERCREATE_ICON_TCOORD_ROWS[fn]);
        const tcoords = co.emptyReplace(BaseClassData.CONSTANT_ICON_TCOORDS_ROWS[fn]);
        const classColor = co.emptyReplace(BaseClassData.CLASS_COLOR_ROWS[fn]);
        const sortOrder = co.emptyReplace(BaseClassData.CLASS_SORT_ORDER_ROWS[fn]);
        const xmle = xm.emptyReplace(BaseClassData.XML_ROWS[fn]);

        const maleDesc = gs.emptyReplace(BaseClassData.CLASS_DESCRIPTION_ROW[fn]);
        const femaleDesc = gs.emptyReplace(BaseClassData.CLASS_DESCRIPTION_ROW[fn]+1);

        const [infoStart,infoLen] = BaseClassData.CLASS_INFO_ROW[fn];
        const infoRows : Edit[] = [];
        for(let i = infoStart; i < infoStart + infoLen ; ++i ) {
            infoRows.push(gs.emptyReplace(i));
        }
        return new Class(
            finderId,
            row,
            tcoordscc,
            classColor,
            sortOrder,
            tcoords,
            xmle,
            maleDesc,
            femaleDesc,
            infoRows
        );
    },

    create : (mod : string, clsId : string, parentClass: ClassType) => {
        let identifier = clsId.toUpperCase();
        const parent = resolveClassType(parentClass);

        // Set up parent buttons
        if(!created) {
            created = true;
            new CharacterCreationUI()
                .MaleButton.setPos(-20,-360)
                .FemaleButton.setPos(20,-360)
                .ClassName.setPos(0,-418)
        }

        // Create class object
        const rParent = clsResolve(parent);
        const id = Ids.Class.id(mod,clsId);
        const classIndex = DBC.ChrClasses.rowCount;

        // Copy all languages
        if(languages.length == 0) {
            languages = SQL.playercreateinfo_skills.filter({comment:includes("Language")})
        }
        languages.forEach(x=>x.clone(x.raceMask.get(),(x.classMask.get()|1<<(id-1)>>>0),x.skill.get()));

        // Setup RaceClassInfos
        DBC.SkillRaceClassInfo.find({});
        const parentRCI = DBC.SkillRaceClassInfo.filter({})
            .filter(x=>x.RaceMask.get() !== 4294967295 && x.ClassMask.get()&((1<<(parent-1))>>>0));
        parentRCI.forEach(x=>{
            let mask = x.ClassMask.get();
            if(mask!==0xffffffff) {
                mask = (mask | (1<<(id-1)))>>>0;
            }
            x.ClassMask.set(mask);
        });

        interface GtItem {
            index: number;
            Data: Cell<number, any>
            clone() : GtItem
        }

        interface GTFile {
            add(c: {Data:number}): any;
            filter(g: any): GtItem[];
        }

        // Copy over stats
        const p = (size: number, dbc: GTFile) =>
            dbc.filter({})
            .filter((x,i)=>x.index>=parent*size && x.index<parent*size+size)
        const g = (size: number, dbc: GTFile) => 
            p(size,dbc).forEach((x)=>x.clone().Data.set(x.Data.get()))
        
        g(100,DBC.GtChanceToMeleeCrit)
        g(100,DBC.GtChanceToSpellCrit)
        g(100,DBC.GtOCTRegenHP)
        g(100,DBC.GtOCTRegenMP)
        g(100,DBC.GtRegenHPPerSpt)
        g(100,DBC.GtRegenMPPerSpt)
        g(1,DBC.GtChanceToMeleeCritBase)
        g(1,DBC.GtChanceToSpellCritBase)
        g(320,DBC.GtCombatRatings)
        DBC.GtOCTClassCombatRatingScalar.filter({})
            .filter((x)=>x.index>=parent*32 && x.index < parent*32+32)
            .forEach((x,i)=>{
                const g = x.clone({ID: (classIndex+1)*32+i})
            });

        SQL.player_classlevelstats
            .filter({class:rParent.ID.get()}).map(x=>x.clone(id,x.level.get()));

        const co = LUAXML.file('Interface/FrameXML/Constants.lua');
        const cc = LUAXML.file('Interface/GlueXML/CharacterCreate.lua');
        const gs = LUAXML.file('Interface/GlueXML/GlueStrings.lua');

        const tCoordsCC = cc.after(52,`["${identifier}"] = {0, 0.25, 0, 0.25},`)
        const classColor = co.after(54,`\t["${identifier}"] = { r = 0.67, g = 0.83, b = 0.45 },`)
        const sortOrder = co.after(71,`\t"${identifier}",`)
        const tCoords = co.after(91,`\t["${identifier}"] = {0,0,0,0},`);

        const ccx = LUAXML.file('Interface/GlueXML/CharacterCreate.xml');
        ccx.after(586, `<CheckButton name="CharacterCreateClassButton${id-1}" inherits = "CharacterCreateClassButtonTemplate" id="${id-1}">`)
        ccx.after(586, `<Anchors>`);
        let xmlE = ccx.after(586, `<Anchor point="TOP" x="-90" y="-420"/>`);
        ccx.after(586, `</Anchors>`);
        ccx.after(586,`</CheckButton>`);
        const maleDesc = gs.after(327,`CLASS_${identifier} = "Male Description";`);
        const femaleDesc = gs.after(327,`CLASS_${identifier}_FEMALE = "Female Description";`);

        gs.after(552,`${identifier}_DISABLED = "${identifier}\\nYou must choose a difference race to be this class.";`);

        return new Class(
            parent,
            rParent.clone(id,{Filename:identifier}),
            tCoordsCC,
            classColor,
            sortOrder,
            tCoords,
            xmlE,
            maleDesc,
            femaleDesc,
            []
        );
    }
}