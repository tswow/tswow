import { MaskCellWrite, MaskCon } from "../../../data/cell/cells/MaskCell";
import { spell_autolearnRow } from "../../sql/spell_autolearn";
import { ClassRaceMaskEntry, ClassRaceMaskSystem } from "../Class/ClassRaceData/ClassRaceMaskSystem";
import { ClassMask } from "../Class/ClassRegistry";
import { RaceMask } from "../Race/RaceType";
import { Spell } from "./Spell";
export declare class SpellAutoLearn extends ClassRaceMaskEntry<spell_autolearnRow> {
    get Spell(): import("../Refs/Ref").RefReadOnly<this, Spell>;
    get Level(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get ClassMask(): MaskCellWrite<this, typeof ClassMask>;
    get RaceMask(): any;
}
export declare class SpellAutoLearns extends ClassRaceMaskSystem<SpellAutoLearn, spell_autolearnRow, Spell> {
    protected _addGet(classmask: number, racemask: number): SpellAutoLearn;
    protected getAllRows(): SpellAutoLearn[];
    protected isDeleted(value: SpellAutoLearn): boolean;
    add(level: number, classes?: MaskCon<keyof typeof ClassMask>, races?: MaskCon<keyof typeof RaceMask>): Spell;
}
