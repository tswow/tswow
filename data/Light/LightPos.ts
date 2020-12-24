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
export class LightPosition {
    readonly x: number;
    readonly y: number;
    readonly z: number;
    readonly radiusInner: number;
    readonly radiusOuter: number;

    constructor(x: number, y: number, z: number, radiusInner: number, radiusOuter: number) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.radiusInner = radiusInner;
        this.radiusOuter = radiusOuter;
    }
}

export function LightPos(x: number, y: number, z: number, radiusInner: number, radiusOuter: number) {
    return new LightPosition(x,y,z,radiusInner,radiusOuter);
}