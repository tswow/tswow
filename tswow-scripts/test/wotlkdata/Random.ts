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
let lastSeed = 0; // Used to we don't get a bunch of same random times

export type TransformFunction = (num: number, random: Random) => number;

/**
 * Used to generate pseudo-random numbers
 */
export class Random {

    constructor(seed: string = '') {
        if (seed === '') { seed = new Date().toString() + (lastSeed++); }
        const state: [number, number, number, number, number ] = [0, 0, 0, 1, 0];
        let n = 0xefc8249d;
        const mash = (data: string) => {
            data = data.toString();
            for (let i = 0; i < data.length; i++) {
                n += data.charCodeAt(i);
                let h = 0.02519603282416938 * n;
                n = h >>> 0;
                h -= n;
                h *= n;
                n = h >>> 0;
                h -= n;
                n += h * 0x100000000; // 2^32
            }
            return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
        };

        state[0] = mash(' ');
        state[1] = mash(' ');
        state[2] = mash(' ');

        for (const s of seed) {
            state[0] -= mash(s);
            if (state[0] < 0) {
                state[0] += 1;
            }
            state[1] -= mash(s);
            if (state[1] < 0) {
                state[1] += 1;
            }
            state[2] -= mash(s);
            if (state[2] < 0) {
                state[2] += 1;
            }
        }
        this.state = state;
    }
    static def = new Random();

    static ALPHANUMERIC = 'abcdefghijklmnopqrstuvwxyz0123456789';

    state: [number, number, number, number, number];

    /**
     * Returns a linear transform function
     */
    static linear: TransformFunction = (v: number) => v;

    string(length: number, charset= Random.ALPHANUMERIC, transform= Random.linear) {
        let str = '';
        for (let i = 0; i < length; ++i) {
            str += this.item(charset.split(''));
        }
        return str;
    }

    scale(transform= Random.linear) {
        const state = this.state;
        const t = 2091639 * state[0] + state[3] * 2.3283064365386963e-10; // 2^-32
        state[0] = state[1];
        state[1] = state[2];
        state[4]++;
        return transform(state[2] = t - (state[3] = t | 0), this);
    }

    int(min= Number.MIN_VALUE, max= Number.MAX_VALUE, transform= Random.linear) {
        return Math.floor(this.scale(transform) * (max - min + 1)) + min;
    }

    float(min= Number.MIN_VALUE, max= Number.MAX_VALUE, transform= Random.linear) {
        return (this.scale(transform) * (max - min) + min);
    }

    item<T>(list: T[], transform= Random.linear): T {
        return list[this.int(0, list.length - 1, transform)];
    }

    index(list: any[], transform= Random.linear) {
        if (list.length === 0) { return -1; }
        return this.int(0, list.length - 1, transform);
    }

    /**
     * Removes a random element in a list
     */
    selection<T>(list: T[], transform= Random.linear): T {
        const index = this.index(list);
        return list.splice(index, 1)[0];
    }
}
