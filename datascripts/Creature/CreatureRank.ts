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
import { CellSystem } from "wotlkdata/cell/systems/CellSystem";
import { CreatureTemplate } from "./CreatureTemplate";

export class CreatureRank extends CellSystem<CreatureTemplate> {
    protected set(value: number) {
        this.owner.row.rank.set(value);
        return this.owner;
    }

    setNormal() { return this.set(0); }
    setElite() { return this.set(1); }
    setRareElite() { return this.set(2); }

    /**
     * Note: To display Skull (??) level, set creature TypeFlags to 4.
     */
    setBoss() { return this.set(3); }
    setRare() { return this.set(4); }

}