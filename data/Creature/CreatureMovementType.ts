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

export class CreatureMovementType extends EnumBase<CreatureTemplate> {
    get(): number {
        return this.owner.row.MovementType.get();
    }

    set(value: number): CreatureTemplate {
        this.owner.row.MovementType.set(value);
        return this.owner;
    }

    @EnumField(0) 
    setIdle() { return this.set(0); }

    @EnumField(1) 
    setRandomMovement() { return this.set(1); }

    @EnumField(2) 
    setWaypoint() { return this.set(2); }
}