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

/**
 * Represents a lap on a timer with a specific tag.
 * A Timer can contain multiple laps with the same tag.
 */
interface Lap {
    tag: string;
    lapTime: number;
}

/**
 * Represents a timer that starts when created.
 * Optionally supports taking multiple 'laps' with tags for more complex operations.
 */
export class Timer {

    private constructor() {
        this.startTime = Date.now();
    }

    startTime: number;
    laps: Lap[] = [];
    /**
     * Starts and returns a new Timer object.
     */
    static start() {
        return new Timer();
    }

    /**
     * Creats a new lap
     * @param tag
     */
    lap(tag: string) {
        this.laps.push({tag, lapTime: Date.now()});
    }

    /**
     * Times the amount of seconds since the last lap with the specified tag, or since the timer began.
     * @param decimals How many decimals should be in the output seconds.
     * @param tag Which tag, if any, we should time against.
     */
    timeSec(decimals: number = 2, tag?: string) {
        return (this.time(tag) / 1000).toFixed(decimals);
    }

    /**
     * Times the amount of seconds since the last lap with the specified tag, or since the timer began.
     * @param tag Which tag, if any, we should time against.
     */
    time(tag?: string) {
        if (tag === undefined) {
            return Date.now() - this.startTime;
        }

        for (let i = this.laps.length - 1; i >= 0; --i) {
            if (this.laps[i].tag === tag) {
                return Date.now() - this.laps[i].lapTime;
            }
        }
        throw new Error(`Tried to time a non-existent lap with tag ${tag}`);
    }
}
