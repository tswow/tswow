/*
 * This file is part of tswow (https://github.com/tswow)
 *
 * Copyright (C) 2021 tswow <https://github.com/tswow/>
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
import { skill_fishing_base_levelRow } from "wotlkdata/wotlkdata/sql/types/skill_fishing_base_level";
import { MaybeSQLEntity } from "../Misc/SQLDBCEntity";
import { Area } from "./Area";

export class AreaFishingSkill extends MaybeSQLEntity<Area,skill_fishing_base_levelRow> {
    protected createSQL(): skill_fishing_base_levelRow {
        return SQL.skill_fishing_base_level.add(this.owner.ID)
    }
    protected findSQL(): skill_fishing_base_levelRow {
        return SQL.skill_fishing_base_level.query({entry:this.owner.ID})
    }
    protected isValidSQL(sql: skill_fishing_base_levelRow): boolean {
        return sql.entry.get() === this.owner.ID
    }
    get Skill() { return this.wrapSQL(0,sql=>sql.skill) }
}