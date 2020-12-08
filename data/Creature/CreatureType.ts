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
import { Language } from "wotlkdata/dbc/Localization";
import { SQL } from "wotlkdata/sql/SQLFiles";
import { creature_templateRow } from "wotlkdata/sql/types/creature_template";
import { MainEntity } from "../Base/MainEntity";
import { SQLLoc } from "../Base/SQLLocSystem";
import { AttachedScript } from "../SmartScript/AttachedScript";
import { SmartScripts } from "../SmartScript/SmartScript";

function creatureLoc(id: number, lang: Language) {
    const old = SQL.creature_template_locale.find({entry:id, locale:lang});
    if(old) {
        return old;
    }
    return SQL.creature_template_locale.add(id, lang);
}

export class CreatureTemplate extends MainEntity<creature_templateRow> {
    get ID() { return this.row.entry.get(); }
    get Name() { return new SQLLoc(this,
        ()=>this.row.name,
        (lang)=>creatureLoc(this.ID,lang).Name) 
    }
    get Title() { return new SQLLoc(this,()=>this.row.subname,
        (lang)=>creatureLoc(this.ID,lang).Title
    )}
        
    get Scripts() { 
        return new AttachedScript(()=>{
            this.row.AIName.set('SmartAI');
            return SmartScripts.creature(this.ID, this);
        })
    }
    
    get NPCFlag() { return this.wrap(this.row.npcflag);}
    get Type() { return this.wrap(this.row.type); }
    get TypeFlags() { return this.wrap(this.row.type_flags); }
    get AIName() { return this.wrap(this.row.AIName); }
    get FlagsExtra() { return this.wrap(this.row.flags_extra); }

    get UnitClass() { return this.wrap(this.row.unit_class); }
    get UnitFlags2() { return this.wrap(this.row.unit_flags2); }
    get DynamicFlags() { return this.wrap(this.row.dynamicflags); }
}