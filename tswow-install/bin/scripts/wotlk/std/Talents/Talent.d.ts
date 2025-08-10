import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { TalentRow } from "../../dbc/Talent";
import { MainEntity } from "../Misc/Entity";
import { RefUnknown } from "../Refs/Ref";
import { Spell } from "../Spell/Spell";
import { TalentRequirements } from "./TalentRequirements";
export declare class TalentSpells extends CellSystem<Talent> {
    get length(): number;
    get(index: number): Spell;
    set(index: number, spellId: number): Talent;
    add(spellId: number[]): Talent;
    forEach(callback: (spell: Spell, index: number) => void): Talent;
}
export declare class TalentPosition extends CellSystem<Talent> {
    get Column(): import("../../../data/cell/cells/Cell").CellWrapper<number, Talent>;
    /**
     * @note Called "TierID" in DBC
     */
    get Row(): import("../../../data/cell/cells/Cell").CellWrapper<number, Talent>;
    set(row: number, column: number): Talent;
}
export declare class Talent extends MainEntity<TalentRow> {
    get ID(): number;
    get Position(): TalentPosition;
    get Requirements(): TalentRequirements;
    get RequiredSpell(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Tab(): RefUnknown<this>;
    get Spells(): TalentSpells;
}
