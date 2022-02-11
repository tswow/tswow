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
export class DBCBufferArray<T> {
    readonly length: number;

    constructor(size: number, reader: (index: number) => T, writer: (index: number, value: T) => void) {
        this.length = size;
        for (let i = 0; i < size; ++i) {
            Object.defineProperty(this, i, {
                set: (value: T) => {
                    writer(i, value);
                },
                get: () => {
                    return reader(i);
                }
            });
        }
    }
}
