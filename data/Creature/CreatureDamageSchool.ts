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
import { EnumBase, EnumField } from "wotlkdata/cell/systems/Enum";
import { CreatureTemplate } from "./CreatureTemplate";

export class CreatureDamageSchool extends EnumBase<CreatureTemplate> {
    get(): number {
        return this.owner.row.dmgschool.get();
    }

    objectify() {
        return [
            'Normal','Holy','Fire','Nature',
            'Frost','Shadow','Arcane'][this.get()];
    }

    set(value: number): CreatureTemplate {
        this.owner.row.dmgschool.set(value);
        return this.owner;
    }

    @EnumField(0)
    setNormal() { return this.set(0); }

    @EnumField(1)
    setHoly() { return this.set(1); }

    @EnumField(2)
    setFire() { return this.set(2); }

    @EnumField(3)
    setNature() { return this.set(3); }

    @EnumField(4)
    setFrost() { return this.set(4); }

    @EnumField(5)
    setShadow() { return this.set(5); }

    @EnumField(6)
    setArcane() { return this.set(6); }
}
