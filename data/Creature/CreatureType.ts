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

export class CreatureType extends EnumBase<CreatureTemplate> {

    get(): number {
        return this.owner.row.type.get();
    }

    set(value: number): CreatureTemplate {
        this.owner.row.type.set(value);
        return this.owner;
    }

    None() { return this.set(0); }
    Beast() { return this.set(1); }
    Dragonkin() { return this.set(2); }
    Demon() { return this.set(3); }
    Elemental() { return this.set(4); }
    Giant() { return this.set(5); }
    Undead() { return this.set(6); }
    Humanoid() { return this.set(7); }
    Critter() { return this.set(8); }
    Mechanical() { return this.set(9); }
    NotSpecified() { return this.set(10); }
    Totem() { return this.set(11); }
    NonCombatPet() { return this.set(12); }
    GasCloud() { return this.set(13); }
    WildPet() { return this.set(14); }
    Aberration() { return this.set(15); }
}