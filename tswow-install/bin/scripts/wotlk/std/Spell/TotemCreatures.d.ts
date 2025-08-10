import { TotemType } from "../Totem/TotemType";
import { Spell } from "./Spell";
export type CreatureControlType = 'Attack' | 'Stay' | 'Follow' | 'Aggressive' | 'Passive' | 'Defensive';
export declare class CreatureControllers {
    Attack?: Spell;
    Follow?: Spell;
    Stay?: Spell;
    Aggressive?: Spell;
    Defensive?: Spell;
    Passive?: Spell;
    forEach(callback: (spell: Spell, type: CreatureControlType) => any): void;
}
export declare const TotemCreatures: {
    createSummon(mod: string, id: string, totem: TotemType, creature: number): Spell;
    createControllers(mod: string, id: string, slots: number[], controllers?: CreatureControlType[]): CreatureControllers;
};
