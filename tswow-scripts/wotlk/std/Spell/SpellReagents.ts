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
import { ArrayEntry, ArraySystem } from "../../../data/cell/systems/ArraySystem";
import { Spell } from "./Spell";
export class SpellReagentEntry<T> extends ArrayEntry<T> {
    protected spell: Spell;
    get Reagent() { return this.wrapIndex(this.spell.row.Reagent,this.index); }
    get ReagentCount() { return this.wrapIndex(this.spell.row.ReagentCount,this.index); }

    constructor(owner: T, index: number, spell: Spell) {
        super(owner,index);
        this.spell = spell;
    }

    clear() {
        this.Reagent.set(0);
        this.ReagentCount.set(0);
        return this;
    }
    isClear(): boolean {
        return this.Reagent.get()===0;
    }

    set(reagent: number, count: number) {
        this.Reagent.set(reagent);
        this.ReagentCount.set(count);
        return this;
    }
}

export class SpellReagents<T> extends ArraySystem<SpellReagentEntry<T>, T> {
    protected spell: Spell;

    constructor(owner: T, spell: Spell) {
        super(owner);
        this.spell = spell;
    }

    get length(): number {
        return 8;
    }

    get(index: number): SpellReagentEntry<T> {
        return new SpellReagentEntry(this.owner, index, this.spell);
    }

    add(reagent: number, count: number) {
        this.addGet().set(reagent, count);
        return this.owner;
    }
}