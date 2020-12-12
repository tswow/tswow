import { Cell } from "wotlkdata/cell/Cell";
import { Subsystem } from "wotlkdata/cell/Subsystem";
import { Spell } from "./Spell";
import { SpellEffect } from "./SpellEffect";

export abstract class ClassSet<T> extends Subsystem<T> {
    
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
        this.Set.set(SpellEffect.owner(effect).ClassMask.Set.get());
        return this.owner;
    }
}

export class EffectClassSet extends ClassSet<SpellEffect> {
    get A(): Cell<number, SpellEffect> {
        return this.ownerWrapIndex(SpellEffect.owner(this.owner).row.EffectSpellClassMaskA,this.owner.index);
    }
    get B(): Cell<number, SpellEffect> {
        return this.ownerWrapIndex(SpellEffect.owner(this.owner).row.EffectSpellClassMaskB,this.owner.index);
    }
    get C(): Cell<number, SpellEffect> {
        return this.ownerWrapIndex(SpellEffect.owner(this.owner).row.EffectSpellClassMaskC,this.owner.index);
    }

    copyFrom(set: EffectClassSet) {
        this.A.set(set.A.get());
        this.B.set(set.B.get());
        this.C.set(set.C.get());
    }
}