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
 * Contains functions for parsing command-line arguments.
 */
export namespace args {
    /**
     * Checks if any of the provided flags were sent as command-line arguments.
     * @param flagnames The flags to check for
     */
    export function hasAnyFlag(...flagnames: string[]) {
        for (const flagname of flagnames) {
            if (process.argv.includes(flagname) || process.argv.includes(`-${flagname}`) || process.argv.includes(`--${flagname}`)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Returns the assignment of a command-line argument.
     *
     * Valid assignments have the form `flagname=value`
     * @param flagname Left-hand side of the assignment.
     */
    export function getValue(flagname: string): string {
        const matches = process.argv.filter(x => x.split(' ').join('').startsWith(`${flagname}=`));
        if (matches.length === 0) { return ''; }
        const match = matches[0];
        return match.split('=')[1];
    }

    /**
     * Returns the numeric assignment of a command-line argument.
     *
     * Valid numeric assignments have the form `flagname=number`
     * @param flagname Left-hand side of the assignment.
     */
    export function getNumber(flagname: string) {
        return parseInt(getValue(flagname).split(' ').join(''), 10);
    }
}
