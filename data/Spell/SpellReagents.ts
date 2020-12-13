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
import { ArrayEntry, SystemArray } from "wotlkdata/cell/Systems/SystemArray";
import { Spell } from "./Spell";

export class SpellReagentEntry extends ArrayEntry<Spell> {
    get Reagent() { return this.wrapIndex(this.owner.row.Reagent,this.index); }
    get ReagentCount() { return this.wrapIndex(this.owner.row.ReagentCount,this.index); }

    clear(): Spell {
        this.Reagent.set(0);
        this.ReagentCount.set(0);
        return this.owner;
    }
    isClear(): boolean {
        return this.Reagent.get()===0;
    }

    set(reagent: number, count: number) {
        this.Reagent.set(reagent);
        this.ReagentCount.set(count);
        return this.owner;
    }
}

export class SpellReagents extends SystemArray<SpellReagentEntry, Spell> {
    get length(): number {
        return 8;
    }

    get(index: number): SpellReagentEntry {
        return new SpellReagentEntry(this.owner, index);
    }

    add(reagent: number, count: number) {
        return this.getFree().set(reagent, count);
    }
}