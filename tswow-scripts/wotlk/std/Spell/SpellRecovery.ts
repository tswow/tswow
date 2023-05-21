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
import { Transient } from "../../../data/cell/serialization/Transient";
import { Substruct } from "../Misc/Substruct";
import { Spell } from "./Spell";

export class SpellRecovery<T> extends Substruct<T,Spell> {
    constructor(owner: T, spell: Spell) {
        super(owner,spell);
    }

    get Time() { return this.ownerWrap(this.realOwner.row.RecoveryTime); }
    get CategoryTime() { return this.ownerWrap(this.realOwner.row.CategoryRecoveryTime); }
    get Category() { return this.ownerWrap(this.realOwner.row.Category)}

    get GlobalTime() { return this.ownerWrap(this.realOwner.row.StartRecoveryTime); }
    get GlobalCategory() { return this.ownerWrap(this.realOwner.row.StartRecoveryCategory); }

    /** @deprecated use GlobalTime */
    @Transient
    get StartTime() { return this.ownerWrap(this.realOwner.row.StartRecoveryTime); }

    /** @deprecated use GlobalCategory */
    @Transient
    get StartCategory() { return this.ownerWrap(this.realOwner.row.StartRecoveryCategory); }

    /** @deprecated set values individually */
    set(time: number, categoryTime: number = 0, startTime: number = 0, startCategory: number = 0) {
        this.Time.set(time);
        this.CategoryTime.set(categoryTime);
        this.StartTime.set(startTime);
        this.StartCategory.set(startCategory);
        return this.owner;
    }

    mod(callback: (rec: SpellRecoveryCB)=>void)
    {
        callback(new SpellRecoveryCB(this.realOwner));
        return this.owner;
    }
}

export class SpellRecoveryCB extends SpellRecovery<SpellRecoveryCB>
{
    constructor(spell: Spell)
    {
        super(undefined,spell);
        this.injectThis(this);
    }
}