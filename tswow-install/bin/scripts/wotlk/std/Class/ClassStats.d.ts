import { Cell } from "../../../data/cell/cells/Cell";
import { ObjectifyOptions } from "../../../data/cell/serialization/ObjectIteration";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { DBCFile } from "../../../data/dbc/DBCFile";
import { class_stat_formulasRow } from "../../sql/class_stat_formulas";
import { class_stat_valuesRow } from "../../sql/class_stat_values";
import { MaybeSQLEntity } from "../Misc/SQLDBCEntity";
import { Class } from "./Class";
interface GtDBC {
    Data: Cell<number, any>;
    index: number;
}
declare class StatFile<D extends GtDBC> extends CellSystem<Class> {
    protected dbc: D[];
    constructor(cls: Class, classId: number, size: number, dbc: DBCFile<any, any, any>);
    get(): Cell<number, any>[];
    set(callback: (oldValue: number, index: number) => number): Class;
}
export declare class ClassAttribute extends CellSystem<Class> {
    protected field: "agi" | "inte" | "str" | "spi" | "sta";
    constructor(cls: Class, field: "agi" | "inte" | "str" | "spi" | "sta");
    set(callback: (old: number, race: number, level: number) => number): Class;
}
export declare class BaseHpMana extends CellSystem<Class> {
    field: "basehp" | "basemana";
    constructor(cls: Class, field: "basehp" | "basemana");
    set(callback: (old: number, level: number) => number): Class;
}
export declare enum RangedAttackPowerClass {
    DEFAULT = 0,
    HUNTER = 3,
    ROGUE = 4,
    WARRIOR = 1,
    DRUID = 11
}
export declare enum MeleeAttackPowerClass {
    DEFAULT = 0,
    WARRIOR = 1,
    PALADIN = 2,
    DEATH_KNIGHT = 6,
    ROGUE = 4,
    HUNTER = 3,
    SHAMAN = 7,
    DRUID = 11,
    MAGE = 8,
    PRIEST = 5,
    WARLOCK = 9
}
export declare enum ClassStatFormulaTypes {
    MELEE = 1,
    RANGED = 2
}
export declare enum ClassStatValueTypes {
    DIMINISHING_K = 1,
    MISS_CAP = 2,
    PARRY_CAP = 3,
    DODGE_CAP = 4,
    DODGE_BASE = 5,
    CRIT_TO_DODGE = 6
}
export declare class StatFormula extends MaybeSQLEntity<Class, class_stat_formulasRow> {
    private stat;
    constructor(owner: Class, stat: ClassStatFormulaTypes);
    protected createSQL(): class_stat_formulasRow;
    protected findSQL(): class_stat_formulasRow;
    protected isValidSQL(sql: class_stat_formulasRow): boolean;
    get class_out(): import("../Misc/SQLDBCEntity").MaybeSQLCell<Class, number, class_stat_formulasRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<Class, class_stat_formulasRow>>;
}
export declare class ClassStatValueRow extends MaybeSQLEntity<Class, class_stat_valuesRow> {
    private stat;
    constructor(owner: Class, stat: ClassStatValueTypes);
    protected createSQL(): class_stat_valuesRow;
    protected findSQL(): class_stat_valuesRow;
    protected isValidSQL(sql: class_stat_valuesRow): boolean;
    protected value(): import("../Misc/SQLDBCEntity").MaybeSQLCell<Class, number, class_stat_valuesRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<Class, class_stat_valuesRow>>;
    set(value: number): Class;
    get(): number;
    objectify(options?: ObjectifyOptions): number;
}
export declare class ClassStats extends CellSystem<Class> {
    protected _apFormula: StatFormula;
    protected _rangedApFormula: StatFormula;
    constructor(owner: Class);
    private f;
    get Stamina(): ClassAttribute;
    get Strength(): ClassAttribute;
    get Agility(): ClassAttribute;
    get Intellect(): ClassAttribute;
    get Spirit(): ClassAttribute;
    get BaseHP(): BaseHpMana;
    get BaseMana(): BaseHpMana;
    get MeleePowerType(): import("../../../data/cell/cells/EnumCell").EnumCellWrite<Class, typeof MeleeAttackPowerClass>;
    get RangedPowerType(): import("../../../data/cell/cells/EnumCell").EnumCellWrite<Class, typeof RangedAttackPowerClass>;
    get BaseMeleeCrit(): StatFile<GtDBC>;
    get BaseSpellCrit(): StatFile<GtDBC>;
    get MeleeCrit(): StatFile<GtDBC>;
    get SpellCrit(): StatFile<GtDBC>;
    get CombatRatings(): StatFile<GtDBC>;
    get CombatRatingsScalar(): StatFile<GtDBC>;
    get RegenHP(): StatFile<GtDBC>;
    get RegenMP(): StatFile<GtDBC>;
    get RegenHPPerSpt(): StatFile<GtDBC>;
    get RegenMPPerSpt(): StatFile<GtDBC>;
    get DiminishingK(): ClassStatValueRow;
    get MissCap(): ClassStatValueRow;
    get ParryCap(): ClassStatValueRow;
    get DodgeCap(): ClassStatValueRow;
    get DodgeBase(): ClassStatValueRow;
    get CritToDodge(): ClassStatValueRow;
}
export {};
