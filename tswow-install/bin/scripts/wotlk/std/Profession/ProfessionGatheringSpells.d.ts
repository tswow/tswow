import { MultiRowSystem } from "../../../data/cell/systems/MultiRowSystem";
import { Spell } from "../Spell/Spell";
import { Profession } from "./Profession";
export declare class ProfessionGatheringSpells extends MultiRowSystem<Spell, Profession> {
    protected getAllRows(): Spell[];
    protected isDeleted(value: Spell): boolean;
    addGet(mod: string, id: string, lockType: number, autoLearnAt?: number): Spell;
    addMod(mod: string, id: string, lockType: number, autoLearnAt?: number, callback?: (spell: Spell) => void): Profession;
}
