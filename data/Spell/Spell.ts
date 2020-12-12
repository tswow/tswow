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
import { SpellRow } from "wotlkdata/dbc/types/Spell";
import { Ids } from "../Base/Ids";
import { MainEntity } from "../Base/MainEntity";
import { SpellAttributes } from "./SpellAttributes";
import { SpellCastTime } from "./SpellCastTime";
import { BaseClassSet } from "./SpellClassSet";
import { SpellEffects } from "./SpellEffect";
import { SpellIconCell } from "./SpellIcon";
import { SpellPower } from "./SpellPower";
import { SpellSkillLineAbilites } from "./SpellSkillLines";
import { SpellVisual } from "./SpellVisual";
import { SpellCreatureTarget } from "./TargetCreatureType";
import { SpellTargetType } from "./TargetType";

export class Spell extends MainEntity<SpellRow> {
    get Attributes() { return new SpellAttributes(this); }
    get Visual() { return new SpellVisual(this); }
    get Icon() { return new SpellIconCell(this, this.row.SpellIconID); }
    get ActiveIcon() { return new SpellIconCell(this, this.row.ActiveIconID); }
    get Name() { return this.wrapLoc(this.row.Name); }

    get ID() { return this.row.ID.get(); }

    get TargetType() { return new SpellTargetType(this); }
    get CreatureTargets() { return new SpellCreatureTarget(this); }

    get SkillLines() { return new SpellSkillLineAbilites(this); }

    get Effects() { return new SpellEffects(this); }

    get ClassMask() { return new BaseClassSet(this); }
    get Power() { return new SpellPower(this); }

    get CastTime() { return new SpellCastTime(this); }
    get TotemCategories() { return this.wrapArray(this.row.RequiredTotemCategoryID); }

    /**
     * Creates a separate clone of this spell
     * @param mod 
     * @param id 
     * @param keepVisualLink - Whether the new spell should keep sharing visual rows with its parent.
     */
    clone(mod: string, id: string, keepVisualLink: boolean = false) {
        const newId = Ids.Spell.id(mod, id);
        let spell = new Spell(this.row.clone(newId));
        if(!keepVisualLink) {
            spell.Visual.makeUnique();
        }
        return spell;
    }
}