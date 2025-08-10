import { ArrayEntry, ArraySystem } from "../../../data/cell/systems/ArraySystem";
import { Spell } from "./Spell";
export declare class SpellReagentEntry<T> extends ArrayEntry<T> {
    protected spell: Spell;
    get Reagent(): import("../../../data/cell/cells/CellArray").CellIndexWrapper<number, this>;
    get ReagentCount(): import("../../../data/cell/cells/CellArray").CellIndexWrapper<number, this>;
    constructor(owner: T, index: number, spell: Spell);
    clear(): this;
    isClear(): boolean;
    set(reagent: number, count: number): this;
}
export declare class SpellReagents<T> extends ArraySystem<SpellReagentEntry<T>, T> {
    protected spell: Spell;
    constructor(owner: T, spell: Spell);
    get length(): number;
    get(index: number): SpellReagentEntry<T>;
    add(reagent: number, count: number): T;
}
