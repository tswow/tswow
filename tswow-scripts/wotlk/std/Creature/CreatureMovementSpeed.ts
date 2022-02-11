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
import { CellSystem } from "wotlkdata/wotlkdata/cell/systems/CellSystem";
import { CreatureTemplate } from "./CreatureTemplate";

export class CreatureMovementSpeed extends CellSystem<CreatureTemplate> {
    set(walk: number, run: number = walk) {
        this.owner.row.speed_walk.set(walk);
        this.owner.row.speed_run.set(run);
        return this.owner;
    }

    getWalk() {
        return this.owner.row.speed_walk.get();
    }

    getRun() {
        return this.owner.row.speed_run.get();
    }

    objectify() {
        return {walk: this.owner.row.speed_walk.get(), run: this.owner.row.speed_run.get()}
    }
}