import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { Spell } from "./Spell";
export declare class SpellLevels extends CellSystem<Spell> {
    get Spell(): import("../../../data/cell/cells/Cell").CellWrapper<number, Spell>;
    get Base(): import("../../../data/cell/cells/Cell").CellWrapper<number, Spell>;
    get Max(): import("../../../data/cell/cells/Cell").CellWrapper<number, Spell>;
    set(spell: number, base: number, max: number): Spell;
}
