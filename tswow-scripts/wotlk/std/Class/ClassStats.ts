/*
 * This file is part of tswow (https://github.com/tswow)
 *
 * Copyright (C) 2020 tswow <https://github.com/tswow/>
 * This program is free software: you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */
import { Cell } from "../../../data/cell/cells/Cell";
import { makeEnumCell } from "../../../data/cell/cells/EnumCell";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { DBCFile } from "../../../data/dbc/DBCFile";
import { DBC } from "../../DBCFiles";
import { SQL } from "../../SQLFiles";
import { class_stat_formulasRow } from "../../sql/class_stat_formulas";
import { class_stat_valuesRow } from "../../sql/class_stat_values";
import { MaybeSQLEntity } from "../Misc/SQLDBCEntity";
import { Class } from "./Class";
import { ClassIDs } from "./ClassIDs";

interface GtDBC {
    Data : Cell<number,any>;
    index : number;
}

class StatFile<D extends GtDBC> extends CellSystem<Class>{
    protected dbc : D[];

    constructor(cls: Class, classId : number,size : number, dbc: DBCFile<any,any,any>) {
        super(cls);
        let start = (classId-1)*size;
        this.dbc = dbc.queryAll({} as any)
            .sort((a,b)=>a.index>b.index?1:-1)
            .slice(start,start+size);
    }

    get() {
        return this.dbc.map(x=>x.Data);
    }

    set(callback : (oldValue : number, index : number)=>number) {
        this.dbc.forEach((x,i) =>
            x.Data.set(callback(x.Data.get(), i))
        );
        return this.owner;
    }
}

export class ClassAttribute extends CellSystem<Class>{
    protected field: "agi"|"inte"|"str"|"spi"|"sta";

    constructor(cls: Class, field: "agi"|"inte"|"str"|"spi"|"sta") {
        super(cls);
        this.field = field;
    }

    set(callback: (old: number, race: number, level: number)=>number) {
        SQL.player_levelstats.queryAll({class:this.owner.ID})
            .forEach(x=>x[this.field].set(callback(x[this.field].get(),x.race.get(),x.level.get())));
        return this.owner;
    }
}

export class BaseHpMana extends CellSystem<Class> {
    field: "basehp"|"basemana"

    constructor(cls: Class,field: "basehp"|"basemana") {
        super(cls);
        this.field = field;
    }


    set(callback: (old: number, level: number)=>number) {
        SQL.player_classlevelstats.queryAll({class:this.owner.ID})
            .forEach(x=>x[this.field].set(callback(x[this.field].get(),x.level.get())));
        return this.owner;
    }
}

export enum RangedAttackPowerClass {
      DEFAULT = 0,
      HUNTER  = ClassIDs.HUNTER,
      ROGUE   = ClassIDs.ROGUE,
      WARRIOR = ClassIDs.WARRIOR,
      DRUID   = ClassIDs.DRUID,
}

export enum MeleeAttackPowerClass {
    DEFAULT      = 0,
    WARRIOR      = ClassIDs.WARRIOR,
    PALADIN      = ClassIDs.PALADIN,
    DEATH_KNIGHT = ClassIDs.DEATH_KNIGHT,
    ROGUE        = ClassIDs.ROGUE,
    HUNTER       = ClassIDs.HUNTER,
    SHAMAN       = ClassIDs.SHAMAN,
    DRUID        = ClassIDs.DRUID,
    MAGE         = ClassIDs.MAGE,
    PRIEST       = ClassIDs.PRIEST,
    WARLOCK      = ClassIDs.WARLOCK
}

export enum ClassStatFormulaTypes{
    MELEE =  1,
    RANGED = 2,
};

export enum ClassStatValueTypes {
    DIMINISHING_K = 1,
    MISS_CAP      = 2,
    PARRY_CAP     = 3,
    DODGE_CAP     = 4,
    DODGE_BASE    = 5,
    CRIT_TO_DODGE = 6,
};

export class StatFormula extends MaybeSQLEntity<Class,class_stat_formulasRow> {
    private stat: ClassStatFormulaTypes;

    constructor(owner: Class, stat: ClassStatFormulaTypes) {
        super(owner);
        this.stat = stat;
    }

    protected createSQL(): class_stat_formulasRow {
        return SQL.class_stat_formulas
            .add(this.owner.ID,this.stat)
            .class_out.set(this.owner.ID)
    }
    protected findSQL(): class_stat_formulasRow {
        return SQL.class_stat_formulas.query({class:this.owner.ID,stat_type:this.stat});
    }
    protected isValidSQL(sql: class_stat_formulasRow): boolean {
        return sql.class.get() === this.owner.ID
            && sql.stat_type.get() === this.stat;
    }

    get class_out() {
        return this.wrapSQL(this.owner.ID,sql=>sql.class_out);
    }
}

export class ClassStatValueRow extends MaybeSQLEntity<Class,class_stat_valuesRow> {
    private stat: ClassStatValueTypes;

    constructor(owner: Class,stat: ClassStatValueTypes) {
        super(owner)
        this.stat = stat;
    }

    protected createSQL(): class_stat_valuesRow {
        return SQL.class_stat_values
            .add(this.owner.ID,this.stat)
            .value.set(0)
    }

    protected findSQL(): class_stat_valuesRow {
        return SQL.class_stat_values.query({class:this.owner.ID, stat_type:this.stat})
    }
    protected isValidSQL(sql: class_stat_valuesRow): boolean {
        return sql.class.get() === this.owner.ID
            && sql.stat_type.get() === this.stat;
    }

    protected value() {
        return this.wrapSQL(0,(sql)=>sql.value);
    }

    set(value: number) {
        return this.value().set(value);
    }

    get() {
        return this.value().get();
    }

    objectify() { return this.get(); }
}

export class ClassStats extends CellSystem<Class> {
    protected _apFormula       = new StatFormula(this.owner, 1);
    protected _rangedApFormula = new StatFormula(this.owner, 2);

    constructor(owner: Class) {
        super(owner);
    }

    private f(size: number, file : DBCFile<any, any, any>) {
        return new StatFile(this.owner, this.owner.row.ID.get(), size, file);
    }

    get Stamina() { return new ClassAttribute(this.owner, 'sta'); }
    get Strength() { return new ClassAttribute(this.owner,"str"); }
    get Agility() { return new ClassAttribute(this.owner,"agi"); }
    get Intellect() { return new ClassAttribute(this.owner,"inte"); }
    get Spirit() { return new ClassAttribute(this.owner,"spi"); }
    get BaseHP() { return new BaseHpMana(this.owner, "basehp"); }
    get BaseMana() { return new BaseHpMana(this.owner, "basemana"); }

    get MeleePowerType() {
        return makeEnumCell(
              MeleeAttackPowerClass
            , this.owner
            , this._apFormula.class_out
        )
    }

    get RangedPowerType() {
        return makeEnumCell(
            RangedAttackPowerClass
          , this.owner
          , this._apFormula.class_out
      )
    }
    get BaseMeleeCrit() {  return this.f(1,DBC.GtChanceToMeleeCritBase); }
    get BaseSpellCrit() { return this.f(1,DBC.GtChanceToSpellCritBase); }
    get MeleeCrit() { return this.f(100,DBC.GtChanceToMeleeCrit); }
    get SpellCrit() { return this.f(100,DBC.GtChanceToSpellCrit); }
    get CombatRatings() { return this.f(100,DBC.GtCombatRatings); }
    get CombatRatingsScalar() {
        return this.f(32, DBC.GtOCTClassCombatRatingScalar);
    }

    get RegenHP() { return this.f(100, DBC.GtOCTRegenHP); }
    get RegenMP() { return this.f(100, DBC.GtOCTRegenMP); }

    get RegenHPPerSpt() { return this.f(100, DBC.GtRegenHPPerSpt); }
    get RegenMPPerSpt() { return this.f(100, DBC.GtRegenMPPerSpt); }

    get DiminishingK() {
        return new ClassStatValueRow(this.owner, ClassStatValueTypes.DIMINISHING_K)
    }

    get MissCap() {
        return new ClassStatValueRow(this.owner, ClassStatValueTypes.MISS_CAP)
    }

    get ParryCap() {
        return new ClassStatValueRow(this.owner, ClassStatValueTypes.PARRY_CAP)
    }

    get DodgeCap() {
        return new ClassStatValueRow(this.owner, ClassStatValueTypes.DODGE_CAP)
    }

    get DodgeBase() {
        return new ClassStatValueRow(this.owner, ClassStatValueTypes.DODGE_BASE)
    }

    get CritToDodge() {
        return new ClassStatValueRow(this.owner, ClassStatValueTypes.CRIT_TO_DODGE)
    }
}