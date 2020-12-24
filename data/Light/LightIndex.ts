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
export const INT_BAND_COUNT = 18;
export const FLOAT_BAND_COUNT = 6;

export function getIntBandIndex(param: number, index: number) {
    return (param * INT_BAND_COUNT - (INT_BAND_COUNT - 1)) + index;
}

export function getFloatBandIndex(param: number, index: number) {
    return (param * FLOAT_BAND_COUNT - (FLOAT_BAND_COUNT - 1)) + index;
}