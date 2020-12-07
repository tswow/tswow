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
import { Cell } from "wotlkdata/cell/Cell";
import { Subsystem } from "wotlkdata/cell/Subsystem";
import { DBCFile } from "wotlkdata/dbc/DBCFile";
import { DBC } from "wotlkdata/dbc/DBCFiles";
import { SQL } from "wotlkdata/sql/SQLFiles";
import { Class } from "./Class";

interface GtDBC {
    Data : Cell<number,any>;
    index : number;
}

class StatFile<D extends GtDBC> extends Subsystem<Class>{
    protected dbc : D[];

    constructor(cls: Class, classId : number,size : number, dbc: DBCFile<any,any,any>) {
        super(cls);
        let start = (classId-1)*size;
        this.dbc = dbc.filter({} as any)
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

export class ClassFormula extends Cell<string,Class> {
    protected type: number;

    constructor(owner: Class, type: number) {
        super(owner);
        this.type = type;
    }

    get(): string {
        const old = SQL.class_stat_formulas.find({class: this.owner.row.ID.get(), stat_type: this.type});
        if(old!==undefined) { 
            return old.formula.get();
        }
        return "";
    }

    set(value: string): Class {
        const old = SQL.class_stat_formulas.find({class: this.owner.row.ID.get(), stat_type: this.type});
        if(old!==undefined) {
            old.formula.set(value);
        }
        SQL.class_stat_formulas.add(this.owner.ID, this.type, {formula: value});
        return this.owner;
    }
}

export class ClassStats extends Subsystem<Class> {
    constructor(owner: Class) {
        super(owner);
    }

    private f(size: number, file : DBCFile<any, any, any>) {
        return new StatFile(this.owner, this.owner.row.ID.get(), size, file);
    }

    get MeleeAttackPower() { return new ClassFormula(this.owner, 1); }
    get RangedAttackPower() { return new ClassFormula(this.owner, 2); }
    get MeleeCritBase() {  return this.f(1,DBC.GtChanceToMeleeCritBase); }
    get SpellCritBase() { return this.f(1,DBC.GtChanceToSpellCritBase); }
    get MeleeCrit() { return this.f(100,DBC.GtChanceToMeleeCrit); }
    get SpellCrit() { return this.f(100,DBC.GtChanceToSpellCrit); }
    get CombatRatings() { return this.f(100,DBC.GtCombatRatings); }
    get CombatRatingsScalar() { 
        return this.f(32, DBC.GtOCTClassCombatRatingScalar); 
    }

    get RegenHp() { return this.f(100, DBC.GtOCTRegenHP); }
    get RegenMp() { return this.f(100, DBC.GtOCTRegenMP); }

    get RegenHpPerSpt() { return this.f(100, DBC.GtRegenHPPerSpt); }
    get RegenMpPerSpt() { return this.f(100, DBC.GtRegenMPPerSpt); }
}