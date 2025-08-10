import { Cell } from "../../../data/cell/cells/Cell";
import { EnumCellTransform } from "../../../data/cell/cells/EnumCell";
import { MaskCellWrite } from "../../../data/cell/cells/MaskCell";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { Language } from "../../../data/dbc/Localization";
import { Table } from "../../../data/table/Table";
import { trainerQuery, trainerRow } from "../../sql/trainer";
import { trainer_spellRow } from "../../sql/trainer_spell";
import { ClassRaceMaskSystemBase, IClassRaceMaskEntry } from "../Class/ClassRaceData/ClassRaceMaskSystem";
import { ClassMask } from "../Class/ClassRegistry";
import { ArrayRefSystem } from "../Misc/ArrayRefSystem";
import { MainEntity, TransformedEntity } from "../Misc/Entity";
import { DynamicIDGenerator } from "../Misc/Ids";
import { MoneyCell } from "../Misc/MoneyCell";
import { SQLLocSystem } from "../Misc/SQLLocSystem";
import { RaceIDs, RaceMask } from "../Race/RaceType";
import { RegistryDynamic } from "../Refs/Registry";
export declare class TrainerLoc extends SQLLocSystem<TrainerBase> {
    protected getMain(): Cell<string, any>;
    protected getLoc(loc: Language): Cell<string, any>;
}
export declare class TrainerRequirementType extends EnumCellTransform<TrainerBase> {
    private clearRow;
    get CLASS(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<TrainerBase, TrainerClass>;
    /**
     * Used for mounts. Sometimes referred to as "Mount" trainers.
     */
    get RACE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<TrainerBase, TrainerRace>;
    get SPELL(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<TrainerBase, TrainerSpellReq>;
}
export declare class SkillRequirement extends CellSystem<TrainerSpell> {
    get Skill(): import("../Refs/Ref").RefStatic<TrainerSpell, import("../SkillLines/SkillLine").SkillLine>;
    get Rank(): import("../../../data/cell/cells/Cell").CellWrapper<number, TrainerSpell>;
    set(skill: number, rank?: number): TrainerSpell;
}
export declare class TrainerSpell extends MainEntity<trainer_spellRow> implements IClassRaceMaskEntry {
    get Spell(): import("../Refs/Ref").RefReadOnly<this, import("../Spell/Spell").Spell>;
    get Trainer(): import("../Refs/Ref").RefReadOnly<this, TrainerPlain>;
    get Cost(): MoneyCell<this>;
    get RequiredLevel(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get ClassMask(): MaskCellWrite<this, typeof ClassMask>;
    get RaceMask(): MaskCellWrite<this, typeof RaceMask>;
    get RequiredSkill(): SkillRequirement;
    get ReqAbilities(): ArrayRefSystem<this, import("../Spell/SpellSkillLines").SkillLineAbility>;
}
export declare class TrainerSpells extends ClassRaceMaskSystemBase<TrainerSpell, TrainerBase> {
    protected getAllRows(): TrainerSpell[];
    protected isDeleted(value: TrainerSpell): boolean;
    add(spellId: number, cost?: number, reqLevel?: number, reqSkillLine?: number, reqSkillRank?: number, reqAbilities?: number[]): TrainerBase;
    addGet(spellId: number): TrainerSpell;
    addMod(spellId: number, callback: (spells: TrainerSpell) => void): TrainerBase;
}
export declare class TrainerBase extends TransformedEntity<trainerRow, TrainerPlain> {
    protected transformer(): EnumCellTransform<any>;
    protected default(): TrainerPlain;
    get ID(): number;
    get Greeting(): TrainerLoc;
    /**
     * What type of primary requirement this trainer has. None by defualt.
     *
     * - Note that ClassMask/RaceMask fields can be used and
     *   will be applied regardless of trainer type.
     */
    get RequirementType(): TrainerRequirementType;
    get Spells(): TrainerSpells;
    get ClassMask(): MaskCellWrite<this, typeof ClassMask>;
    get RaceMask(): MaskCellWrite<this, typeof RaceMask>;
}
export declare class TrainerPlain extends TrainerBase {
    get Requirement(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class TrainerClass extends TrainerBase {
    get RequiredClass(): import("../Refs/Ref").RefNoCreateTT<this, import("../Class/Class").Class, typeof import("../Class/ClassIDs").ClassIDs>;
}
export declare class TrainerRace extends TrainerBase {
    get RequiredRace(): import("../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof RaceIDs>;
}
export declare class TrainerSpellReq extends TrainerBase {
    get RequiredSpell(): import("../Refs/Ref").RefStatic<this, import("../Spell/Spell").Spell>;
}
export declare class TrainerRegistryClass extends RegistryDynamic<TrainerPlain, trainerRow, trainerQuery> {
    protected Table(): Table<any, trainerQuery, trainerRow> & {
        add: (id: number) => trainerRow;
    };
    protected ids(): DynamicIDGenerator;
    Clear(entity: TrainerPlain): void;
    protected Clone(entity: TrainerPlain, parent: TrainerPlain): void;
    protected FindByID(id: number): trainerRow;
    protected EmptyQuery(): trainerQuery;
    ID(e: TrainerPlain): number;
    protected Entity(r: trainerRow): TrainerPlain;
}
export declare const TrainerRegistry: TrainerRegistryClass;
