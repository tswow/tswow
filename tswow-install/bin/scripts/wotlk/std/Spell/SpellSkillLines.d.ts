import { MaskCellWrite, MaskCon } from "../../../data/cell/cells/MaskCell";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { MultiRowSystem } from "../../../data/cell/systems/MultiRowSystem";
import { Table } from "../../../data/table/Table";
import { SkillLineAbilityQuery, SkillLineAbilityRow } from "../../dbc/SkillLineAbility";
import { ClassRaceMaskEntry } from "../Class/ClassRaceData/ClassRaceMaskSystem";
import { ClassMask } from "../Class/ClassRegistry";
import { DynamicIDGenerator } from "../Misc/Ids";
import { RaceMask } from "../Race/RaceType";
import { RegistryDynamic } from "../Refs/Registry";
import { Spell } from "./Spell";
export declare class TrivialSkillLineRank extends CellSystem<SkillLineAbility> {
    get High(): import("../../../data/cell/cells/Cell").CellWrapper<number, SkillLineAbility>;
    get Low(): import("../../../data/cell/cells/Cell").CellWrapper<number, SkillLineAbility>;
    set(low: number, high: number): SkillLineAbility;
}
export declare enum AcquireMethod {
    TRAINER = 0,
    LEARN_WITH_SKILL = 1,
    LEARN_ON_CREATE = 2
}
export declare class SkillLineAbility extends ClassRaceMaskEntry<SkillLineAbilityRow> {
    get ClassMask(): MaskCellWrite<this, typeof ClassMask>;
    get RaceMask(): MaskCellWrite<this, typeof RaceMask>;
    get ID(): number;
    get ClassMaskForbidden(): MaskCellWrite<this, typeof ClassMask>;
    get MinSkillRank(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    /** The spell this spell is superceded by */
    get SupercededBy(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get AcquireMethod(): import("../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof AcquireMethod>;
    get TrivialRank(): TrivialSkillLineRank;
    get SkillLine(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get CharacterPoints(): import("../../../data/cell/cells/CellArray").CellArrayWrapper<number, this>;
    get Spell(): import("../Refs/Ref").RefStatic<this, Spell>;
}
export declare class SpellSkillLineAbilites extends MultiRowSystem<SkillLineAbility, Spell> {
    static getAllRows(slas: SpellSkillLineAbilites): SkillLineAbility[];
    protected getAllRows(): SkillLineAbility[];
    protected isDeleted(value: SkillLineAbility): boolean;
    constructor(owner: Spell);
    enable(cls: MaskCon<keyof typeof ClassMask>, race: MaskCon<keyof typeof RaceMask>): void;
    clearClass(cls: MaskCon<keyof typeof ClassMask>): this;
    clearRace(race: MaskCon<keyof typeof RaceMask>): this;
    add(skillLine: number, classes?: MaskCon<keyof typeof ClassMask>, races?: MaskCon<keyof typeof RaceMask>): Spell;
    addMod(skillLine: number, classes: MaskCon<keyof typeof ClassMask>, races: MaskCon<keyof typeof RaceMask>, callback?: (sla: SkillLineAbility) => void): Spell;
    addGet(skillLine?: number, classes?: MaskCon<keyof typeof ClassMask>, races?: MaskCon<keyof typeof RaceMask>): SkillLineAbility;
}
export declare class SkillLineAbilityRegistryClass extends RegistryDynamic<SkillLineAbility, SkillLineAbilityRow, SkillLineAbilityQuery> {
    protected Table(): Table<any, SkillLineAbilityQuery, SkillLineAbilityRow> & {
        add: (id: number) => SkillLineAbilityRow;
    };
    protected ids(): DynamicIDGenerator;
    Clear(entity: SkillLineAbility): void;
    protected FindByID(id: number): SkillLineAbilityRow;
    protected EmptyQuery(): SkillLineAbilityQuery;
    ID(e: SkillLineAbility): number;
    protected Entity(r: SkillLineAbilityRow): SkillLineAbility;
}
export declare const SkillLineAbilityRegistry: SkillLineAbilityRegistryClass;
