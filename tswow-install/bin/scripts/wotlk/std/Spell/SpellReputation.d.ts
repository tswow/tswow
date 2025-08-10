import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { Spell } from "./Spell";
export declare class SpellReputation extends CellSystem<Spell> {
    get Faction(): import("../../../data/cell/cells/Cell").CellWrapper<number, Spell>;
    get MinReputation(): import("../../../data/cell/cells/Cell").CellWrapper<number, Spell>;
    set(faction: number, minReputation: number): Spell;
}
