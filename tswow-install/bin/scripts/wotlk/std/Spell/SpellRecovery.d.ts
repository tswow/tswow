import { Substruct } from "../Misc/Substruct";
import { Spell } from "./Spell";
export declare class SpellRecovery<T> extends Substruct<T, Spell> {
    constructor(owner: T, spell: Spell);
    get Time(): import("../../../data/cell/cells/Cell").CellWrapper<number, T>;
    get CategoryTime(): import("../../../data/cell/cells/Cell").CellWrapper<number, T>;
    get Category(): import("../../../data/cell/cells/Cell").CellWrapper<number, T>;
    get GlobalTime(): import("../../../data/cell/cells/Cell").CellWrapper<number, T>;
    get GlobalCategory(): import("../../../data/cell/cells/Cell").CellWrapper<number, T>;
    /** @deprecated use GlobalTime */
    get StartTime(): import("../../../data/cell/cells/Cell").CellWrapper<number, T>;
    /** @deprecated use GlobalCategory */
    get StartCategory(): import("../../../data/cell/cells/Cell").CellWrapper<number, T>;
    /** @deprecated set values individually */
    set(time: number, categoryTime?: number, startTime?: number, startCategory?: number): T;
    mod(callback: (rec: SpellRecoveryCB) => void): T;
}
export declare class SpellRecoveryCB extends SpellRecovery<SpellRecoveryCB> {
    constructor(spell: Spell);
}
