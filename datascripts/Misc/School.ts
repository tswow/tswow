import { EnumCellWrapper, EnumField } from "wotlkdata/cell/cells/EnumCell";
import { MaskCell32 } from "wotlkdata/cell/cells/MaskCell";

/*
 * This file is part of tswow (https://github.com/tswow)
 *
 * Copyright (C) 2021 tswow <https://github.com/tswow/>
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
export class SchoolMask<T> extends MaskCell32<T> {
    get Physical() {return this.bit(0); }
    get Holy() {return this.bit(1); }
    get Fire() {return this.bit(2); }
    get Nature() {return this.bit(3); }
    get Frost() {return this.bit(4); }
    get Shadow() {return this.bit(5); }
    get Arcane() {return this.bit(6); }
}

export class SchoolEnum<T> extends EnumCellWrapper<T> {
    @EnumField(0)
    setPhysical() {return this.set(0); }

    @EnumField(1)
    setHoly() {return this.set(1); }

    @EnumField(2)
    setFire() {return this.set(2); }

    @EnumField(3)
    setNature() {return this.set(3); }

    @EnumField(4)
    setFrost() {return this.set(4); }

    @EnumField(5)
    setShadow() {return this.set(5); }

    @EnumField(6)
    setArcane() {return this.set(6); }
}