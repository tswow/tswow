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
import { Cell } from "wotlkdata/wotlkdata/cell/cells/Cell";
import { makeEnumCell } from "wotlkdata/wotlkdata/cell/cells/EnumCell";
import { makeMaskCell32 } from "wotlkdata/wotlkdata/cell/cells/MaskCell";
import { SQL } from "wotlkdata/wotlkdata/sql/SQLFiles";
import { spell_procRow } from "wotlkdata/wotlkdata/sql/types/spell_proc";
import { PercentCell } from "../Misc/PercentCell";
import { SchoolMask } from "../Misc/School";
import { MaybeSQLEntity } from "../Misc/SQLDBCEntity";
import { Spell } from "./Spell";

export enum DisableEffectsMask {
    EFFECT0 = 0x1,
    EFFECT1 = 0x2,
    EFFECT2 = 0x4,
}

export enum SpellAttributesMas {
    /** Requires target to give exp or honor */
    REQUIRE_EXP_OR_HONOR     = 0x1,
    /** Can proc even if this spell is triggered by another spell */
    CAN_PROC_ON_TRIGGERED    = 0x2,
    /** Requires the triggering spell to cost mana */
    REQUIRE_MANA_COST        = 0x4,
    /** Requires triggering spell to be affected by aura of this spell */
    REQUIRE_SPELL_MOD        = 0x8,
    /** Aura has reduced chance to proc if actor is > level 60 */
    REDUCE_PROC60            = 0x80,
    /** Does not allow proc if proc is caused by spell cast by item */
    CANT_PROC_FROM_ITEM_CAST = 0x100,
}

export enum SpellAttributesMask {
    REQUIRE_EXP_OR_HONOR     = 0x1,
    CAN_PROC_ON_TRIGGERED    = 0x2,
    REQUIRE_MANA_COST        = 0x4,
    REQUIRE_SPELL_MOD        = 0x8,
    REDUCE_PROC60            = 0x80,
    CANT_PROC_FROM_ITEM_CAST = 0x100,

}

export enum SpellHitMask {
    NORMAL      = 0x1,
    CRITICAL    = 0x2,
    MISS        = 0x4,
    FULL_RESIST = 0x8,
    DODGE       = 0x10,
    PARRY       = 0x20,
    BLOCK       = 0x40,
    EVADE       = 0x80,
    IMMUNE      = 0x100,
    DEFLECT     = 0x200,
    ABSORB      = 0x400,
    REFLECT     = 0x800,
    INTERRUPT   = 0x1000,
    FULL_BLOCK  = 0x2000,
}

export enum SpellPhaseMask {
    CAST   = 0x1,
    HIT    = 0x2,
    FINISH = 0x4,

}

export enum SpellTypeMask {
    DAMAGE = 0x1,
    HEAL   = 0x2,
    OTHER  = 0x4,
}

export enum SpellFamilyName {
    GENERIC      = 0,
    MAGE         = 3,
    WARRIOR      = 4,
    WARLOCK      = 5,
    PRIEST       = 6,
    DRUID        = 7,
    ROGUE        = 8,
    HUNTER       = 9,
    PALADIN      = 10,
    SHAMAN       = 11,
    POTION       = 13,
    DEATH_KNIGHT = 15,
}

export enum SpellProcFlags {
    KILLED                                 = 0x1,
    KILL                                   = 0x2,
    DONE_MELEE_AUTO_ATTACK                 = 0x4,
    TAKEN_MELEE_AUTO_ATTACK                = 0x8,
    DONE_SPELL_MELEE_DMG_CLASS             = 0x10,
    TAKEN_SPELL_MELEE_DMG_CLASS            = 0x20,
    DONE_RANGED_AUTO_ATTACK                = 0x40,
    TAKEN_RANGED_AUTO_ATTACK               = 0x80,
    SPELL_RANGED_DAMAGE_CLASS              = 0x100,
    TAKEN_SPELL_RANGED_DAMAGE_CLASS        = 0x200,
    DONE_SPELL_NONE_DAMAGE_CLASS_POSITIVE  = 0x400,
    TAKEN_SPELL_NONE_DAMAGE_CLASS_POSITIVE = 0x800,
    DONE_SPELL_NONE_DAMAGE_CLASS_NEGATIVE  = 0x1000,
    TAKEN_SPELL_NONE_DAMAGE_CLASS_NEGATIVE = 0x2000,
    DONE_SPELL_MAGIC_DAMAGE_CLASS_POSITIVE = 0x4000,
    DONE_SPELL_MAGIC_DAMAGE_CLASS_NEGATIVE = 0x8000,
    DONE_PERIODIC                          = 0x10000,
    TAKEN_PERIODIC                         = 0x20000,
    TAKEN_DAMAGE                           = 0x40000,
    DONE_TRAP_ACTIVATION                   = 0x80000,
    DONE_MAINHAND_ATTACK                   = 0x100000,
    DONE_OFFHAND_ATTACK                    = 0x200000,
    DEATH                                  = 0x400000,

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
        return SQL.spell_proc.query({SpellId:this.owner.ID})
    }
    protected isValidSQL(sql: spell_procRow): boolean {
        return sql.SpellId.get() === this.owner.ID
    }

    get TriggerMask() {
        return makeMaskCell32(SpellProcFlags,this, this.owner.row.ProcTypeMask);
    }

    get Chance() {
        return new PercentCell(this.owner,'[1-101]', false, new SQLMaybeWriteCell(
              this.owner
            , this
            , this.owner.row.ProcChance
            , sql=>sql.Chance
        ))
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
        return makeMaskCell32(SchoolMask,this.owner, this.wrapSQL(0,sql=>sql.SchoolMask));
    }

    get SpellFamily() {
        return makeEnumCell(SpellFamilyName,this.owner, this.wrapSQL(0,sql=>sql.SpellFamilyName));
    }

    get ClassMask() {
        return {
              A: this.wrapSQL(0,sql=>sql.SpellFamilyMask0)
            , B: this.wrapSQL(0,sql=>sql.SpellFamilyMask1)
            , C: this.wrapSQL(0,sql=>sql.SpellFamilyMask2)
        }
    }

    get TypeMask() {
        return makeMaskCell32(
              SpellTypeMask
            , this.owner
            , this.wrapSQL(0,sql=>sql.SpellTypeMask)
        )
    }

    get PhaseMask() {
        return makeMaskCell32(
              SpellPhaseMask
            , this.owner
            , this.wrapSQL(0,sql=>sql.SpellPhaseMask)
        )
    }


    /**
     * - if 0 and TAKEN: will trigger on **normal** + **critical**
     * - if 0 and DONE:  will trigger on **normal** + **critical** + **absorb**
     */
    get HitMask() {
        return makeMaskCell32(
              SpellHitMask
            , this.owner
            , this.wrapSQL(0,sql=>sql.HitMask)
        )
    }

    get AttributesMask() {
        return makeMaskCell32(
              SpellAttributesMask
            , this.owner
            , this.wrapSQL(0,sql=>sql.AttributesMask)
        )
    }

    get DisableEffectsMask() {
        return makeMaskCell32(
            DisableEffectsMask
          , this.owner
          , this.wrapSQL(0,sql=>sql.DisableEffectsMask)
      )
    }

    get ProcsPerMinute() {
        return this.wrapSQL(0,sql=>sql.ProcsPerMinute);
    }
}