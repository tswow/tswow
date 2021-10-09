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
import { Cell } from "wotlkdata/cell/cells/Cell";
import { EnumCell } from "wotlkdata/cell/cells/EnumCell";
import { MaskCell32 } from "wotlkdata/cell/cells/MaskCell";
import { SQL } from "wotlkdata/sql/SQLFiles";
import { spell_procRow } from "wotlkdata/sql/types/spell_proc";
import { SchoolMask } from "../Misc/School";
import { MaybeSQLEntity } from "../Misc/SQLDBCEntity";
import { Spell } from "./Spell";

export class DisableEffectsMask extends MaskCell32<Spell> {
    /** explicitly disable aura proc effect 0 */
    get Effect0() { return this.bit(0); }

    /** explicitly disable aura proc effect 1 */
    get Effect1() { return this.bit(1); }

    /** explicitly disable aura proc effect 2 */
    get Effect2() { return this.bit(2); }
}

export class SpellAttributesMask extends MaskCell32<Spell> {
    /** Requires target to give exp or honor */
    get RequireExpOrHonor()    { return this.bit(0); }
    /** Can proc even if this spell is triggered by another spell */
    get CanProcOnTriggered()   { return this.bit(1); }
    /** Requires the triggering spell to cost mana */
    get RequireManaCost()      { return this.bit(2); }
    /** Requires triggering spell to be affected by aura of this spell */
    get RequireSpellMod()      { return this.bit(3); }
    /** Aura has reduced chance to proc if actor is > level 60 */
    get ReduceProc60()         { return this.bit(7); }
    /** Does not allow proc if proc is caused by spell cast by item */
    get CantProcFromItemCast() { return this.bit(8); }
}

export class SpellHitMask extends MaskCell32<Spell> {
    get Normal()     { return this.bit(0); }
    get Critical()   { return this.bit(1); }
    get Miss()       { return this.bit(2); }
    get FullResist() { return this.bit(3); }
    get Dodge()      { return this.bit(4); }
    get Parry()      { return this.bit(5); }
    get Block()      { return this.bit(6); }
    get Evade()      { return this.bit(7); }
    get Immune()     { return this.bit(8); }
    get Deflect()    { return this.bit(9); }
    get Absorb()     { return this.bit(10); }
    get Reflect()    { return this.bit(11); }
    get Interrupt()  { return this.bit(12); }
    get FullBlock()  { return this.bit(13); }
}

export class SpellPhaseMask extends MaskCell32<Spell> {
    get Cast() { return this.bit(0); }
    get Hit() { return this.bit(1); }
    get Finish() { return this.bit(2); }
}

export class SpellTypeMask extends MaskCell32<Spell> {
    get Damage() { return this.bit(0); }
    get Heal() { return this.bit(1); }
    get Other() { return this.bit(2); }
}

export class SpellFamilyName extends EnumCell<Spell> {
    /** Enum Value:                       0 */
    get Generic()     { return this.value(0) }
    /** Enum Value:                       3 */
    get Mage()        { return this.value(3) }
    /** Enum Value:                       4 */
    get Warrior()     { return this.value(4) }
    /** Enum Value:                       5 */
    get Warlock()     { return this.value(5) }
    /** Enum Value:                       6 */
    get Priest()      { return this.value(6) }
    /** Enum Value:                       7 */
    get Druid()       { return this.value(7) }
    /** Enum Value:                       8 */
    get Rogue()       { return this.value(8) }
    /** Enum Value:                       9 */
    get Hunter()      { return this.value(9) }
    /** Enum Value:                       10 */
    get Paladin()     { return this.value(10) }
    /** Enum Value:                       11 */
    get Shaman()      { return this.value(11) }
    /** Enum Value:                       13 */
    get Potion()      { return this.value(13) }
    /** Enum Value:                       15 */
    get DeathKnight() { return this.value(15) }
}

export class SpellProcFlags extends MaskCell32<Spell> {
    get Killed()                            { return this.bit(0); }
    get Kill()                              { return this.bit(1); }
    get DoneMeleeAutoAttack()               { return this.bit(2); }
    get TakenMeleeAutoAttack()              { return this.bit(3); }
    get DoneSpellMeleeDmgClass()            { return this.bit(4); }
    get TakenSpellMeleeDmgClass()           { return this.bit(5); }
    get DoneRangedAutoAttack()              { return this.bit(6); }
    get TakenRangedAutoAttack()             { return this.bit(7); }
    get SpellRangedDamageClass()            { return this.bit(8); }
    get TakenSpellRangedDamageClass()       { return this.bit(9); }
    get DoneSpellNoneDamageClassPositive()  { return this.bit(10); }
    get TakenSpellNoneDamageClassPositive() { return this.bit(11); }
    get DoneSpellNoneDamageClassNegative()  { return this.bit(12); }
    get TakenSpellNoneDamageClassNegative() { return this.bit(13); }
    get DoneSpellMagicDamageClassPositive() { return this.bit(14); }
    get DoneSpellMagicDamageClassNegative() { return this.bit(15); }
    get DonePeriodic()                      { return this.bit(16); }
    get TakenPeriodic()                     { return this.bit(17); }
    get TakenDamage()                       { return this.bit(18); }
    get DoneTrapActivation()                { return this.bit(19); }
    get DoneMainhandAttack()                { return this.bit(20); }
    get DoneOffhandAttack()                 { return this.bit(21); }
    get Death()                             { return this.bit(22); }
}

export class SQLMaybeWriteCell extends Cell<number,Spell>{
    private proc: SpellProc

    protected dbcCell: Cell<number,any>;
    protected sqlCell: (sql: spell_procRow)=>Cell<number,any>;

    constructor(owner: Spell, proc: SpellProc, dbcCell: Cell<number,any>, sqlGetter: (sql: spell_procRow)=>Cell<number,any>) {
        super(owner);
        this.proc = proc;
        this.dbcCell = dbcCell;
        this.sqlCell = sqlGetter;
    }

    get() {
        if(this.proc.HasSQL()) {
            return this.sqlCell(MaybeSQLEntity.getSQL(this.proc)).get();
        } else {
            return this.dbcCell.get();
        }
    }

    set(value: number) {
        if(this.proc.HasSQL()) {
            this.sqlCell(MaybeSQLEntity.getSQL(this.proc)).set(value);
        }
        this.dbcCell.set(value);
        return this.owner;
    }
}

export class SpellProc extends MaybeSQLEntity<Spell, spell_procRow> {
    protected createSQL(): spell_procRow {
        return SQL.spell_proc.add(this.owner.ID)
            // when we create this in sql, we want
            // the fields currently in dbc to stay the same
            .Chance.set(this.owner.row.ProcChance.get())
            .Charges.set(this.owner.row.ProcCharges.get())
            .ProcFlags.set(this.owner.row.ProcTypeMask.get())
            .AttributesMask.set(0)
            .Cooldown.set(0)
            .DisableEffectsMask.set(0)
            .HitMask.set(0)
            .ProcsPerMinute.set(0)
            .SchoolMask.set(0)
            .SpellFamilyMask0.set(0)
            .SpellFamilyMask1.set(0)
            .SpellFamilyMask2.set(0)
            .SpellFamilyName.set(0)
            .SpellPhaseMask.set(0)
            .SpellTypeMask.set(0)
    }

    HasSQL() {
        return MaybeSQLEntity.hasSQL(this);
    }

    protected findSQL(): spell_procRow {
        return SQL.spell_proc.find({SpellId:this.owner.ID})
    }
    protected isValidSQL(sql: spell_procRow): boolean {
        return sql.SpellId.get() === this.owner.ID
    }

    get TriggerMask() {
        return new SpellProcFlags(
              this.owner
            , new SQLMaybeWriteCell(
                  this.owner
                , this
                , this.owner.row.ProcTypeMask
                ,(sql)=>sql.ProcFlags
            )
        )
    }

    get Chance() {
        return new SQLMaybeWriteCell(
              this.owner
            , this
            , this.owner.row.ProcChance
            , sql=>sql.Chance
        )
    }

    get Charges() {
        return new SQLMaybeWriteCell(
              this.owner
            , this
            , this.owner.row.ProcCharges
            , sql=>sql.Charges
        )
    }

    get SchoolMask() {
        return new SchoolMask(
              this.owner
            , this.wrapSQL(0, sql=>sql.SchoolMask)
        )
    }

    get SpellFamily() {
        return new SpellFamilyName(
              this.owner
            , this.wrapSQL(0,sql=>sql.SpellFamilyName)
        )
    }

    get ClassMask() {
        return {
              A: this.wrapSQL(0,sql=>sql.SpellFamilyMask0)
            , B: this.wrapSQL(0,sql=>sql.SpellFamilyMask1)
            , C: this.wrapSQL(0,sql=>sql.SpellFamilyMask2)
        }
    }

    get TypeMask() {
        return new SpellTypeMask(
              this.owner
            , this.wrapSQL(0,sql=>sql.SpellTypeMask)
        )
    }

    get PhaseMask() {
        return new SpellPhaseMask(
              this.owner
            , this.wrapSQL(0,sql=>sql.SpellPhaseMask)
        )
    }


    /**
     * - if 0 and TAKEN: will trigger on **normal** + **critical**
     * - if 0 and DONE:  will trigger on **normal** + **critical** + **absorb**
     */
    get HitMask() {
        return new SpellHitMask(
              this.owner
            , this.wrapSQL(0,sql=>sql.HitMask)
        )
    }

    get AttributesMask() {
        return new SpellAttributesMask(
              this.owner
            , this.wrapSQL(0,sql=>sql.AttributesMask)
        )
    }

    get DisableEffectsMask() {
        return new DisableEffectsMask(
            this.owner
          , this.wrapSQL(0,sql=>sql.DisableEffectsMask)
      )
    }

    get ProcsPerMinute() {
        return this.wrapSQL(0,sql=>sql.ProcsPerMinute);
    }
}