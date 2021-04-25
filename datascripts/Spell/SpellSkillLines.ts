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
import { DBC } from "wotlkdata";
import { Subsystem } from "wotlkdata/cell/Subsystem";
import { SkillLineAbilityRow } from "wotlkdata/dbc/types/SkillLineAbility";
import { SQL } from "wotlkdata/sql/SQLFiles";
import { Ids } from "../Misc/Ids";
import { Spell } from "./Spell";
import { Transient } from "wotlkdata/cell/Transient";

export class TrivialSkillLineRank<T> extends Subsystem<SpellSkillLineAbility<T>> {
    get High() { return this.ownerWrap(this.owner.row.TrivialSkillLineRankHigh); }
    get Low() { return this.ownerWrap(this.owner.row.TrivialSkillLineRankLow); }
    set(low: number, high: number) {
        this.Low.set(low);
        this.High.set(high);
        return this.owner;
    }
}

export class SpellSkillLineAbility<T> extends Subsystem<T> {
    @Transient
    readonly row: SkillLineAbilityRow;
    @Transient
    protected spell: Spell;

    constructor(owner: T, spell: Spell, row: SkillLineAbilityRow) {
        super(owner);
        this.spell = spell;
        this.row = row;
    }

    get RaceMask() { return this.wrap(this.row.RaceMask); }
    get ClassMask() { return this.wrap(this.row.ClassMask); }
    get ClassMaskForbidden() { return this.wrap(this.row.ClassMaskForbidden); }
    get MinSkillRank() { return this.wrap(this.row.MinSkillLineRank); }

    /** The spell this spell is superceded by */
    get SupercededBy() { return this.wrap(this.row.SupercededBySpell); }
    get AcquireMethod() { return this.wrap(this.row.AcquireMethod); }
    get TrivialRank(): TrivialSkillLineRank<T> { return new TrivialSkillLineRank<T>(this); }
    get SkillLine() { return this.wrap(this.row.SkillLine); }
    get CharacterPoints() { return this.wrapArray(this.row.CharacterPoints); }

    setAutolearn() {
        this.AcquireMethod.set(1);
        SQL.playercreateinfo_spell_custom
            .add(this.RaceMask.get(), this.ClassMask.get(), this.spell.ID)
            .Note.set('TSWoW')
        return this;
    }
}

export class SpellSkillLineAbilites<T> extends Subsystem<T> {
    @Transient
    protected spell: Spell;

    constructor(owner: T, spell: Spell) {
        super(owner);
        this.spell = spell;
    }

    protected values() {
        return DBC.SkillLineAbility.filter({Spell: this.spell.ID})
    }

    get length() { return this.values().length; }
    getIndex(index: number) { return this.values()[index]; }

    forEach(callback: (sla: SpellSkillLineAbility<T>, index: number) => any) {
        const values = this.values();
        for(let i=0;i<values.length;++i) {
            callback(new SpellSkillLineAbility(this.owner, this.spell,values[i]),i);
        }
    }

    addAutolearn(skillLine: number, parentAbility: number = -1) {
        return this.add(skillLine).setAutolearn();
    }

    add(skillLine: number, parentAbility: number = -1) {
        const rci = DBC.SkillRaceClassInfo.find({SkillID: skillLine});
        let racemask = rci.RaceMask.get();
        let classmask = rci.ClassMask.get();
        if(racemask===4294967295) {
            racemask = 0;
        }

        if(classmask===4294967295) {
            classmask = 0;
        }

        let row = parentAbility == -1 ? DBC.SkillLineAbility.add(Ids.SkillLineAbility.id())
            : DBC.SkillLineAbility.find({ID:parentAbility}).clone(Ids.SkillLineAbility.id())

        return new SpellSkillLineAbility(this.owner, this.spell, row
            .SkillLine.set(skillLine)
            .ClassMask.set(classmask)
            .RaceMask.set(racemask)
            .Spell.set(this.spell.ID));
    }

    objectify() { 
        return this.values().map(x=>x.objectify());
    }
}