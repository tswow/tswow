import { ObjectifyOptions } from "../../../data/cell/serialization/ObjectIteration";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
export declare class SpellRank<T> extends CellSystem<T> {
    spellId: number;
    constructor(owner: T, spellId: number);
    protected getRow(): import("../../sql/spell_ranks").spell_ranksRow;
    exists(): boolean;
    set(firstSpell: number, rank: number): void;
    getFirstSpell(): number;
    getRank(): number;
    objectify(options?: ObjectifyOptions): {
        firstSpell: number;
        rank: number;
    };
}
