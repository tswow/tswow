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
import { Ids, AutoIdGenerator } from "../Base/Ids";
import { Cell } from "wotlkdata/cell/Cell";
import { SharedRef, SharedRefTable } from "../Refs/SharedRef";
import { BaseSystem } from "wotlkdata/cell/BaseSystem";
import { SpellDifficultyRow } from "wotlkdata/dbc/types/SpellDifficulty";

export class SpellDifficulty<T extends BaseSystem> extends SharedRef<T, SpellDifficultyRow> {

    table(): SharedRefTable<SpellDifficultyRow> {
        return DBC.SpellDifficulty;
    }
    ids(): AutoIdGenerator {
        return Ids.SpellDifficulty;
    }
    clear(): this {
        this.set(0,0,0,0);
        return this;
    }

    get Normal10Man() { return this.row.DifficultySpellID.getIndex(0); }
    get Normal25Man() { return this.row.DifficultySpellID.getIndex(1); }
    get Heroic10Man() { return this.row.DifficultySpellID.getIndex(2); }
    get Heroic25Man() { return this.row.DifficultySpellID.getIndex(3); }
    
    set(normal10Man: number, normal25Man: number, heroic10Man : number, heroic25Man: number) {
        const row = this.row;
        row.DifficultySpellID.setIndex(0, normal10Man);
        row.DifficultySpellID.setIndex(1, normal25Man);
        row.DifficultySpellID.setIndex(2, heroic10Man);
        row.DifficultySpellID.setIndex(3, heroic25Man);
        return this.owner;
    }
    
}