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

export class CreatureType extends EnumBase<CreatureTemplate> {

    get(): number {
        return this.owner.row.type.get();
    }

    set(value: number): CreatureTemplate {
        this.owner.row.type.set(value);
        return this.owner;
    }

    @EnumField(0)
    setNone() { return this.set(0); }

    @EnumField(1)
    setBeast() { return this.set(1); }

    @EnumField(2)
    setDragonkin() { return this.set(2); }

    @EnumField(3)
    setDemon() { return this.set(3); }

    @EnumField(4)
    setElemental() { return this.set(4); }

    @EnumField(5)
    setGiant() { return this.set(5); }

    @EnumField(6)
    setUndead() { return this.set(6); }

    @EnumField(7)
    setHumanoid() { return this.set(7); }

    @EnumField(8)
    setCritter() { return this.set(8); }

    @EnumField(9)
    setMechanical() { return this.set(9); }

    @EnumField(10)
    setNotSpecified() { return this.set(10); }

    @EnumField(11)
    setTotem() { return this.set(11); }

    @EnumField(12)
    setNonCombatPet() { return this.set(12); }

    @EnumField(13)
    setGasCloud() { return this.set(13); }

    @EnumField(14)
    setWildPet() { return this.set(14); }

    @EnumField(15)
    setAberration() { return this.set(15); }
}