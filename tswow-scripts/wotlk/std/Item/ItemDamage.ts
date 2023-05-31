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
import { EnumCon, makeEnumCell } from "../../../data/cell/cells/EnumCell";
import { ArrayEntry, ArraySystem } from "../../../data/cell/systems/ArraySystem";
import { SchoolTypes } from "../Misc/School";
import { ItemTemplate } from "./ItemTemplate";

function schools(owner: ItemTemplate) {
    return [
        owner.row.dmg_type1,
        owner.row.dmg_type2
    ]
}

function dmgMin(owner: ItemTemplate) {
    return [
        owner.row.dmg_min1,
        owner.row.dmg_min2,
    ]
}

function dmgMax(owner: ItemTemplate) {
    return [
        owner.row.dmg_max1,
        owner.row.dmg_max2,
    ]
}

export enum DamageSchool {
    PHYSICAL = 0,
    HOLY     = 1,
    NATURE   = 3,
    FROST    = 4,
    SHADOW   = 5,
    ARCANE   = 6,
}

export class ItemDamage extends ArrayEntry<ItemTemplate> {
    /** @deprecated use School */
    get school() { return schools(this.container)[this.index]; }

    /** @deprecated use Min */
    get min() { return dmgMin(this.container)[this.index]; }
    /** @deprecated use Max */
    get max() { return dmgMax(this.container)[this.index]; }

    get Min() { return dmgMin(this.container)[this.index]; }
    get Max() { return dmgMax(this.container)[this.index]; }
    get School() { return makeEnumCell(SchoolTypes, this, schools(this.container)[this.index]) }

    set(school: EnumCon<keyof typeof SchoolTypes>, min: number, max: number)
    {
        this.School.set(school);
        this.Min.set(min);
        this.Max.set(max);
    }

    clear() {
        this.School.set(0);
        this.Min.set(0);
        this.Max.set(0);
        return this;
    }

    isClear(): boolean {
        // todo: is School supposed to be checked here?
        return this.School.get() === 0 && this.Min.get() === 0 && this.Max.get() === 0;
    }
}

export class ItemDamages extends ArraySystem<ItemDamage, ItemTemplate> {
    get length(): number {
        return 2;
    }
    get(index: number): ItemDamage {
        return new ItemDamage(this.owner, index);
    }

    private _add(type: number, min: number, max: number) {
        const free = this.addGet()
        free.school.set(type);
        free.min.set(min);
        free.max.set(max);
        return this.owner;
    }

    add(school: EnumCon<keyof typeof SchoolTypes>, min: number, max: number)
    {
        return this.addMod(x=>x
            .set(school,min,max)
        )
    }

    addPhysical(min: number, max: number) {
        return this._add(0, min, max);
    }

    addHoly(min: number, max: number) {
        return this._add(1, min, max);
    }

    addFire(min: number, max: number) {
        return this._add(2, min, max);
    }

    addNature(min: number, max: number) {
        return this._add(3, min, max);
    }

    addFrost(min: number, max: number) {
        return this._add(4, min, max);
    }

    addShadow(min: number, max: number) {
        return this._add(5, min, max);
    }

    addArcane(min: number, max: number) {
        return this._add(6, min, max);
    }
}