import { MaskCellWrite } from "../../../data/cell/cells/MaskCell";
import { ClassRaceMaskEntry, ClassRaceMaskSystem } from "../Class/ClassRaceData/ClassRaceMaskSystem";
import { ClassMask } from "../Class/ClassRegistry";
import { CellBasic } from "../GameObject/ElevatorKeyframes";
import { IDeletable } from "../Misc/Entity";
import { RaceMask } from "../Race/RaceType";
interface CastSpellRow extends IDeletable {
    raceMask: number;
    classMask: number;
    spell: number;
    note: string;
    deleted: boolean;
}
export declare class CastSpell extends ClassRaceMaskEntry<CastSpellRow> {
    get Spell(): import("../Refs/Ref").RefStatic<this, import("./Spell").Spell>;
    get Note(): CellBasic<string, this>;
    get ClassMask(): MaskCellWrite<this, typeof ClassMask>;
    get RaceMask(): MaskCellWrite<this, typeof RaceMask>;
}
export declare class CastSpells<T> extends ClassRaceMaskSystem<CastSpell, CastSpellRow, T> {
    protected spell: number;
    constructor(owner: T, spell: number);
    protected _addGet(classMask: number, raceMask: number): CastSpell;
    protected getAllRows(): CastSpell[];
    protected isDeleted(value: CastSpell): boolean;
}
export {};
