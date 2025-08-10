import { Spell } from "./Spell";
export declare class SpellRanks {
    protected spells: Spell[];
    constructor(spells: Spell[]);
    forEach(callback: (spell: Spell, rank: number, lastSpell: Spell | undefined) => any): this;
    forEachFromTwo(callback: (spell: Spell, rank: number, lastSpell: Spell) => any): void;
    get length(): number;
    get(index: number): Spell;
    setSkillLine(skillLine: number): this;
}
