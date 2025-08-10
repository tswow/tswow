import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { SpellRow } from "../../dbc/Spell";
export declare class SpellItemEquips<T> extends CellSystem<T> {
    protected row: SpellRow;
    constructor(owner: T, row: SpellRow);
    get Class(): import("../../../data/cell/cells/Cell").CellWrapper<number, T>;
    get Subclass(): import("../../../data/cell/cells/Cell").CellWrapper<number, T>;
    get InvTypes(): import("../../../data/cell/cells/Cell").CellWrapper<number, T>;
    setMeleeWeapon(): T;
    set2HWeapon(): T;
    setBoots(): T;
    setBracers(): T;
    setChest(): T;
    setStaff(): T;
    setRing(): T;
    setShield(): T;
    setGloves(): T;
    setCloak(): T;
    set(cls: number, subcls: number, invTypes: number): T;
}
