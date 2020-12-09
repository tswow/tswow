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
import { EnumBase, EnumField } from "wotlkdata/cell/Systems/Enum";
import { CreatureTemplate } from "./CreatureTemplate";

export class CreatureFamily extends EnumBase<CreatureTemplate> {
    get(): number {
        return this.owner.row.family.get();
    }

    set(value: number): CreatureTemplate {
        this.owner.row.family.set(value);
        return this.owner;
    }


    @EnumField(1)
    Wolf() { return this.set(1); }

    @EnumField(2)
    Cat() { return this.set(2); }

    @EnumField(3)
    Spider() { return this.set(3); }

    @EnumField(4)
    Bear() { return this.set(4); }

    @EnumField(5)
    Boar() { return this.set(5); }

    @EnumField(6)
    Crocolisk() { return this.set(6); }

    @EnumField(7)
    CarrionBird() { return this.set(7); }

    @EnumField(8)
    Crab() { return this.set(8); }

    @EnumField(9)
    Gorilla() { return this.set(9); }

    @EnumField(10)
    Raptor() { return this.set(10); }

    @EnumField(11)
    Tallstrider() { return this.set(11); }

    @EnumField(12)
    Felhunter() { return this.set(12); }

    @EnumField(13)
    Voidwalker() { return this.set(13); }

    @EnumField(14)
    Succubus() { return this.set(14); }

    @EnumField(15)
    Doomguard() { return this.set(15); }

    @EnumField(16)
    Scorpid() { return this.set(16); }

    @EnumField(17)
    Turtle() { return this.set(17); }

    @EnumField(18)
    Imp() { return this.set(18); }

    @EnumField(19)
    Bat() { return this.set(19); }

    @EnumField(20)
    Hyena() { return this.set(20); }

    @EnumField(21)
    Owl() { return this.set(21); }

    @EnumField(22)
    WindSerpent() { return this.set(22); }

    @EnumField(23)
    RemoteControl() { return this.set(23); }

    @EnumField(24)
    Felguard() { return this.set(24); }

    @EnumField(25)
    DragonHawk() { return this.set(25); }

    @EnumField(26)
    Ravager() { return this.set(26); }

    @EnumField(27)
    WarpStalker() { return this.set(27); }

    @EnumField(28)
    Sporebat() { return this.set(28); }

    @EnumField(29)
    NetherRay() { return this.set(29); }

    @EnumField(30)
    Serpent() { return this.set(30); }

    @EnumField(31)
    Moth() { return this.set(31); }

    @EnumField(32)
    Chimaera() { return this.set(32); }

    @EnumField(33)
    Devilsaur() { return this.set(33); }

    @EnumField(34)
    Ghoul() { return this.set(34); }

    @EnumField(35)
    Silithid() { return this.set(35); }

    @EnumField(36)
    Worm() { return this.set(36); }

    @EnumField(37)
    Rhino() { return this.set(37); }

    @EnumField(38)
    Wasp() { return this.set(38); }

    @EnumField(39)
    Corehound() { return this.set(39); }

    @EnumField(40)
    SpiritBeast() { return this.set(40); }
}