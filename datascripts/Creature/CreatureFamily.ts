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
import { EnumCellWrapper, EnumField } from "wotlkdata/cell/cells/EnumCell";
import { CreatureTemplate } from "./CreatureTemplate";

export class CreatureFamily extends EnumCellWrapper<CreatureTemplate> {
    get(): number {
        return this.owner.row.family.get();
    }

    set(value: number): CreatureTemplate {
        this.owner.row.family.set(value);
        return this.owner;
    }


    @EnumField(1)
    setWolf() { return this.set(1); }

    @EnumField(2)
    setCat() { return this.set(2); }

    @EnumField(3)
    setSpider() { return this.set(3); }

    @EnumField(4)
    setBear() { return this.set(4); }

    @EnumField(5)
    setBoar() { return this.set(5); }

    @EnumField(6)
    setCrocolisk() { return this.set(6); }

    @EnumField(7)
    setCarrionBird() { return this.set(7); }

    @EnumField(8)
    setCrab() { return this.set(8); }

    @EnumField(9)
    setGorilla() { return this.set(9); }

    @EnumField(10)
    setRaptor() { return this.set(10); }

    @EnumField(11)
    setTallstrider() { return this.set(11); }

    @EnumField(12)
    setFelhunter() { return this.set(12); }

    @EnumField(13)
    setVoidwalker() { return this.set(13); }

    @EnumField(14)
    setSuccubus() { return this.set(14); }

    @EnumField(15)
    setDoomguard() { return this.set(15); }

    @EnumField(16)
    setScorpid() { return this.set(16); }

    @EnumField(17)
    setTurtle() { return this.set(17); }

    @EnumField(18)
    setImp() { return this.set(18); }

    @EnumField(19)
    setBat() { return this.set(19); }

    @EnumField(20)
    setHyena() { return this.set(20); }

    @EnumField(21)
    setOwl() { return this.set(21); }

    @EnumField(22)
    setWindSerpent() { return this.set(22); }

    @EnumField(23)
    setRemoteControl() { return this.set(23); }

    @EnumField(24)
    setFelguard() { return this.set(24); }

    @EnumField(25)
    setDragonHawk() { return this.set(25); }

    @EnumField(26)
    setRavager() { return this.set(26); }

    @EnumField(27)
    setWarpStalker() { return this.set(27); }

    @EnumField(28)
    setSporebat() { return this.set(28); }

    @EnumField(29)
    setNetherRay() { return this.set(29); }

    @EnumField(30)
    setSerpent() { return this.set(30); }

    @EnumField(31)
    setMoth() { return this.set(31); }

    @EnumField(32)
    setChimaera() { return this.set(32); }

    @EnumField(33)
    setDevilsaur() { return this.set(33); }

    @EnumField(34)
    setGhoul() { return this.set(34); }

    @EnumField(35)
    setSilithid() { return this.set(35); }

    @EnumField(36)
    setWorm() { return this.set(36); }

    @EnumField(37)
    setRhino() { return this.set(37); }

    @EnumField(38)
    setWasp() { return this.set(38); }

    @EnumField(39)
    setCorehound() { return this.set(39); }

    @EnumField(40)
    setSpiritBeast() { return this.set(40); }
}