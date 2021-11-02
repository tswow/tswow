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
import { Cell } from "wotlkdata/wotlkdata/cell/cells/Cell";
import { CellSystem } from "wotlkdata/wotlkdata/cell/systems/CellSystem";
import { Spell } from "./Spell";
import { SpellEffect } from "./SpellEffect";

export abstract class ClassSet<T> extends CellSystem<T> {

    constructor(owner: T) {
        super(owner);
    }

    abstract get A() : Cell<number,T> ;
    abstract get B() : Cell<number,T> ;
    abstract get C() : Cell<number,T> ;

    set(a: number, b: number, c: number) {
        this.A.set(a);
        this.B.set(b);
        return this.C.set(c);
    }
}

export class BaseClassSet extends ClassSet<Spell> {
    get A(): Cell<number, Spell> {
        return this.ownerWrapIndex(this.owner.row.SpellClassMask,0);
    }

    get B(): Cell<number, Spell> {
        return this.ownerWrapIndex(this.owner.row.SpellClassMask,1);
    }

    get C(): Cell<number, Spell> {
        return this.ownerWrapIndex(this.owner.row.SpellClassMask,2);
    }

    get Set() { return this.ownerWrap(this.owner.row.SpellClassSet); }

    /**
     * Sets this spells ClassSets to match this spell effect
     * @param effect
     */
    match(effect: SpellEffect, matches: ('A'|'B'|'C')[] = ['A','B','C']) {
        if(matches.includes('A')) {
            this.A.set(effect.ClassMask.A.get())
        }
        if(matches.includes('B')) {
            this.B.set(effect.ClassMask.B.get())
        }
        if(matches.includes('C')) {
            this.C.set(effect.ClassMask.C.get())
        }
        this.Set.set(effect.row.SpellClassSet.get());
        return this.owner;
    }
}

export class EffectClassSet<T> extends ClassSet<T> {
    protected effect: SpellEffect;
    constructor(owner: T, effect: SpellEffect) {
        super(owner);
        this.effect = effect;
    }

    get A(): Cell<number, T> {
        return this.ownerWrapIndex(this.effect.row.EffectSpellClassMaskA,this.effect.index);
    }
    get B(): Cell<number, T> {
        return this.ownerWrapIndex(this.effect.row.EffectSpellClassMaskB,this.effect.index);
    }
    get C(): Cell<number, T> {
        return this.ownerWrapIndex(this.effect.row.EffectSpellClassMaskC,this.effect.index);
    }

    copyFrom(set: EffectClassSet<any>) {
        this.A.set(set.A.get());
        this.B.set(set.B.get());
        this.C.set(set.C.get());
    }
}