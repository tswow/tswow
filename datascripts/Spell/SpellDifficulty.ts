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
import { Subsystem } from "wotlkdata/cell/Subsystem";
import { Ids } from "../Base/Ids";
import { Spell } from "./Spell";
import { Cell } from "wotlkdata/cell/Cell";

export class SpellDifficulty<T> extends Subsystem<T> {
    protected cell: Cell<number,any>;

    protected transientFields() {
        return super.transientFields().concat(['cell']);
    }
    
    constructor(owner: T, cell: Cell<number,any>) {
        super(owner);
        this.cell = cell;
    }
    
    makeUnique() {
        if(this.cell.get()===0) {
            return;
        }
        const row = DBC.SpellDifficulty.findById(this.cell.get())
        .clone(Ids.SpellDifficulty.id())
        this.cell.set(row.ID.get());
        return this.owner;
    }
    
    get row() { 
        return DBC.SpellDifficulty.find({ID: this.cell.get()})
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