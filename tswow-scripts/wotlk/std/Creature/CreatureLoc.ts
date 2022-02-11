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
import { SQL } from "wotlkdata";
import { Cell } from "wotlkdata/wotlkdata/cell/cells/Cell";
import { Language } from "wotlkdata/wotlkdata/dbc/Localization";
import { SQLLocSystem } from "../Misc/SQLLocSystem";
import { CreatureTemplate } from "./CreatureTemplate";

function creatureLoc(id: number, lang: Language) {
    const old = SQL.creature_template_locale.query({entry:id, locale:lang});
    if(old) {
        return old;
    }
    return SQL.creature_template_locale.add(id, lang);
}

export class CreatureName extends SQLLocSystem<CreatureTemplate> {
    protected getMain(): Cell<string, any> {
        return this.owner.row.name;
    }

    protected getLoc(loc: Language): Cell<string, any> {
        return creatureLoc(this.owner.ID, loc).Name;
    }
}

export class CreatureSubname extends SQLLocSystem<CreatureTemplate> {
    protected getMain(): Cell<string, any> {
        return this.owner.row.subname;
    }

    protected getLoc(loc: Language): Cell<string, any> {
        return creatureLoc(this.owner.ID, loc).Title;
    }
}