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
import { DBC } from "wotlkdata";
import { SkillLineRow } from "wotlkdata/wotlkdata/dbc/types/SkillLine";
import { MainEntity } from "../Misc/Entity";
import { Ids } from "../Misc/Ids";
import { SpellIconCell } from "../Spell/SpellIcon";

/**
 * Represents a class skill type (Mage/Frost, Warlock/Destruction, Warrior/Arms etc.)
 *
 * Talent trees are completely separate from these.
 */
export class ClassSkill extends MainEntity<SkillLineRow> {
    get Description() { return this.wrapLoc(this.row.Description); }
    get Name() { return this.wrapLoc(this.row.DisplayName); }
    get Icon() { return new SpellIconCell(this, this.row.SpellIconID); }
}

export const ClassSkills = {
    load(id: number) {
        return new ClassSkill(DBC.SkillLine.findById(id));
    },

    create(mod: string, id: string) {
        return new ClassSkill(DBC.SkillLine.add(Ids.SkillLine.id(mod,id))
            .CategoryID.set(7)
            .SkillCostsID.set(0)
            .CanLink.set(0)
        );
    }
}