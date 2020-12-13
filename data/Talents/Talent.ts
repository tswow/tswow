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
import { Subsystem } from "wotlkdata/cell/Subsystem";
import { TalentRow } from "wotlkdata/dbc/types/Talent";
import { TalentRequirements } from "./TalentRequirements";
import { TalentTree } from "./TalentTree";

export class Talent extends Subsystem<TalentTree> {
    readonly row: TalentRow;
    constructor(owner: TalentTree, row: TalentRow) {
        super(owner);
        this.row = row;
    }

    get ID() { return this.row.ID.get() }
    get Column() { return this.wrap(this.row.ColumnIndex); }
    get Requirements() { return new TalentRequirements(this); }
    get RequiredSpell() { return this.wrap(this.row.RequiredSpellID); }
    get Row() { return this.wrap(this.row.TierID); }
    get TabID() { return this.wrap(this.row.TabID); }
    get Spells() { return this.wrapArray(this.row.SpellRank); }
}