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

// Note: I've never done allocation so I don't know the algorithms. Forgive me for this.
class Allocation {
    low: number;
    high: number;

    constructor(low: number, high: number) {
        this.low = low;
        this.high = high;
    }
}

export class Allocator {
    allocations: Allocation[] = [];

    get length() {return this.allocations.length; }

    get totalIds() {return this.allocations.reduce((p, c) => p + ((c.high - c.low) + 1), 0); }

    print(prefix: string = 'Allocation:') {
        // fixes output names in console
        console.log(prefix, this.allocations.map(x => ({low: x.low, high: x.high})));
    }

    get(index: number) {
        return this.allocations[index];
    }

    contains(num: number) {
        for (const part of this.allocations) {
            if (num >= part.low && num <= part.high) { return true; }
        }
        return false;
    }

    get min() {return this.allocations[0].low; }
    get max() {return this.allocations[this.allocations.length - 1].high; }

    get fragmentation() {
        if (this.length === 0) { return 0; }
        const tot = this.max - this.min;
        if (tot === 0) { return 0; }
        let fragments = 0;
        for (let i = 0; i < this.allocations.length - 1; ++i) {
            fragments += (this.allocations[i + 1].low - 1) - this.allocations[i].high;
        }
        return fragments / tot;
    }

    add(low: number, size: number) {
        let high = low + size - 1;

        for (let i = 0; i < this.allocations.length; ++i) {
            const p1 = this.allocations[i];
            // Skip until we find a allocation that ends after or at the first start
            if (p1.high < low - 1) {
                continue;
            }

            // Grow current allocation down
            if (p1.low === high + 1) {
                p1.low -= ((high - low) + 1);
                return low;
            }

            // Insert before current allocation
            if (p1.low > high) {
                this.allocations.splice(i, 0, new Allocation(low, high));
                return low;
            }

            // Move cursor to end of last allocation
            low = p1.high + 1;
            high = low + size - 1;

            // Extend the last allocation up
            if (i === this.allocations.length - 1) {
                p1.high = high;
                return low;
            }

            const p2 = this.allocations[i + 1];

            // Eat next allocation with current
            if (p2.low === high + 1) {
                p1.high = p2.high;
                this.allocations.splice(i + 1, 1);
                return low;
            }

            // Grow current allocation up
            if (p2.low > high) {
                p1.high = high;
                return low;
            }
        }

        // Append cursor last
        this.allocations.push(new Allocation(low, high));
        return low;
    }
}
