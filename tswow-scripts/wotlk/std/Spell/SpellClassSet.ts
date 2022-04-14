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
import { CellWrapper } from "../../../data/cell/cells/Cell";
import { Bit, MaskCell, MaskCell32 } from "../../../data/cell/cells/MaskCell";
import { DBCUIntArrayCell } from "../../../data/dbc/DBCCell";
import { CellBasic } from "../GameObject/ElevatorKeyframes";
import { Spell } from "./Spell";
import { SpellEffect } from "./SpellEffect";
import { SpellRegistry } from "./Spells";

export abstract class ClassSet<T> extends MaskCell<T> {

    protected getPart(bit: number) {
        return [this.A,this.B,this.C][Math.floor(bit/32)];
    }

    getBit(bit: number): boolean {
        return this.getPart(bit).getBit(bit%32);
    }
    setBit(bit: number, value: Bit): T {
        return this.getPart(bit).setBit(bit%32, value);
    }
    clearAll(): T {
        this.A.clearAll();
        this.B.clearAll();
        this.C.clearAll();
        return this.owner;
    }
    toString(): string {
        return this.A.toString() + this.B.toString() + this.C.toString();
    }
    protected deserialize(value: any): void {
        throw new Error("Method not implemented.");
    }

    abstract get A() : MaskCell32<T> ;
    abstract get B() : MaskCell32<T> ;
    abstract get C() : MaskCell32<T> ;

    set(a: number, b: number, c: number) {
        this.A.set(a);
        this.B.set(b);
        this.C.set(c);
        return this.owner;
    }

    objectify() {
        let values: string[] = []
        for(let i=0;i<96;++i) {
            if(this.getBit(i)) values.push(i.toString())
        }
        return values;
    }
}


export class BaseClassSet extends ClassSet<Spell> {
    private makeCell(index: number) {
        return new MaskCell32(this.owner, new CellBasic(
              this.owner
            , ()=>this.owner.row.SpellClassMask
                .getIndex(index)
            , (val)=>this.owner.row.SpellClassMask
                .setIndex(index,val)
        ));
    }

    get A(): MaskCell32<Spell> { return this.makeCell(0); }
    get B(): MaskCell32<Spell> { return this.makeCell(1); }
    get C(): MaskCell32<Spell> { return this.makeCell(2); }

    get Family() {
        return new CellWrapper(this.owner,this.owner.row.SpellClassSet);
    }

    objectify() {
        return {
              Family: this.Family.get()
            , Mask: super.objectify()
        } as any
    }

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
        this.Family.set(effect.row.SpellClassSet.get());
        return this.owner;
    }
}

export class EffectClassSet<T> extends ClassSet<T> {
    protected effect: SpellEffect;
    protected makeCell(index: number) {
        let cell: DBCUIntArrayCell<any>;
        switch(this.effect.index) {
            case 0:
                cell = this.effect.row.EffectSpellClassMaskA;
                break;
            case 1:
                cell = this.effect.row.EffectSpellClassMaskB;
                break
            case 2:
                cell = this.effect.row.EffectSpellClassMaskC;
                break
        }
        return new MaskCell32(this.owner, new CellBasic(
              this.owner
            , ()=>cell.getIndex(index)
            , (val)=>cell.setIndex(index,val)
        ))
    }

    constructor(owner: T, effect: SpellEffect) {
        super(owner);
        this.effect = effect;
    }

    get A() { return this.makeCell(0)};
    get B() { return this.makeCell(1)};
    get C() { return this.makeCell(2)};

    matches(spell: Spell|number) {
        if(typeof(spell) === 'number') {
            spell = SpellRegistry.load(spell)
        }

        return this.effect.row.SpellClassSet.get()
            === spell.row.SpellClassSet.get()
            &&
            (
                   (this.A.get() & spell.row.SpellClassMask.getIndex(0))
                || (this.B.get() & spell.row.SpellClassMask.getIndex(1))
                || (this.C.get() & spell.row.SpellClassMask.getIndex(2))
            )
    }

    copyFrom(set: EffectClassSet<any>) {
        this.A.set(set.A.get());
        this.B.set(set.B.get());
        this.C.set(set.C.get());
    }
}