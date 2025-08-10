import { CellWrapper } from "../../../data/cell/cells/Cell";
import { Bit, MaskCell, MaskCell32 } from "../../../data/cell/cells/MaskCell";
import { Spell } from "./Spell";
import { SpellEffect } from "./SpellEffect";
export declare abstract class ClassSet<T> extends MaskCell<T> {
    protected getPart(bit: number): MaskCell32<T>;
    getBit(bit: number): boolean;
    setBit(bit: number, value: Bit): T;
    clearAll(): T;
    toString(): string;
    protected deserialize(value: any): void;
    abstract get A(): MaskCell32<T>;
    abstract get B(): MaskCell32<T>;
    abstract get C(): MaskCell32<T>;
    set(a: number, b: number, c: number): T;
    objectify(): string[];
}
export declare class BaseClassSet extends ClassSet<Spell> {
    private makeCell;
    get A(): MaskCell32<Spell>;
    get B(): MaskCell32<Spell>;
    get C(): MaskCell32<Spell>;
    /**
     * @deprecated moved to Spell#Family
     */
    get Family(): CellWrapper<number, Spell>;
    objectify(): any;
    /**
     * Sets this spells ClassSets to match this spell effect
     * @param effect
     */
    match(effect: SpellEffect, matches?: ('A' | 'B' | 'C')[]): Spell;
}
export declare class EffectClassSet<T> extends ClassSet<T> {
    protected effect: SpellEffect;
    protected makeCell(index: number): MaskCell32<T>;
    constructor(owner: T, effect: SpellEffect);
    get A(): MaskCell32<T>;
    get B(): MaskCell32<T>;
    get C(): MaskCell32<T>;
    matches(spell: Spell | number): number;
    copyFrom(set: EffectClassSet<any>): void;
}
