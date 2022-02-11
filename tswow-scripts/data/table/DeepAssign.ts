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

export function isDifferentType(valA: any, valB: any) {
    if (valA === undefined || valB === undefined || valA === null || valB === null) {
        return false;
    }
    const ta = typeof(valA);
    const tb = typeof(valB);

    if ((ta === 'bigint' || tb === 'bigint') && (ta === 'number' || tb === 'number')) {
        return false;
    }

    return ta !== tb;
}

export function deepAssign(oldObj: any, newObj: any) {
    for (const key in newObj) {
        if (key === 'table') { continue; }
        const newVal = newObj[key];
        const oldVal = oldObj[key];
        if (newVal === undefined || newVal === null) { continue; }

        if (isDifferentType(newVal, oldVal)) {
            throw new Error(`Tried assigning incorrect type ${
                typeof(newVal)} (new) to ${
                typeof(oldVal)} (old) (key=${key})`);
        }

        if (typeof(newVal) === 'object') {
            // Special handler for loc
            if (oldObj[key] && oldObj[key].isLoc) {
                deepAssign(oldObj[key], newVal);
                continue;
            }
            oldObj[key] = deepAssign(oldObj[key] || {}, newVal);
        } else {
            oldObj[key] = newVal;
        }
    }
    return oldObj;
}
