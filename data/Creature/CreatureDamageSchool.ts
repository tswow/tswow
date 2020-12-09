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
import { EnumBase } from "wotlkdata/cell/Systems/Enum";
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

    setNormal() { return this.set(0); }
    setHoly() { return this.set(1); }
    setFire() { return this.set(2); }
    setNature() { return this.set(3); }
    setFrost() { return this.set(4); }
    setShadow() { return this.set(5); }
    setArcane() { return this.set(6); }
}
