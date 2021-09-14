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

export interface Position {
    map: number;
    x: number;
    y: number;
    z: number;
    o: number;
}

export function Pos(map: number, x: number, y: number, z: number, o: number) {
    return {map,x,y,z,o,delay:0}
}

export function distance2d(pos1: Position, pos2: Position) {
    if(pos1.map !== pos1.map) {
        throw new Error(
              `Trying to take distance of positions on different maps:`
            + `${pos1.map},${pos2.map}`
        )
    }
    return Math.sqrt(
          Math.pow(pos1.x-pos2.x,2)
        + Math.pow(pos1.y-pos2.y,2)
    )
}

export function distance3d(pos1: Position, pos2: Position) {
    if(pos1.map !== pos1.map) {
        throw new Error(
              `Trying to take distance of positions on different maps:`
            + `${pos1.map},${pos2.map}`
        )
    }
    return Math.sqrt(
          Math.pow(pos1.x-pos2.x,2)
        + Math.pow(pos1.y-pos2.y,2)
        + Math.pow(pos1.z-pos2.z,2)
    )
}