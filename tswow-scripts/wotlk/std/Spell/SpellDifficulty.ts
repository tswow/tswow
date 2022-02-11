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
import { Cell } from "wotlkdata/wotlkdata/cell/cells/Cell";
import { SpellDifficultyQuery, SpellDifficultyRow } from "wotlkdata/wotlkdata/dbc/types/SpellDifficulty";
import { Table } from "wotlkdata/wotlkdata/table/Table";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator, Ids } from "../Misc/Ids";
import { RefDynamic } from "../Refs/Ref";
import { RegistryDynamic } from "../Refs/Registry";

export class SpellDifficulty extends MainEntity<SpellDifficultyRow> {
    clear(): this {
        this.set(0,0,0,0);
        return this;
    }

    get ID() { return this.row.ID.get(); }

    get Normal10Man() { return this.wrapIndex(this.row.DifficultySpellID,0); }
    get Normal25Man() { return this.wrapIndex(this.row.DifficultySpellID,1); }

    get Heroic10Man() { return this.wrapIndex(this.row.DifficultySpellID,2); }
    get Heroic25Man() { return this.wrapIndex(this.row.DifficultySpellID,3); }

    set(normal10Man: number, normal25Man: number, heroic10Man : number, heroic25Man: number) {
        const row = this.row;
        row.DifficultySpellID.setIndex(0, normal10Man);
        row.DifficultySpellID.setIndex(1, normal25Man);
        row.DifficultySpellID.setIndex(2, heroic10Man);
        row.DifficultySpellID.setIndex(3, heroic25Man);
        return this.owner;
    }
}

export class SpellDifficultyRef<T> extends RefDynamic<T,SpellDifficulty>
{
    setSimple(normal10: number, normal25 = 0, heroic10 = 0, heroic25 = 0)
    {
        this.getRefCopy().set(normal10,normal25,heroic10,heroic25)
        return this.owner;
    }
}

export class SpellDifficultyRegistryClass
    extends RegistryDynamic<SpellDifficulty,SpellDifficultyRow,SpellDifficultyQuery>
{
    ref<T>(owner: T, cell: Cell<number,any>) {
        return new SpellDifficultyRef(owner, cell, this);
    }
    protected Table(): Table<any, SpellDifficultyQuery, SpellDifficultyRow> & { add: (id: number) => SpellDifficultyRow; } {
        return DBC.SpellDifficulty
    }
    protected ids(): DynamicIDGenerator {
        return Ids.SpellDifficulty
    }
    Clear(entity: SpellDifficulty): void {
        entity.set(0,0,0,0)
    }
    protected FindByID(id: number): SpellDifficultyRow {
        return DBC.SpellDifficulty.findById(id);
    }
    protected EmptyQuery(): SpellDifficultyQuery {
        return {}
    }
    ID(e: SpellDifficulty): number {
        return e.ID
    }
    protected Entity(r: SpellDifficultyRow): SpellDifficulty {
        return new SpellDifficulty(r);
    }
}

export const SpellDifficultyRegistry = new SpellDifficultyRegistryClass();