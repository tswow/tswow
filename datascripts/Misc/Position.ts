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

export class Position {
    readonly map: number;
    readonly x: number;
    readonly y: number;
    readonly z: number;
    readonly o: number;
    readonly delay: number;

    constructor(map: number, x: number, y: number, z: number, o: number, delay?: number) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.o = o;
        this.map = map;
        this.delay = delay || 0;
    }
}

export function Pos(map: number, x: number, y: number, z: number, o: number) {
    return new Position(map,x,y,z,o);
}